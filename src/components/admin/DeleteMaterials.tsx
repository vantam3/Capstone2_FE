import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { materialService, Material } from '@/lib/api/services/materialService';

const DeleteMaterials = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingMaterial, setDeletingMaterial] = useState<Material | null>(null);
  const [confirmText, setConfirmText] = useState('');
  
  // Fetch materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: materialService.getAll,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => materialService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast({
        title: "Material Deleted",
        description: `Material has been permanently removed.`,
        variant: "destructive"
      });
      setDeletingMaterial(null);
      setConfirmText('');
    }
  });

  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    material.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by usage count to show least used materials first
  const sortedMaterials = [...filteredMaterials].sort((a, b) => a.usageCount - b.usageCount);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Delete Materials</h2>
          <p className="text-slate-950">
            Remove outdated or irrelevant learning materials from the system.
          </p>
        </div>
      </div>
      
      <Dialog open={!!deletingMaterial} onOpenChange={open => {
        if (!open) {
          setDeletingMaterial(null);
          setConfirmText('');
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. The material will be permanently deleted from the system.
            </DialogDescription>
          </DialogHeader>
          
          {deletingMaterial && (
            <div className="space-y-4 py-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <p className="text-sm text-red-800">
                  You are about to delete: <strong>{deletingMaterial.title}</strong>
                </p>
                <p className="text-sm text-red-700 mt-2">
                  This material has been used <strong>{deletingMaterial.usageCount} times</strong> by students.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Type <strong>DELETE</strong> to confirm:
                </p>
                <Input 
                  value={confirmText} 
                  onChange={e => setConfirmText(e.target.value)} 
                  placeholder="Type DELETE here" 
                  className="border-red-200 focus:border-red-300" 
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={() => deletingMaterial && deleteMutation.mutate(deletingMaterial.id)}
              disabled={confirmText !== 'DELETE'} 
              variant="destructive"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Permanently
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
          <CardTitle>Manage Learning Materials</CardTitle>
          <CardDescription>
            Delete outdated or irrelevant materials. Materials with low usage are shown first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-gray-500 text-lg">Loading materials...</div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMaterials.length > 0 ? (
                sortedMaterials.map(material => (
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
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        material.usageCount > 100 
                          ? 'bg-green-100 text-green-800' 
                          : material.usageCount > 50 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {material.usageCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setDeletingMaterial(material)}
                        className="h-8"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No materials found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Deletion Guidelines</CardTitle>
          <CardDescription>
            Important considerations before removing learning materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-2">
              <div className="bg-red-100 text-red-800 p-1 rounded">1</div>
              <div>
                <p className="font-medium">Check Usage Count</p>
                <p className="text-gray-500">Materials with high usage counts are actively being used by students. 
                Consider retention policies before removing popular materials.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="bg-red-100 text-red-800 p-1 rounded">2</div>
              <div>
                <p className="font-medium">Consider Archiving Instead</p>
                <p className="text-gray-500">For materials that might be useful in the future, consider archiving 
                rather than permanent deletion.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="bg-red-100 text-red-800 p-1 rounded">3</div>
              <div>
                <p className="font-medium">Check Relationships</p>
                <p className="text-gray-500">Ensure materials aren't referenced by active courses or learning paths 
                before deletion.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="bg-red-100 text-red-800 p-1 rounded">4</div>
              <div>
                <p className="font-medium">Deletion is Permanent</p>
                <p className="text-gray-500">Once deleted, materials cannot be recovered. Make sure you have backups 
                if needed.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteMaterials;