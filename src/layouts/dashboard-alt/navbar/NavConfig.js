// routes
import * as ROUTES from '../../../constants/routes';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  {
    subheader: 'app',
    items: [
      { title: 'dashboard', path: ROUTES.PATH_ADMIN.root, icon: ICONS.dashboard },
      {
        title: 'users',
        path: ROUTES.PATH_ADMIN.users.root,
        icon: ICONS.user,
        children: [
          // { title: 'profile', path: '#' },
          // { title: 'account', path: '#' },
          { title: 'parents', path: ROUTES.PATH_ADMIN.users.parent },
          { title: 'kids', path: ROUTES.PATH_ADMIN.users.kid },
        ],
      },
      {
        title: 'wallet',
        path: ROUTES.PATH_ADMIN.wallet.root,
        icon: ICONS.banking,
        children: [
          { title: 'children', path: '#' },
        ],
      },
    ],
  },
];

export default navConfig;
