import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, FileBarChart, Calendar } from 'lucide-react';

// Mock data for reports
const userGrowthData = [{
  month: 'Jan',
  users: 410
}, {
  month: 'Feb',
  users: 530
}, {
  month: 'Mar',
  users: 620
}, {
  month: 'Apr',
  users: 800
}, {
  month: 'May',
  users: 900
}, {
  month: 'Jun',
  users: 1100
}, {
  month: 'Jul',
  users: 1300
}, {
  month: 'Aug',
  users: 1450
}];
const practiceTimeData = [{
  day: '08/14',
  minutes: 1240
}, {
  day: '08/15',
  minutes: 1380
}, {
  day: '08/16',
  minutes: 980
}, {
  day: '08/17',
  minutes: 1190
}, {
  day: '08/18',
  minutes: 1480
}, {
  day: '08/19',
  minutes: 1380
}, {
  day: '08/20',
  minutes: 1430
}];
const contentCategoryData = [{
  name: 'Business',
  value: 35,
  color: '#8884d8'
}, {
  name: 'Conversation',
  value: 25,
  color: '#83a6ed'
}, {
  name: 'Exam Prep',
  value: 20,
  color: '#8dd1e1'
}, {
  name: 'Grammar',
  value: 15,
  color: '#82ca9d'
}, {
  name: 'Vocabulary',
  value: 5,
  color: '#ffc658'
}];
const Reports = () => {
  const {
    toast
  } = useToast();
  const [timeRange, setTimeRange] = useState('last7days');
  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "The report has been exported to CSV format."
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Reports & Analytics</h2>
          <p className="text-slate-950">
            View and export comprehensive platform analytics.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport} variant="outline" className="flex items-center bg-violet-600 hover:bg-violet-500">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,487</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 12% from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,942</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 8% from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. User Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 4% from previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Metrics</TabsTrigger>
          <TabsTrigger value="content">Content Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Total registered users over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" name="Total Users" stroke="#8884d8" activeDot={{
                    r: 8
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Practice Time</CardTitle>
                <CardDescription>
                  Total practice time in minutes per day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={practiceTimeData} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" name="Practice Minutes" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Category Usage</CardTitle>
                <CardDescription>
                  Distribution of content usage by category.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={contentCategoryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {contentCategoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Summary</CardTitle>
              <CardDescription>
                Summary of important platform statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">New Users</p>
                  <p className="text-2xl font-bold">245</p>
                  <p className="text-xs text-green-600">↑ 15%</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
                  <p className="text-2xl font-bold">18.5 min</p>
                  <p className="text-xs text-green-600">↑ 3%</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Pronunciation Score</p>
                  <p className="text-2xl font-bold">78/100</p>
                  <p className="text-xs text-green-600">↑ 2%</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">API Requests</p>
                  <p className="text-2xl font-bold">134,250</p>
                  <p className="text-xs text-green-600">↑ 5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  User distribution by geographic location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">User demographics chart would go here</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>
                  Session frequency and user engagement metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">User engagement chart would go here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <p className="text-center text-muted-foreground">Content metrics tab content would go here</p>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <p className="text-center text-muted-foreground">Performance metrics tab content would go here</p>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button className="bg-violet-600 hover:bg-violet-500">
          <FileBarChart className="h-4 w-4 mr-2" />
          Generate Full Report
        </Button>
      </div>
    </div>;
};
export default Reports;