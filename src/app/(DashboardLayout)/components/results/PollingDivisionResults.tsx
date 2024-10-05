import { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Typography, Box, Autocomplete, TextField, Stack } from '@mui/material';
import { renderAvatar } from '../tables/cell-renderers/Avatar';
import { renderProgress } from '../tables/cell-renderers/Progress';

interface PollingDivisionResult {
  district: string;
  polling_division: string;
  candidate: string;
  party: string;
  votes: number;
  percentage: number;
}

interface PollingDivisionResultProps {
  results: PollingDivisionResult[];
  error: string | null;
}

const PollingDivisionResults: React.FC<PollingDivisionResultProps> = ({
  results,
  error,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedPollingDivision, setSelectedPollingDivision] = useState<
    string | null
  >(null);

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  // Get a list of unique districts for the first Autocomplete
  const districts = Array.from(
    new Set(results.map((result) => result.district))
  );

  // Filter polling divisions based on the selected district
  const pollingDivisions =
    selectedDistrict === null
      ? []
      : Array.from(
          new Set(
            results
              .filter((result) => result.district === selectedDistrict)
              .map((result) => result.polling_division)
          )
        );

  // Filter rows based on the selected district and polling division
  const filteredResults = results.filter((result) => {
    if (selectedDistrict && selectedPollingDivision) {
      return (
        result.district === selectedDistrict &&
        result.polling_division === selectedPollingDivision
      );
    } else if (selectedDistrict) {
      return result.district === selectedDistrict;
    }
    return true; // No filtering if nothing is selected
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'district', headerName: 'District', flex: 1 },
    { field: 'polling_division', headerName: 'Polling Division', flex: 1 },
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
      field: 'votes',
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
  const rows = filteredResults.map((result, index) => ({
    id: index,
    ...result,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          options={districts}
          value={selectedDistrict}
          onChange={(event, newValue) => {
            setSelectedDistrict(newValue);
            setSelectedPollingDivision(null); // Reset polling division when district changes
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select District" />
          )}
          sx={{ mb: 2, width: 300 }}
        />

        {/* Polling Division Autocomplete, enabled only after a district is selected */}
        <Autocomplete
          options={pollingDivisions}
          value={selectedPollingDivision}
          onChange={(event, newValue) => setSelectedPollingDivision(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select Polling Division" />
          )}
          sx={{ mb: 2, width: 300 }}
          disabled={!selectedDistrict} // Disable until a district is selected
        />
      </Stack>
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

export default PollingDivisionResults;
