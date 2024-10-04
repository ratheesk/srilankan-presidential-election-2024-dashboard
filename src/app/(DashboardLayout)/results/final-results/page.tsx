'use client';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import ResultsTable from '../../components/results/ResultsTable';

interface Result {
  candidate: string;
  party: string;
  votes_received: number;
  percentage: number;
}

const FinalResults = () => {
  const { data: results, error } = useFetchCSV<Result>(
    '/data/all_island_results.csv'
  );

  return (
    <DashboardCard title="2024 Presidential Election Final Results">
      <ResultsTable results={results} error={error} />
    </DashboardCard>
  );
};

export default FinalResults;
