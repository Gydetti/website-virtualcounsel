import type { Metadata } from 'next';

import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin | Virtual Counsel',
  robots: {
    index: false,
    follow: false,
  },
};

const AdminPage = () => {
  return <AdminClient />;
};

export default AdminPage;
