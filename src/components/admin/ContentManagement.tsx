// ✅ Đã cập nhật: gửi genre/level là ID, loại bỏ status, dùng dropdown chọn đúng ID
import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Plus, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = 'http://127.0.0.1:8000';

const GENRE_MAP = {
  1: "Daily Life",
  2: "Technology",
  3: "Travel",
  4: "Education",
  5: "Family",
  6:"Others"  
};

const LEVEL_MAP = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced"
};

const ContentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 1,
    level: 1,
    content: '',
    language: 'en'
  });

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
        language: item.language,
        dateAdded: item.created_at?.split("T")[0] || ''
      }));
      setDocuments(transformed);
    } catch (err) {
      console.error("[❌ Failed to fetch documents]", err);
    }
  };

  const handleSubmitDocument = async () => {
    if (!newDocument.category || !newDocument.level) {
      toast({ title: "Missing Fields", description: "Please select genre and level.", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        title: newDocument.title,
        genre: newDocument.category,
        level: newDocument.level,
        content: newDocument.content,
        language: newDocument.language
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
        setNewDocument({ title: '', category: 1, level: 1, content: '', language: 'en' });
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
          setNewDocument({ title: '', category: 1, level: 1, content: '', language: 'en' });
          setEditingDoc(null);
          setDialogOpen(true);
        }}><Plus className="w-4 h-4 mr-2" /> Add Document</Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <Button onClick={fetchDocuments}>Refresh</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Reading Materials</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Level</TableHead>
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
                            language: doc.language || 'en'
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
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
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
            <Select value={String(newDocument.category)} onValueChange={v => setNewDocument({ ...newDocument, category: Number(v) })}>
              <SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger>
              <SelectContent>
                {Object.entries(GENRE_MAP).map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Level</Label>
            <Select value={String(newDocument.level)} onValueChange={v => setNewDocument({ ...newDocument, level: Number(v) })}>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                {Object.entries(LEVEL_MAP).map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Content</Label>
            <Textarea value={newDocument.content} onChange={e => setNewDocument({ ...newDocument, content: e.target.value })} />
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