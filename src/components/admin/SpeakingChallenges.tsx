
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Award, Edit, Trash, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for speaking challenges
const mockChallenges = [
  {
    id: 1,
    title: 'Introduction Practice',
    level: 'Beginner',
    category: 'Conversation',
    instructions: 'Record yourself introducing yourself in English.',
    status: 'Active',
    dateAdded: '2023-05-12'
  },
  {
    id: 2,
    title: 'Job Interview Questions',
    level: 'Intermediate',
    category: 'Business',
    instructions: 'Practice answering common job interview questions.',
    status: 'Active',
    dateAdded: '2023-06-05'
  },
  {
    id: 3,
    title: 'Tongue Twisters',
    level: 'All Levels',
    category: 'Pronunciation',
    instructions: 'Practice pronouncing challenging tongue twisters.',
    status: 'Draft',
    dateAdded: '2023-07-23'
  },
  {
    id: 4,
    title: 'Daily News Report',
    level: 'Advanced',
    category: 'News',
    instructions: 'Pretend you are a news reporter and deliver a news story.',
    status: 'Active',
    dateAdded: '2023-04-18'
  }
];

const SpeakingChallenges = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [challenges, setChallenges] = useState(mockChallenges);
  const [editingChallenge, setEditingChallenge] = useState<any | null>(null);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    level: 'Beginner',
    category: 'Conversation',
    instructions: '',
    status: 'Draft'
  });

  const handleAddChallenge = () => {
    const id = challenges.length > 0 ? Math.max(...challenges.map(c => c.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const newChallengeWithId = {
      ...newChallenge,
      id,
      dateAdded: today
    };
    setChallenges([...challenges, newChallengeWithId]);
    toast({
      title: "Challenge Added",
      description: `${newChallenge.title} has been added successfully.`
    });

    // Reset form
    setNewChallenge({
      title: '',
      level: 'Beginner',
      category: 'Conversation',
      instructions: '',
      status: 'Draft'
    });
  };

  const handleEditChallenge = () => {
    if (!editingChallenge) return;
    setChallenges(challenges.map(challenge => 
      challenge.id === editingChallenge.id ? editingChallenge : challenge
    ));
    toast({
      title: "Challenge Updated",
      description: `${editingChallenge.title} has been updated successfully.`
    });
    setEditingChallenge(null);
  };

  const handleDeleteChallenge = (id: number) => {
    const challengeToDelete = challenges.find(challenge => challenge.id === id);
    setChallenges(challenges.filter(challenge => challenge.id !== id));
    toast({
      title: "Challenge Deleted",
      description: `${challengeToDelete?.title} has been removed.`,
      variant: "destructive"
    });
  };

  const handleToggleStatus = (id: number) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id) {
        const newStatus = challenge.status === 'Active' ? 'Draft' : 'Active';
        return { ...challenge, status: newStatus };
      }
      return challenge;
    }));
    
    const challenge = challenges.find(c => c.id === id);
    const newStatus = challenge?.status === 'Active' ? 'Draft' : 'Active';
    
    toast({
      title: "Status Updated",
      description: `${challenge?.title} is now ${newStatus.toLowerCase()}.`
    });
  };

  const filteredChallenges = challenges.filter(challenge => 
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    challenge.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    challenge.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Speaking Challenges</h2>
          <p className="text-slate-950">
            Create and manage speaking practice activities for students.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-500">
              Create New Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Create New Speaking Challenge</DialogTitle>
              <DialogDescription>
                Create a new speaking activity for students to practice with.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Title</Label>
                <Input 
                  id="title" 
                  value={newChallenge.title} 
                  onChange={e => setNewChallenge({...newChallenge, title: e.target.value})} 
                  placeholder="Enter challenge title" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newChallenge.category} 
                    onValueChange={value => setNewChallenge({...newChallenge, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conversation">Conversation</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Pronunciation">Pronunciation</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Storytelling">Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={newChallenge.level} 
                    onValueChange={value => setNewChallenge({...newChallenge, level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="All Levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea 
                  id="instructions" 
                  value={newChallenge.instructions} 
                  onChange={e => setNewChallenge({...newChallenge, instructions: e.target.value})} 
                  placeholder="Enter detailed instructions for the challenge" 
                  rows={5} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newChallenge.status} 
                  onValueChange={value => setNewChallenge({...newChallenge, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddChallenge} className="bg-blue-600 hover:bg-blue-700">
                Create Challenge
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editingChallenge} onOpenChange={open => !open && setEditingChallenge(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Speaking Challenge</DialogTitle>
            <DialogDescription>
              Update the speaking challenge details.
            </DialogDescription>
          </DialogHeader>
          
          {editingChallenge && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Challenge Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingChallenge.title} 
                  onChange={e => setEditingChallenge({...editingChallenge, title: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingChallenge.category} 
                    onValueChange={value => setEditingChallenge({...editingChallenge, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conversation">Conversation</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Pronunciation">Pronunciation</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Storytelling">Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-level">Level</Label>
                  <Select 
                    value={editingChallenge.level} 
                    onValueChange={value => setEditingChallenge({...editingChallenge, level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="All Levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-instructions">Instructions</Label>
                <Textarea 
                  id="edit-instructions" 
                  value={editingChallenge.instructions} 
                  onChange={e => setEditingChallenge({...editingChallenge, instructions: e.target.value})} 
                  rows={5} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editingChallenge.status} 
                  onValueChange={value => setEditingChallenge({...editingChallenge, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditChallenge} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
          placeholder="Search challenges..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Speaking Challenges</CardTitle>
          <CardDescription>
            Manage speaking practice activities for students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map(challenge => (
                  <TableRow key={challenge.id}>
                    <TableCell className="font-medium">{challenge.title}</TableCell>
                    <TableCell>{challenge.category}</TableCell>
                    <TableCell>{challenge.level}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        challenge.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {challenge.status}
                      </span>
                    </TableCell>
                    <TableCell>{challenge.dateAdded}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingChallenge(challenge)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteChallenge(challenge.id)}>
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleStatus(challenge.id)}>
                            <Award className="h-4 w-4 mr-2" /> 
                            {challenge.status === 'Active' ? 'Set to Draft' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" /> Preview
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No challenges found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakingChallenges;
