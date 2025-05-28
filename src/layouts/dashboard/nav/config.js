// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // Dashboard removed
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon="eva:pie-chart-2-fill" width={22} height={22} />,
  },
  // User/settings removed
  {
    title: 'settings',
    path: '/',
    icon: <Iconify icon="eva:settings-2-fill" width={22} height={22} />,
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'log out',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
