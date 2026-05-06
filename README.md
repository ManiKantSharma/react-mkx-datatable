# react-mkx-datatable

![NPM](https://img.shields.io/badge/Author-Mani%20Kant%20Sharma-blue) ![npm](https://img.shields.io/npm/v/react-mkx-datatable?color=6366f1)
![npm](https://img.shields.io/npm/dt/react-mkx-datatable) ![NPM](https://img.shields.io/npm/l/react-mkx-datatable) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/react-mkx-datatable)

A premium, lightweight, and highly customizable Datatable component for React built with @mui/material. Features sorting, pagination, column visibility persistence, and polished loading states.

## Features

- **Zero Heavy Dependencies**: Only depends on @mui/material and react. No external icon sets.
- **Premium UI**: Modern design with subtle micro-interactions, smooth transitions, and glassmorphism elements.
- **Column Management**: Built-in menu to show/hide columns with persistent state.
- **Persistence**: Automatically saves column visibility preferences to localStorage using a tableId.
- **Smart Sorting**: Built-in sorting supporting nested object properties via dot notation.
- **Pagination**: Seamless integration with MUI Pagination, supporting both client and server modes.
- **Loading States**: Professional skeleton loading for a better user experience.
- **Permission Support**: Built-in handling for access-denied or restricted data states.
- **TypeScript**: Full type safety out of the box with generic data support.

## Installation

```bash
npm install react-mkx-datatable
# or
yarn add react-mkx-datatable
# or
pnpm add react-mkx-datatable
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Quick Start

```tsx
import { DataTable, type TableColumn } from "react-mkx-datatable";
import React from "react";

interface User {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive";
}

const columns: TableColumn<User>[] = [
  { id: "id", label: "ID", numeric: true, sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "role", label: "Role" },
  {
    id: "status",
    label: "Status",
    render: (value) => (
      <span
        style={{
          color: value === "Active" ? "#10b981" : "#ef4444",
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    ),
  },
];

const data: User[] = [
  { id: 1, name: "John Doe", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", role: "User", status: "Inactive" },
];

export default function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      tableId="user_management_table"
      pagination={true}
      filterColunm={true}
    />
  );
}
```

## API Reference

### DataTable Props

| Property       | Type                              | Default | Description                                             |
| :------------- | :-------------------------------- | :------ | :------------------------------------------------------ |
| `data`         | `T[]`                             | -       | Array of data objects to display.                       |
| `columns`      | `TableColumn<T>[]`                | -       | Configuration for table columns.                        |
| `tableId`      | `string`                          | -       | Unique ID to persist column visibility in localStorage. |
| `loading`      | `boolean`                         | `false` | Shows skeleton loader when true.                        |
| `pagination`   | `boolean`                         | `true`  | Enables pagination controls.                            |
| `sortable`     | `boolean`                         | `true`  | Enables sorting functionality globally.                 |
| `totalCount`   | `number`                          | `0`     | Total records for server-side pagination.               |
| `page`         | `number`                          | `0`     | Current page number (controlled).                       |
| `rowsPerPage`  | `number`                          | `6`     | Number of rows per page.                                |
| `onPageChange` | `(page: number) => void`          | -       | Callback when page changes.                             |
| `onRowClick`   | `(row: T, index: number) => void` | -       | Callback when a row is clicked.                         |
| `compact`      | `boolean`                         | `false` | Reduces padding for a dense view.                       |
| `filterColunm` | `boolean`                         | `true`  | Shows the column management menu.                       |
| `isPermission` | `boolean`                         | `true`  | If false, displays "Access Denied" UI.                  |
| `stickyHeader` | `boolean`                         | `false` | Enable sticky table header.                             |

### Column Configuration

```tsx
interface TableColumn<T> {
  id: string; // Supports dot notation: 'user.profile.name'
  label: string;
  numeric?: boolean;
  sortable?: boolean;
  isVisible?: boolean;
  hideable?: boolean; // Can user toggle visibility
  render?: (value: any, row: T, index: number) => React.ReactNode;
  styled?: React.CSSProperties;
  width?: string | number;
}
```

## Advanced Features

### Persistence

By providing a tableId, the component will automatically remember which columns the user has hidden or shown. This is saved in the browser's localStorage and persists across sessions.

### Permission Handling

Easily manage restricted data views using the isPermission and noAccessMessage props.

```tsx
<DataTable
  data={data}
  columns={columns}
  isPermission={userHasAccess}
  noAccessMessage="Contact admin for access to this data."
/>
```

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) |
| :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Latest                                                                                            | Latest                                                                                               | Latest                                                                                            | Latest                                                                                         | Latest                                                                                      |

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

MIT - [Mani Kant Sharma](https://www.linkedin.com/in/manikants98)

## Author

[Mani Kant Sharma](https://www.linkedin.com/in/manikants98)

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:manikants157@gmail.com)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/manikantsharmaa/)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manikants98)

## Changelog

### v1.0.0

- Initial release
- Modularized architecture
- LocalStorage persistence for column visibility
- Professional JSDoc documentation
- Zero-dependency icons and assets
