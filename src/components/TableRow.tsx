import React from 'react';
import { BodyCell, BodyRow } from '../styles';
import { TableColumn } from '../types';

interface TableRowProps<T> {
  row: T;
  index: number;
  columns: TableColumn<T>[];
  visibleColumns: TableColumn<T>[];
  getRowId: (row: T, index: number) => string | number;
  onClick: (event: React.MouseEvent<unknown>, row: T, index: number) => void;
}

/**
 * TableRow component for rendering individual data rows
 * @template T - The type of data in the row
 */
export function TableRow<T extends Record<string, any>>({
  row,
  index,
  visibleColumns,
  getRowId,
  onClick
}: TableRowProps<T>) {
  const rowId = getRowId(row, index);

  return (
    <BodyRow
      hover
      onClick={event => onClick(event, row, index)}
      tabIndex={-1}
      key={String(rowId)}
    >
      {visibleColumns.map(column => (
        <BodyCell
          key={String(column.id)}
          align={column.numeric ? 'right' : 'left'}
          padding={column.disablePadding ? 'none' : 'normal'}
          customStyles={column.styled}
        >
          {column.render
            ? column.render(row[column.id], row, index)
            : String(row[column.id] || '')}
        </BodyCell>
      ))}
    </BodyRow>
  );
}
