import { NextRequest, NextResponse } from 'next/server';

// Simple manual ContentStack API call without SDK
const fetchFromContentStack = async (contentType: string, params: Record<string, string> = {}) => {
  const API_KEY = process.env.CONTENTSTACK_API_KEY;
  const DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT;
  const REGION = process.env.CONTENTSTACK_REGION || 'eu'; // Default to EU

  if (!API_KEY || !DELIVERY_TOKEN || !ENVIRONMENT) {
    throw new Error('ContentStack environment variables not configured');
  }

  // Build the API URL
  const regionDomain = REGION.toLowerCase() === 'us' ? 'cdn' : 'eu-cdn';
  const baseUrl = `https://${regionDomain}.contentstack.com/v3/content_types/${contentType}/entries`;
  
  // Build query parameters
  const queryParams = new URLSearchParams({
    environment: ENVIRONMENT,
    ...params
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      'api_key': API_KEY,
      'access_token': DELIVERY_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`ContentStack API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('content_type');
    
    if (!contentType) {
      return NextResponse.json(
        { 
          success: false,
          error: 'content_type parameter is required',
          example: 'http://localhost:3000/api/content?content_type=page'
        },
        { status: 400 }
      );
    }

    // Convert URLSearchParams to simple object
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'content_type') {
        params[key] = value;
      }
    });

    console.log(`Fetching ${contentType} entries from ContentStack...`);
    const result = await fetchFromContentStack(contentType, params);
    
    return NextResponse.json({
      success: true,
      contentType: contentType,
      count: result.entries?.length || 0,
      entries: result.entries || []
    });
    
  } catch (error: any) {
    console.error('ContentStack API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch content'
      },
      { status: 500 }
    );
  }
}