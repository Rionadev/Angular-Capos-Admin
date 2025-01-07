export interface AppConfig {
  apiUrl: string;
  featureFlag: boolean;
  private_web_address: string;
  outlet: string;
  register: string;
  sort_field: string;
  sort_order: number;
  page: number;
  size: number;
}

export const APP_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  featureFlag: true,
  private_web_address: 'newonestore',
  outlet: '6093edcf5435e55c2c563f65',
  register: '60b10fc17921eb75a685629a',
  sort_field: 'created_at',
  sort_order: -1,
  page: 0,
  size: 300,
};  