import { type User, type InsertUser, type Video, type InsertVideo, type Payment, type InsertPayment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserSubscription(userId: string, status: string, expiry?: Date): Promise<User | undefined>;

  // Video methods
  getVideo(id: string): Promise<Video | undefined>;
  getUserVideos(userId: string): Promise<Video[]>;
  getAllVideos(limit?: number): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideoStatus(videoId: string, status: string, videoUrl?: string, thumbnailUrl?: string, processingTime?: number): Promise<Video | undefined>;

  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: string): Promise<Payment | undefined>;
  getUserPayments(userId: string): Promise<Payment[]>;
  updatePaymentStatus(paymentId: string, status: string, transactionId?: string): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private videos: Map<string, Video>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.payments = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      subscriptionStatus: "free",
      subscriptionExpiry: null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserSubscription(userId: string, status: string, expiry?: Date): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.subscriptionStatus = status;
      user.subscriptionExpiry = expiry || null;
      this.users.set(userId, user);
    }
    return user;
  }

  // Video methods
  async getVideo(id: string): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async getUserVideos(userId: string): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getAllVideos(limit?: number): Promise<Video[]> {
    const allVideos = Array.from(this.videos.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    return limit ? allVideos.slice(0, limit) : allVideos;
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const video: Video = {
      ...insertVideo,
      id,
      status: "processing",
      videoUrl: null,
      thumbnailUrl: null,
      processingTime: null,
      createdAt: new Date(),
      quality: insertVideo.quality || "4k",
      voiceSettings: insertVideo.voiceSettings || null,
      musicSettings: insertVideo.musicSettings || null,
    };
    this.videos.set(id, video);
    return video;
  }

  async updateVideoStatus(videoId: string, status: string, videoUrl?: string, thumbnailUrl?: string, processingTime?: number): Promise<Video | undefined> {
    const video = this.videos.get(videoId);
    if (video) {
      video.status = status;
      if (videoUrl) video.videoUrl = videoUrl;
      if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
      if (processingTime) video.processingTime = processingTime;
      this.videos.set(videoId, video);
    }
    return video;
  }

  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      ...insertPayment,
      id,
      createdAt: new Date(),
      currency: insertPayment.currency || "INR",
      paymentMethod: insertPayment.paymentMethod || null,
      transactionId: insertPayment.transactionId || null,
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return Array.from(this.payments.values())
      .filter(payment => payment.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updatePaymentStatus(paymentId: string, status: string, transactionId?: string): Promise<Payment | undefined> {
    const payment = this.payments.get(paymentId);
    if (payment) {
      payment.status = status;
      if (transactionId) payment.transactionId = transactionId;
      this.payments.set(paymentId, payment);
    }
    return payment;
  }
}

export const storage = new MemStorage();
