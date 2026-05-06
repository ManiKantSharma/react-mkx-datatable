import {
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TablePagination as MuiTablePagination,
  TableRow as MuiTableRow,
  TableSortLabel as MuiTableSortLabel,
  Paper,
  Skeleton,
  Switch,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FilterList, Lock } from '../components/Icons';

/**
 * Custom switch component with specific styling
 */
export const CustomSwitch = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '200ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1D4ED8',
        opacity: 1,
        border: 'none',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#1D4ED8',
      border: '3px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#F3F4F6',
      ...theme.applyStyles('dark', {
        color: '#4B5563',
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    transition: theme.transitions.create(['border-color', 'transform'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    backgroundColor: '#DBEAFE',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: 200,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#1E3A8A',
    }),
  },
}));

/**
 * Styled Paper component for table container
 */
export const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '100%',
}));

/**
 * Styled MUI Table component
 */
export const StyledTable = styled(MuiTable, {
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact?: boolean }>(({ compact }) => ({
  minWidth: compact ? 0 : 750,
}));

/**
 * Styled table header cell
 */
export const HeaderCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'compact' && prop !== 'numeric' && prop !== 'customStyles',
})<{ compact?: boolean; numeric?: boolean; customStyles?: any }>(({ theme, compact, numeric, customStyles }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: 'rgba(239, 246, 255, 1)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  color: theme.palette.text.primary,
  padding: '16px',
  paddingLeft: '6px',
  paddingRight: '6px',
  fontSize: '0.875rem',
  ...(compact && {
    paddingTop: '12px',
    paddingBottom: '12px',
    fontSize: '0.75rem',
  }),
  ...(numeric && {
    justifyContent: 'flex-end',
  }),
  ...customStyles,
}));

/**
 * Styled table sort label
 */
export const StyledSortLabel = styled(MuiTableSortLabel)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiTableSortLabel-icon': {
    color: `${theme.palette.text.secondary} !important`,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    '& .MuiTableSortLabel-icon': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
  '&.Mui-active': {
    color: theme.palette.primary.main,
    '& .MuiTableSortLabel-icon': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));

/**
 * Styled table body row
 */
export const BodyRow = styled(MuiTableRow)(({ theme }) => ({
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 * Styled table body cell
 */
export const BodyCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'customStyles',
})<{ customStyles?: any }>(({ theme, customStyles }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  padding: '6px',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  fontSize: '0.875rem',
  ...customStyles,
}));

/**
 * Styled cell for skeleton loader
 */
export const SkeletonCell = styled(MuiTableCell)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.grey[100],
  height: 50,
}));

/**
 * Container for skeleton row content
 */
export const SkeletonRowContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

export const SkeletonContent = styled(Box)(() => ({
  flex: 1,
}));

/**
 * Styled Skeleton component
 */
export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '4px',
}));

/**
 * Root container for permission denied state
 */
export const PermissionRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const PermissionIconBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.error.light,
  opacity: 0.2,
}));

/**
 * Styled lock icon for permission state
 */
export const StyledLockIcon = styled(Lock)(({ theme }) => ({
  width: 48,
  height: 48,
  color: theme.palette.error.main,
}));

/**
 * Header container for actions above the table
 */
export const ActionHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'filterColumn',
})<{ filterColumn?: boolean }>(({ theme, filterColumn }) => ({
  padding: theme.spacing(1.5),
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: filterColumn ? 'space-between' : 'flex-start',
  alignItems: 'flex-start',
}));

/**
 * IconButton specifically styled for filters
 */
export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(33, 150, 243, 0.1)',
  width: 38,
  height: 38,
  borderRadius: theme.shape.borderRadius,
  marginTop: '1px',
  '&:hover': {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
  },
}));

/**
 * Styled filter list icon
 */
export const StyledFilterList = styled(FilterList)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

/**
 * Styled table pagination component
 */
export const StyledPagination = styled(MuiTablePagination)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  '& .MuiTablePagination-toolbar': {
    color: theme.palette.text.primary,
  },
  '& .MuiTablePagination-selectIcon': {
    color: theme.palette.text.secondary,
  },
})) as typeof MuiTablePagination;

/**
 * Content container for menus
 */
export const MenuContent = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
  },
}));

/**
 * Styled cell for empty state message
 */
export const EmptyStateCell = styled(BodyCell)(({ theme }) => ({
  border: 'none',
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

/**
 * Styled Menu component with custom paper styling
 */
export const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
    overflowY: 'auto',
    position: 'relative',
    maxWidth: 288,
    '& .MuiMenu-list': {
      padding: 0,
    },
  },
}));

export const PermissionTextContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: theme.breakpoints.values.md,
}));

export const RelativeBox = styled(Box)(() => ({
  position: 'relative',
}));

export const ColumnListContainer = styled(List)(({ theme }) => ({
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(0.5),
  },
}));

export const ColumnItem = styled(ListItem)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 2,
  paddingBottom: 2,
}));

export const StyledTableContainer = styled(MuiTableContainer, {
  shouldForwardProp: (prop) => prop !== '$maxHeight' && prop !== '$minHeight',
})<{ $maxHeight?: string | number; $minHeight?: string | number }>(({ $maxHeight, $minHeight }) => ({
  ...($maxHeight !== undefined && { maxHeight: $maxHeight }),
  ...($minHeight !== undefined && { minHeight: $minHeight }),
}));

/**
 * Top level container for the entire datatable component
 */
export const RootContainer = styled(Box)(() => ({
  width: '100%',
}));

export const PermissionTitle = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const MenuTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  padding: theme.spacing(1),
}));

