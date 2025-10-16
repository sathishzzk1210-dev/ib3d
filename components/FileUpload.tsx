"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface FileUploadProps {
  onFilesChange: (files: FileWithPreview[]) => void;
}

export default function FileUpload({ onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    const newFiles: FileWithPreview[] = acceptedFiles.map(file => {
      const f = file as FileWithPreview;
      f.id = Math.random().toString(36).substr(2, 9);
      f.preview = URL.createObjectURL(file);
      return f;
    });

    setTimeout(() => {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
      setIsProcessing(false);
    }, 1500);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/step': ['.step', '.stp'],
      'application/zip': ['.zip']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <Card 
        {...getRootProps()} 
        className={`cursor-pointer border-2 border-dashed transition-all ${
          isDragActive 
            ? 'border-blue-600 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <CardContent className="p-12 text-center">
          <Upload className={`h-16 w-16 mx-auto mb-4 ${
            isDragActive ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <h3 className="text-xl font-semibold mb-2">
            {isDragActive ? 'Drop your files here' : 'Upload your 3D files'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag & drop your STL, OBJ, STEP files here, or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {['.STL', '.OBJ', '.STEP', '.STP', '.ZIP'].map(ext => (
              <Badge key={ext} variant="secondary">{ext}</Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500">Maximum file size: 50MB</p>
        </CardContent>
      </Card>

      {/* Processing State */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="flex-1">
                <p className="font-medium text-blue-800">Processing files...</p>
                <p className="text-sm text-blue-600">Analyzing geometry and calculating volume</p>
                <Progress value={75} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Uploaded Files ({files.length})</h3>
          {files.map((file) => (
            <Card key={file.id} className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-green-600">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>Volume: 12.5 cm³</span>
                        <span>•</span>
                        <span>Dimensions: 45×30×25mm</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}