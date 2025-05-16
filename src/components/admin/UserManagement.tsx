// Cập nhật lại React component UserManagement với các nút Edit/Delete và kết nối API
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MoreHorizontal, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const API_BASE = 'http://127.0.0.1:8000';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', first_name: '', last_name: '', is_active: true });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/`);
      const data = await res.json();
      console.log('[✅ API Response]', data);
      setUsers(data);
    } catch (error) {
      console.error('[❌ Lỗi fetchUsers]', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await fetch(`${API_BASE}/api/users/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      toast({ title: "User Added", description: `${newUser.username} has been added.` });
      setNewUser({ username: '', email: '', first_name: '', last_name: '', is_active: true });
      fetchUsers();
    } catch (error) {
      console.error('[❌ Lỗi handleAddUser]', error);
    }
  };

  const handleEditUser = async () => {
    try {
      await fetch(`${API_BASE}/api/users/update/${editingUser.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      toast({ title: "User Updated", description: `${editingUser.username} has been updated.` });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('[❌ Lỗi handleEditUser]', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${API_BASE}/api/users/delete/${id}/`, {
        method: 'DELETE'
      });
      toast({ title: "User Deleted", description: `User with ID ${id} deleted.` });
      fetchUsers();
    } catch (error) {
      console.error('[❌ Lỗi handleDeleteUser]', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">User Management</h2>
          <p className="text-slate-950">Manage user accounts, roles, and monitor activities.</p>
        </div>
        <Button onClick={fetchUsers} className="bg-indigo-600">🔁 Refresh</Button>
      </div>

      <Input className="w-full max-w-sm" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingUser(user)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editingUser} onOpenChange={open => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user account details.</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 py-4">
              <Label>Username</Label>
              <Input value={editingUser.username} onChange={e => setEditingUser({ ...editingUser, username: e.target.value })} />
              <Label>Email</Label>
              <Input value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
              <Label>Active</Label>
              <Select value={editingUser.is_active ? 'true' : 'false'} onValueChange={val => setEditingUser({ ...editingUser, is_active: val === 'true' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleEditUser} className="bg-blue-600">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
