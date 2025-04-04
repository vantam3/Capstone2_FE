import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, MessageSquare, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for user feedback
const mockFeedback = [{
  id: 1,
  user: 'John Doe',
  email: 'john@example.com',
  type: 'Bug Report',
  subject: 'App crashes during recording',
  status: 'Open',
  priority: 'High',
  dateSubmitted: '2023-08-15'
}, {
  id: 2,
  user: 'Jane Smith',
  email: 'jane@example.com',
  type: 'Feature Request',
  subject: 'Add more voice accents',
  status: 'Under Review',
  priority: 'Medium',
  dateSubmitted: '2023-08-10'
}, {
  id: 3,
  user: 'Robert Johnson',
  email: 'robert@example.com',
  type: 'Support Request',
  subject: 'Cannot reset password',
  status: 'Resolved',
  priority: 'High',
  dateSubmitted: '2023-08-05'
}, {
  id: 4,
  user: 'Emily Wilson',
  email: 'emily@example.com',
  type: 'Bug Report',
  subject: 'Microphone not working correctly',
  status: 'In Progress',
  priority: 'Medium',
  dateSubmitted: '2023-08-12'
}, {
  id: 5,
  user: 'Michael Brown',
  email: 'michael@example.com',
  type: 'Feedback',
  subject: 'Great app, love the features',
  status: 'Closed',
  priority: 'Low',
  dateSubmitted: '2023-08-01'
}];
const Feedback = () => {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackItems, setFeedbackItems] = useState(mockFeedback);
  const [viewingFeedback, setViewingFeedback] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const filteredFeedback = feedbackItems.filter(item => item.user.toLowerCase().includes(searchTerm.toLowerCase()) || item.subject.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleUpdateStatus = (id: number, newStatus: string) => {
    setFeedbackItems(feedbackItems.map(item => item.id === id ? {
      ...item,
      status: newStatus
    } : item));
    toast({
      title: "Status Updated",
      description: `Feedback status has been updated to ${newStatus}.`
    });
  };
  const handleSendReply = () => {
    if (!viewingFeedback || !replyText.trim()) return;
    toast({
      title: "Reply Sent",
      description: `Your reply has been sent to ${viewingFeedback.user}.`
    });

    // In a real app, we would send the reply to the user
    // For this demo, we'll just update the status to "Responded"
    handleUpdateStatus(viewingFeedback.id, "Responded");
    setReplyText('');
    setViewingFeedback(null);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">User Feedback</h2>
          <p className="text-slate-950">
            Manage and respond to user feedback, bug reports, and feature requests.
          </p>
        </div>
      </div>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-slate-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" placeholder="Search feedback..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total items received
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => item.status === 'Open').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting response
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => ['In Progress', 'Under Review'].includes(item.status)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently being addressed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => ['Resolved', 'Closed'].includes(item.status)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully addressed
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          <TabsTrigger value="features">Feature Requests</TabsTrigger>
          <TabsTrigger value="support">Support Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All User Feedback</CardTitle>
              <CardDescription>
                Manage and respond to all feedback from users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.length > 0 ? filteredFeedback.map(item => <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.user}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'Bug Report' ? 'bg-red-100 text-red-800' : item.type === 'Feature Request' ? 'bg-purple-100 text-purple-800' : item.type === 'Support Request' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {item.type}
                          </span>
                        </TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : item.status === 'In Progress' || item.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : item.status === 'Resolved' || item.status === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.priority === 'High' ? 'bg-red-100 text-red-800' : item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {item.priority}
                          </span>
                        </TableCell>
                        <TableCell>{item.dateSubmitted}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setViewingFeedback(item)}>
                                View & Reply
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, 'In Progress')}>
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, 'Resolved')}>
                                Mark as Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, 'Closed')}>
                                Close Feedback
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>) : <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No feedback found.
                      </TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bugs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bug Reports</CardTitle>
              <CardDescription>
                Issues and bugs reported by users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.filter(item => item.type === 'Bug Report').length > 0 ? filteredFeedback.filter(item => item.type === 'Bug Report').map(item => <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.user}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : item.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.priority === 'High' ? 'bg-red-100 text-red-800' : item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {item.priority}
                            </span>
                          </TableCell>
                          <TableCell>{item.dateSubmitted}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => setViewingFeedback(item)}>
                              View & Reply
                            </Button>
                          </TableCell>
                        </TableRow>) : <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No bug reports found.
                      </TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          {/* Similar table structure for feature requests */}
          <p className="text-muted-foreground text-center">Feature requests table would go here</p>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-4">
          {/* Similar table structure for support requests */}
          <p className="text-muted-foreground text-center">Support requests table would go here</p>
        </TabsContent>
      </Tabs>
      
      {/* View & Reply Dialog */}
      <Dialog open={!!viewingFeedback} onOpenChange={open => !open && setViewingFeedback(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              View and respond to user feedback.
            </DialogDescription>
          </DialogHeader>
          
          {viewingFeedback && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">From</Label>
                  <p className="font-medium">{viewingFeedback.user}</p>
                  <p className="text-sm text-muted-foreground">{viewingFeedback.email}</p>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${viewingFeedback.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : viewingFeedback.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : viewingFeedback.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {viewingFeedback.status}
                    </span>
                    
                    <Select defaultValue={viewingFeedback.status} onValueChange={value => handleUpdateStatus(viewingFeedback.id, value)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Subject</Label>
                <p className="font-medium">{viewingFeedback.subject}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Message</Label>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p>
                    {viewingFeedback.type === 'Bug Report' ? "I encountered an issue while using the app. The application crashes when I try to record my voice for practice. This happens consistently after about 30 seconds of recording. I'm using the latest version of Chrome on Windows 10." : viewingFeedback.type === 'Feature Request' ? "I really enjoy using the app, but I would love to see more voice accent options. Currently, there are mostly American and British accents, but it would be great to have Australian, Canadian, and perhaps some non-native English accents as well for more diversity in practice." : "I've been trying to reset my password but I'm not receiving the reset email. I've checked my spam folder and it's not there either. Can you please help me recover access to my account?"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea id="reply" placeholder="Type your response here..." rows={4} value={replyText} onChange={e => setReplyText(e.target.value)} />
              </div>
            </div>}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSendReply} className="bg-blue-600 hover:bg-blue-700">
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Feedback;