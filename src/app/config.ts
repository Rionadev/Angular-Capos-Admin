export interface AppConfig {
    apiUrl: string;
    featureFlag: boolean;
    private_web_address: string;
  }
  
export const APP_CONFIG: AppConfig = {
    apiUrl: 'http://localhost:3000/api',
    featureFlag: true,
    private_web_address: 'onestore',
};