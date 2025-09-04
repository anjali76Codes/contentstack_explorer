import { NextRequest, NextResponse } from 'next/server';
import { getContentstackRegion } from '@/lib/region-utils';

export async function GET(request: NextRequest) {
  try {
    // Debug environment variables
    const envInfo = {
      apiKey: process.env.CONTENTSTACK_API_KEY ? 'Set' : 'Not set',
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ? 'Set' : 'Not set',
      environment: process.env.CONTENTSTACK_ENVIRONMENT || 'Not set',
      region: process.env.CONTENTSTACK_REGION || 'Not set',
      regionResolved: getContentstackRegion().toString()
    };

    return NextResponse.json({
      success: true,
      environment: envInfo,
      timestamp: new Date().toISOString(),
      note: 'This endpoint only checks environment variables, not actual ContentStack connection'
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}