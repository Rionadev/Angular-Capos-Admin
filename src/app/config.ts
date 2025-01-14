export interface AppConfig {
  apiUrl: string;
  featureFlag: boolean;
  private_web_address: string;
  outlet: string;
  register: string;
  sort_field: string;
  user_id: string;
  sort_order: number;
  page: number;
  size: number;
  outlet_name: string,
  outlet_email: string,
  register_name: string,
  user_name: string,
  user_email: string,
  user_ip: string,
  user_phone: string,
}
export const APP_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  featureFlag: true,
  private_web_address: 'newonestore',
  outlet: '6093edcf5435e55c2c563f65',

  outlet_name: 'Main Outlet',
  outlet_email: 'a@example.com',
  register: '60b10fc17921eb75a685629a',
  register_name: 'Main Register',
  user_id: '5fd01f4e962dd57cee567bae',
  user_name: 'A saboor',
  user_email: 'saboortanha@gmail.com',
  user_ip: `173.33.88.200`,
  user_phone: `6476242501`,
  sort_field: 'created_at',
  sort_order: -1,
  page: 0,
  size: 300,
};  
