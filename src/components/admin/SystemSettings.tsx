
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const {
    toast
  } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your system settings have been updated successfully."
    });
  };
  
  return <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">System Settings</h2>
        <p className="text-slate-950">
          Configure and customize platform features.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Speech Recognition Settings</CardTitle>
          <CardDescription>
            Configure Deepgram API and speech recognition settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">Deepgram API Key</Label>
              <Input id="api-key" type="password" value="●●●●●●●●●●●●●●●●●●●●" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-model">Speech Recognition Model</Label>
              <Select defaultValue="nova-2">
                <SelectTrigger className="bg-slate-950 text-white">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nova-2">Nova-2 (Recommended)</SelectItem>
                  <SelectItem value="enhanced">Enhanced</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="speech-sensitivity">Recognition Sensitivity</Label>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">
              Higher sensitivity may capture more nuanced speech but may also increase false positives.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="auto-punctuation" defaultChecked />
            <Label htmlFor="auto-punctuation">Enable automatic punctuation</Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech Settings</CardTitle>
          <CardDescription>
            Configure Microsoft Azure TTS API settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="azure-key">Azure API Key</Label>
              <Input id="azure-key" type="password" value="●●●●●●●●●●●●●●●●●●●●" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="azure-region">Azure Region</Label>
              <Select defaultValue="eastus">
                <SelectTrigger className="bg-slate-950 text-white">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eastus">East US</SelectItem>
                  <SelectItem value="westus">West US</SelectItem>
                  <SelectItem value="westeurope">West Europe</SelectItem>
                  <SelectItem value="southeastasia">Southeast Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-speed">Default Voice Speed</Label>
              <span className="text-sm text-muted-foreground">Normal</span>
            </div>
            <Select defaultValue="1.0">
              <SelectTrigger className="bg-slate-950 text-white">
                <SelectValue placeholder="Select speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.8">Slow</SelectItem>
                <SelectItem value="1.0">Normal</SelectItem>
                <SelectItem value="1.2">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="neural-voices" defaultChecked />
            <Label htmlFor="neural-voices">Use neural voices for better quality</Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Scoring and Feedback Settings</CardTitle>
          <CardDescription>
            Configure how pronunciation scores and feedback are calculated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scoring-algorithm">Scoring Algorithm</Label>
            <Select defaultValue="comprehensive">
              <SelectTrigger className="bg-slate-950 text-white">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (Phoneme Matching)</SelectItem>
                <SelectItem value="comprehensive">Comprehensive (Sound + Stress + Intonation)</SelectItem>
                <SelectItem value="advanced">Advanced (Neural Network)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="strictness">Scoring Strictness</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">
              Higher strictness requires more accurate pronunciation for higher scores.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="detailed-feedback" defaultChecked />
            <Label htmlFor="detailed-feedback">Enable detailed phonetic feedback</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-violet-600 hover:bg-violet-500">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>;
};

export default SystemSettings;
