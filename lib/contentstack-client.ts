// import Contentstack from 'contentstack';

// // Simple ContentStack client initialization without region enum issues
// export const createContentstackClient = () => {
//   // Create config object without explicit typing
//   const config: any = {
//     api_key: process.env.CONTENTSTACK_API_KEY || '',
//     delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
//     environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
//   };
  
//   // Only add region if it's provided and valid
//   const region = process.env.CONTENTSTACK_REGION;
//   if (region && ['us', 'eu', 'azure-na', 'azure-eu'].includes(region.toLowerCase())) {
//     config.region = region.toLowerCase();
//   }
  
//   return Contentstack.Stack(config);
// };