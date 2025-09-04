import { NextRequest, NextResponse } from 'next/server';
import { initializeStack } from '@/lib/contentstack-utils';

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.CONTENTSTACK_API_KEY || !process.env.CONTENTSTACK_DELIVERY_TOKEN) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ContentStack environment variables not configured',
          details: {
            apiKey: process.env.CONTENTSTACK_API_KEY ? 'Set' : 'Not set',
            deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ? 'Set' : 'Not set',
            environment: process.env.CONTENTSTACK_ENVIRONMENT || 'Not set',
            region: process.env.CONTENTSTACK_REGION || 'Not set'
          }
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('content_type');
    
    if (!contentType) {
      return NextResponse.json(
        { 
          success: false,
          error: 'content_type parameter is required',
          example: 'http://localhost:3000/api/content?content_type=blog_post'
        },
        { status: 400 }
      );
    }

    const stack = initializeStack();
    const query = stack.ContentType(contentType).Query();

    // Add query parameters
    searchParams.forEach((value, key) => {
      if (key !== 'content_type') {
        if (key === 'include[]') {
          query.includeReference(value);
        } else if (key === 'query' && value) {
          // Handle JSON query parameters
          try {
            const queryObj = JSON.parse(value);
            Object.keys(queryObj).forEach(queryKey => {
              query.where(queryKey, queryObj[queryKey]);
            });
          } catch (e) {
            console.warn('Invalid JSON query parameter:', value);
          }
        } else if (key === 'limit') {
          query.limit(parseInt(value));
        } else if (key === 'skip') {
          query.skip(parseInt(value));
        } else {
          query.addParam(key, value);
        }
      }
    });

    console.log(`Fetching ContentStack data for contentType: ${contentType}`);
    const result = await query.toJSON().find();
    
    return NextResponse.json({
      success: true,
      contentType: contentType,
      count: result[0]?.length || 0,
      data: result
    });
    
  } catch (error: any) {
    console.error('ContentStack API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch content',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'POST method not implemented. Use GET to fetch content.' 
    },
    { status: 405 }
  );
}