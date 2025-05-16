import React, { useState } from "react";
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

// Import content components
import UserManagement from "@/components/admin/UserManagement";
import ContentManagement from "@/components/admin/ContentManagement";
import GenerateReports from "@/components/admin/GenerateReports";
import Analytics from "@/components/admin/Analytics";
import ErrorLog from "@/components/admin/ErrorLog";

// Sample data for dashboard charts
const userActivityData = [
  { name: "Mon", users: 120 },
  { name: "Tue", users: 145 },
  { name: "Wed", users: 132 },
  { name: "Thu", users: 165 },
  { name: "Fri", users: 182 },
  { name: "Sat", users: 210 },
  { name: "Sun", users: 176 },
];

const contentUsageData = [
  { category: "Business", hours: 245 },
  { category: "General", hours: 187 },
  { category: "Academic", hours: 203 },
  { category: "TOEFL", hours: 152 },
  { category: "IELTS", hours: 168 },
  { category: "Conversation", hours: 134 },
];

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Determine which component to render based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "userManagement":
        return <UserManagement />;
      case "contentManagement":
        return <ContentManagement />;
      case "reports":
        return <GenerateReports />;
      case "analytics":
        return <Analytics />;
      case "errorLog":
        return <ErrorLog />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">
                    1,234
                  </div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ 12%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Active Content
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">56</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ 5%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Total Reports
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-violet-700">28</div>
                  <p className="text-xs text-violet-500 mt-1">
                    <span className="text-green-500">↑ 15%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    User Engagement
                  </CardTitle>
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
                      <LineChart
                        data={userActivityData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Content Usage by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={contentUsageData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#8884d8" name="Hours Used" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-gray-500">John Doe</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Content updated</p>
                      <p className="text-sm text-gray-500">
                        Business English Basics
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Report generated</p>
                      <p className="text-sm text-gray-500">
                        Monthly User Activity
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">New resource added</p>
                      <p className="text-sm text-gray-500">
                        IELTS Speaking Practice Materials
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">Yesterday</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">
                        System maintenance completed
                      </p>
                      <p className="text-sm text-gray-500">
                        Server optimization
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">Yesterday</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">User role updated</p>
                      <p className="text-sm text-gray-500">
                        Emily Johnson - Promoted to Administrator
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              {activeTab === "dashboard" &&
                "Manage your platform and monitor system performance"}
              {activeTab === "userManagement" &&
                "Manage users, roles and permissions"}
              {activeTab === "contentManagement" &&
                "Manage content across the platform"}
              {activeTab === "reports" && "Generate and view system reports"}
              {activeTab === "analytics" && "Detailed analytics and insights"}
              {activeTab === "errorLog" && "Monitor and resolve system errors"}
            </p>
          </div>

          <button
            onClick={() =>
              toast({
                title: "System Status",
                description: "All systems operational",
              })
            }
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            System Status: Online
          </button>
        </div>

        <Separator className="my-6" />

        {/* Main content area - renders based on active tab */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
