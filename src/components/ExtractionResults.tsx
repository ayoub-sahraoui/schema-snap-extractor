import React from 'react';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Download, Check, X } from 'lucide-react';
import { Button } from './ui/button';
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

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Extraction Results</h2>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2" />
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
              <TableRow key={index}>
                <TableCell>{result.fileName}</TableCell>
                <TableCell>
                  {result.status === 'success' ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
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
  );
};