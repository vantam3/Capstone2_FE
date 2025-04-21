
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileBarChart, Download, Calendar, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import { generateReportsService } from '@/lib/api/services/generateReportsService';

const availableReports = [{
  id: 'userActivity',
  name: 'User Activity',
  icon: 'activity'
}, {
  id: 'contentEngagement',
  name: 'Content Engagement',
  icon: 'content'
}, {
  id: 'userGrowth',
  name: 'User Growth',
  icon: 'growth'
}, {
  id: 'performance',
  name: 'Learning Performance',
  icon: 'performance'
}, {
  id: 'systemUsage',
  name: 'System Usage',
  icon: 'system'
}];

type ReportFormValues = {
  reportType: string;
  timeRange: string;
  dataPoints: string;
  chartType: string;
  includeCharts: boolean;
  includeTables: boolean;
  includeSummary: boolean;
  includeRaw: boolean;
  reportName: string;
};

const GenerateReports = () => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('userActivity');
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: userActivityData, isLoading: loadingUserActivity, error: errorUserActivity } = useQuery({
    queryKey: ['reports', 'user-activity'],
    queryFn: generateReportsService.getUserActivity,
  });
  const { data: contentEngagementData, isLoading: loadingContentEngagement, error: errorContentEngagement } = useQuery({
    queryKey: ['reports', 'content-engagement'],
    queryFn: generateReportsService.getContentEngagement,
  });
  const { data: userGrowthData, isLoading: loadingUserGrowth, error: errorUserGrowth } = useQuery({
    queryKey: ['reports', 'user-growth'],
    queryFn: generateReportsService.getUserGrowth,
  });
  const { data: performanceData, isLoading: loadingPerformance, error: errorPerformance } = useQuery({
    queryKey: ['reports', 'performance'],
    queryFn: generateReportsService.getPerformance,
  });

  const form = useForm<ReportFormValues>({
    defaultValues: {
      reportType: 'userActivity',
      timeRange: 'week',
      dataPoints: 'all',
      chartType: 'bar',
      includeCharts: true,
      includeTables: true,
      includeSummary: true,
      includeRaw: false,
      reportName: ''
    }
  });
  const handleGenerateReport = (format: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: `${availableReports.find(r => r.id === activeTab)?.name} report has been generated in ${format.toUpperCase()} format.`
      });
    }, 1500);
  };
  const onSubmit = (data: ReportFormValues) => {
    console.log('Report configuration:', data);
    handleGenerateReport('pdf');
  };

  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Generate Reports</h2>
          <p className="text-slate-950">
            Create comprehensive reports on system usage and user engagement.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100">
            <CardTitle className="text-slate-800">Available Reports</CardTitle>
            <CardDescription className="text-slate-600">
              Select a report type to generate
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="reportType" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Report Type</FormLabel>
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {availableReports.map(report => <Button key={report.id} type="button" variant={field.value === report.id ? "default" : "outline"} className={field.value === report.id ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 text-slate-700 hover:border-purple-300"} onClick={() => {
                    field.onChange(report.id);
                    setActiveTab(report.id);
                  }}>
                            {report.name}
                          </Button>)}
                      </div>
                    </FormItem>} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="timeRange" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Time Range</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                              <SelectValue placeholder="Select time range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-950 border-slate-700">
                            <SelectItem value="day">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>} />
                  
                  <FormField control={form.control} name="reportName" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Report Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter report name" className="border-slate-700 bg-slate-950 text-white" {...field} />
                        </FormControl>
                      </FormItem>} />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" className="border-slate-200" onClick={() => form.reset()}>
                    Reset
                  </Button>
                  <Button type="submit" disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
                    {isGenerating ? <>
                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </> : <>
                        <FileBarChart className="h-4 w-4 mr-2" />
                        Generate Report
                      </>}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100">
            <CardTitle className="text-slate-800">Report Options</CardTitle>
            <CardDescription className="text-slate-600">
              Additional report configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="dataPoints" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Include Data Points</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                              <SelectValue placeholder="Select data points" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-950 border-slate-700">
                            <SelectItem value="all">All Data Points</SelectItem>
                            <SelectItem value="summary">Summary Only</SelectItem>
                            <SelectItem value="detailed">Detailed Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>} />
                  
                  <FormField control={form.control} name="chartType" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Chart Type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                              <SelectValue placeholder="Select chart type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-950 border-slate-700">
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>} />
                </div>
                
                <div className="space-y-3">
                  <FormLabel className="text-slate-700 font-medium">Data Grouping</FormLabel>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-purple-200 bg-purple-50 text-purple-700">Daily</Button>
                    <Button variant="outline" size="sm" className="border-slate-200">Weekly</Button>
                    <Button variant="outline" size="sm" className="border-slate-200">Monthly</Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <FormLabel className="text-slate-700 font-medium">Include in Report</FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="includeCharts" render={({
                    field
                  }) => <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input type="checkbox" id="includeCharts" className="rounded text-purple-600 border-slate-300" checked={field.value} onChange={field.onChange} />
                          </FormControl>
                          <label htmlFor="includeCharts" className="text-sm text-slate-700">Charts & Graphs</label>
                        </FormItem>} />
                    
                    <FormField control={form.control} name="includeTables" render={({
                    field
                  }) => <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input type="checkbox" id="includeTables" className="rounded text-purple-600 border-slate-300" checked={field.value} onChange={field.onChange} />
                          </FormControl>
                          <label htmlFor="includeTables" className="text-sm text-slate-700">Data Tables</label>
                        </FormItem>} />
                    
                    <FormField control={form.control} name="includeSummary" render={({
                    field
                  }) => <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input type="checkbox" id="includeSummary" className="rounded text-purple-600 border-slate-300" checked={field.value} onChange={field.onChange} />
                          </FormControl>
                          <label htmlFor="includeSummary" className="text-sm text-slate-700">Executive Summary</label>
                        </FormItem>} />
                    
                    <FormField control={form.control} name="includeRaw" render={({
                    field
                  }) => <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input type="checkbox" id="includeRaw" className="rounded text-purple-600 border-slate-300" checked={field.value} onChange={field.onChange} />
                          </FormControl>
                          <label htmlFor="includeRaw" className="text-sm text-slate-700">Raw Data</label>
                        </FormItem>} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button type="button" variant="outline" onClick={() => handleGenerateReport('pdf')} disabled={isGenerating} className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <FileBarChart className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button type="button" onClick={() => handleGenerateReport('csv')} disabled={isGenerating} className="bg-violet-600 hover:bg-violet-500">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-purple-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100">
          <CardTitle className="text-slate-800">Report Preview</CardTitle>
          <CardDescription className="text-slate-600">
            Preview of the {availableReports.find(r => r.id === activeTab)?.name} report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="hidden">
                <TabsTrigger value="userActivity">User Activity</TabsTrigger>
                <TabsTrigger value="contentEngagement">Content Engagement</TabsTrigger>
                <TabsTrigger value="userGrowth">User Growth</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="systemUsage">System Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="userActivity" className="h-full mt-0">
                {loadingUserActivity ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : errorUserActivity ? (
                  <div className="flex items-center justify-center h-full text-red-600">Failed to load data.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userActivityData || []} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="logins" name="Logins" fill="#9b87f5" />
                      <Bar dataKey="lessonCompleted" name="Lessons Completed" fill="#7E69AB" />
                      <Bar dataKey="quizTaken" name="Quizzes Taken" fill="#6E59A5" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              
              <TabsContent value="contentEngagement" className="h-full mt-0">
                {loadingContentEngagement ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : errorContentEngagement ? (
                  <div className="flex items-center justify-center h-full text-red-600">Failed to load data.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contentEngagementData || []} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#9b87f5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#7E69AB" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="views" name="Views" fill="#9b87f5" />
                      <Bar yAxisId="left" dataKey="completions" name="Completions" fill="#7E69AB" />
                      <Line yAxisId="right" type="monotone" dataKey="ratings" name="Ratings (0-5)" stroke="#6E59A5" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              
              <TabsContent value="userGrowth" className="h-full mt-0">
                {loadingUserGrowth ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : errorUserGrowth ? (
                  <div className="flex items-center justify-center h-full text-red-600">Failed to load data.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData || []} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" name="Total Users" stroke="#9b87f5" activeDot={{
                      r: 8
                    }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              
              <TabsContent value="performance" className="h-full mt-0">
                {loadingPerformance ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : errorPerformance ? (
                  <div className="flex items-center justify-center h-full text-red-600">Failed to load data.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData || []} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" name="Average Score" stroke="#7E69AB" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              
              <TabsContent value="systemUsage" className="h-full mt-0">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileBarChart className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">System Usage Report</h3>
                    <p className="text-gray-500 max-w-md">
                      This report provides detailed metrics on server load, response times, and resource utilization.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default GenerateReports;
