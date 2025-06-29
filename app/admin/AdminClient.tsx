'use client';

import dynamic from 'next/dynamic';

const CMS = dynamic(() => import('@/app/admin/CMS'), {
  ssr: false,
  loading: () => <p>Loading CMS...</p>,
});

const AdminClient = () => {
  return <CMS />;
};

export default AdminClient;
