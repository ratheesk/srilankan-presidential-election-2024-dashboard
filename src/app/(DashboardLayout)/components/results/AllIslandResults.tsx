// ResultsTable.tsx

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { renderProgress } from '../tables/cell-renderers/Progress';
import { renderAvatar } from '../tables/cell-renderers/Avatar';

interface AllIslandResult {
  candidate: string;
  party: string;
  votes_received: number;
  percentage: number;
}

interface AllIslandResultsProps {
  results: AllIslandResult[];
  error: string | null;
}

const AllIslandResults: React.FC<AllIslandResultsProps> = ({
  results,
  error,
}) => {
  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'avatar',
      headerName: '',
      display: 'flex',

      renderCell: renderAvatar,
      valueGetter: (value, row) =>
        row.party == null
          ? null
          : { name: row.party, src: '/symbols/' + row.party + '.png' },
      sortable: false,
      filterable: false,
    } as GridColDef<any, { src: string; name: string }>,
    { field: 'candidate', headerName: 'Candidate', flex: 1 },
    { field: 'party', headerName: 'Party', flex: 1 },
    {
      field: 'votes_received',
      headerName: 'Votes Received',
      flex: 1,
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      renderCell: renderProgress,
      flex: 1,
    },
  ];

  // Add IDs for DataGrid, assuming results come in order
  const rows = results.map((result, index) => ({
    id: index,
    ...result,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default AllIslandResults;
