import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Plus, Users, User, Activity, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '2 hours ago',
    loginHistory: [
      { date: '2023-08-21', time: '14:30', device: 'Mobile' },
      { date: '2023-08-20', time: '09:15', device: 'Desktop' },
      { date: '2023-08-18', time: '18:45', device: 'Mobile' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '1 day ago',
    loginHistory: [
      { date: '2023-08-20', time: '11:20', device: 'Desktop' },
      { date: '2023-08-19', time: '15:10', device: 'Mobile' },
      { date: '2023-08-17', time: '10:35', device: 'Desktop' }
    ]
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Student',
    status: 'Inactive',
    lastLogin: '5 days ago',
    loginHistory: [
      { date: '2023-08-16', time: '09:45', device: 'Desktop' },
      { date: '2023-08-15', time: '14:20', device: 'Mobile' },
      { date: '2023-08-14', time: '11:05', device: 'Desktop' }
    ]
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '3 hours ago',
    loginHistory: [
      { date: '2023-08-21', time: '12:15', device: 'Mobile' },
      { date: '2023-08-20', time: '10:30', device: 'Desktop' },
      { date: '2023-08-19', time: '16:45', device: 'Mobile' }
    ]
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '1 hour ago',
    loginHistory: [
      { date: '2023-08-21', time: '14:00', device: 'Desktop' },
      { date: '2023-08-20', time: '11:45', device: 'Mobile' },
      { date: '2023-08-19', time: '09:30', device: 'Desktop' }
    ]
  }
];

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [viewingActivity, setViewingActivity] = useState<any | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Student',
    status: 'Active'
  });

  const handleAddUser = () => {
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUserWithId = {
      ...newUser,
      id,
      lastLogin: 'Never',
      loginHistory: []
    };
    setUsers([...users, newUserWithId]);
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`
    });

    // Reset form
    setNewUser({
      name: '',
      email: '',
      role: 'Student',
      status: 'Active'
    });
  };

  const handleEditUser = () => {
    if (!editingUser) return;
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    toast({
      title: "User Updated",
      description: `${editingUser.name}'s information has been updated.`
    });
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} has been removed from the system.`,
      variant: "destructive"
    });
  };

  const handleResetPassword = (id: number) => {
    const user = users.find(user => user.id === id);
    toast({
      title: "Password Reset",
      description: `Password reset link has been sent to ${user?.email}.`
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">User Management</h2>
          <p className="text-slate-950">
            Manage user accounts, roles, and monitor activities.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-500">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with specific permissions.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={newUser.name} onChange={e => setNewUser({
                ...newUser,
                name: e.target.value
              })} placeholder="Enter full name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={newUser.email} onChange={e => setNewUser({
                ...newUser,
                email: e.target.value
              })} placeholder="Enter email address" type="email" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={value => setNewUser({
                  ...newUser,
                  role: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newUser.status} onValueChange={value => setNewUser({
                  ...newUser,
                  status: value
                })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editingUser} onOpenChange={open => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user account details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" value={editingUser.name} onChange={e => setEditingUser({
              ...editingUser,
              name: e.target.value
            })} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" value={editingUser.email} onChange={e => setEditingUser({
              ...editingUser,
              email: e.target.value
            })} type="email" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select value={editingUser.role} onValueChange={value => setEditingUser({
                ...editingUser,
                role: value
              })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={editingUser.status} onValueChange={value => setEditingUser({
                ...editingUser,
                status: value
              })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditUser} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingActivity} onOpenChange={open => !open && setViewingActivity(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Activity</DialogTitle>
            <DialogDescription>
              {viewingActivity && `Login history for ${viewingActivity.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {viewingActivity && (
            <div className="space-y-4 py-4">
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingActivity.loginHistory.length > 0 ? (
                      viewingActivity.loginHistory.map((login, index) => (
                        <TableRow key={index}>
                          <TableCell>{login.date}</TableCell>
                          <TableCell>{login.time}</TableCell>
                          <TableCell>{login.device}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">No login history available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{users.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all user roles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">
                {users.filter(user => user.status === 'Active').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active in the system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">
                {users.filter(user => user.status !== 'Active').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Inactive or suspended accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-orange-500 mr-2" />
              <div className="text-2xl font-bold">
                {users.filter(user => user.lastLogin.includes('hour')).length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Users active in the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            View and manage all registered users on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? filteredUsers.map(user => <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : user.role === 'Manager' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {user.lastLogin}
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingUser(user)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setViewingActivity(user)}>
                            View Activity
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                            Reset Password
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
