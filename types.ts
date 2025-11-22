export interface CountryData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  gdp: number; // In Billions USD
  population: string;
  region: string;
  color?: string;
  altitude?: number;
}

export interface EconomicInsight {
  summary: string;
  keyDrivers: string[];
  challenges: string[];
}

export enum ViewMode {
  GLOBE = 'GLOBE',
  LIST = 'LIST',
}
