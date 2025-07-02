import axios from 'axios';
import { GdpDataItem } from '../types/economicTypes';

// API base URL - points to our backend
const API_BASE_URL = '/api';  // Always use relative path for Netlify Functions

// List of ASEAN country codes and names
export const ASEAN_COUNTRIES = [
  { code: 'BRN', name: 'Brunei' },
  { code: 'KHM', name: 'Cambodia' },
  { code: 'IDN', name: 'Indonesia' },
  { code: 'LAO', name: 'Laos' },
  { code: 'MYS', name: 'Malaysia' },
  { code: 'MMR', name: 'Myanmar' },
  { code: 'PHL', name: 'Philippines' },
  { code: 'SGP', name: 'Singapore' },
  { code: 'THA', name: 'Thailand' },
  { code: 'VNM', name: 'Vietnam' },
];

/**
 * Fetches GDP per capita data for a given country from the API
 * @param countryCode ISO3 country code (e.g., 'MYS')
 * @returns {Promise<GdpDataItem[]>} Array of GDP data items
 */
export const fetchGdpPerCapita = async (countryCode: string = 'MYS'): Promise<GdpDataItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gdp-per-capita`, { params: { country: countryCode } });
    console.log('API raw response:', response.data);
    // Backend now returns already filtered and formatted data
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching GDP data:', error);
    throw error;
  }
};

export interface CreditCardUsageItem {
  year: string;
  value: number;
  unit?: string;
}

export const fetchCreditCardUsage = async (unitMeasure?: string, countryCode: string = 'MYS'): Promise<CreditCardUsageItem[]> => {
  try {
    const params: any = {};
    if (unitMeasure) params.unit_measure = unitMeasure;
    if (countryCode) params.country = countryCode;
    const response = await axios.get(`${API_BASE_URL}/credit-card-usage`, { params });
    // Backend now returns already filtered and formatted data
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching credit card usage data:', error);
    throw error;
  }
};

export interface InflationDataItem {
  year: string;
  value: number;
}

export const fetchInflation = async (countryCode: string = 'MYS'): Promise<InflationDataItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inflation`, { params: { country: countryCode } });
    // Backend now returns already filtered and formatted data
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching inflation data:', error);
    throw error;
  }
};

export interface CpiDataItem {
  year: string;
  value: number;
}

export const fetchCpi = async (countryCode: string = 'MYS'): Promise<CpiDataItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cpi`, { params: { country: countryCode } });
    // Backend now returns already filtered and formatted data
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching CPI data:', error);
    throw error;
  }
};

export interface MobileInternetBankingItem {
  year: string;
  value: number;
  unit?: string;
}

export const fetchMobileInternetBanking = async (unitMeasure?: string, countryCode: string = 'MYS'): Promise<MobileInternetBankingItem[]> => {
  try {
    const params: any = {};
    if (unitMeasure) params.unit_measure = unitMeasure;
    if (countryCode) params.country = countryCode;
    const response = await axios.get(`${API_BASE_URL}/mobile-internet-banking`, { params });
    // Backend now returns already filtered and formatted data
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching mobile & internet banking data:', error);
    throw error;
  }
};