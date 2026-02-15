export interface FormData {
  fullName: string;
  email: string;
  instagramHandle: string;
  instagramPassword: string;
  followersCount: string;
  niche: string;
  engagementRate: string;
  portfolioUrl: string;
  pitch: string;
}

export enum NicheType {
  FASHION = 'Fashion & Style',
  BEAUTY = 'Beauty & Makeup',
  TRAVEL = 'Travel & Leisure',
  FOOD = 'Food & Beverage',
  TECH = 'Technology & Gadgets',
  LIFESTYLE = 'Lifestyle',
  FITNESS = 'Health & Fitness',
  GAMING = 'Gaming',
  OTHER = 'Other'
}