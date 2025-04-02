
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useToast } from '@/hooks/use-toast';

// Import existing components
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';

// Import new components for the required functionality
import ViewUsers from '@/components/admin/ViewUsers';
import ManageAccounts from '@/components/admin/ManageAccounts';
import SpeakingChallenges from '@/components/admin/SpeakingChallenges';
import UploadMaterials from '@/components/admin/UploadMaterials';
import EditMaterials from '@/components/admin/EditMaterials';
import DeleteMaterials from '@/components/admin/DeleteMaterials';
import TrackActivity from '@/components/admin/TrackActivity';
import GenerateReports from '@/components/admin/GenerateReports';
import Leaderboards from '@/components/admin/Leaderboards';

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("viewUsers");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your platform and monitor system performance</p>
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
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0 md:grid-cols-9">
            <TabsTrigger value="viewUsers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              View Users
            </TabsTrigger>
            <TabsTrigger value="manageAccounts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Manage Accounts
            </TabsTrigger>
            <TabsTrigger value="speakingChallenges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Speaking Challenges
            </TabsTrigger>
            <TabsTrigger value="uploadMaterials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Upload Materials
            </TabsTrigger>
            <TabsTrigger value="editMaterials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Edit Materials
            </TabsTrigger>
            <TabsTrigger value="deleteMaterials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Delete Materials
            </TabsTrigger>
            <TabsTrigger value="trackActivity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Track Activity
            </TabsTrigger>
            <TabsTrigger value="generateReports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reports
            </TabsTrigger>
            <TabsTrigger value="leaderboards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Leaderboards
            </TabsTrigger>
          </TabsList>
          
          {/* User Management */}
          <TabsContent value="viewUsers" className="mt-6 space-y-4">
            <ViewUsers />
          </TabsContent>
          
          <TabsContent value="manageAccounts" className="mt-6 space-y-4">
            <ManageAccounts />
          </TabsContent>
          
          {/* Speaking Challenges */}
          <TabsContent value="speakingChallenges" className="mt-6 space-y-4">
            <SpeakingChallenges />
          </TabsContent>
          
          {/* Content Management */}
          <TabsContent value="uploadMaterials" className="mt-6 space-y-4">
            <UploadMaterials />
          </TabsContent>
          
          <TabsContent value="editMaterials" className="mt-6 space-y-4">
            <EditMaterials />
          </TabsContent>
          
          <TabsContent value="deleteMaterials" className="mt-6 space-y-4">
            <DeleteMaterials />
          </TabsContent>
          
          {/* System Monitoring */}
          <TabsContent value="trackActivity" className="mt-6 space-y-4">
            <TrackActivity />
          </TabsContent>
          
          <TabsContent value="generateReports" className="mt-6 space-y-4">
            <GenerateReports />
          </TabsContent>
          
          <TabsContent value="leaderboards" className="mt-6 space-y-4">
            <Leaderboards />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
