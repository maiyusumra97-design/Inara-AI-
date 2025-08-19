import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertVideoSchema, insertPaymentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.post("/api/users/:id/subscription", async (req, res) => {
    try {
      const { status, expiry } = req.body;
      const user = await storage.updateUserSubscription(
        req.params.id,
        status,
        expiry ? new Date(expiry) : undefined
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update subscription", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Video routes
  app.post("/api/videos", async (req, res) => {
    try {
      const videoData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(videoData);
      
      // Simulate video processing
      setTimeout(async () => {
        const processingTime = Math.floor(Math.random() * 300) + 60; // 1-5 minutes
        await storage.updateVideoStatus(
          video.id,
          "completed",
          `https://example.com/videos/${video.id}.mp4`,
          `https://example.com/thumbnails/${video.id}.jpg`,
          processingTime
        );
      }, 2000);
      
      res.json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const videos = await storage.getAllVideos(limit);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to get videos", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const video = await storage.getVideo(req.params.id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to get video", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/users/:userId/videos", async (req, res) => {
    try {
      const videos = await storage.getUserVideos(req.params.userId);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user videos", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Payment routes
  app.post("/api/payments", async (req, res) => {
    try {
      const paymentData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(paymentData);
      
      // Simulate payment processing
      setTimeout(async () => {
        const success = Math.random() > 0.1; // 90% success rate
        await storage.updatePaymentStatus(
          payment.id,
          success ? "completed" : "failed",
          success ? `txn_${Date.now()}` : undefined
        );
        
        // Update user subscription if payment successful
        if (success) {
          const expiry = new Date();
          expiry.setMonth(expiry.getMonth() + 1);
          await storage.updateUserSubscription(paymentData.userId, "active", expiry);
        }
      }, 3000);
      
      res.json(payment);
    } catch (error) {
      res.status(400).json({ message: "Invalid payment data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/payments/:id", async (req, res) => {
    try {
      const payment = await storage.getPayment(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: "Failed to get payment", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/users/:userId/payments", async (req, res) => {
    try {
      const payments = await storage.getUserPayments(req.params.userId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user payments", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
