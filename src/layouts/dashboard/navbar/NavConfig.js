// component
import Iconify from '../../../components/Iconify';

import * as ROUTES from '../../../constants/routes';


// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const dashboard = ROUTES.ADMIN_DASHBOARD;
const parentList = ROUTES.PARENT_LIST;

const navConfig = [
  {
    title: 'dashboard',
    path: dashboard,
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: parentList,
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
