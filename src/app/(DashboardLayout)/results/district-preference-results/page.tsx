'use client';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import DistrictPreferenceResults from '../../components/results/DistrictPreferenceResults';
import PageContainer from '../../components/container/PageContainer';

interface DistrictPreferenceResult {
  district: string;
  candidate: string;
  party: string;
  preferences: number;
}

const DistrictPreference = () => {
  const { data: districtPreferenceResult, error: districtPreferenceError } =
    useFetchCSV<DistrictPreferenceResult>(
      '/data/district_preference_results.csv'
    );

  return (
    <PageContainer
      title="District Preference Results"
      description="Srilankan Presidential Election - 2024 District Preference Results"
    >
      <DashboardCard title="District Preference Results">
        <DistrictPreferenceResults
          results={districtPreferenceResult}
          error={districtPreferenceError}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default DistrictPreference;
