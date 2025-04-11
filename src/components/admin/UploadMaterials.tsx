
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UploadMaterials = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    type: 'reading',
    level: 'Beginner',
    category: 'Conversation',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map(file => file.name);
      setUploadedFiles(fileNames);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for the material.",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadedFiles.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful",
        description: `${formData.title} has been uploaded successfully.`
      });
      
      // Reset form
      setFormData({
        title: '',
        type: 'reading',
        level: 'Beginner',
        category: 'Conversation',
        description: ''
      });
      setUploadedFiles([]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Upload Materials</h2>
        <p className="text-slate-950">
          Upload new reading and speaking materials for students.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Material</CardTitle>
            <CardDescription>
              Add new content for students to practice with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="Enter material title" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Material Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={value => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Reading Material</SelectItem>
                    <SelectItem value="speaking">Speaking Practice</SelectItem>
                    <SelectItem value="both">Both Reading & Speaking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={value => handleSelectChange('level', value)}
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
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={value => handleSelectChange('category', value)}
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Enter material description" 
                  rows={3} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                  <Input 
                    id="file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    multiple 
                  />
                  <Label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-500 mt-1">PDF, DOC, MP3, MP4 (max. 20MB)</span>
                  </Label>
                </div>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <Label>Selected Files</Label>
                  <ul className="text-sm space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        {file.endsWith('.mp3') || file.endsWith('.mp4') ? (
                          <Mic className="h-4 w-4 mr-2 text-blue-500" />
                        ) : (
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        )}
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Material
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
            <CardDescription>
              Tips for preparing and uploading effective learning materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">File Requirements:</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Reading materials should be in PDF or DOC format</li>
                  <li>Speaking materials should be MP3 or MP4 files</li>
                  <li>Maximum file size: 20MB per file</li>
                  <li>Content should be clear, high-quality, and free of errors</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-2">Content Guidelines:</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Ensure content is appropriate for the specified level</li>
                  <li>Include clear instructions for students</li>
                  <li>For reading materials, include vocabulary lists when possible</li>
                  <li>For speaking samples, ensure audio is clear with proper pronunciation</li>
                  <li>Make sure all uploaded content is original or properly licensed</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Quick Tips:</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-blue-700">
                  <li>Uploaded materials will be reviewed before publication</li>
                  <li>Use descriptive titles to make materials easy to find</li>
                  <li>Make sure to select the appropriate category and level</li>
                  <li>Add detailed descriptions to help students understand the purpose of the material</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadMaterials;
