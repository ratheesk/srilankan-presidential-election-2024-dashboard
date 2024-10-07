import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import $ from 'jquery';
import 'jquery-mapael';
import '/public/js/maps/sri_lanka_election_districts.js';
import { useFetchCSV } from '@/hooks/useFetchCSV';
import { districtMap } from '@/utils/districtMap';

interface DistrictPostalVoteResult {
  district: string;
  candidate: string;
  party: string;
  votes_received: number;
}

const SriLankaGeoChart = () => {
  const { data: districtPostalVoteResults } =
    useFetchCSV<DistrictPostalVoteResult>('/data/postal_votes_results.csv');

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  useEffect(() => {
    if (districtPostalVoteResults) {
      const districtData: Record<string, any> = {};

      // Map CSV data to Mapael area configurations
      districtPostalVoteResults.forEach((result) => {
        const districtId = getDistrictIdFromName(result.district);

        // Build district data with hover effect and color change
        districtData[districtId] = {
          value: result.votes_received,
          text: {
            content: result.district,
            attrs: {
              'font-size': 9,
              cursor: 'pointer',
              fill: '#000',
              position: 'inner',
            },
          },
          attrs: {
            fill: '#f4f4e8',
            stroke: '#000',
          },
          attrsHover: {
            fill: '#3482cc',
            cursor: 'pointer',
          },
          tooltip: {
            content: `<span style="color: ${primary};"><strong>${result.district}</strong></span><br>Votes Received: ${result.votes_received}`,
          },
        };
      });

      // Initialize the Mapael map with hover effects
      $('.mapcontainer').mapael({
        map: {
          name: 'sri_lanka_election_districts',
        },
        areas: districtData, // Apply the dynamic district data
      });

      // Add hover effects for growing animation
      $('.mapcontainer')
        .on('mouseenter', '.map area', function () {
          $(this).css('transform', 'scale(1.1)');
        })
        .on('mouseleave', '.map area', function () {
          $(this).css('transform', 'scale(1)');
        });
    }
  }, [districtPostalVoteResults, primary, secondary]);

  // Helper function to map district names to their ID in the mapael map
  const getDistrictIdFromName = (districtName: string): string => {
    return districtMap[districtName] || ''; // Fallback if no match
  };

  return (
    <DashboardCard title="District Postal Vote Results">
      <div className="mapcontainer">
        <div
          className="map"
          style={{
            position: 'relative',
            backgroundColor: '#cbf0f5',
            borderRadius: '15px',
            padding: '15px',
          }}
        ></div>
      </div>
    </DashboardCard>
  );
};

export default SriLankaGeoChart;
