"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const materials = [
  { 
    id: 'pla', 
    name: 'PLA', 
    price: '₹45/100g',
    description: 'Easy printing, biodegradable, good for prototypes',
    colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Gray'],
    properties: ['Easy to print', 'Biodegradable', 'Low warping']
  },
  { 
    id: 'petg', 
    name: 'PETG', 
    price: '₹65/100g',
    description: 'Chemical resistant, food safe, durable',
    colors: ['Clear', 'White', 'Black', 'Red', 'Blue'],
    properties: ['Chemical resistant', 'Food safe', 'Strong']
  },
  { 
    id: 'abs', 
    name: 'ABS', 
    price: '₹55/100g',
    description: 'Heat resistant, impact resistant, automotive grade',
    colors: ['White', 'Black', 'Red', 'Blue', 'Yellow'],
    properties: ['Heat resistant', 'Impact resistant', 'Automotive grade']
  },
  { 
    id: 'nylon', 
    name: 'Nylon', 
    price: '₹125/100g',
    description: 'Engineering grade, high strength, wear resistant',
    colors: ['Natural', 'Black', 'White'],
    properties: ['Engineering grade', 'High strength', 'Wear resistant']
  }
];

const postProcessing = [
  { id: 'sanding', name: 'Sanding', price: '₹50/part', description: 'Smooth surface finish' },
  { id: 'primer', name: 'Primer Coat', price: '₹75/part', description: 'Base coat for painting' },
  { id: 'paint', name: 'Color Paint', price: '₹125/part', description: 'Custom color finishing' },
  { id: 'vapor', name: 'Vapor Smoothing', price: '₹200/part', description: 'Chemical smoothing for ABS' }
];

interface MaterialSelectorProps {
  onOptionsChange: (options: any) => void;
}

export default function MaterialSelector({ onOptionsChange }: MaterialSelectorProps) {
  const [selectedMaterial, setSelectedMaterial] = useState('pla');
  const [options, setOptions] = useState({
    material: 'pla',
    color: 'White',
    layerHeight: [0.2],
    infill: [20],
    supports: false,
    quantity: 1,
    postProcessing: []
  });

  const updateOptions = (newOptions: any) => {
    const updated = { ...options, ...newOptions };
    setOptions(updated);
    onOptionsChange(updated);
  };

  const togglePostProcessing = (stepId: string) => {
    const currentSteps = options.postProcessing || [];
    const updated = currentSteps.includes(stepId)
      ? currentSteps.filter(id => id !== stepId)
      : [...currentSteps, stepId];
    updateOptions({ postProcessing: updated });
  };

  const selectedMat = materials.find(m => m.id === selectedMaterial);

  return (
    <div className="space-y-8">
      {/* Material Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Material</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {materials.map((material) => (
            <Card 
              key={material.id}
              className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                selectedMaterial === material.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedMaterial(material.id);
                updateOptions({ material: material.id });
              }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold">{material.name}</h4>
                  <Badge variant="outline">{material.price}</Badge>
                </div>
                <p className="text-gray-600 mb-3">{material.description}</p>
                <div className="flex flex-wrap gap-1">
                  {material.properties.map(prop => (
                    <Badge key={prop} variant="secondary" className="text-xs">{prop}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Print Options */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Print Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="color" className="text-sm font-medium">Color</Label>
              <Select onValueChange={(value) => updateOptions({ color: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMat?.colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Layer Height: {options.layerHeight[0]}mm</Label>
              <Slider
                value={options.layerHeight}
                onValueChange={(value) => updateOptions({ layerHeight: value })}
                max={0.3}
                min={0.1}
                step={0.05}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Fine (0.1mm)</span>
                <span>Standard (0.2mm)</span>
                <span>Draft (0.3mm)</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Infill: {options.infill[0]}%</Label>
              <Slider
                value={options.infill}
                onValueChange={(value) => updateOptions({ infill: value })}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="supports" className="text-sm font-medium">Add Supports</Label>
              <Switch
                id="supports"
                checked={options.supports}
                onCheckedChange={(checked) => updateOptions({ supports: checked })}
              />
            </div>

            <div>
              <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={options.quantity}
                onChange={(e) => updateOptions({ quantity: parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Post-Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {postProcessing.map((step) => (
                <div key={step.id} className="flex items-center space-x-3">
                  <Switch
                    checked={options.postProcessing?.includes(step.id) || false}
                    onCheckedChange={() => togglePostProcessing(step.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{step.name}</span>
                      <Badge variant="outline">{step.price}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}