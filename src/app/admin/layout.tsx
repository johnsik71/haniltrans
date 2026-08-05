import AdminAuth from '@/components/admin/AdminAuth';

export const metadata = {
  title: '관리자 페이지 | 한일트랜스샵',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      {children}
    </AdminAuth>
  );
}
