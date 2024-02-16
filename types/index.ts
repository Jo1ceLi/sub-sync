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
