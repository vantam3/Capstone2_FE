
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from '@/components/admin/AdminSidebar';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import Analytics from '@/components/admin/Analytics';
import SystemSettings from '@/components/admin/SystemSettings';
import Feedback from '@/components/admin/Feedback';
import SystemMaintenance from '@/components/admin/SystemMaintenance';
import Reports from '@/components/admin/Reports';
import ErrorLog from '@/components/admin/ErrorLog';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your Speak AI Pro platform</p>
          </div>
          <button 
            onClick={() => toast({ 
              title: "System Status", 
              description: "All systems operational" 
            })}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            System Status: Online
          </button>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0 md:grid-cols-8">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Settings
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reports
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Errors
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6 space-y-4">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6 space-y-4">
            <ContentManagement />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6 space-y-4">
            <Analytics />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6 space-y-4">
            <SystemSettings />
          </TabsContent>
          
          <TabsContent value="feedback" className="mt-6 space-y-4">
            <Feedback />
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6 space-y-4">
            <SystemMaintenance />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6 space-y-4">
            <Reports />
          </TabsContent>
          
          <TabsContent value="errors" className="mt-6 space-y-4">
            <ErrorLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
