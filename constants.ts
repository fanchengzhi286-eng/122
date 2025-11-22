import { CountryData } from './types';

// Normalized altitude calc will happen in component, this is raw data.
// GDP roughly based on 2023/2024 estimates in Billions USD.
export const GLOBAL_DATA: CountryData[] = [
  { id: 'USA', name: 'United States', lat: 37.0902, lng: -95.7129, gdp: 27360, population: '333M', region: 'North America', color: '#3B82F6' },
  { id: 'CHN', name: 'China', lat: 35.8617, lng: 104.1954, gdp: 17790, population: '1.4B', region: 'Asia', color: '#EF4444' },
  { id: 'DEU', name: 'Germany', lat: 51.1657, lng: 10.4515, gdp: 4456, population: '83M', region: 'Europe', color: '#F59E0B' },
  { id: 'JPN', name: 'Japan', lat: 36.2048, lng: 138.2529, gdp: 4212, population: '125M', region: 'Asia', color: '#EC4899' },
  { id: 'IND', name: 'India', lat: 20.5937, lng: 78.9629, gdp: 3730, population: '1.4B', region: 'Asia', color: '#F97316' },
  { id: 'GBR', name: 'United Kingdom', lat: 55.3781, lng: -3.4360, gdp: 3340, population: '67M', region: 'Europe', color: '#8B5CF6' },
  { id: 'FRA', name: 'France', lat: 46.2276, lng: 2.2137, gdp: 3030, population: '67M', region: 'Europe', color: '#6366F1' },
  { id: 'BRA', name: 'Brazil', lat: -14.2350, lng: -51.9253, gdp: 2170, population: '215M', region: 'South America', color: '#10B981' },
  { id: 'ITA', name: 'Italy', lat: 41.8719, lng: 12.5674, gdp: 2250, population: '59M', region: 'Europe', color: '#14B8A6' },
  { id: 'CAN', name: 'Canada', lat: 56.1304, lng: -106.3468, gdp: 2140, population: '38M', region: 'North America', color: '#06B6D4' },
  { id: 'RUS', name: 'Russia', lat: 61.5240, lng: 105.3188, gdp: 1990, population: '144M', region: 'Asia/Europe', color: '#DC2626' },
  { id: 'MEX', name: 'Mexico', lat: 23.6345, lng: -102.5528, gdp: 1780, population: '127M', region: 'North America', color: '#84CC16' },
  { id: 'KOR', name: 'South Korea', lat: 35.9078, lng: 127.7669, gdp: 1710, population: '51M', region: 'Asia', color: '#3B82F6' },
  { id: 'AUS', name: 'Australia', lat: -25.2744, lng: 133.7751, gdp: 1690, population: '26M', region: 'Oceania', color: '#EAB308' },
  { id: 'ESP', name: 'Spain', lat: 40.4637, lng: -3.7492, gdp: 1580, population: '47M', region: 'Europe', color: '#F43F5E' },
  { id: 'IDN', name: 'Indonesia', lat: -0.7893, lng: 113.9213, gdp: 1370, population: '275M', region: 'Asia', color: '#FB923C' },
  { id: 'TUR', name: 'Turkey', lat: 38.9637, lng: 35.2433, gdp: 1150, population: '85M', region: 'Asia/Europe', color: '#EF4444' },
  { id: 'SAU', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, gdp: 1100, population: '36M', region: 'Middle East', color: '#10B981' },
  { id: 'CHE', name: 'Switzerland', lat: 46.8182, lng: 8.2275, gdp: 885, population: '8.7M', region: 'Europe', color: '#94A3B8' },
  { id: 'NLD', name: 'Netherlands', lat: 52.1326, lng: 5.2913, gdp: 1090, population: '17M', region: 'Europe', color: '#FB923C' },
];
