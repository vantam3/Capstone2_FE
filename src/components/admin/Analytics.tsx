import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for user analytics
const userActivityData = [{
  name: 'Jan',
  active: 400,
  new: 240
}, {
  name: 'Feb',
  active: 300,
  new: 138
}, {
  name: 'Mar',
  active: 200,
  new: 980
}, {
  name: 'Apr',
  active: 278,
  new: 390
}, {
  name: 'May',
  active: 189,
  new: 480
}, {
  name: 'Jun',
  active: 239,
  new: 380
}, {
  name: 'Jul',
  active: 349,
  new: 430
}];
const practiceSessionsData = [{
  name: 'Mon',
  sessions: 120
}, {
  name: 'Tue',
  sessions: 140
}, {
  name: 'Wed',
  sessions: 170
}, {
  name: 'Thu',
  sessions: 90
}, {
  name: 'Fri',
  sessions: 180
}, {
  name: 'Sat',
  sessions: 210
}, {
  name: 'Sun',
  sessions: 160
}];
const contentUsageData = [{
  name: 'Business',
  value: 400,
  color: '#8884d8'
}, {
  name: 'Conversation',
  value: 300,
  color: '#83a6ed'
}, {
  name: 'Exam Prep',
  value: 300,
  color: '#8dd1e1'
}, {
  name: 'Grammar',
  value: 200,
  color: '#82ca9d'
}, {
  name: 'Vocabulary',
  value: 100,
  color: '#ffc658'
}];
const topPerformingUsers = [{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  practiceTime: '45h 20m',
  sessions: 124,
  avgScore: 92
}, {
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
  practiceTime: '38h 15m',
  sessions: 106,
  avgScore: 89
}, {
  id: 3,
  name: 'Robert Johnson',
  email: 'robert@example.com',
  practiceTime: '32h 40m',
  sessions: 98,
  avgScore: 87
}, {
  id: 4,
  name: 'Emily Wilson',
  email: 'emily@example.com',
  practiceTime: '30h 10m',
  sessions: 94,
  avgScore: 85
}, {
  id: 5,
  name: 'Michael Brown',
  email: 'michael@example.com',
  practiceTime: '28h 55m',
  sessions: 87,
  avgScore: 84
}];
const commonErrorsData = [{
  id: 1,
  errorType: 'Consonant Sounds',
  count: 1245,
  percentage: 32,
  examples: 'th, r, l sounds'
}, {
  id: 2,
  errorType: 'Vowel Sounds',
  count: 987,
  percentage: 25,
  examples: 'a, e, i sounds'
}, {
  id: 3,
  errorType: 'Word Stress',
  count: 756,
  percentage: 19,
  examples: 'emphasis on wrong syllables'
}, {
  id: 4,
  errorType: 'Intonation',
  count: 542,
  percentage: 14,
  examples: 'rising/falling tones'
}, {
  id: 5,
  errorType: 'Connected Speech',
  count: 398,
  percentage: 10,
  examples: 'linking words together'
}];
const Analytics = () => {
  return <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">User Analytics</h2>
        <p className="text-slate-950">
          Insights into user behavior, performance, and engagement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Practice Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,567</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Practice Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5 min</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Pronunciation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Platform Usage</TabsTrigger>
          <TabsTrigger value="performance">User Performance</TabsTrigger>
          <TabsTrigger value="content">Content Usage</TabsTrigger>
          <TabsTrigger value="errors">Common Errors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Active users and new sign-ups over the past 7 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="active" name="Active Users" fill="#8884d8" />
                    <Bar dataKey="new" name="New Users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Practice Sessions</CardTitle>
              <CardDescription>
                Number of practice sessions per day over the past week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={practiceSessionsData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#8884d8" activeDot={{
                    r: 8
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Users</CardTitle>
              <CardDescription>
                Users with the highest engagement and performance scores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Practice Time</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Avg. Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformingUsers.map(user => <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.practiceTime}</TableCell>
                      <TableCell>{user.sessions}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.avgScore >= 90 ? 'bg-green-100 text-green-800' : user.avgScore >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {user.avgScore}%
                        </span>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
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
                    <Pie data={contentUsageData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                    name,
                    percent
                  }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {contentUsageData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Pronunciation Errors</CardTitle>
              <CardDescription>
                Most frequent pronunciation challenges faced by users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Examples</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commonErrorsData.map(error => <TableRow key={error.id}>
                      <TableCell className="font-medium">{error.errorType}</TableCell>
                      <TableCell>{error.count}</TableCell>
                      <TableCell>{error.percentage}%</TableCell>
                      <TableCell>{error.examples}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Analytics;