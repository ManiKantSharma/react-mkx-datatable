import { TableRow as MuiTableRow } from '@mui/material';
import {
  SkeletonCell,
  SkeletonContent,
  SkeletonRowContainer,
  StyledSkeleton
} from '../styles';
import { SkeletonLoaderProps, TableColumn } from '../types';

/**
 * Skeleton loader component for table loading states
 * @param props - Component props
 * @returns Skeleton rows JSX elements
 */
export function SkeletonLoader({ columns, rows = 3 }: SkeletonLoaderProps) {
  const skeletonRows = Array.from({ length: rows }, (_, index) => index);

  const getSkeletonWidth = (_column: TableColumn, index: number) => {
    const widths = ['60%', '80%', '70%', '90%', '50%', '75%'];
    return widths[index % widths.length];
  };

  return (
    <>
      {skeletonRows.map((_row, rowIndex) => (
        <MuiTableRow key={`skeleton-row-${rowIndex}`}>
          {columns.map((column, colIndex) => (
            <SkeletonCell
              key={`skeleton-${rowIndex}-${String(column.id)}`}
              align={column.numeric ? 'right' : 'left'}
              padding={column.disablePadding ? 'none' : 'normal'}
            >
              <SkeletonRowContainer>
                <SkeletonContent>
                  <StyledSkeleton
                    variant="text"
                    width={getSkeletonWidth(column, colIndex)}
                    height={20}
                  />
                </SkeletonContent>
              </SkeletonRowContainer>
            </SkeletonCell>
          ))}
        </MuiTableRow>
      ))}
    </>
  );
}
