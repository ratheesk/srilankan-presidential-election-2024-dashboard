// ResultsTable.tsx

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { renderAvatar } from '../tables/cell-renderers/Avatar';

interface DistrictPreferenceResult {
  district: string;
  candidate: string;
  party: string;
  preferences: number;
}

interface DistrictPreferenceResultProps {
  results: DistrictPreferenceResult[];
  error: string | null;
}

const DistrictPreferenceResults: React.FC<DistrictPreferenceResultProps> = ({
  results,
  error,
}) => {
  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'district', headerName: 'District', flex: 1 },
    {
      field: 'avatar',
      headerName: '',
      display: 'flex',

      renderCell: renderAvatar,
      valueGetter: (value, row) =>
        row.party == null
          ? null
          : { name: row.party, src: '/imgs/symbols/' + row.party + '.png' },
      sortable: false,
      filterable: false,
    } as GridColDef<any, { src: string; name: string }>,
    { field: 'candidate', headerName: 'Candidate', flex: 1 },
    { field: 'party', headerName: 'Party', flex: 1 },
    {
      field: 'preferences',
      headerName: 'Preferences',
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
        unstable_rowSpanning={true}
      />
    </Box>
  );
};

export default DistrictPreferenceResults;
