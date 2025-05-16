
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Plus, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for roles
const mockRoles = [
  {
    id: 1,
    name: 'User',
    description: 'Standard user with basic privileges',
    permissions: [
      'View content',
      'Submit ratings',
      'Create reading lists'
    ],
    userCount: 1250
  },
  {
    id: 2,
    name: 'Moderator',
    description: 'Helps maintain platform content and discussions',
    permissions: [
      'All User permissions',
      'Review content',
      'Flag inappropriate material',
      'Edit community discussions'
    ],
    userCount: 25
  },
  {
    id: 3,
    name: 'Admin',
    description: 'Full platform administration capabilities',
    permissions: [
      'All Moderator permissions',
      'Manage users',
      'Configure system settings',
      'Access analytics',
      'Modify content database'
    ],
    userCount: 5
  }
];

const UserRoles = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });
  
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    const id = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1;
    const newRoleWithId = {
      ...newRole,
      id,
      userCount: 0
    };
    setRoles([...roles, newRoleWithId]);
    toast({
      title: "Role Added",
      description: `${newRole.name} role has been added successfully.`
    });

    // Reset form
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const handleEditRole = () => {
    if (!editingRole) return;
    setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role));
    toast({
      title: "Role Updated",
      description: `${editingRole.name} role has been updated successfully.`
    });
    setEditingRole(null);
  };

  const handleDeleteRole = (id: number) => {
    const roleToDelete = roles.find(role => role.id === id);
    if (roleToDelete?.name === 'Admin') {
      toast({
        title: "Cannot Delete Admin",
        description: "The Admin role cannot be deleted from the system.",
        variant: "destructive"
      });
      return;
    }
    
    setRoles(roles.filter(role => role.id !== id));
    toast({
      title: "Role Deleted",
      description: `${roleToDelete?.name} role has been deleted from the system.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">User Roles Management</h2>
          <p className="text-slate-950">
            Assign roles and permissions to control user access and capabilities.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>
                Create a new user role with specific permissions.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input 
                  id="name" 
                  value={newRole.name} 
                  onChange={e => setNewRole({...newRole, name: e.target.value})} 
                  placeholder="Enter role name" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={newRole.description} 
                  onChange={e => setNewRole({...newRole, description: e.target.value})} 
                  placeholder="Enter role description" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <div className="border p-3 rounded-md space-y-2">
                  <p className="text-sm text-gray-500">Add permissions to this textbox (one per line)</p>
                  <textarea 
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={newRole.permissions.join('\n')}
                    onChange={e => setNewRole({...newRole, permissions: e.target.value.split('\n').filter(p => p.trim() !== '')})}
                    placeholder="View content&#10;Submit ratings&#10;Create reading lists"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddRole} className="bg-blue-600 hover:bg-blue-700">
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={!!editingRole} onOpenChange={open => !open && setEditingRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update role details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {editingRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Role Name</Label>
                <Input 
                  id="edit-name" 
                  value={editingRole.name} 
                  onChange={e => setEditingRole({...editingRole, name: e.target.value})}
                  disabled={editingRole.name === 'Admin'} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input 
                  id="edit-description" 
                  value={editingRole.description} 
                  onChange={e => setEditingRole({...editingRole, description: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-permissions">Permissions</Label>
                <div className="border p-3 rounded-md space-y-2">
                  <p className="text-sm text-gray-500">Edit permissions (one per line)</p>
                  <textarea 
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={editingRole.permissions.join('\n')}
                    onChange={e => setEditingRole({...editingRole, permissions: e.target.value.split('\n').filter(p => p.trim() !== '')})}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditRole} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center border rounded-md px-3 py-2 w-full max-w-sm bg-zinc-950">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <Input 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
          placeholder="Search roles..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Role List</CardTitle>
          <CardDescription>
            View and manage user roles and their permissions in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map(role => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium flex items-center">
                      <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                      {role.name}
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.userCount}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditingRole(role)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRole(role.id)}>
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Users</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Permissions Overview</CardTitle>
          <CardDescription>
            Review all permissions available in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map(role => (
              <div key={role.id} className="border p-4 rounded-md">
                <h3 className="font-bold text-lg mb-2">{role.name}</h3>
                <p className="text-gray-500 mb-3">{role.description}</p>
                <h4 className="font-semibold mb-2">Permissions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {role.permissions.map((permission, index) => (
                    <li key={index}>{permission}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoles;
