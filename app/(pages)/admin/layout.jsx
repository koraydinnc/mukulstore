import AdminLayoutClient from "./AdminLayoutClient";



export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}
