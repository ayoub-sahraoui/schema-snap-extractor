import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Play } from 'lucide-react';
import { toast } from 'sonner';
import type { SchemaField } from './SchemaBuilder';

interface ExtractionTaskProps {
  schemas: SchemaField[][];
  onExtract: (files: File[], schemaId: number) => void;
}

export const ExtractionTask: React.FC<ExtractionTaskProps> = ({ schemas, onExtract }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<string>('');

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    toast.success(`${files.length} files selected`);
  };

  const handleExtract = () => {
    if (!selectedSchema) {
      toast.error('Please select a schema');
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error('Please select files to process');
      return;
    }
    onExtract(selectedFiles, parseInt(selectedSchema));
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Extract Data</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Schema</label>
          <Select value={selectedSchema} onValueChange={setSelectedSchema}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a schema" />
            </SelectTrigger>
            <SelectContent>
              {schemas.map((schema, index) => (
                <SelectItem key={index} value={index.toString()}>
                  Schema {index + 1} ({schema[0]?.name || 'Unnamed'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Files</label>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {selectedFiles.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <ul className="space-y-1">
              {selectedFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button onClick={handleExtract} className="w-full">
          <Play className="mr-2" />
          Start Extraction
        </Button>
      </div>
    </Card>
  );
};