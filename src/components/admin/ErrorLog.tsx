import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle, Bug, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for error logs
const mockErrorLogs = [{
  id: 1,
  type: 'API Error',
  message: 'Deepgram API returned 429 status code (rate limit exceeded)',
  service: 'Speech Recognition',
  status: 'Open',
  timestamp: '2023-08-20 09:15:23',
  user: 'john@example.com'
}, {
  id: 2,
  type: 'System Error',
  message: 'Database connection timeout after 30 seconds',
  service: 'Database',
  status: 'Resolved',
  timestamp: '2023-08-19 14:22:18',
  user: 'system'
}, {
  id: 3,
  type: 'Feature Error',
  message: 'Text comparison algorithm failed for non-Latin characters',
  service: 'Text Comparison',
  status: 'In Progress',
  timestamp: '2023-08-18 16:45:23',
  user: 'jane@example.com'
}, {
  id: 4,
  type: 'API Error',
  message: 'Azure TTS API returned 401 status code (unauthorized)',
  service: 'Text-to-Speech',
  status: 'Open',
  timestamp: '2023-08-18 11:30:45',
  user: 'robert@example.com'
}, {
  id: 5,
  type: 'Client Error',
  message: 'Browser microphone access denied by user',
  service: 'Voice Recording',
  status: 'Closed',
  timestamp: '2023-08-17 10:20:11',
  user: 'emily@example.com'
}];
const ErrorLog = () => {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [errorFilter, setErrorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorLogs, setErrorLogs] = useState(mockErrorLogs);
  const [selectedError, setSelectedError] = useState<any | null>(null);
  const filteredLogs = errorLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.service.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = errorFilter === 'all' || log.type === errorFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });
  const handleResolveError = (id: number) => {
    setErrorLogs(errorLogs.map(log => log.id === id ? {
      ...log,
      status: 'Resolved'
    } : log));
    toast({
      title: "Error Marked as Resolved",
      description: "The error has been marked as resolved."
    });
    if (selectedError && selectedError.id === id) {
      setSelectedError({
        ...selectedError,
        status: 'Resolved'
      });
    }
  };
  const handleRefreshLogs = () => {
    toast({
      title: "Error Logs Refreshed",
      description: "The error logs have been refreshed."
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Error Logs</h2>
          <p className="text-slate-950">
            Monitor and resolve system errors and issues.
          </p>
        </div>
        
        <Button onClick={handleRefreshLogs} variant="outline" className="flex items-center bg-violet-600 hover:bg-violet-500">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-md px-3 py-2 w-full md:w-auto md:flex-1 bg-slate-950">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" placeholder="Search error logs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={errorFilter} onValueChange={setErrorFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="API Error">API Error</SelectItem>
              <SelectItem value="System Error">System Error</SelectItem>
              <SelectItem value="Feature Error">Feature Error</SelectItem>
              <SelectItem value="Client Error">Client Error</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bug className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">{errorLogs.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All recorded errors
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">
                {errorLogs.filter(log => log.status === 'Open').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unresolved errors
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bug className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">
                {errorLogs.filter(log => log.status === 'Resolved' || log.status === 'Closed').length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Fixed errors
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Error Logs</CardTitle>
          <CardDescription>
            Review and manage system errors and exceptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Error Message</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? filteredLogs.map(log => <TableRow key={log.id}>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.type === 'API Error' ? 'bg-red-100 text-red-800' : log.type === 'System Error' ? 'bg-purple-100 text-purple-800' : log.type === 'Feature Error' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {log.type}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{log.message}</TableCell>
                    <TableCell>{log.service}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : log.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : log.status === 'Resolved' || log.status === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedError(log)}>
                          Details
                        </Button>
                        {log.status !== 'Resolved' && log.status !== 'Closed' && <Button size="sm" onClick={() => handleResolveError(log.id)} className="bg-violet-600 hover:bg-violet-500">
                            Resolve
                          </Button>}
                      </div>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No error logs found matching your filters.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Error Details Dialog */}
      <Dialog open={!!selectedError} onOpenChange={open => !open && setSelectedError(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Error Details</DialogTitle>
            <DialogDescription>
              Detailed information about the error.
            </DialogDescription>
          </DialogHeader>
          
          {selectedError && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Error Type</p>
                  <p className="font-medium">{selectedError.type}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedError.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : selectedError.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : selectedError.status === 'Resolved' || selectedError.status === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {selectedError.status}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Message</p>
                <p className="font-medium">{selectedError.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service</p>
                  <p>{selectedError.service}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                  <p>{selectedError.timestamp}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">User</p>
                <p>{selectedError.user}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stack Trace</p>
                <div className="p-3 border rounded-md font-mono text-xs max-h-[200px] overflow-y-auto bg-slate-950">
                  {selectedError.type === 'API Error' ? `Error: ${selectedError.message}\n` + `at APIService.handleResponse (/services/api.js:245:23)\n` + `at processTicksAndRejections (node:internal/process/task_queues:95:5)\n` + `at async APIService.makeRequest (/services/api.js:128:12)\n` + `at async SpeechRecognitionService.transcribe (/services/speech.js:56:18)` : selectedError.type === 'System Error' ? `Error: ${selectedError.message}\n` + `at DatabaseService.connect (/services/database.js:78:15)\n` + `at processTicksAndRejections (node:internal/process/task_queues:95:5)\n` + `at async ServerBootstrap.initialize (/bootstrap.js:34:10)` : `Error: ${selectedError.message}\n` + `at TextComparisonService.compare (/services/comparison.js:156:21)\n` + `at PronunciationService.evaluateAccuracy (/services/pronunciation.js:89:24)\n` + `at async UserSessionController.submitPractice (/controllers/session.js:112:18)`}
                </div>
              </div>
            </div>}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            {selectedError && selectedError.status !== 'Resolved' && selectedError.status !== 'Closed' && <Button onClick={() => handleResolveError(selectedError.id)} className="bg-blue-600 hover:bg-blue-700">
                Mark as Resolved
              </Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default ErrorLog;