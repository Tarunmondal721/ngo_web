"use client";

import Sidebar from "@/components/sidebar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { data: session } = useSession();
  console.log("session", session);

  // Mock data for dashboard metrics and chart
  const [metrics, setMetrics] = useState({
    totalDonations: 15000,
    activeCampaigns: 5,
    volunteers: 120,
    beneficiaries: 300,
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "New donation received", amount: "$500", date: "2025-08-25" },
    { id: 2, action: "Campaign 'Clean Water' launched", date: "2025-08-24" },
    { id: 3, action: "Volunteer onboarded", name: "John Doe", date: "2025-08-23" },
  ]);

  // Chart data for donations over time
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Donations ($)",
        data: [2000, 3500, 2800, 4000, 3200, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Donations Over Time" },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">NGO Admin Dashboard</h1>
         
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
            <p className="text-2xl font-bold text-green-600">${metrics.totalDonations.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Campaigns</h3>
            <p className="text-2xl font-bold text-blue-600">{metrics.activeCampaigns}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Volunteers</h3>
            <p className="text-2xl font-bold text-purple-600">{metrics.volunteers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Beneficiaries</h3>
            <p className="text-2xl font-bold text-orange-600">{metrics.beneficiaries}</p>
          </div>
        </div>

        {/* Donation Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Donation Trends</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="text-gray-700">{activity.action}</p>
                  {activity.amount && <p className="text-sm text-green-600">{activity.amount}</p>}
                  {activity.name && <p className="text-sm text-purple-600">{activity.name}</p>}
                </div>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}