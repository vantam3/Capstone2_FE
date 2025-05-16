// Cập nhật ContentManagement: sửa lại nút Edit giống logic trong quản lý người dùng
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = 'http://127.0.0.1:8000';

const ContentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 'Business',
    level: 'Intermediate',
    content: '',
    status: 'Draft'
  });
  const GENRE_MAP = {
  1: "Introductions",
  2: "Job Interview",
  3: "Travel",
  4: "Friendship",
  5: "Everyday Life",
  9: "Misc",
  10: "Updates"
};

const LEVEL_MAP = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced"
};


  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_BASE}/speaking-texts/`);
      const data = await res.json();
      const transformed = data.map(item => ({
        id: item.id,
        title: item.title,
        genre: item.genre,
        level: item.level,
        content: item.content,
        status: item.status || 'Draft',
        dateAdded: item.created_at?.split("T")[0] || ''
      }));
      setDocuments(transformed);
    } catch (err) {
      console.error("[❌ Failed to fetch documents]", err);
    }
  };

  const handleSubmitDocument = async () => {
    try {
      const payload = {
        title: newDocument.title,
        genre: newDocument.category,
        level: newDocument.level,
        content: newDocument.content,
        status: newDocument.status
      };
      const url = editingDoc ? `${API_BASE}/api/update/${editingDoc.id}/` : `${API_BASE}/api/add/`;
      const method = editingDoc ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast({ title: editingDoc ? 'Document Updated' : 'Document Added' });
        setNewDocument({ title: '', category: 'Business', level: 'Intermediate', content: '', status: 'Draft' });
        setEditingDoc(null);
        setDialogOpen(false);
        fetchDocuments();
      } else {
        toast({ title: 'Error', description: 'Failed to save document', variant: 'destructive' });
      }
    } catch (err) {
      console.error("[❌ Error saving document]", err);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/delete/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Deleted', description: `Document ID ${id} deleted`, variant: 'destructive' });
        fetchDocuments();
      }
    } catch (err) {
      console.error("[❌ Error deleting document]", err);
    }
  };

  const filteredDocuments =
    searchTerm.trim() === ''
      ? documents
      : documents.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(doc.genre).toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(doc.level).toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={() => {
          setNewDocument({ title: '', category: 'Business', level: 'Intermediate', content: '', status: 'Draft' });
          setEditingDoc(null);
          setDialogOpen(true);
        }}><Plus className="w-4 h-4 mr-2" /> Add Document</Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <Button onClick={fetchDocuments}>Refresh</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reading Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? filteredDocuments.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{GENRE_MAP[doc.genre] || doc.genre}</TableCell>
                  <TableCell>{LEVEL_MAP[doc.level] || doc.level}</TableCell>

                  <TableCell>{doc.status}</TableCell>
                  <TableCell>{doc.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                          setEditingDoc(doc);
                          setNewDocument({
                            title: doc.title,
                            category: doc.genre,
                            level: doc.level,
                            content: doc.content,
                            status: doc.status || 'Draft'
                          });
                          setDialogOpen(true);
                        }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDocument(doc.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDoc ? 'Edit Document' : 'Add New Document'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Title</Label>
            <Input value={newDocument.title} onChange={e => setNewDocument({ ...newDocument, title: e.target.value })} />
            <Label>Category</Label>
            <Input value={newDocument.category} onChange={e => setNewDocument({ ...newDocument, category: e.target.value })} />
            <Label>Level</Label>
            <Input value={newDocument.level} onChange={e => setNewDocument({ ...newDocument, level: e.target.value })} />
            <Label>Content</Label>
            <Textarea value={newDocument.content} onChange={e => setNewDocument({ ...newDocument, content: e.target.value })} />
            <Label>Status</Label>
            <Select value={newDocument.status} onValueChange={v => setNewDocument({ ...newDocument, status: v })}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSubmitDocument}>{editingDoc ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
