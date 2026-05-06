import { Divider, Typography } from '@mui/material';
import React from 'react';
import {
  ColumnItem,
  ColumnListContainer,
  CustomSwitch,
  MenuContent,
  MenuTitle,
  StyledMenu
} from '../styles';
import { TableColumn } from '../types';

interface ColumnFilterProps<T> {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  columns: TableColumn<T>[];
  columnVisibility: Record<string, boolean>;
  onVisibilityChange: (columnId: string, isVisible: boolean) => void;
}

/**
 * ColumnFilter component for managing column visibility
 * @template T - The type of data in the table
 */
export function ColumnFilter<T>({
  anchorEl,
  open,
  onClose,
  columns,
  columnVisibility,
  onVisibilityChange
}: ColumnFilterProps<T>) {
  const hideableColumns = columns.filter(column => column.hideable !== false);

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuContent>
        <MenuTitle variant="subtitle2">
          Show/Hide Columns
        </MenuTitle>

        <Divider />

        <ColumnListContainer>
          {hideableColumns.map(column => {
            const columnId = String(column.id);
            const isVisible = columnVisibility[columnId] !== false;
            return (
              <ColumnItem key={columnId}>
                <Typography variant="body2">{column.label}</Typography>
                <CustomSwitch
                  checked={isVisible}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    onVisibilityChange(columnId, e.target.checked);
                  }}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
              </ColumnItem>
            );
          })}
        </ColumnListContainer>
      </MenuContent>
    </StyledMenu>
  );
}
