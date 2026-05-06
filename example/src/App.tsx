import { DataTable, type TableColumn } from 'react-mkx-datatable';
import { Box, Chip, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

interface AssetType {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  is_active: string;
  created_by: number;
  createdate: string;
  updatedate: string | null;
  updatedby: number | null;
}

const ALL_DATA: AssetType[] = [
  { id: 10, name: 'Communication Devices', description: 'Phones, radios, and communication equipment', category: 'Technology', brand: 'CommTech', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:43:08.053Z', updatedate: null, updatedby: null },
  { id: 9, name: 'Tools & Equipment', description: 'Hand tools, power tools, and maintenance equipment', category: 'Tools', brand: 'ToolMaster', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:43:06.417Z', updatedate: null, updatedby: null },
  { id: 8, name: 'Vehicles', description: 'Company vehicles for delivery and transportation', category: 'Transportation', brand: 'AutoCorp', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:43:04.990Z', updatedate: null, updatedby: null },
  { id: 7, name: 'Furniture', description: 'Tables, chairs, desks, and office furniture', category: 'Furniture', brand: 'FurniCorp', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:43:03.140Z', updatedate: null, updatedby: null },
  { id: 6, name: 'Office Equipment', description: 'Computers, printers, and office machinery', category: 'Technology', brand: 'TechCorp', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:43:01.297Z', updatedate: null, updatedby: null },
  { id: 5, name: 'Security Equipment', description: 'CCTV cameras, alarms, and security systems', category: 'Security', brand: 'SecureVision', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:42:59.907Z', updatedate: null, updatedby: null },
  { id: 4, name: 'POS Systems', description: 'Point of sale terminals and payment systems', category: 'Technology', brand: 'PayTech', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:42:58.430Z', updatedate: null, updatedby: null },
  { id: 3, name: 'Display Units', description: 'Product display cases and merchandising units', category: 'Retail', brand: 'DisplayPro', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:42:56.730Z', updatedate: null, updatedby: null },
  { id: 2, name: 'Fridges', description: 'Refrigerators and freezing equipment', category: 'Appliances', brand: 'FreezeMaster', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:42:54.947Z', updatedate: null, updatedby: null },
  { id: 1, name: 'Coolers', description: 'Refrigeration units and cooling equipment', category: 'Appliances', brand: 'CoolTech', is_active: 'Y', created_by: 1, createdate: '2026-02-26T11:42:53.307Z', updatedate: null, updatedby: null },
];

const ROWS_PER_PAGE = 4;
const TOTAL_COUNT = ALL_DATA.length;

const columns: TableColumn<AssetType>[] = [
  { id: 'id', label: 'ID', numeric: true, width: '60px', sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'category', label: 'Category', sortable: true, render: (value) => <Chip label={value} size="small" variant="outlined" /> },
  { id: 'brand', label: 'Brand', sortable: true },
  { id: 'description', label: 'Description', hideable: true },
  {
    id: 'is_active',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <Chip
        label={value === 'Y' ? 'Active' : 'Inactive'}
        size="small"
        color={value === 'Y' ? 'success' : 'default'}
        sx={{ fontWeight: 600 }}
      />
    ),
  },
  {
    id: 'createdate',
    label: 'Created',
    sortable: true,
    hideable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const paginatedData = ALL_DATA.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      setPage(newPage);
      setLoading(false);
    }, 400);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(0);
      setLoading(false);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" color="text.primary" gutterBottom>
            Asset Type Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and manage your organization's asset type catalog.
          </Typography>
        </Box>

        <DataTable
          data={paginatedData}
          columns={columns}
          loading={loading}
          pagination={true}
          filterColunm={true}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          totalCount={TOTAL_COUNT}
          onPageChange={handlePageChange}
          tableId="demo_assets_table"
          actions={
            <Chip
              label="Refresh"
              onClick={handleRefresh}
              color="primary"
              sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
            />
          }
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
