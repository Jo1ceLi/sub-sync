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
