import React, { useState } from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend} from 'recharts';
import {Download, FileBarChart, Calendar, ArrowUpRight, Filter} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { reportsService } from "@/lib/api/services/reportsService";

const Reports = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('last7days');
  const [reportFormat, setReportFormat] = useState('pdf');

  const { data: userGrowthData = [], isLoading: loadingUserGrowth } = useQuery({
    queryKey: ['reports', 'user-growth'],
    queryFn: reportsService.getUserGrowth,
  });
  const { data: practiceTimeData = [], isLoading: loadingPracticeTime } = useQuery({
    queryKey: ['reports', 'practice-time'],
    queryFn: reportsService.getPracticeTime,
  });
  const { data: contentCategoryData = [], isLoading: loadingContentCategory } = useQuery({
    queryKey: ['reports', 'content-category'],
    queryFn: reportsService.getContentCategory,
  });
  const { data: bookRatingData = [], isLoading: loadingBookRating } = useQuery({
    queryKey: ['reports', 'book-rating'],
    queryFn: reportsService.getBookRating,
  });
  const { data: userEngagementData = [], isLoading: loadingUserEngagement } = useQuery({
    queryKey: ['reports', 'user-engagement'],
    queryFn: reportsService.getUserEngagement,
  });
  const { data: userDemographicData = [], isLoading: loadingUserDemographic } = useQuery({
    queryKey: ['reports', 'user-demographic'],
    queryFn: reportsService.getUserDemographic,
  });

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: `The report has been exported to ${reportFormat.toUpperCase()} format.`
    });
  };

  const handleGenerateFullReport = () => {
    toast({
      title: "Full Report Generated",
      description: "The comprehensive analytics report is being prepared and will be available shortly."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Reports & Analytics</h2>
          <p className="text-slate-950">
            View and export comprehensive platform analytics.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={reportFormat} onValueChange={setReportFormat}>
            <SelectTrigger className="w-[120px]">
              <FileBarChart className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport} className="flex items-center bg-violet-600 hover:bg-violet-500">
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
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% from previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Book Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,910</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>8% from previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>4% from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Metrics</TabsTrigger>
          <TabsTrigger value="books">Book Ratings</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
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
                {loadingUserGrowth ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={userGrowthData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        name="Total Users" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Time</CardTitle>
                <CardDescription>
                  Total reading time in minutes per day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loadingPracticeTime ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={practiceTimeData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="minutes" name="Reading Minutes" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Book Category Usage</CardTitle>
                <CardDescription>
                  Distribution of book usage by category.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loadingContentCategory ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={contentCategoryData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value" 
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {contentCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
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
                  <p className="text-sm text-muted-foreground">Avg. Book Rating</p>
                  <p className="text-2xl font-bold">4.2/5</p>
                  <p className="text-xs text-green-600">↑ 2%</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Books</p>
                  <p className="text-2xl font-bold">2,845</p>
                  <p className="text-xs text-green-600">↑ 5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  User distribution by geographic location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loadingUserDemographic ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={userDemographicData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value" 
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {userDemographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>
                  User engagement distribution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loadingUserEngagement ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={userEngagementData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value" 
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {userEngagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Activity Timeline</CardTitle>
                <CardDescription>
                  Daily active users over the selected period.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={[
                      { date: 'Mon', users: 350 },
                      { date: 'Tue', users: 420 },
                      { date: 'Wed', users: 380 },
                      { date: 'Thu', users: 450 },
                      { date: 'Fri', users: 520 },
                      { date: 'Sat', users: 580 },
                      { date: 'Sun', users: 480 }
                    ]} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      name="Active Users" 
                      stroke="#2196F3" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="books" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Ratings Distribution</CardTitle>
                <CardDescription>
                  Breakdown of book ratings by star rating.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loadingBookRating ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={bookRatingData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value" 
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookRatingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Books</CardTitle>
                <CardDescription>
                  Books with the highest user ratings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      layout="vertical"
                      data={[
                        { title: "The Great Gatsby", rating: 4.8 },
                        { title: "To Kill a Mockingbird", rating: 4.7 },
                        { title: "1984", rating: 4.6 },
                        { title: "Pride and Prejudice", rating: 4.5 },
                        { title: "The Catcher in the Rye", rating: 4.4 }
                      ]} 
                      margin={{ top: 20, right: 30, left: 130, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="title" type="category" />
                      <Tooltip />
                      <Bar dataKey="rating" name="Average Rating" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Book Rating Trends</CardTitle>
              <CardDescription>
                Average book ratings over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={[
                      { month: 'Jan', rating: 4.1 },
                      { month: 'Feb', rating: 4.2 },
                      { month: 'Mar', rating: 4.0 },
                      { month: 'Apr', rating: 4.3 },
                      { month: 'May', rating: 4.2 },
                      { month: 'Jun', rating: 4.4 },
                      { month: 'Jul', rating: 4.5 },
                      { month: 'Aug', rating: 4.3 }
                    ]} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      name="Average Rating" 
                      stroke="#FF9800" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Duration</CardTitle>
                <CardDescription>
                  Average time users spend per session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { day: 'Mon', minutes: 17.5 },
                        { day: 'Tue', minutes: 18.2 },
                        { day: 'Wed', minutes: 16.8 },
                        { day: 'Thu', minutes: 19.1 },
                        { day: 'Fri', minutes: 20.3 },
                        { day: 'Sat', minutes: 22.5 },
                        { day: 'Sun', minutes: 21.2 }
                      ]} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" name="Minutes" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>
                  Percentage of returning users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={[
                        { week: 'Week 1', retention: 100 },
                        { week: 'Week 2', retention: 82 },
                        { week: 'Week 3', retention: 75 },
                        { week: 'Week 4', retention: 70 },
                        { week: 'Week 5', retention: 68 },
                        { week: 'Week 6', retention: 65 },
                        { week: 'Week 7', retention: 62 },
                        { week: 'Week 8', retention: 60 }
                      ]} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        name="Retention %" 
                        stroke="#3F51B5" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Interaction Rates</CardTitle>
              <CardDescription>
                User interaction rates by feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { feature: 'Book Reading', rate: 92 },
                      { feature: 'Ratings', rate: 78 },
                      { feature: 'Reviews', rate: 65 },
                      { feature: 'Bookmarking', rate: 54 },
                      { feature: 'Sharing', rate: 42 },
                      { feature: 'Discussion', rate: 38 }
                    ]} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" name="Interaction Rate %" fill="#673AB7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Custom Date Range
        </Button>
        <Button onClick={handleGenerateFullReport} className="flex items-center bg-violet-600 hover:bg-violet-500">
          <FileBarChart className="h-4 w-4 mr-2" />
          Generate Full Report
        </Button>
      </div>
    </div>
  );
};

export default Reports;