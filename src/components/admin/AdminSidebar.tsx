
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  UserCog, 
  FileText, 
  Upload, 
  Edit, 
  Trash, 
  BarChart2, 
  LineChart, 
  Award, 
  Settings 
} from 'lucide-react';
import { Link } from 'react-router-dom';

type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({
  activeTab,
  setActiveTab
}: AdminSidebarProps) => {
  const menuItems = [
    // User Management
    {
      id: 'viewUsers',
      name: 'View Users',
      icon: Users,
      category: 'User Management'
    },
    {
      id: 'manageAccounts',
      name: 'Manage Accounts',
      icon: UserCog,
      category: 'User Management'
    },
    // Speaking Challenges
    {
      id: 'speakingChallenges',
      name: 'Speaking Challenges',
      icon: Award,
      category: 'Speaking Challenges'
    },
    // Content Management
    {
      id: 'uploadMaterials',
      name: 'Upload Materials',
      icon: Upload,
      category: 'Content Management'
    },
    {
      id: 'editMaterials',
      name: 'Edit Materials',
      icon: Edit,
      category: 'Content Management'
    },
    {
      id: 'deleteMaterials',
      name: 'Delete Materials',
      icon: Trash,
      category: 'Content Management'
    },
    // System Monitoring
    {
      id: 'trackActivity',
      name: 'Track User Activity',
      icon: BarChart2,
      category: 'System Monitoring'
    },
    {
      id: 'generateReports',
      name: 'Generate Reports',
      icon: FileText,
      category: 'System Monitoring'
    },
    {
      id: 'leaderboards',
      name: 'Leaderboards',
      icon: LineChart,
      category: 'System Monitoring'
    }
  ];

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500-indigo-600 flex items-center justify-center bg-violet-600">
          <span className="text-lg font-bold text-slate-50">AD</span>
        </div>
        <h1 className="text-xl font-bold ml-2 text-gray-900">Admin Dashboard</h1>
      </div>
      
      <div className="space-y-4">
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 px-4 mb-2">{category}</h3>
            {items.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)} 
                  className={cn(
                    "flex items-center py-2 px-4 rounded-lg w-full transition-colors text-left", 
                    isActive ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-blue-800" : "text-gray-500")} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="border-t border-gray-200 pt-4">
          <Link 
            to="/" 
            className="flex items-center py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">Return to Main Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
