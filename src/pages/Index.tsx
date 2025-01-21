import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { SchemaBuilder, type SchemaField } from '@/components/SchemaBuilder';
import { Dashboard } from '@/components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [schema, setSchema] = useState<SchemaField[]>([]);
  
  // Mock data for dashboard
  const mockStats = {
    totalExtractions: 42,
    successRate: 95,
    recentExtractions: [
      {
        id: '1',
        filename: 'invoice-001.jpg',
        timestamp: '2024-03-10 14:30',
        status: 'success' as const,
      },
      {
        id: '2',
        filename: 'receipt-123.png',
        timestamp: '2024-03-10 13:15',
        status: 'success' as const,
      },
      {
        id: '3',
        filename: 'document.jpg',
        timestamp: '2024-03-10 12:45',
        status: 'failed' as const,
      },
    ],
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleSaveSchema = (newSchema: SchemaField[]) => {
    setSchema(newSchema);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Document Data Extraction</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="extract">Extract Data</TabsTrigger>
          <TabsTrigger value="schema">Schema Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard stats={mockStats} />
        </TabsContent>

        <TabsContent value="extract">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
              <FileUpload onFileSelect={handleFileSelect} />
              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Selected Files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schema">
          <SchemaBuilder onSave={handleSaveSchema} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;