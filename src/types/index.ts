export interface User {
  id: string;
}
export interface Pet {
  name: string;
  id: string;
}
export interface Feeding {
  created: string;
  feedingType: string;
  foodType: string;
  updated: string;
  weight: number;
  _id: string;
}

export interface FeedingByDateObject {
  date: string;
  feedings: Feeding[];
}
