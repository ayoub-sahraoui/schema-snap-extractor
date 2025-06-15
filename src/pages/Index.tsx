
import React, { useState } from 'react';
import { SchemaBuilder, type SchemaField } from '@/components/SchemaBuilder';
import { ExtractionTask } from '@/components/ExtractionTask';
import { ExtractionResults } from '@/components/ExtractionResults';
import { Dashboard } from '@/components/Dashboard';
import { Settings } from '@/components/Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Settings2, BarChart, Table } from 'lucide-react';
import type { ExtractionResult } from '@/types/extraction';

const Index = () => {
  // Demo schemas
  const demoSchemas: SchemaField[][] = [
    [
      { name: "Invoice Number", type: "text" },
      { name: "Date", type: "date" },
      { name: "Amount", type: "number" },
      { name: "Company Name", type: "text" }
    ],
    [
      { name: "Order ID", type: "text" },
      { name: "Customer Name", type: "text" },
      { name: "Order Date", type: "date" },
      { name: "Total Items", type: "number" },
      { name: "Total Amount", type: "number" }
    ],
    [
      { name: "Receipt Number", type: "text" },
      { name: "Transaction Date", type: "date" },
      { name: "Payment Method", type: "text" },
      { name: "Amount Paid", type: "number" }
    ]
  ];

  const [schemas, setSchemas] = useState<SchemaField[][]>(demoSchemas);
  
  // Initial demo results with proper typing
  const initialResults: ExtractionResult[] = [
    {
      fileName: "invoice_001.pdf",
      status: "success",
      data: {
        "Invoice Number": "INV-2024-001",
        "Date": "2024-03-15",
        "Amount": "$1,250.00",
        "Company Name": "Tech Solutions Inc."
      }
    },
    {
      fileName: "invoice_002.pdf",
      status: "success",
      data: {
        "Invoice Number": "INV-2024-002",
        "Date": "2024-03-16",
        "Amount": "$2,780.50",
        "Company Name": "Digital Services Ltd."
      }
    },
    {
      fileName: "invoice_003.pdf",
      status: "failed",
      data: {
        "Invoice Number": "-",
        "Date": "-",
        "Amount": "-",
        "Company Name": "-"
      }
    }
  ];

  const [results, setResults] = useState<ExtractionResult[]>(initialResults);
  const [activeSchema, setActiveSchema] = useState<SchemaField[]>(demoSchemas[0]);

  const handleSaveSchema = (schema: SchemaField[]) => {
    setSchemas([...schemas, schema]);
  };

  const handleExtract = async (files: File[], schemaId: number) => {
    // Mock extraction results for demonstration
    const mockResults: ExtractionResult[] = files.map(file => {
      const isSuccess = Math.random() > 0.2;
      const mockData: Record<string, string> = {};
      
      // Generate mock data based on the selected schema
      schemas[schemaId].forEach(field => {
        if (field.type === "number") {
          mockData[field.name] = `$${(Math.random() * 1000).toFixed(2)}`;
        } else if (field.type === "date") {
          mockData[field.name] = new Date().toISOString().split('T')[0];
        } else {
          mockData[field.name] = `Sample ${field.name}`;
        }
      });

      return {
        fileName: file.name,
        status: isSuccess ? "success" : "failed",
        data: mockData
      };
    });

    setActiveSchema(schemas[schemaId]);
    setResults([...results, ...mockResults]);
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
      
      <Tabs defaultValue="results" className="space-y-8">
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
          <ExtractionResults results={results} schema={activeSchema} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
