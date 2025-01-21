import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export interface SchemaField {
  name: string;
  type: 'text' | 'number' | 'date';
}

interface SchemaBuilderProps {
  onSave: (schema: SchemaField[]) => void;
}

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ onSave }) => {
  const [fields, setFields] = useState<SchemaField[]>([
    { name: '', type: 'text' }
  ]);

  const addField = () => {
    setFields([...fields, { name: '', type: 'text' }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: Partial<SchemaField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const handleSave = () => {
    if (fields.some(field => !field.name)) {
      toast.error('All fields must have a name');
      return;
    }
    onSave(fields);
    toast.success('Schema saved successfully');
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Schema Builder</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-4">
            <Input
              placeholder="Field name"
              value={field.name}
              onChange={(e) => updateField(index, { name: e.target.value })}
              className="flex-1"
            />
            <select
              value={field.type}
              onChange={(e) => updateField(index, { type: e.target.value as SchemaField['type'] })}
              className="px-3 py-2 border rounded-md"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeField(index)}
              disabled={fields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <Button onClick={addField} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
        <Button onClick={handleSave}>Save Schema</Button>
      </div>
    </Card>
  );
};