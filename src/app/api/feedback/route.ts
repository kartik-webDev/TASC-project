// pages/api/feedback.ts (Next.js API route)
// or app/api/feedback/route.ts (Next.js 13+ App Router)

import { NextRequest, NextResponse } from 'next/server';
import { FeedbackService } from '@/db';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.vehicleNumber || !body.feedbackData) {
      return NextResponse.json(
        { error: 'Vehicle number and feedback data are required' },
        { status: 400 }
      );
    }

    // Extract data from request
    const {
      vehicleNumber,
      feedbackData,
      additionalComments,
      photoUrl,
      hasPhoto,
      userId // Optional: from authentication
    } = body;

    // Get user location (optional)
    const userAgent = request.headers.get('user-agent');
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    // In a real app, you might want to get location from IP or user input
    const location = {
      latitude: undefined,
      longitude: undefined,
      address: undefined
    };

    // Save to database using Drizzle
    const result = await FeedbackService.createFeedback({
      vehicleNumber,
      feedbackData,
      additionalComments,
      photoUrl,
      hasPhoto,
      userId,
      location
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      data: {
        id: result?.data?.id,
        vehicleNumber: result?.data?.vehicleNumber,
        createdAt: result?.data?.createdAt
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve feedback (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleNumber = searchParams.get('vehicleNumber');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let result;
    
    if (vehicleNumber) {
      result = await FeedbackService.getFeedbackByVehicle(vehicleNumber);
    } else {
      result = await FeedbackService.getAllFeedbacks(limit, offset);
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}