import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Plus, FileText, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for documents
const mockDocuments = [{
  id: 1,
  title: 'Business English Basics',
  category: 'Business',
  level: 'Intermediate',
  type: 'Reading Material',
  status: 'Published',
  dateAdded: '2023-05-12'
}, {
  id: 2,
  title: 'Advanced Conversational Skills',
  category: 'Conversation',
  level: 'Advanced',
  type: 'Reading Material',
  status: 'Published',
  dateAdded: '2023-06-05'
}, {
  id: 3,
  title: 'TOEFL Preparation Guide',
  category: 'Exam Prep',
  level: 'Advanced',
  type: 'Reading Material',
  status: 'Draft',
  dateAdded: '2023-07-23'
}, {
  id: 4,
  title: 'Basic English Grammar',
  category: 'Grammar',
  level: 'Beginner',
  type: 'Reading Material',
  status: 'Published',
  dateAdded: '2023-04-18'
}];

// Mock data for voice models
const mockVoiceModels = [{
  id: 1,
  name: 'Emma - British English',
  accent: 'British',
  gender: 'Female',
  status: 'Active',
  dateAdded: '2023-05-10'
}, {
  id: 2,
  name: 'John - American English',
  accent: 'American',
  gender: 'Male',
  status: 'Active',
  dateAdded: '2023-05-10'
}, {
  id: 3,
  name: 'Sophia - Australian English',
  accent: 'Australian',
  gender: 'Female',
  status: 'Inactive',
  dateAdded: '2023-06-15'
}, {
  id: 4,
  name: 'David - Canadian English',
  accent: 'Canadian',
  gender: 'Male',
  status: 'Active',
  dateAdded: '2023-07-20'
}];
const ContentManagement = () => {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState(mockDocuments);
  const [voiceModels, setVoiceModels] = useState(mockVoiceModels);
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 'Business',
    level: 'Intermediate',
    content: '',
    status: 'Draft'
  });
  const [newVoiceModel, setNewVoiceModel] = useState({
    name: '',
    accent: 'American',
    gender: 'Female',
    status: 'Active'
  });
  const filteredDocuments = documents.filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase()) || doc.level.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredVoiceModels = voiceModels.filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()) || model.accent.toLowerCase().includes(searchTerm.toLowerCase()) || model.gender.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleAddDocument = () => {
    const id = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const newDocWithId = {
      ...newDocument,
      id,
      type: 'Reading Material',
      dateAdded: today
    };
    setDocuments([...documents, newDocWithId]);
    toast({
      title: "Document Added",
      description: `${newDocument.title} has been added successfully.`
    });

    // Reset form
    setNewDocument({
      title: '',
      category: 'Business',
      level: 'Intermediate',
      content: '',
      status: 'Draft'
    });
  };
  const handleAddVoiceModel = () => {
    const id = voiceModels.length > 0 ? Math.max(...voiceModels.map(v => v.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const newModelWithId = {
      ...newVoiceModel,
      id,
      dateAdded: today
    };
    setVoiceModels([...voiceModels, newModelWithId]);
    toast({
      title: "Voice Model Added",
      description: `${newVoiceModel.name} has been added successfully.`
    });

    // Reset form
    setNewVoiceModel({
      name: '',
      accent: 'American',
      gender: 'Female',
      status: 'Active'
    });
  };
  const handleDeleteDocument = (id: number) => {
    const docToDelete = documents.find(doc => doc.id === id);
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: `${docToDelete?.title} has been removed.`,
      variant: "destructive"
    });
  };
  const handleDeleteVoiceModel = (id: number) => {
    const modelToDelete = voiceModels.find(model => model.id === id);
    setVoiceModels(voiceModels.filter(model => model.id !== id));
    toast({
      title: "Voice Model Deleted",
      description: `${modelToDelete?.name} has been removed.`,
      variant: "destructive"
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Content Management</h2>
          <p className="text-slate-950">
            Manage reading materials and voice models for the platform.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">Reading Materials</TabsTrigger>
          <TabsTrigger value="voiceModels">Voice Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-slate-950">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-violet-600 hover:bg-violet-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Add New Reading Material</DialogTitle>
                  <DialogDescription>
                    Upload a new reading material for users to practice with.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={newDocument.title} onChange={e => setNewDocument({
                    ...newDocument,
                    title: e.target.value
                  })} placeholder="Enter document title" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newDocument.category} onValueChange={value => setNewDocument({
                      ...newDocument,
                      category: value
                    })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Conversation">Conversation</SelectItem>
                          <SelectItem value="Exam Prep">Exam Prep</SelectItem>
                          <SelectItem value="Grammar">Grammar</SelectItem>
                          <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select value={newDocument.level} onValueChange={value => setNewDocument({
                      ...newDocument,
                      level: value
                    })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" value={newDocument.content} onChange={e => setNewDocument({
                    ...newDocument,
                    content: e.target.value
                  })} placeholder="Enter document content" rows={8} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newDocument.status} onValueChange={value => setNewDocument({
                    ...newDocument,
                    status: value
                  })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddDocument} className="bg-blue-600 hover:bg-blue-700">
                    Add Document
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-2xl font-bold">{documents.length}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Reading materials available
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Published Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-500 mr-2" />
                  <div className="text-2xl font-bold">
                    {documents.filter(doc => doc.status === 'Published').length}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently available to users
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reading Materials</CardTitle>
              <CardDescription>
                Manage documents used for pronunciation practice.
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
                  {filteredDocuments.length > 0 ? filteredDocuments.map(doc => <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.level}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {doc.status}
                          </span>
                        </TableCell>
                        <TableCell>{doc.dateAdded}</TableCell>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteDocument(doc.id)}>
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {doc.status === 'Published' ? 'Unpublish' : 'Publish'}
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Usage Stats</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>) : <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No documents found.
                      </TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voiceModels" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" placeholder="Search voice models..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-violet-600 hover:bg-violet-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Voice Model
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Voice Model</DialogTitle>
                  <DialogDescription>
                    Add a new AI voice model from Microsoft Azure TTS.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="voice-name">Voice Name</Label>
                    <Input id="voice-name" value={newVoiceModel.name} onChange={e => setNewVoiceModel({
                    ...newVoiceModel,
                    name: e.target.value
                  })} placeholder="e.g., Emma - British English" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accent">Accent</Label>
                      <Select value={newVoiceModel.accent} onValueChange={value => setNewVoiceModel({
                      ...newVoiceModel,
                      accent: value
                    })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select accent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="American">American</SelectItem>
                          <SelectItem value="British">British</SelectItem>
                          <SelectItem value="Australian">Australian</SelectItem>
                          <SelectItem value="Canadian">Canadian</SelectItem>
                          <SelectItem value="Indian">Indian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={newVoiceModel.gender} onValueChange={value => setNewVoiceModel({
                      ...newVoiceModel,
                      gender: value
                    })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newVoiceModel.status} onValueChange={value => setNewVoiceModel({
                    ...newVoiceModel,
                    status: value
                  })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddVoiceModel} className="bg-blue-600 hover:bg-blue-700">
                    Add Voice Model
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Voice Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Mic className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-2xl font-bold">{voiceModels.length}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Voice models available
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Voice Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Mic className="h-5 w-5 text-green-500 mr-2" />
                  <div className="text-2xl font-bold">
                    {voiceModels.filter(model => model.status === 'Active').length}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently available to users
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Voice Models</CardTitle>
              <CardDescription>
                Manage AI voice models used for pronunciation examples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Accent</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVoiceModels.length > 0 ? filteredVoiceModels.map(model => <TableRow key={model.id}>
                        <TableCell className="font-medium">{model.name}</TableCell>
                        <TableCell>{model.accent}</TableCell>
                        <TableCell>{model.gender}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${model.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {model.status}
                          </span>
                        </TableCell>
                        <TableCell>{model.dateAdded}</TableCell>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteVoiceModel(model.id)}>
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {model.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem>Test Voice</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>) : <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No voice models found.
                      </TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default ContentManagement;