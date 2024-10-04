'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Papa from 'papaparse';

// Define a type for the results
interface Result {
  candidate: string;
  party: string;
  votes_received: number;
  percentage: string;
}

const FinalResults = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/all_island_results.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Failed to read the response body');
        }

        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        Papa.parse<Result>(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (parsedData) => {
            setResults(parsedData.data);
          },
          error: (parseError: unknown) => {
            if (parseError instanceof Error) {
              setError(parseError.message);
            } else {
              setError('An error occurred while parsing CSV data');
            }
          },
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardCard title="2024 Presidential Election Final Results">
      {error ? (
        <Typography color="error">{`Error: ${error}`}</Typography>
      ) : (
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          <Table
            aria-label="final results table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Candidate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Party
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Votes Received
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Percentage
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                      {result.candidate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {result.party}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      {result.votes_received}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{result.percentage}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </DashboardCard>
  );
};

export default FinalResults;
