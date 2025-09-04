import Contentstack from 'contentstack';

// Helper to safely get content type query
export const getContentTypeQuery = (stack: any, contentType: string) => {
  try {
    return stack.ContentType(contentType).Query();
  } catch (error) {
    console.error(`Error creating query for contentType: ${contentType}`, error);
    throw new Error(`Invalid content type: ${contentType}`);
  }
};

// Initialize ContentStack SDK with proper typing
export const initializeStack = () => {
  let region: any = Contentstack.Region.US;
  
  const regionStr = process.env.CONTENTSTACK_REGION;
  if (regionStr) {
    const regionMap: Record<string, any> = {
      'us': Contentstack.Region.US,
      'eu': Contentstack.Region.EU,
      'azure-na': Contentstack.Region.AZURE_NA,
      'azure-eu': Contentstack.Region.AZURE_EU,
      'EU': Contentstack.Region.EU,
      'US': Contentstack.Region.US,
    };
    region = regionMap[regionStr] || Contentstack.Region.US;
  }
  
  return Contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY || '',
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT || '',
    region: region,
  });
};