import { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box, Autocomplete, TextField } from '@mui/material';
import { renderAvatar } from '../tables/cell-renderers/Avatar';

interface DistrictPostalVoteResult {
  district: string;
  candidate: string;
  party: string;
  votes_received: number;
}

interface DistrictPostalVoteResultProps {
  results: DistrictPostalVoteResult[];
  error: string | null;
}

const DistrictPostalVoteResults: React.FC<DistrictPostalVoteResultProps> = ({
  results,
  error,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  // Get a list of unique districts for the Autocomplete
  const districts = Array.from(
    new Set(results.map((result) => result.district))
  );

  // Filter rows based on the selected district
  const filteredResults = selectedDistrict
    ? results.filter((result) => result.district === selectedDistrict)
    : results;

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
  ];

  // Add IDs for DataGrid, assuming results come in order
  const rows = filteredResults.map((result, index) => ({
    id: index,
    ...result,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        options={districts}
        value={selectedDistrict}
        onChange={(event, newValue) => setSelectedDistrict(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Select District" />
        )}
        sx={{ mb: 2, width: 300 }}
      />

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

export default DistrictPostalVoteResults;
