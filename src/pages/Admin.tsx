// Admin.tsx (Dashboard Updated)
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart2, Activity } from "lucide-react";
import axios from "axios";
import { format, startOfWeek, endOfWeek, getISOWeek } from "date-fns";

import UserManagement from "@/components/admin/UserManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import GenerateReports from "@/components/admin/GenerateReports";
import Analytics from "@/components/admin/Analytics";
import ErrorLog from "@/components/admin/ErrorLog";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (activeTab === "dashboard") {
      axios.get("http://localhost:8000/api/admin/dashboard-summary/").then((res) => {
        setSummary(res.data);
      });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "userManagement": return <UserManagement />;
      case "contentManagement": return <ContentManagement />;
      case "reports": return <GenerateReports />;
      case "analytics": return <Analytics />;
      case "errorLog": return <ErrorLog />;
      case "dashboard":
      default:
        const now = new Date();
        const weekNum = getISOWeek(now);
        const start = startOfWeek(now, { weekStartsOn: 1 });
        const end = endOfWeek(now, { weekStartsOn: 1 });
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 italic">
                Week {weekNum} ({format(start, "MMM d")} - {format(end, "MMM d, yyyy")})
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">{summary?.total_users ?? "-"}</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ {summary?.user_growth_percent ?? 0}%</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Speaking Content</CardTitle>
                  <BookOpen className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">{summary?.total_speaking_contents ?? "-"}</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ {summary?.content_growth_percent ?? 0}%</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Practice Attempts</CardTitle>
                  <BarChart2 className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">{summary?.total_practice_attempts ?? "-"}</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ {summary?.attempt_growth_percent ?? 0}%</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                  <Activity className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">87%</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ 3%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Daily User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={summary?.daily_login_chart || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Most Practiced Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={summary?.most_practiced_content || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Attempts" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "userManagement" && "User Management"}
              {activeTab === "contentManagement" && "Content Management"}
              {activeTab === "reports" && "Reports"}
              {activeTab === "analytics" && "Analytics"}
              {activeTab === "errorLog" && "Error Logs"}
            </h1>
            <p className="text-gray-500">
              {activeTab === "dashboard" && "Manage your platform and monitor system performance"}
              {activeTab === "userManagement" && "Manage users, roles and permissions"}
              {activeTab === "contentManagement" && "Manage content across the platform"}
              {activeTab === "reports" && "Generate and view system reports"}
              {activeTab === "analytics" && "Detailed analytics and insights"}
              {activeTab === "errorLog" && "Monitor and resolve system errors"}
            </p>
          </div>

          <button
            onClick={() => toast({ title: "System Status", description: "All systems operational" })}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            System Status: Online
          </button>
        </div>

        <Separator className="my-6" />
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
