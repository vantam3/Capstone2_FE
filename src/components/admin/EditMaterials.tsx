
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, FileText, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    title: 'Business English Basics',
    type: 'Reading',
    category: 'Business',
    level: 'Intermediate',
    dateAdded: '2023-05-12',
    content: 'This is a guide to basic business English terminology and phrases commonly used in workplace communications.'
  },
  {
    id: 2,
    title: 'Advanced Conversational Skills',
    type: 'Speaking',
    category: 'Conversation',
    level: 'Advanced',
    dateAdded: '2023-06-05',
    content: 'Practice advanced conversation skills with these dialogues and exercises designed for fluent speakers.'
  },
  {
    id: 3,
    title: 'TOEFL Preparation Guide',
    type: 'Reading',
    category: 'Exam Prep',
    level: 'Advanced',
    dateAdded: '2023-07-23',
    content: 'Comprehensive guide to prepare for the TOEFL exam, including practice questions and test-taking strategies.'
  },
  {
    id: 4,
    title: 'Basic English Grammar',
    type: 'Reading',
    category: 'Grammar',
    level: 'Beginner',
    dateAdded: '2023-04-18',
    content: 'Foundational guide to English grammar rules and structures for beginning English learners.'
  },
  {
    id: 5,
    title: 'Pronunciation Practice: Vowel Sounds',
    type: 'Speaking',
    category: 'Pronunciation',
    level: 'Beginner',
    dateAdded: '2023-03-10',
    content: 'Audio exercises focused on English vowel sounds to improve pronunciation skills.'
  }
];

const EditMaterials = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState(mockMaterials);
  const [editingMaterial, setEditingMaterial] = useState<any | null>(null);
  const [viewingMaterial, setViewingMaterial] = useState<any | null>(null);

  const handleEditMaterial = () => {
    if (!editingMaterial) return;
    
    setMaterials(materials.map(material => 
      material.id === editingMaterial.id ? editingMaterial : material
    ));
    
    toast({
      title: "Material Updated",
      description: `${editingMaterial.title} has been updated successfully.`
    });
    
    setEditingMaterial(null);
  };

  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    material.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Edit Materials</h2>
          <p className="text-slate-950">
            Update existing reading and speaking materials to improve practice resources.
          </p>
        </div>
      </div>
      
      <Dialog open={!!editingMaterial} onOpenChange={open => !open && setEditingMaterial(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
            <DialogDescription>
              Update the content and details of this learning material.
            </DialogDescription>
          </DialogHeader>
          
          {editingMaterial && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingMaterial.title} 
                  onChange={e => setEditingMaterial({...editingMaterial, title: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select 
                    value={editingMaterial.type} 
                    onValueChange={value => setEditingMaterial({...editingMaterial, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reading">Reading</SelectItem>
                      <SelectItem value="Speaking">Speaking</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingMaterial.category} 
                    onValueChange={value => setEditingMaterial({...editingMaterial, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Conversation">Conversation</SelectItem>
                      <SelectItem value="Grammar">Grammar</SelectItem>
                      <SelectItem value="Exam Prep">Exam Prep</SelectItem>
                      <SelectItem value="Pronunciation">Pronunciation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-level">Level</Label>
                  <Select 
                    value={editingMaterial.level} 
                    onValueChange={value => setEditingMaterial({...editingMaterial, level: value})}
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
                <Label htmlFor="edit-content">Content</Label>
                <Textarea 
                  id="edit-content" 
                  value={editingMaterial.content} 
                  onChange={e => setEditingMaterial({...editingMaterial, content: e.target.value})} 
                  rows={8} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-file">Replace File (Optional)</Label>
                <Input id="edit-file" type="file" />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep the current file.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditMaterial} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingMaterial} onOpenChange={open => !open && setViewingMaterial(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{viewingMaterial?.title}</DialogTitle>
            <DialogDescription>
              {viewingMaterial?.type} material for {viewingMaterial?.level} level
            </DialogDescription>
          </DialogHeader>
          
          {viewingMaterial && (
            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {viewingMaterial.category}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {viewingMaterial.level}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {viewingMaterial.type}
                </span>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-700">{viewingMaterial.content}</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>Added on: {viewingMaterial.dateAdded}</span>
                <span>ID: {viewingMaterial.id}</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button 
              onClick={() => {
                setEditingMaterial(viewingMaterial);
                setViewingMaterial(null);
              }} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
          placeholder="Search materials..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Materials</CardTitle>
          <CardDescription>
            Edit existing reading and speaking materials for students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        material.type === 'Reading' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {material.type}
                      </span>
                    </TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell>{material.level}</TableCell>
                    <TableCell>{material.dateAdded}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingMaterial(material)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setViewingMaterial(material)}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> View Usage
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No materials found.
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

export default EditMaterials;
