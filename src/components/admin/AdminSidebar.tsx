
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart2,
  Users, 
  FileText,
  LogOut
} from 'lucide-react';

type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({
  activeTab,
  setActiveTab
}: AdminSidebarProps) => {
  const menuItems = [
    // Dashboard
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart2,
      category: 'Main'
    },
    // User Management
    {
      id: 'userManagement',
      name: 'User Management',
      icon: Users,
      category: 'Main'
    },
    // Content Management
    {
      id: 'contentManagement',
      name: 'Content Management',
      icon: FileText,
      category: 'Main'
    },
    // Reports
    {
      id: 'reports',
      name: 'Reports',
      icon: FileText,
      category: 'Main'
    },
    // Logout (added as a new menu item)
    {
      id: 'logout',
      name: 'Logout',
      icon: LogOut,
      category: 'Main'
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

  // Handle logout function
  const handleLogout = () => {
    // Redirect to home page or trigger logout logic
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 min-h-screen p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500-indigo-600 flex items-center justify-center bg-violet-600">
          <span className="text-lg font-bold text-slate-50">AD</span>
        </div>
        <h1 className="text-xl font-bold ml-2 text-slate-100">Admin Dashboard</h1>
      </div>
      
      <div className="space-y-4">
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} className="space-y-1">
            <h3 className="text-sm font-medium text-slate-400 px-4 mb-2">{category}</h3>
            {items.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button 
                  key={item.id} 
                  onClick={() => item.id === 'logout' ? handleLogout() : setActiveTab(item.id)} 
                  className={cn(
                    "flex items-center py-2 px-4 rounded-lg w-full transition-colors text-left", 
                    isActive ? "bg-violet-900 text-violet-100" : "text-slate-300 hover:bg-slate-800"
                  )}
                >
                  <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-violet-200" : "text-slate-400")} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
