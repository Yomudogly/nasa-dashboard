import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatNumber(num: number, decimals = 1): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDistance(miles: number): string {
  if (miles >= 1000000) {
    return `${formatNumber(miles / 1000000, 2)}M miles`;
  }
  if (miles >= 1000) {
    return `${formatNumber(miles / 1000, 1)}K miles`;
  }
  return `${formatNumber(miles, 0)} miles`;
}

export function formatVelocity(mph: number): string {
  return `${formatNumber(mph, 0)} mph`;
}

export function formatSize(miles: number): string {
  if (miles >= 1) {
    return `${formatNumber(miles, 2)} miles`;
  }
  return `${formatNumber(miles * 5280, 0)} feet`;
}
