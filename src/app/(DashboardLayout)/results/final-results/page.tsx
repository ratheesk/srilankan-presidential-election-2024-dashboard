'use client';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import AllIslandResults from '../../components/results/AllIslandResults';
import AllIslandFinalResults from '../../components/results/AllIslandFinalResult';

interface AllIslandResult {
  candidate: string;
  party: string;
  votes_received: number;
  percentage: number;
}

interface AllIslandFinalResult {
  candidate: string;
  party: string;
  votes_received: number;
  preferences: number;
}

const FinalResults = () => {
  const { data: allIslandResults, error: allIslandResultsError } =
    useFetchCSV<AllIslandResult>('/data/all_island_results.csv');

  const { data: allIslandFinalResults, error: allIslandFinalResultsError } =
    useFetchCSV<AllIslandFinalResult>('/data/all_island_final_result.csv');

  return (
    <>
      <DashboardCard title="All Island Final Results">
        <AllIslandFinalResults
          results={allIslandFinalResults}
          error={allIslandFinalResultsError}
        />
      </DashboardCard>
      <DashboardCard title="All Island Results">
        <AllIslandResults
          results={allIslandResults}
          error={allIslandResultsError}
        />
      </DashboardCard>
    </>
  );
};

export default FinalResults;
