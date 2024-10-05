import {
  IconChartHistogram,
  IconLayoutDashboard,
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
];

export default Menuitems;
