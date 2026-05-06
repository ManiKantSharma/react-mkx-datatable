import { Order } from '../types';

/**
 * Get nested property value from object using dot notation
 * @param obj - The object to get property from
 * @param path - The property path (e.g., 'customer.name')
 * @returns The property value
 */
export function getNestedValue(obj: any, path: string): any {
  if (!path) return '';
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj);
}

/**
 * Comparator function for descending sort
 * @template T - The type of objects being compared
 * @param a - First object to compare
 * @param b - Second object to compare
 * @param orderBy - Property to compare by
 * @returns Comparison result
 */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T | string) {
  const aValue = getNestedValue(a, String(orderBy));
  const bValue = getNestedValue(b, String(orderBy));

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

/**
 * Get comparator function based on sort order
 * @template Key - The key type for comparison
 * @param order - Sort order ('asc' or 'desc')
 * @param orderBy - Property to sort by
 * @returns Comparator function
 */
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  if (order === 'none') {
    return () => 0;
  }
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
