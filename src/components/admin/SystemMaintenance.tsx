import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Server, Download, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const SystemMaintenance = () => {
  const {
    toast
  } = useToast();
  const handleBackupDatabase = () => {
    toast({
      title: "Backup Started",
      description: "The database backup process has been initiated."
    });
  };
  const handleAPITest = () => {
    toast({
      title: "API Test Completed",
      description: "All API connections are working properly."
    });
  };
  return <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">System Maintenance</h2>
        <p className="text-slate-950">
          Perform maintenance tasks and ensure system reliability.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">All Operational</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Deepgram, Azure TTS, Auth APIs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 hours ago</div>
            <p className="text-xs text-muted-foreground mt-1">
              Automated daily backups enabled
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
            <CardDescription>
              Manage database backups and maintenance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Storage</span>
                <span className="text-sm text-muted-foreground">68% used</span>
              </div>
              <Progress value={68} />
              <p className="text-xs text-muted-foreground">
                6.8 GB of 10 GB allocated storage used
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button onClick={handleBackupDatabase} variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Backup Database
              </Button>
              
              <Button variant="outline" className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Restore Backup
              </Button>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Backup History</h3>
              <div className="border rounded-md p-3 bg-slate-400">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-950">Automated Backup</span>
                  <span className="text-slate-50">Today, 04:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-slate-950">Automated Backup</span>
                  <span className="text-slate-50">Yesterday, 04:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-slate-950">Manual Backup</span>
                  <span className="text-slate-50">2023-08-15, 10:23 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Management</CardTitle>
            <CardDescription>
              Monitor and test integrated API services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">API Status</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Deepgram Speech Recognition</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Microsoft Azure TTS</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Authentication Service</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Text Comparison Algorithm</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleAPITest} className="w-full bg-violet-600 hover:bg-violet-500">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run API Connectivity Tests
              </Button>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">API Usage</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Deepgram API Calls</span>
                    <span className="text-muted-foreground">84,230 / 100,000</span>
                  </div>
                  <Progress value={84} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Azure TTS API Calls</span>
                    <span className="text-muted-foreground">67,450 / 100,000</span>
                  </div>
                  <Progress value={67} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>
            Recent system activity and maintenance logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 font-mono text-sm max-h-[300px] overflow-y-auto bg-slate-400">
            <p className="mb-2"><span className="text-green-600">[2023-08-20 09:15:23]</span> INFO: System backup completed successfully.</p>
            <p className="mb-2"><span className="text-blue-600">[2023-08-20 08:30:12]</span> INFO: API connectivity test passed for all services.</p>
            <p className="mb-2"><span className="text-yellow-600">[2023-08-19 23:45:30]</span> WARNING: Unusual traffic detected on authentication endpoint. Monitoring.</p>
            <p className="mb-2"><span className="text-green-600">[2023-08-19 20:10:05]</span> INFO: Database optimization completed. Query performance improved by 15%.</p>
            <p className="mb-2"><span className="text-red-600">[2023-08-19 14:22:18]</span> ERROR: Deepgram API returned 429 status (rate limit). Retried successfully.</p>
            <p className="mb-2"><span className="text-green-600">[2023-08-19 10:00:00]</span> INFO: Scheduled system maintenance completed.</p>
            <p className="mb-2"><span className="text-blue-600">[2023-08-18 16:45:23]</span> INFO: New voice model "David - Canadian English" added to Azure TTS configuration.</p>
            <p className="mb-2"><span className="text-green-600">[2023-08-18 09:15:23]</span> INFO: System backup completed successfully.</p>
            <p className="mb-2"><span className="text-yellow-600">[2023-08-17 22:30:45]</span> WARNING: High server load detected. Auto-scaling initiated.</p>
            <p className="mb-2"><span className="text-green-600">[2023-08-17 16:20:11]</span> INFO: Server load normalized. Auto-scaling successful.</p>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default SystemMaintenance;