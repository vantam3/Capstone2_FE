
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BarChart2, Clock, User, Activity, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for user activity
const mockUserActivities = [
  {
    id: 1,
    userId: 101,
    userName: 'John Doe',
    action: 'Login',
    timestamp: '2023-08-21 14:30:12',
    details: 'Mobile device, iOS 15.2',
    ipAddress: '192.168.1.1'
  },
  {
    id: 2,
    userId: 102,
    userName: 'Jane Smith',
    action: 'Completed Lesson',
    timestamp: '2023-08-21 14:28:45',
    details: 'Business English Basics - Lesson 3',
    ipAddress: '192.168.1.2'
  },
  {
    id: 3,
    userId: 103,
    userName: 'Robert Johnson',
    action: 'Submitted Practice',
    timestamp: '2023-08-21 14:15:30',
    details: 'Speaking Challenge: Introduction Practice',
    ipAddress: '192.168.1.3'
  },
  {
    id: 4,
    userId: 101,
    userName: 'John Doe',
    action: 'Started Quiz',
    timestamp: '2023-08-21 14:05:22',
    details: 'Grammar Quiz: Past Tense',
    ipAddress: '192.168.1.1'
  },
  {
    id: 5,
    userId: 104,
    userName: 'Emily Wilson',
    action: 'Downloaded Material',
    timestamp: '2023-08-21 13:58:15',
    details: 'TOEFL Preparation Guide',
    ipAddress: '192.168.1.4'
  },
  {
    id: 6,
    userId: 105,
    userName: 'Michael Brown',
    action: 'Profile Update',
    timestamp: '2023-08-21 13:45:10',
    details: 'Updated profile picture and bio',
    ipAddress: '192.168.1.5'
  },
  {
    id: 7,
    userId: 102,
    userName: 'Jane Smith',
    action: 'Logout',
    timestamp: '2023-08-21 13:30:05',
    details: 'Session duration: 1h 24m',
    ipAddress: '192.168.1.2'
  }
];

// Mock data for system activity
const mockSystemActivities = [
  {
    id: 1,
    type: 'Error',
    component: 'User Authentication',
    timestamp: '2023-08-21 14:20:12',
    details: 'Failed login attempt: rate limit exceeded',
    severity: 'High'
  },
  {
    id: 2,
    type: 'Warning',
    component: 'Database',
    timestamp: '2023-08-21 14:10:45',
    details: 'High query load detected',
    severity: 'Medium'
  },
  {
    id: 3,
    type: 'Info',
    component: 'Content Delivery',
    timestamp: '2023-08-21 13:55:30',
    details: 'New content package deployed',
    severity: 'Low'
  },
  {
    id: 4,
    type: 'Error',
    component: 'File Storage',
    timestamp: '2023-08-21 13:40:22',
    details: 'Failed to upload file: storage quota exceeded',
    severity: 'Medium'
  },
  {
    id: 5,
    type: 'Info',
    component: 'User Management',
    timestamp: '2023-08-21 13:25:15',
    details: 'Bulk user import completed',
    severity: 'Low'
  }
];

const TrackActivity = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUser, setActiveUser] = useState<string>('');
  const [activeTab, setActiveTab] = useState('user');
  const [dateFilter, setDateFilter] = useState('today');
  const [detailedActivity, setDetailedActivity] = useState<any | null>(null);

  const filteredUserActivities = mockUserActivities.filter(activity => {
    const matchesSearch = 
      activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = activeUser ? activity.userName === activeUser : true;
    
    return matchesSearch && matchesUser;
  });

  const filteredSystemActivities = mockSystemActivities.filter(activity =>
    activity.component.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueUsers = Array.from(new Set(mockUserActivities.map(activity => activity.userName)));

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: `Activity data has been exported to CSV format.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Track User Activity</h2>
          <p className="text-slate-950">
            Monitor user interactions and system performance.
          </p>
        </div>
        
        <Button 
          onClick={handleExportData} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Export Activity Data
        </Button>
      </div>
      
      <Dialog open={!!detailedActivity} onOpenChange={open => !open && setDetailedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>
              Detailed information about this activity
            </DialogDescription>
          </DialogHeader>
          
          {detailedActivity && (
            <div className="space-y-4 py-4">
              {activeTab === 'user' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">User</p>
                      <p className="font-medium">{detailedActivity.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p>{detailedActivity.userId}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Action</p>
                    <p className="font-medium">{detailedActivity.action}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Details</p>
                    <p>{detailedActivity.details}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Timestamp</p>
                      <p>{detailedActivity.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">IP Address</p>
                      <p>{detailedActivity.ipAddress}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="font-medium">{detailedActivity.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Severity</p>
                      <p className={`font-medium ${
                        detailedActivity.severity === 'High' 
                          ? 'text-red-600' 
                          : detailedActivity.severity === 'Medium' 
                            ? 'text-yellow-600' 
                            : 'text-green-600'
                      }`}>{detailedActivity.severity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Component</p>
                    <p className="font-medium">{detailedActivity.component}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Details</p>
                    <p>{detailedActivity.details}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Timestamp</p>
                    <p>{detailedActivity.timestamp}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">18</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently online users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">142</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sessions today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              <div className="text-2xl font-bold">24m</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average session duration
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">98%</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              System uptime and performance
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <Input 
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
            placeholder="Search activities..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="flex space-x-4">
          <Select value={activeUser} onValueChange={setActiveUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Users</SelectItem>
              {uniqueUsers.map(user => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="user">User Activity</TabsTrigger>
          <TabsTrigger value="system">System Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Log</CardTitle>
              <CardDescription>
                Track user interactions with the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUserActivities.length > 0 ? (
                    filteredUserActivities.map(activity => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.action === 'Login' || activity.action === 'Logout' 
                              ? 'bg-blue-100 text-blue-800' 
                              : activity.action.includes('Completed') 
                                ? 'bg-green-100 text-green-800' 
                                : activity.action.includes('Started') 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-purple-100 text-purple-800'
                          }`}>
                            {activity.action}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{activity.details}</TableCell>
                        <TableCell>{activity.timestamp.split(' ')[1]}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setDetailedActivity(activity)}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No activities found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>
                Monitor system performance and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSystemActivities.length > 0 ? (
                    filteredSystemActivities.map(activity => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.type === 'Error' 
                              ? 'bg-red-100 text-red-800' 
                              : activity.type === 'Warning' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {activity.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{activity.component}</TableCell>
                        <TableCell className="max-w-xs truncate">{activity.details}</TableCell>
                        <TableCell>{activity.timestamp.split(' ')[1]}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.severity === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : activity.severity === 'Medium' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {activity.severity}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setDetailedActivity(activity)}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No activities found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackActivity;
