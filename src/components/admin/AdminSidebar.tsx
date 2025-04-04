import React from 'react';
import { cn } from '@/lib/utils';
import { Users, FileText, BarChart2, Settings, MessageSquare, Database, FileBarChart, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const AdminSidebar = ({
  activeTab,
  setActiveTab
}: AdminSidebarProps) => {
  const menuItems = [{
    id: 'users',
    name: 'User Management',
    icon: Users
  }, {
    id: 'content',
    name: 'Content Management',
    icon: FileText
  }, {
    id: 'analytics',
    name: 'User Analytics',
    icon: BarChart2
  }, {
    id: 'settings',
    name: 'System Settings',
    icon: Settings
  }, {
    id: 'feedback',
    name: 'User Feedback',
    icon: MessageSquare
  }, {
    id: 'maintenance',
    name: 'System Maintenance',
    icon: Database
  }, {
    id: 'reports',
    name: 'Reports',
    icon: FileBarChart
  }, {
    id: 'errors',
    name: 'Error Logs',
    icon: Bug
  }];
  return <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500-indigo-600 flex items-center justify-center bg-violet-600">
          <span className="text-lg font-bold text-slate-50">AD</span>
        </div>
        <h1 className="text-xl font-bold ml-2 text-gray-900">Speak AI Pro</h1>
      </div>
      
      <div className="space-y-1">
        {menuItems.map(item => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("flex items-center py-2 px-4 rounded-lg w-full transition-colors text-left", isActive ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100")}>
              <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-800" : "text-gray-500")} />
              <span className="font-medium">{item.name}</span>
            </button>;
      })}
      </div>
      
      <div className="absolute bottom-8 left-0 w-64 px-6">
        <div className="border-t border-gray-200 pt-4">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <span className="font-medium">Return to Main Site</span>
          </Link>
        </div>
      </div>
    </div>;
};
export default AdminSidebar;