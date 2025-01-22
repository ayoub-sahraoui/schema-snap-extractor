import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Schema Builder</h2>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Schema
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              placeholder="Field name"
              value={field.name}
              onChange={(e) => updateField(index, { name: e.target.value })}
              className="flex-1"
            />
            <Select
              value={field.type}
              onValueChange={(value) => updateField(index, { type: value as SchemaField['type'] })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
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

      <Button onClick={addField} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Field
      </Button>
    </Card>
  );
};