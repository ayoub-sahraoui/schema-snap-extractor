import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-all
        ${isDragActive 
          ? 'border-primary bg-primary/5 scale-[1.02]' 
          : 'border-muted hover:border-primary/50 hover:bg-muted/30'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        {isDragActive ? (
          <>
            <div className="p-4 rounded-full bg-primary/10">
              <Image className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-primary">Drop files here</p>
              <p className="text-sm text-muted-foreground mt-1">Release to upload your files</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 rounded-full bg-muted">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Drag & drop files here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to select files</p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};