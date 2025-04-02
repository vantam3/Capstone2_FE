
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileBarChart, Download, Calendar, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for user activity report
const userActivityData = [
  { name: 'Mon', logins: 120, lessonCompleted: 80, quizTaken: 45 },
  { name: 'Tue', logins: 150, lessonCompleted: 90, quizTaken: 60 },
  { name: 'Wed', logins: 180, lessonCompleted: 110, quizTaken: 70 },
  { name: 'Thu', logins: 200, lessonCompleted: 130, quizTaken: 90 },
  { name: 'Fri', logins: 250, lessonCompleted: 150, quizTaken: 100 },
  { name: 'Sat', logins: 180, lessonCompleted: 120, quizTaken: 80 },
  { name: 'Sun', logins: 120, lessonCompleted: 70, quizTaken: 50 }
];

// Mock data for content engagement report
const contentEngagementData = [
  { name: 'Business', views: 450, completions: 320, ratings: 4.2 },
  { name: 'Grammar', views: 380, completions: 260, ratings: 4.5 },
  { name: 'Conversation', views: 520, completions: 410, ratings: 4.7 },
  { name: 'Pronunciation', views: 280, completions: 190, ratings: 4.1 },
  { name: 'Vocabulary', views: 350, completions: 230, ratings: 4.3 }
];

// Mock data for user growth
const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 480 },
  { name: 'Mar', users: 550 },
  { name: 'Apr', users: 590 },
  { name: 'May', users: 620 },
  { name: 'Jun', users: 700 },
  { name: 'Jul', users: 800 },
  { name: 'Aug', users: 880 }
];

// Mock data for performance metrics
const performanceData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 70 },
  { name: 'Week 4', score: 72 },
  { name: 'Week 5', score: 75 },
  { name: 'Week 6', score: 78 },
  { name: 'Week 7', score: 82 },
  { name: 'Week 8', score: 85 }
];

const availableReports = [
  { id: 'userActivity', name: 'User Activity', icon: 'activity' },
  { id: 'contentEngagement', name: 'Content Engagement', icon: 'content' },
  { id: 'userGrowth', name: 'User Growth', icon: 'growth' },
  { id: 'performance', name: 'Learning Performance', icon: 'performance' },
  { id: 'systemUsage', name: 'System Usage', icon: 'system' }
];

const GenerateReports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('userActivity');
  const [timeRange, setTimeRange] = useState('week');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = (format: string) => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Report Generated",
        description: `${availableReports.find(r => r.id === activeTab)?.name} report has been generated in ${format.toUpperCase()} format.`
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Generate Reports</h2>
          <p className="text-slate-950">
            Create comprehensive reports on system usage and user engagement.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Select a report type to generate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-5 gap-2">
                {availableReports.map(report => (
                  <TabsTrigger 
                    key={report.id} 
                    value={report.id} 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {report.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="flex items-center justify-between space-x-4 mt-6">
                <div className="flex space-x-2 items-center">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleGenerateReport('pdf')}
                    disabled={isGenerating}
                  >
                    <FileBarChart className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button 
                    onClick={() => handleGenerateReport('csv')}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Options</CardTitle>
            <CardDescription>
              Additional report configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Include Data Points</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select data points" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Data Points</SelectItem>
                      <SelectItem value="summary">Summary Only</SelectItem>
                      <SelectItem value="detailed">Detailed Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Chart Type</label>
                  <Select defaultValue="bar">
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Grouping</label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-blue-200 bg-blue-50 text-blue-700">Daily</Button>
                  <Button variant="outline" size="sm">Weekly</Button>
                  <Button variant="outline" size="sm">Monthly</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Include in Report</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="includeCharts" className="rounded text-blue-600" defaultChecked />
                    <label htmlFor="includeCharts" className="text-sm">Charts & Graphs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="includeTables" className="rounded text-blue-600" defaultChecked />
                    <label htmlFor="includeTables" className="text-sm">Data Tables</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="includeSummary" className="rounded text-blue-600" defaultChecked />
                    <label htmlFor="includeSummary" className="text-sm">Executive Summary</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="includeRaw" className="rounded text-blue-600" />
                    <label htmlFor="includeRaw" className="text-sm">Raw Data</label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>
            Preview of the {availableReports.find(r => r.id === activeTab)?.name} report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <TabsContent value="userActivity" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" name="Logins" fill="#8884d8" />
                  <Bar dataKey="lessonCompleted" name="Lessons Completed" fill="#82ca9d" />
                  <Bar dataKey="quizTaken" name="Quizzes Taken" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="contentEngagement" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentEngagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="views" name="Views" fill="#8884d8" />
                  <Bar yAxisId="left" dataKey="completions" name="Completions" fill="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="ratings" name="Ratings (0-5)" stroke="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="userGrowth" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" name="Total Users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="performance" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" name="Average Score" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="systemUsage" className="h-full mt-0">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileBarChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">System Usage Report</h3>
                  <p className="text-gray-500 max-w-md">
                    This report provides detailed metrics on server load, response times, and resource utilization.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReports;
