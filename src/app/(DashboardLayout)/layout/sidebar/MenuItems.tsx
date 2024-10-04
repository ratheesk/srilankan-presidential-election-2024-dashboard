import { IconLayoutDashboard, IconTrophy } from '@tabler/icons-react';

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
];

export default Menuitems;
