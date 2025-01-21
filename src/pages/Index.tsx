import React, { useState } from 'react';
import { SchemaBuilder, type SchemaField } from '@/components/SchemaBuilder';
import { ExtractionTask } from '@/components/ExtractionTask';
import { ExtractionResults } from '@/components/ExtractionResults';
import { Dashboard } from '@/components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExtractionResult {
  fileName: string;
  status: 'success' | 'failed';
  data: Record<string, string>;
}

const Index = () => {
  const [schemas, setSchemas] = useState<SchemaField[][]>([]);
  const [results, setResults] = useState<ExtractionResult[]>([]);
  const [activeSchema, setActiveSchema] = useState<SchemaField[]>([]);

  const handleSaveSchema = (schema: SchemaField[]) => {
    setSchemas([...schemas, schema]);
  };

  const handleExtract = async (files: File[], schemaId: number) => {
    // Mock extraction results for demonstration
    const mockResults: ExtractionResult[] = files.map(file => ({
      fileName: file.name,
      status: Math.random() > 0.2 ? 'success' : 'failed',
      data: schemas[schemaId].reduce((acc, field) => ({
        ...acc,
        [field.name]: `Sample ${field.name} data`
      }), {})
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
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Document Data Extraction</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="schema">Schema Builder</TabsTrigger>
          <TabsTrigger value="extract">Extract Data</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard stats={mockStats} />
        </TabsContent>

        <TabsContent value="schema">
          <SchemaBuilder onSave={handleSaveSchema} />
        </TabsContent>

        <TabsContent value="extract">
          <ExtractionTask schemas={schemas} onExtract={handleExtract} />
        </TabsContent>

        <TabsContent value="results">
          {results.length > 0 ? (
            <ExtractionResults results={results} schema={activeSchema} />
          ) : (
            <div className="text-center text-gray-500 py-12">
              No extraction results yet. Start by selecting a schema and uploading files.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;