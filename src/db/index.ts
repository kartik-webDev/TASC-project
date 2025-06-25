import {drizzle} from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import path from "path"
import * as schema from './schema';
import { desc, eq } from "drizzle-orm"

config({path: ".env.local"})
 
const sql = neon(process.env.DB_URL!)

// logger
//  const db = drizzle(sql, {logger: true})
const db = drizzle(sql, {schema})

export class FeedbackService {
  static async createFeedback(data: {
    vehicleNumber: string;
    feedbackData: {
      safety: { positive: string[]; negative: string[] };
      vehicle: { positive: string[]; negative: string[] };
      behavior: { positive: string[]; negative: string[] };
      comfort: { positive: string[]; negative: string[] };
      service: { positive: string[]; negative: string[] };
    };
    additionalComments?: string;
    photoUrl?: string;
    hasPhoto?: boolean;
    userId?: string;
    location?: { latitude?: string; longitude?: string; address?: string };
  }) {
    try {
      const feedback = await db.insert(schema.feedbacks).values({
        vehicleNumber: data.vehicleNumber,
        userId: data.userId,
        
        safetyPositive: data.feedbackData.safety.positive,
        safetyNegative: data.feedbackData.safety.negative,
        
        vehiclePositive: data.feedbackData.vehicle.positive,
        vehicleNegative: data.feedbackData.vehicle.negative,
        
        behaviorPositive: data.feedbackData.behavior.positive,
        behaviorNegative: data.feedbackData.behavior.negative,
        
        comfortPositive: data.feedbackData.comfort.positive,
        comfortNegative: data.feedbackData.comfort.negative,
        
        servicePositive: data.feedbackData.service.positive,
        serviceNegative: data.feedbackData.service.negative,
        
        additionalComments: data.additionalComments,
        photoUrl: data.photoUrl,
        hasPhoto: data.hasPhoto || false,
        
        latitude: data.location?.latitude,
        longitude: data.location?.longitude,
        location: data.location?.address,
      }).returning();
      
      return { success: true, data: feedback[0] };
    } catch (error) {
      console.error('Error creating feedback:', error);
      return { success: false, error: 'Failed to save feedback' };
    }
  }
  
  static async getFeedbackByVehicle(vehicleNumber: string) {
    try {
      const feedbacks = await db.select()
        .from(schema.feedbacks)
        .where(eq(schema.feedbacks.vehicleNumber, vehicleNumber))
        .orderBy(desc(schema.feedbacks.createdAt));
      
      return { success: true, data: feedbacks };
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return { success: false, error: 'Failed to fetch feedback' };
    }
  }
  
  static async getAllFeedbacks(limit = 50, offset = 0) {
    try {
      const feedbacks = await db.select()
        .from(schema.feedbacks)
        .orderBy(desc(schema.feedbacks.createdAt))
        .limit(limit)
        .offset(offset);
      
      return { success: true, data: feedbacks };
    } catch (error) {
      console.error('Error fetching all feedbacks:', error);
      return { success: false, error: 'Failed to fetch feedbacks' };
    }
  }
}

export default db