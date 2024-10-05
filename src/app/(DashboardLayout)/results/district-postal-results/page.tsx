'use client';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import PageContainer from '../../components/container/PageContainer';
import DistrictPostalVoteResults from '../../components/results/DistrictPostalVoteResults';

interface DistrictPostalVoteResult {
  district: string;
  candidate: string;
  party: string;
  votes_received: number;
}

const PostalVoting = () => {
  const { data: DistrictPostalVoteResult, error: districtPreferenceError } =
    useFetchCSV<DistrictPostalVoteResult>('/data/postal_votes_results.csv');

  return (
    <PageContainer
      title="District Postal Voting Results"
      description="Srilankan Presidential Election - 2024 District Postal Voting Results"
    >
      <DashboardCard title="District Postal Voting Results">
        <DistrictPostalVoteResults
          results={DistrictPostalVoteResult}
          error={districtPreferenceError}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default PostalVoting;
