import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings2, Key } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="text-muted-foreground">
          Configure your application settings and API keys
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="extractionTimeout">Extraction Timeout (seconds)</Label>
                <Input
                  id="extractionTimeout"
                  type="number"
                  defaultValue={30}
                  className="max-w-[200px]"
                />
              </div>
              <div>
                <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  defaultValue={10}
                  className="max-w-[200px]"
                />
              </div>
              <div>
                <Label htmlFor="language">Default Language</Label>
                <Input
                  id="language"
                  type="text"
                  defaultValue="English"
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Mistral API Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure your Mistral API key for enhanced extraction capabilities.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="mistralApiKey">Mistral API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="mistralApiKey"
                      type="password"
                      placeholder="Enter your Mistral API key"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};