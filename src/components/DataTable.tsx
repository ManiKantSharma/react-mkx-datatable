import {
  Box,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  Typography
} from '@mui/material';
import React, { useMemo, useState } from 'react';

/**
 * Components
 */
import { ColumnFilter } from './ColumnFilter';
import { SkeletonLoader } from './SkeletonLoader';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';

/**
 * Helpers & Styles
 */
import {
  ActionHeader,
  EmptyStateCell,
  FilterIconButton,
  PermissionIconBox,
  PermissionRoot,
  PermissionTextContainer,
  PermissionTitle,
  RelativeBox,
  RootContainer,
  StyledFilterList,
  StyledLockIcon,
  StyledPagination,
  StyledPaper,
  StyledTable,
  StyledTableContainer
} from '../styles';
import { getComparator } from '../utils/helpers';

/**
 * Types
 */
import { Order, TableProps } from '../types';

/**
 * Enhanced Table component with sorting, pagination, and loading states
 * Supports both client-side and server-side pagination
 * @template T - The type of data objects in the table
 * @param props - Component props
 * @returns Enhanced table JSX element
 */
export default function Table<T extends Record<string, any>>(
  props: TableProps<T>
) {
  const {
    data,
    columns,
    sortable = true,
    pagination = true,
    onRowClick,
    loading = false,
    emptyMessage = 'No data available',
    getRowId = (row: T, index: number) => (row as any).id ?? index,
    initialOrderBy,
    initialOrder = 'none',
    stickyHeader = false,
    maxHeight,
    minHeight,
    totalCount = 0,
    page = 0,
    rowsPerPage = 6,
    onPageChange,
    isPermission = true,
    noAccessMessage = 'You do not have permission to access this content',
    compact = false,
    filterColunm = true,
    id,
    tableId,
  } = props;

  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = useState<keyof T | string>(() => {
    if (initialOrderBy && initialOrder !== 'none') {
      const column = columns.find(col => col.id === initialOrderBy);
      if (column && column.sortable !== false) {
        return String(initialOrderBy);
      }
    }
    return '';
  });

  const initialColumnVisibility = useMemo(() => {
    /**
     * Try to load from localStorage if tableId is provided
     */
    if (tableId) {
      const saved = localStorage.getItem(`datatable_visibility_${tableId}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved column visibility', e);
        }
      }
    }

    const visibility: Record<string, boolean> = {};
    columns.forEach(column => {
      visibility[String(column.id)] = column.isVisible !== false;
    });
    return visibility;
    /** eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [tableId]);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialColumnVisibility);
  const [columnFilterAnchorEl, setColumnFilterAnchorEl] = useState<null | HTMLElement>(null);
  const isColumnFilterOpen = Boolean(columnFilterAnchorEl);

  const visibleColumns = useMemo(() => {
    return columns.filter(column => {
      const columnId = String(column.id);
      return columnVisibility[columnId] !== false && column.isVisible !== false;
    });
  }, [columns, columnVisibility]);

  const hideableColumns = useMemo(() => {
    return columns.filter(column => column.hideable !== false);
  }, [columns]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T | string
  ) => {
    const column = columns.find(col => String(col.id) === String(property));
    if (column?.sortable === false) {
      return;
    }

    if (orderBy !== property) {
      setOrder('asc');
      setOrderBy(String(property));
    } else {
      if (order === 'none') {
        setOrder('asc');
      } else if (order === 'asc') {
        setOrder('desc');
      } else {
        setOrder('none');
        setOrderBy('');
      }
    }
  };

  const handleClick = (
    _event: React.MouseEvent<unknown>,
    row: T,
    index: number
  ) => {
    onRowClick?.(row, index);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleColumnFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnFilterAnchorEl(event.currentTarget);
  };

  const handleColumnFilterClose = () => {
    setColumnFilterAnchorEl(null);
  };

  const handleColumnVisibilityChange = (
    columnId: string,
    isVisible: boolean
  ) => {
    setColumnVisibility(prev => {
      const next = { ...prev, [columnId]: isVisible };
      if (tableId) {
        localStorage.setItem(`datatable_visibility_${tableId}`, JSON.stringify(next));
      }
      return next;
    });
  };

  /**
   * Memoized rows after sorting and filtering
   */
  const visibleRows = useMemo(() => {
    if (!sortable || !orderBy || order === 'none') {
      return data;
    }
    return [...data].sort(getComparator(order, String(orderBy)));
  }, [data, order, orderBy, sortable]);

  const isInitialLoading = loading && data.length === 0;
  const hasNoPermission = !isPermission;

  const renderTableContent = () => {
    if (hasNoPermission) {
      return (
        <PermissionRoot>
          <PermissionIconBox>
            <StyledLockIcon />
          </PermissionIconBox>
          <PermissionTextContainer>
            <PermissionTitle variant="h6" gutterBottom>
              Access Denied
            </PermissionTitle>
            <Typography variant="body2" color="text.secondary">
              {noAccessMessage}
            </Typography>
          </PermissionTextContainer>
        </PermissionRoot>
      );
    }

    if (isInitialLoading) {
      return (
        <StyledTable
          compact={compact}
          size="small"
          stickyHeader={stickyHeader}
        >
          <TableHead
            compact={compact}
            order={order}
            orderBy={orderBy ? String(orderBy) : ''}
            onRequestSort={() => { }}
            columns={columns}
            sortable={sortable}
          />
          <MuiTableBody>
            <SkeletonLoader columns={visibleColumns} rows={6} />
          </MuiTableBody>
        </StyledTable>
      );
    }

    return (
      <StyledTable
        compact={compact}
        size="small"
        stickyHeader={stickyHeader}
      >
        <TableHead
          compact={compact}
          order={order}
          orderBy={orderBy ? String(orderBy) : ''}
          onRequestSort={handleRequestSort}
          columns={columns}
          sortable={sortable}
          columnVisibility={columnVisibility}
        />
        <MuiTableBody>
          {loading ? (
            <SkeletonLoader columns={visibleColumns} rows={rowsPerPage} />
          ) : visibleRows.length === 0 ? (
            <MuiTableRow>
              <EmptyStateCell
                colSpan={visibleColumns.length}
                align="center"
              >
                {emptyMessage}
              </EmptyStateCell>
            </MuiTableRow>
          ) : (
            visibleRows.map((row, index) => (
              <TableRow
                key={String(getRowId(row, index))}
                row={row}
                index={index}
                visibleColumns={visibleColumns}
                columns={columns}
                getRowId={getRowId}
                onClick={handleClick}
              />
            ))
          )}
        </MuiTableBody>
      </StyledTable>
    );
  };

  return (
    <RootContainer id={id}>
      <StyledPaper elevation={0}>
        {(props.actions && !Array.isArray(props.actions)) && (
          <ActionHeader filterColumn={filterColunm}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>
              {props.actions && !Array.isArray(props.actions) && props.actions}
            </Box>

            {filterColunm &&
              isPermission &&
              hideableColumns &&
              hideableColumns.length > 0 && (
                <RelativeBox>
                  <FilterIconButton onClick={handleColumnFilterClick}>
                    <StyledFilterList />
                  </FilterIconButton>
                </RelativeBox>
              )}
          </ActionHeader>
        )}
        <ColumnFilter
          anchorEl={columnFilterAnchorEl}
          open={isColumnFilterOpen}
          onClose={handleColumnFilterClose}
          columns={columns}
          columnVisibility={columnVisibility}
          onVisibilityChange={handleColumnVisibilityChange}
        />
        <StyledTableContainer $maxHeight={maxHeight} $minHeight={minHeight}>
          {renderTableContent()}
        </StyledTableContainer>
        {pagination && isPermission && (
          <StyledPagination
            rowsPerPageOptions={[]}
            component="div"
            showFirstButton
            showLastButton
            count={totalCount || visibleRows.length}
            onPageChange={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        )}
      </StyledPaper>
    </RootContainer>
  );
}

export * from '../types/index';
