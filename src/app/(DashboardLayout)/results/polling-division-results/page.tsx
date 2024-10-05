'use client';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import PageContainer from '../../components/container/PageContainer';
import PollingDivisionResults from '../../components/results/PollingDivisionResults';

interface PollingDivisionResult {
  district: string;
  polling_division: string;
  candidate: string;
  party: string;
  votes: number;
  percentage: number;
}
const PollingDivision = () => {
  const { data: pollingDivisionResults, error: pollingDivisionError } =
    useFetchCSV<PollingDivisionResult>('/data/polling_division_results.csv');

  return (
    <PageContainer
      title="Result for Polling Divisions"
      description="Srilankan Presidential Election - 2024 - Result for Polling Divisions"
    >
      <DashboardCard title="Result for Polling Divisions">
        <PollingDivisionResults
          results={pollingDivisionResults}
          error={pollingDivisionError}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default PollingDivision;
