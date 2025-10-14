// src/app/(dashboard)/layout.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import AdminSidebar from "@/components/AdminSidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-[#e5e5e5] text-[#3c4858] font-['Roboto',Helvetica,Arial,sans-serif]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        <div className="bg-white rounded-xl shadow-md p-8 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
