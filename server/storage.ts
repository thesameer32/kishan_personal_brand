import { type User, type InsertUser, type WorkshopRegistration, type InsertWorkshopRegistration } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration>;
  getWorkshopRegistrationByEmail(email: string): Promise<WorkshopRegistration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private workshopRegistrations: Map<string, WorkshopRegistration>;

  constructor() {
    this.users = new Map();
    this.workshopRegistrations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const id = randomUUID();
    const workshopRegistration: WorkshopRegistration = { 
      ...registration, 
      id, 
      createdAt: new Date()
    };
    this.workshopRegistrations.set(id, workshopRegistration);
    return workshopRegistration;
  }

  async getWorkshopRegistrationByEmail(email: string): Promise<WorkshopRegistration | undefined> {
    return Array.from(this.workshopRegistrations.values()).find(
      (registration) => registration.email === email,
    );
  }
}

export const storage = new MemStorage();
