import Contentstack from 'contentstack';

// Helper to safely get the Region value
export const getContentstackRegion = (): any => {
  const regionStr = process.env.CONTENTSTACK_REGION;
  
  if (!regionStr) return Contentstack.Region.US;
  
  // Convert string to appropriate Region enum value
  const regionMap: Record<string, any> = {
    'us': Contentstack.Region.US,
    'eu': Contentstack.Region.EU,
    'EU': Contentstack.Region.EU,
    'US': Contentstack.Region.US,
    'azure-na': Contentstack.Region.AZURE_NA,
    'azure-eu': Contentstack.Region.AZURE_EU,
  };
  
  const normalizedRegion = regionStr.toLowerCase();
  return regionMap[normalizedRegion] || Contentstack.Region.US;
};