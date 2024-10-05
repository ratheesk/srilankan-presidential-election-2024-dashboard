import {
  IconChartHistogram,
  IconLayoutDashboard,
  IconMailForward,
  IconTrophy,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    navlabel: true,
    subheader: 'Results',
  },

  {
    id: uniqueId(),
    title: 'Final Results',
    icon: IconTrophy,
    href: '/results/final-results',
  },
  {
    id: uniqueId(),
    title: 'District Preferences',
    icon: IconChartHistogram,
    href: '/results/district-preference-results',
  },
  {
    id: uniqueId(),
    title: 'Postal Voting',
    icon: IconMailForward,
    href: '/results/district-postal-results',
  },
  {
    id: uniqueId(),
    title: 'Polling Divisions',
    icon: IconMailForward,
    href: '/results/polling-division-results',
  },
];

export default Menuitems;
