// @ts-nocheck
import 'dotenv/config';
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { seedTools } from '../lib/seedData';
import { computeRankingScore } from '../lib/ranking';

function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase admin credentials in environment.');
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
}

async function main() {
  const app = getAdminApp();
  const db = getFirestore(app);
  const collection = db.collection('tools');

  for (const tool of seedTools) {
    const rankingScore = computeRankingScore(tool);
    await collection.doc(tool.slug).set({
      ...tool,
      rankingScore,
      createdAt: tool.createdAt ?? new Date()
    });
    // eslint-disable-next-line no-console
    console.log(`Seeded ${tool.slug}`);
  }
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
