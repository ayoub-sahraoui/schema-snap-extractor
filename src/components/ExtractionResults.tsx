import React, { useState } from 'react';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Download, CheckCircle2, XCircle, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { SchemaField } from './SchemaBuilder';

interface ExtractionResult {
  fileName: string;
  status: 'success' | 'failed';
  data: Record<string, string>;
}

interface ExtractionResultsProps {
  results: ExtractionResult[];
  schema: SchemaField[];
}

export const ExtractionResults: React.FC<ExtractionResultsProps> = ({ results, schema }) => {
  const [selectedResult, setSelectedResult] = useState<ExtractionResult | null>(null);

  const handleDownload = () => {
    // Convert results to CSV
    const headers = ['File Name', 'Status', ...schema.map(field => field.name)];
    const csvContent = [
      headers.join(','),
      ...results.map(result => [
        result.fileName,
        result.status,
        ...schema.map(field => result.data[field.name] || '')
      ].join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraction_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRowClick = (result: ExtractionResult) => {
    setSelectedResult(result);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Extraction Results</h2>
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Status</TableHead>
                {schema.map((field, index) => (
                  <TableHead key={index}>{field.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow 
                  key={index} 
                  className="cursor-pointer hover:bg-muted/60"
                  onClick={() => handleRowClick(result)}
                >
                  <TableCell>{result.fileName}</TableCell>
                  <TableCell>
                    {result.status === 'success' ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-green-500 w-4 h-4" />
                        <span className="text-green-600 text-sm">Success</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="text-red-500 w-4 h-4" />
                        <span className="text-red-600 text-sm">Failed</span>
                      </div>
                    )}
                  </TableCell>
                  {schema.map((field, fieldIndex) => (
                    <TableCell key={fieldIndex}>{result.data[field.name] || '-'}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Extraction Details - {selectedResult?.fileName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">Status:</span>
              {selectedResult?.status === 'success' ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500 w-4 h-4" />
                  <span className="text-green-600">Success</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-500 w-4 h-4" />
                  <span className="text-red-600">Failed</span>
                </div>
              )}
            </div>

            {/* Image Preview */}
            <div className="mb-4">
              <img 
                src="/placeholder.svg"
                alt="Document Preview"
                className="w-full h-48 object-cover rounded-lg bg-muted"
              />
            </div>

            <div className="grid gap-4">
              {selectedResult && schema.map((field, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/40">
                  <div className="font-medium">{field.name}:</div>
                  <div>{selectedResult.data[field.name] || '-'}</div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => {
                if (!selectedResult) return;
                const csvContent = [
                  ['Field', 'Value'],
                  ...schema.map(field => [
                    field.name,
                    selectedResult.data[field.name] || ''
                  ])
                ].map(row => row.join(',')).join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedResult.fileName}_extraction.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              variant="outline"
              className="w-full mt-4"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Item as CSV
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};