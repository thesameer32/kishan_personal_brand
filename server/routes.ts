import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkshopRegistrationSchema } from "@shared/schema";
import { z } from "zod";
import { createRegistration, getRegistrationByEmail, getAllRegistrations } from "./database";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

    // Workshop Registration Routes
  app.post("/api/workshop/register", async (req, res) => {
    try {
      const { name, email, phone } = insertWorkshopRegistrationSchema.parse(req.body);
      
      // Check if already registered
      const existing = await getRegistrationByEmail(email);
      if (existing) {
        return res.status(400).json({ 
          error: "Email already registered for workshop" 
        });
      }

      const registration = await createRegistration({
        name,
        email,
        phone
      });

      console.log(`New workshop registration: ${name} (${email}) - ${phone}`);

      res.json({ 
        success: true, 
        message: "Registration Successful! WhatsApp & email par confirmation bhej diya gaya hai. Niche button se WhatsApp group join kar lo to never miss updates."
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ 
        error: "Invalid registration data" 
      });
    }
  });

  // Admin route to get all registrations
  app.get("/api/admin/registrations", async (req, res) => {
    try {
      const registrations = await getAllRegistrations();
      res.json({ success: true, data: registrations });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
