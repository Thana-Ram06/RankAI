declare module 'firebase-admin/app' {
  export interface App {}

  export function initializeApp(...args: any[]): App;
  export function cert(...args: any[]): any;
  export function getApps(): App[];
}

declare module 'firebase-admin/firestore' {
  export interface Firestore {
    collection(path: string): {
      doc(id: string): {
        set(data: unknown): Promise<void>;
      };
    };
  }

  export function getFirestore(app?: any): Firestore;
}

