// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const getLocalStore = localStorage.getItem('userFormToken');
const authorities = getLocalStore && JSON.parse(getLocalStore).authorities[0].authority;

const navConfig = [
  {
    title: 'Thống Kê',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Hóa Đơn',
    path: '/dashboard/bills',
    icon: icon('ic_hoaDon'),
  },
  {
    title: 'Bán Hàng',
    path: '/dashboard/sales',
    icon: icon('ic_banHang'),
  },
  {
    title: 'Quản Lý Sản Phẩm',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Giảm Giá',
    path: '/dashboard/discounts',
    icon: icon('ic_blog'),
  },
  {
    title: 'Coupons',
    path: '/dashboard/coupons',
    icon: icon('ic_blog2'),
  },
  {
    title: 'Khách Hàng',
    path: '/dashboard/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'Địa Chỉ',
    path: '/dashboard/address',
    icon: icon('ic_user2'),
  },
  {
    title: 'Nhân Viên',
    path: '/dashboard/staff',
    icon: icon('ic_user3'),
  },
].filter((item) => {
  if (authorities === 'ROLE_ADMIN') {
    return true; // Hiển thị tất cả cho ROLE_ADMIN
  }
  if (authorities === 'ROLE_STAFF') {
    // Ẩn phần tử 'Nhân Viên' cho ROLE_STAFF
    return item.title !== 'Nhân Viên';
  }
  return false; // Trường hợp còn lại không trả về gì cả
});

export default navConfig;
