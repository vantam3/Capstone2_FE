
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Plus, BookOpen, Library, Star, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    ratings: 4.5,
    status: 'Available',
    dateAdded: '2023-01-15'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    ratings: 4.7,
    status: 'Available',
    dateAdded: '2023-02-10'
  },
  {
    id: 3,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    category: 'Fiction',
    ratings: 4.2,
    status: 'Available',
    dateAdded: '2023-03-05'
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    category: 'Science Fiction',
    ratings: 4.6,
    status: 'Available',
    dateAdded: '2023-04-20'
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    ratings: 4.4,
    status: 'Available',
    dateAdded: '2023-05-12'
  }
];

const BookInventory = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState<any | null>(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    ratings: 0,
    status: 'Available'
  });
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = () => {
    const id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    const newBookWithId = {
      ...newBook,
      id,
      dateAdded: formattedDate
    };
    
    setBooks([...books, newBookWithId]);
    toast({
      title: "Book Added",
      description: `${newBook.title} has been added to the inventory.`
    });

    // Reset form
    setNewBook({
      title: '',
      author: '',
      category: 'Fiction',
      ratings: 0,
      status: 'Available'
    });
  };

  const handleEditBook = () => {
    if (!editingBook) return;
    setBooks(books.map(book => book.id === editingBook.id ? editingBook : book));
    toast({
      title: "Book Updated",
      description: `${editingBook.title} has been updated successfully.`
    });
    setEditingBook(null);
  };

  const handleDeleteBook = (id: number) => {
    const bookToDelete = books.find(book => book.id === id);
    setBooks(books.filter(book => book.id !== id));
    toast({
      title: "Book Deleted",
      description: `${bookToDelete?.title} has been removed from the inventory.`,
      variant: "destructive"
    });
  };

  const categories = Array.from(new Set(books.map(book => book.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Book Inventory</h2>
          <p className="text-slate-950">
            Manage the collection of books available on the platform.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Add a new book to your inventory.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newBook.title} 
                  onChange={e => setNewBook({...newBook, title: e.target.value})} 
                  placeholder="Enter book title" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  value={newBook.author} 
                  onChange={e => setNewBook({...newBook, author: e.target.value})} 
                  placeholder="Enter author name" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newBook.category} 
                    onValueChange={value => setNewBook({...newBook, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                      <SelectItem value="Fantasy">Fantasy</SelectItem>
                      <SelectItem value="Romance">Romance</SelectItem>
                      <SelectItem value="Mystery">Mystery</SelectItem>
                      <SelectItem value="Biography">Biography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newBook.status} 
                    onValueChange={value => setNewBook({...newBook, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ratings">Initial Rating (1-5)</Label>
                <Input 
                  id="ratings" 
                  type="number" 
                  min="0" 
                  max="5" 
                  step="0.1"
                  value={newBook.ratings} 
                  onChange={e => setNewBook({...newBook, ratings: parseFloat(e.target.value)})} 
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddBook} className="bg-blue-600 hover:bg-blue-700">
                Add Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Book Dialog */}
      <Dialog open={!!editingBook} onOpenChange={open => !open && setEditingBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update book details in your inventory.
            </DialogDescription>
          </DialogHeader>
          
          {editingBook && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingBook.title} 
                  onChange={e => setEditingBook({...editingBook, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input 
                  id="edit-author" 
                  value={editingBook.author} 
                  onChange={e => setEditingBook({...editingBook, author: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editingBook.category} 
                    onValueChange={value => setEditingBook({...editingBook, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                      <SelectItem value="Fantasy">Fantasy</SelectItem>
                      <SelectItem value="Romance">Romance</SelectItem>
                      <SelectItem value="Mystery">Mystery</SelectItem>
                      <SelectItem value="Biography">Biography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={editingBook.status} 
                    onValueChange={value => setEditingBook({...editingBook, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-ratings">Rating (1-5)</Label>
                <Input 
                  id="edit-ratings" 
                  type="number" 
                  min="0" 
                  max="5" 
                  step="0.1"
                  value={editingBook.ratings} 
                  onChange={e => setEditingBook({...editingBook, ratings: parseFloat(e.target.value)})} 
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditBook} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
          placeholder="Search books..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Library className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{books.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In your collection
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">{categories.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Distinct book categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">
                {(books.reduce((sum, book) => sum + book.ratings, 0) / books.length).toFixed(1)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall book ratings
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Book List</CardTitle>
          <CardDescription>
            View and manage all books in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                      {book.title}
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {book.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {book.ratings}
                        <Star className="h-4 w-4 text-yellow-500 ml-1" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : book.status === 'Out of Stock' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {book.status}
                      </span>
                    </TableCell>
                    <TableCell>{book.dateAdded}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingBook(book)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteBook(book.id)}>
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No books found.
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

export default BookInventory;
