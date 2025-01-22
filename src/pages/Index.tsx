import React, { useState } from 'react';
import { SchemaBuilder, type SchemaField } from '@/components/SchemaBuilder';
import { ExtractionTask } from '@/components/ExtractionTask';
import { ExtractionResults } from '@/components/ExtractionResults';
import { Dashboard } from '@/components/Dashboard';
import { Settings } from '@/components/Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Settings2, BarChart, Table } from 'lucide-react';

const Index = () => {
  const [schemas, setSchemas] = useState<SchemaField[][]>([]);
  const [results, setResults] = useState<{
    fileName: string;
    status: 'success' | 'failed';
    data: Record<string, string>;
  }[]>([]);
  const [activeSchema, setActiveSchema] = useState<SchemaField[]>([]);

  const handleSaveSchema = (schema: SchemaField[]) => {
    setSchemas([...schemas, schema]);
  };

  const handleExtract = async (files: File[], schemaId: number) => {
    // Mock extraction results for demonstration
    const mockResults = files.map(file => ({
      fileName: file.name,
      status: Math.random() > 0.2 ? 'success' as const : 'failed' as const,
      data: schemas[schemaId].reduce((acc, field) => ({
        ...acc,
        [field.name]: `Sample ${field.name} data`
      }), {} as Record<string, string>)
    }));

    setActiveSchema(schemas[schemaId]);
    setResults(mockResults);
  };

  // Mock data for dashboard
  const mockStats = {
    totalExtractions: results.length,
    successRate: results.filter(r => r.status === 'success').length / results.length * 100 || 0,
    recentExtractions: results.slice(0, 3).map((r, i) => ({
      id: i.toString(),
      filename: r.fileName,
      timestamp: new Date().toISOString(),
      status: r.status
    }))
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Document Data Extraction
      </h1>
      <p className="text-muted-foreground mb-8">
        Extract structured data from your documents using AI
      </p>
      
      <Tabs defaultValue="dashboard" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="schema" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Schema
          </TabsTrigger>
          <TabsTrigger value="extract" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Extract
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Dashboard stats={mockStats} />
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <SchemaBuilder onSave={handleSaveSchema} />
        </TabsContent>

        <TabsContent value="extract" className="space-y-4">
          <ExtractionTask schemas={schemas} onExtract={handleExtract} />
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results.length > 0 ? (
            <ExtractionResults results={results} schema={activeSchema} />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No extraction results yet</h3>
              <p className="text-sm text-muted-foreground">
                Start by selecting a schema and uploading files in the Extract tab.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;