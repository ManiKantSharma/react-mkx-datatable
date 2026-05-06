import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { HeaderCell, StyledSortLabel } from '../styles';
import { TableHeadProps } from '../types';
import { ArrowUpDown } from './Icons';
import { styled } from '@mui/material/styles';

const VisuallyHidden = styled('span')(() => ({ ...visuallyHidden }));

/**
 * Enhanced table header component with sorting functionality
 * @template T - The type of data in the table rows
 * @param props - Component props
 * @returns Table header JSX element
 */
export function TableHead<T>(props: TableHeadProps<T>) {
  const {
    order,
    orderBy,
    onRequestSort,
    columns,
    sortable,
    compact,
    columnVisibility,
  } = props;

  const createSortHandler =
    (property: keyof T | string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const visibleColumns = columns.filter(column => {
    const columnId = String(column.id);
    return columnVisibility
      ? columnVisibility[columnId] !== false
      : column.isVisible !== false;
  });

  return (
    <MuiTableHead>
      <MuiTableRow>
        {visibleColumns.map(column => (
          <HeaderCell
            key={String(column.id)}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            compact={compact}
            numeric={column.numeric}
            customStyles={column.styled}
            style={{ width: column.width }}
          >
            {sortable && column.sortable !== false ? (
              <StyledSortLabel
                IconComponent={ArrowUpDown}
                active={orderBy === column.id && order !== 'none'}
                direction={
                  orderBy === column.id && order !== 'none' ? order : 'asc'
                }
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id && order !== 'none' ? (
                  <VisuallyHidden>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </VisuallyHidden>
                ) : null}
              </StyledSortLabel>
            ) : (
              column.label
            )}
          </HeaderCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
}
