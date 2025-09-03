"use client";

import { SessionProvider, useSession } from "next-auth/react";
import SidebarPage from "@/components/sidebar";
import { redirect } from "next/navigation";
import { LoadingProvider } from "@/context/LoadingContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminContent>{children}</AdminContent>
    </SessionProvider>
  );
}

export function AdminContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64 bg-gray-200 animate-pulse p-4 fixed h-screen">
          {/* Sidebar skeleton */}
          <div className="h-10 w-40 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>

        <main className="flex-1 bg-gray-50 p-6 ml-0 md:ml-64">
          <div className="h-16 bg-gray-200 animate-pulse mb-6"></div>
          <div className="space-y-6">
            <div className="h-10 w-1/3 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-64 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-40 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!session && status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarPage />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 pt-20 md:ml-64 transition-all duration-300">
          {/* <LoadingProvider> */}
            {children}
          {/* </LoadingProvider> */}
        </main>
      </div>
    </div>
  );
}