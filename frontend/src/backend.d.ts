import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Tool {
    id: bigint;
    categories: Array<string>;
    cons: Array<string>;
    name: string;
    createdAt: Time;
    pros: Array<string>;
    slug: string;
    tags: Array<string>;
    description: string;
    website: string;
    rankingScore: bigint;
    pricing: Pricing;
    updatedAt: Time;
    rating: bigint;
    bestFor: Array<string>;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum Pricing {
    freemium = "freemium",
    free = "free",
    paid = "paid"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTool(tool: Tool): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllTools(): Promise<Array<Tool>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getToolBySlug(slug: string): Promise<Tool | null>;
    getToolsByCategory(category: string): Promise<Array<Tool>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchTools(keyword: string): Promise<Array<Tool>>;
}
