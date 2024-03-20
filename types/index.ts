export interface Card {
  id: string;
  alias: string;
  funding: string;
  network: string;
  last_four: string;
  expiry: string;
  rank: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  interval: number;
  currency: string;
}

export interface Pricing {
  price: number;
  session_count: number;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  pricing: Pricing[];
}

export interface Customer {
  client_id: string;
  name: string;
  note: string | null;
  email: string | null;
  phone: string | null;
  picture: string;
  joined_at: string;
  subscription_status: string | null;
  subscription_renewal_date: string | null;
  subscription_plan_id: string | null;
  plan_name: string | null;
}

export type SubscriptionCardInfo = {
  subscription_status: string;
  subscription_renewal_date: string;
  subscription_plan_id: string;
  plan_name: string;
};

export interface ClientSubscription {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  uid: string;
  email: string;
  picture: string;
  phone: string;
  client_id: string;
  org_id: string;
  note: string | null;
  phone_2: string | null;
  joined_at: string;
  subscription_status: string;
  subscription_renewal_date: string;
  subscription_plan_id: string;
  plan_name: string;
}

export interface Org {
  id: string;
  name: string;
  description: string;
  app_id: string;
  app_key: string;
  partner_key: string;
  non_3D_mid: string;
  mid_with_3D: string;
}

export interface Subscription {
  subscription_status: string | null;
  subscription_renewal_date: string | null;
  subscription_plan_id: string | null;
  plan_name: string | null;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  client_id: string;
  client_name: string;
  client_note: string | null;
  client_phone: string | null;
  created_at: string;
  rec_trade_id: string;
}
