export interface AppConfig {
  apiUrl: string;
  featureFlag: boolean;
  private_web_address: string;
  sort_order: number;
  page: number;
  size: number;
  user_email: string,
  userinfo: any,
  outlet_id: any,
  register_id: any,
}
export const APP_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  userinfo: localStorage.getItem('user_info') || '',
  featureFlag: true,
  private_web_address: localStorage.getItem('private_web_address') || 'newonestore',
  outlet_id: localStorage.getItem('user_outlet') || '',
  register_id: localStorage.getItem('user_register') || '',

  user_email: localStorage.getItem('user_email') || 'saboortanha@gmail.com',

  sort_order: -1,
  page: 0,
  size: 300,
};  
