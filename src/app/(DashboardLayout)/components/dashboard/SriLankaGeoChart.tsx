import React, { useEffect } from 'react';
import { Select, MenuItem, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';
import $ from 'jquery';
import 'jquery-mapael';
// import '/public/js/jquery.mapael.min.js'; // Add the Mapael path
import '/public/js/maps/sri_lanka_election_districts.js';

const SriLankaGeoChart = () => {
  // select
  const [month, setMonth] = React.useState('1');
  useEffect(() => {
    // Initialize the Mapael map once the component is mounted
    $('.mapcontainer').mapael({
      map: {
        name: 'sri_lanka_election_districts',
      },
      areas: {
        'LK-11': {
          value: '2617939',
          text: { content: 'Colombo', attrs: { 'font-size': 12 } },
          tooltip: {
            content:
              '<span style="font-weight:bold;">Paris (75)</span><br />Population : 2268265',
          },
        },
        'LK-12': {
          text: { content: 'Gampaha', attrs: { 'font-size': 12 } },
          tooltip: {
            content:
              '<span style="font-weight:bold;">Paris (75)</span><br />Population : 2268265',
          },
        },
        // Add other districts
      },
    });
  }, []);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <DashboardCard title="Sales Overview">
      <div className="mapcontainer">
        <div className="map"></div>
      </div>
    </DashboardCard>
  );
};

export default SriLankaGeoChart;
