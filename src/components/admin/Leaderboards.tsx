
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trophy, Award, Medal, Edit, Trash, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for leaderboards
const mockLeaderboards = [
  {
    id: 1,
    title: 'Weekly Progress Champions',
    description: 'Users who completed the most lessons this week',
    type: 'progress',
    refreshFrequency: 'Weekly',
    lastUpdated: '2023-08-20',
    entries: [
      { rank: 1, userId: 101, userName: 'John Doe', score: 32, change: 'up' },
      { rank: 2, userId: 105, userName: 'Michael Brown', score: 28, change: 'same' },
      { rank: 3, userId: 102, userName: 'Jane Smith', score: 25, change: 'up' },
      { rank: 4, userId: 104, userName: 'Emily Wilson', score: 23, change: 'down' },
      { rank: 5, userId: 103, userName: 'Robert Johnson', score: 19, change: 'down' }
    ]
  },
  {
    id: 2,
    title: 'Pronunciation Masters',
    description: 'Top performers in pronunciation exercises',
    type: 'skill',
    refreshFrequency: 'Monthly',
    lastUpdated: '2023-08-15',
    entries: [
      { rank: 1, userId: 104, userName: 'Emily Wilson', score: 98, change: 'up' },
      { rank: 2, userId: 102, userName: 'Jane Smith', score: 95, change: 'up' },
      { rank: 3, userId: 107, userName: 'Sarah Lee', score: 93, change: 'same' },
      { rank: 4, userId: 105, userName: 'Michael Brown', score: 91, change: 'down' },
      { rank: 5, userId: 101, userName: 'John Doe', score: 88, change: 'down' }
    ]
  },
  {
    id: 3,
    title: 'Grammar Gurus',
    description: 'Highest scores in grammar quizzes',
    type: 'skill',
    refreshFrequency: 'Weekly',
    lastUpdated: '2023-08-21',
    entries: [
      { rank: 1, userId: 103, userName: 'Robert Johnson', score: 96, change: 'up' },
      { rank: 2, userId: 106, userName: 'David Chen', score: 94, change: 'up' },
      { rank: 3, userId: 102, userName: 'Jane Smith', score: 92, change: 'down' },
      { rank: 4, userId: 105, userName: 'Michael Brown', score: 90, change: 'same' },
      { rank: 5, userId: 104, userName: 'Emily Wilson', score: 89, change: 'down' }
    ]
  },
  {
    id: 4,
    title: 'Study Streaks',
    description: 'Users with the longest continuous learning streaks',
    type: 'engagement',
    refreshFrequency: 'Daily',
    lastUpdated: '2023-08-21',
    entries: [
      { rank: 1, userId: 102, userName: 'Jane Smith', score: 78, change: 'same' },
      { rank: 2, userId: 105, userName: 'Michael Brown', score: 65, change: 'up' },
      { rank: 3, userId: 108, userName: 'Thomas Wright', score: 52, change: 'up' },
      { rank: 4, userId: 104, userName: 'Emily Wilson', score: 45, change: 'down' },
      { rank: 5, userId: 103, userName: 'Robert Johnson', score: 41, change: 'down' }
    ]
  }
];

const Leaderboards = () => {
  const { toast } = useToast();
  const [leaderboards, setLeaderboards] = useState(mockLeaderboards);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [editingLeaderboard, setEditingLeaderboard] = useState<any | null>(null);
  const [viewingLeaderboard, setViewingLeaderboard] = useState<any | null>(null);
  const [newLeaderboard, setNewLeaderboard] = useState({
    title: '',
    description: '',
    type: 'progress',
    refreshFrequency: 'Weekly'
  });
  
  const handleUpdateLeaderboard = () => {
    if (!editingLeaderboard) return;
    
    setLeaderboards(leaderboards.map(leaderboard => 
      leaderboard.id === editingLeaderboard.id ? editingLeaderboard : leaderboard
    ));
    
    toast({
      title: "Leaderboard Updated",
      description: `${editingLeaderboard.title} has been updated successfully.`
    });
    
    setEditingLeaderboard(null);
  };

  const handleAddLeaderboard = () => {
    const id = leaderboards.length > 0 ? Math.max(...leaderboards.map(l => l.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    
    const newLeaderboardWithId = {
      ...newLeaderboard,
      id,
      lastUpdated: today,
      entries: []
    };
    
    setLeaderboards([...leaderboards, newLeaderboardWithId]);
    
    toast({
      title: "Leaderboard Created",
      description: `${newLeaderboard.title} has been created successfully.`
    });
    
    // Reset form
    setNewLeaderboard({
      title: '',
      description: '',
      type: 'progress',
      refreshFrequency: 'Weekly'
    });
  };

  const handleDeleteLeaderboard = (id: number) => {
    const leaderboardToDelete = leaderboards.find(leaderboard => leaderboard.id === id);
    
    setLeaderboards(leaderboards.filter(leaderboard => leaderboard.id !== id));
    
    toast({
      title: "Leaderboard Deleted",
      description: `${leaderboardToDelete?.title} has been removed.`,
      variant: "destructive"
    });
  };

  const handleRefreshLeaderboard = (id: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setLeaderboards(leaderboards.map(leaderboard => {
      if (leaderboard.id === id) {
        return {
          ...leaderboard,
          lastUpdated: today,
          // Simulate updated ranks by shuffling entries a bit
          entries: [...leaderboard.entries].sort(() => Math.random() - 0.5)
        };
      }
      return leaderboard;
    }));
    
    const leaderboard = leaderboards.find(l => l.id === id);
    
    toast({
      title: "Leaderboard Refreshed",
      description: `${leaderboard?.title} has been updated with the latest rankings.`
    });
  };

  const filteredLeaderboards = leaderboards.filter(leaderboard => {
    const matchesSearch = 
      leaderboard.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      leaderboard.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeTab === 'all' || leaderboard.type === activeTab;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Leaderboards</h2>
          <p className="text-slate-950">
            Monitor and update leaderboard rankings for student engagement.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-500">
              Create New Leaderboard
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Leaderboard</DialogTitle>
              <DialogDescription>
                Set up a new leaderboard to motivate and engage students.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Leaderboard Title</Label>
                <Input 
                  id="title" 
                  value={newLeaderboard.title} 
                  onChange={e => setNewLeaderboard({...newLeaderboard, title: e.target.value})} 
                  placeholder="e.g., Weekly Progress Champions" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={newLeaderboard.description} 
                  onChange={e => setNewLeaderboard({...newLeaderboard, description: e.target.value})} 
                  placeholder="Short description of what this leaderboard tracks" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Leaderboard Type</Label>
                  <select 
                    id="type" 
                    value={newLeaderboard.type} 
                    onChange={e => setNewLeaderboard({...newLeaderboard, type: e.target.value})} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="progress">Progress</option>
                    <option value="skill">Skill</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refreshFrequency">Refresh Frequency</Label>
                  <select 
                    id="refreshFrequency" 
                    value={newLeaderboard.refreshFrequency} 
                    onChange={e => setNewLeaderboard({...newLeaderboard, refreshFrequency: e.target.value})} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleAddLeaderboard} 
                disabled={!newLeaderboard.title}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Leaderboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Dialog open={!!editingLeaderboard} onOpenChange={open => !open && setEditingLeaderboard(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leaderboard</DialogTitle>
            <DialogDescription>
              Update leaderboard settings and details.
            </DialogDescription>
          </DialogHeader>
          
          {editingLeaderboard && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Leaderboard Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingLeaderboard.title} 
                  onChange={e => setEditingLeaderboard({...editingLeaderboard, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input 
                  id="edit-description" 
                  value={editingLeaderboard.description} 
                  onChange={e => setEditingLeaderboard({...editingLeaderboard, description: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Leaderboard Type</Label>
                  <select 
                    id="edit-type" 
                    value={editingLeaderboard.type} 
                    onChange={e => setEditingLeaderboard({...editingLeaderboard, type: e.target.value})} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="progress">Progress</option>
                    <option value="skill">Skill</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-refreshFrequency">Refresh Frequency</Label>
                  <select 
                    id="edit-refreshFrequency" 
                    value={editingLeaderboard.refreshFrequency} 
                    onChange={e => setEditingLeaderboard({...editingLeaderboard, refreshFrequency: e.target.value})} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleUpdateLeaderboard} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!viewingLeaderboard} onOpenChange={open => !open && setViewingLeaderboard(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
              {viewingLeaderboard?.title}
            </DialogTitle>
            <DialogDescription>
              {viewingLeaderboard?.description}
            </DialogDescription>
          </DialogHeader>
          
          {viewingLeaderboard && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>Type: <span className="font-medium">{viewingLeaderboard.type}</span></div>
                <div>Updates: <span className="font-medium">{viewingLeaderboard.refreshFrequency}</span></div>
                <div>Last Updated: <span className="font-medium">{viewingLeaderboard.lastUpdated}</span></div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="w-24 text-center">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewingLeaderboard.entries.map((entry: any) => (
                    <TableRow key={entry.rank}>
                      <TableCell className="font-medium text-center">
                        {entry.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                        {entry.rank === 2 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                        {entry.rank === 3 && <Award className="h-5 w-5 text-amber-600 mx-auto" />}
                        {entry.rank > 3 && entry.rank}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{entry.userName}</div>
                        <div className="text-sm text-gray-500">ID: {entry.userId}</div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{entry.score}</TableCell>
                      <TableCell className="text-center">
                        {entry.change === 'up' && <span className="text-green-600">▲</span>}
                        {entry.change === 'down' && <span className="text-red-600">▼</span>}
                        {entry.change === 'same' && <span className="text-gray-400">-</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button 
              onClick={() => {
                handleRefreshLeaderboard(viewingLeaderboard?.id);
                setViewingLeaderboard(null);
              }} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Rankings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <Input 
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
            placeholder="Search leaderboards..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="skill">Skill</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLeaderboards.map(leaderboard => (
          <Card key={leaderboard.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                    {leaderboard.title}
                  </CardTitle>
                  <CardDescription>{leaderboard.description}</CardDescription>
                </div>
                <div className="space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setEditingLeaderboard(leaderboard)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteLeaderboard(leaderboard.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>Type: <span className="font-medium capitalize">{leaderboard.type}</span></div>
                <div>Updates: <span className="font-medium">{leaderboard.refreshFrequency}</span></div>
                <div>Last Updated: <span className="font-medium">{leaderboard.lastUpdated}</span></div>
              </div>
              
              <div className="space-y-2">
                {leaderboard.entries.slice(0, 3).map(entry => (
                  <div key={entry.rank} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {entry.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                        {entry.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                        {entry.rank === 3 && <Award className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div className="ml-2">
                        <div className="font-medium">{entry.userName}</div>
                        <div className="text-xs text-gray-500">Score: {entry.score}</div>
                      </div>
                    </div>
                    <div>
                      {entry.change === 'up' && <span className="text-green-600">▲</span>}
                      {entry.change === 'down' && <span className="text-red-600">▼</span>}
                      {entry.change === 'same' && <span className="text-gray-400">-</span>}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={() => setViewingLeaderboard(leaderboard)}
                >
                  View Full Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;
