import type { ReactNode } from 'react';

/** Sort order type with three states */
export type Order = 'asc' | 'desc' | 'none';

/**
 * Configuration for a table column
 * @template T - The type of data in the table rows
 */
export interface TableColumn<T = any> {
  id: Extract<keyof T, string | number> | string;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, row: T, index: number) => ReactNode;
  styled?: any;
  isVisible?: boolean;
  /** Whether this column can be hidden/shown by the user */
  hideable?: boolean;
}

/**
 * Configuration for table actions (bulk operations)
 * @template T - The type of data in the table rows
 */
export interface TableAction<T = any> {
  label: string;
  icon?: ReactNode;
  onClick: (selectedRows: T[]) => void;
  show?: (selectedRows: T[]) => boolean;
  disabled?: (selectedRows: T[]) => boolean;
}

/**
 * Configuration for action bar items
 */
export interface ActionBarItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  show?: boolean;
}

/**
 * Props for the Enhanced Table component
 * @template T - The type of data in the table rows
 */
export interface TableProps<T = any> {
  /** Array of data to display in the table */
  data: T[];
  /** Column configuration array */
  columns: TableColumn<T>[];
  /** Optional table title */
  title?: string;
  /** Enable/disable sorting functionality */
  sortable?: boolean;
  /** Enable/disable pagination */
  pagination?: boolean;
  /** Array of bulk actions */
  actions?: TableAction<T>[] | ReactNode;
  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Loading state */
  loading?: boolean;
  /** Message to show when no data */
  emptyMessage?: string;
  /** Function to get unique ID for each row */
  getRowId?: (row: T, index: number) => string | number;
  /** Initial column to sort by */
  initialOrderBy?: keyof T;
  /** Initial sort direction */
  initialOrder?: Order;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Maximum height of the table container */
  maxHeight?: string | number;
  /** Minimum height of the table container */
  minHeight?: string | number;
  /** Total count of records (for backend pagination) */
  totalCount?: number;
  /** Current page number (controlled) */
  page?: number;
  /** Number of rows per page (controlled) */
  rowsPerPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Action bar items to display at the top */
  actionBarItems?: ActionBarItem[];
  /** Action bar title */
  actionBarTitle?: string;
  /** Permission check - if false, shows no access UI */
  isPermission?: boolean;
  /** Custom message for no access state */
  noAccessMessage?: string;
  /** Disable minimum width constraint to prevent horizontal scrolling */
  compact?: boolean;
  /** Unique identifier for this table (used for localStorage persistence) */
  tableId?: string;
  /** Whether to show the column filter button */
  filterColunm?: boolean;
  /** Optional ID for DOM targeting (e.g., for guided tours) */
  id?: string;
}

/**
 * Props for the internal TableHead component
 * @template T - The type of data in the table rows
 */
export interface TableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T | string) => void;
  order: Order;
  orderBy: string;
  columns: TableColumn<T>[];
  sortable: boolean;
  compact?: boolean;
  columnVisibility?: Record<string, boolean>;
}

/**
 * Props for the SkeletonLoader component
 */
export interface SkeletonLoaderProps {
  columns: TableColumn[];
  rows?: number;
}
