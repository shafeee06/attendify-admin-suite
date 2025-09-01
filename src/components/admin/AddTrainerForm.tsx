import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trainer } from '@/types';

interface AddTrainerFormProps {
  onSubmit: (trainer: Omit<Trainer, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const AddTrainerForm: React.FC<AddTrainerFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    assignedBatches: [] as string[],
    status: 'active' as 'active' | 'inactive',
  });

  const availableBatches = ['Batch A', 'Batch B', 'Batch C', 'Batch D', 'Batch E'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBatchToggle = (batch: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      assignedBatches: checked
        ? [...prev.assignedBatches, batch]
        : prev.assignedBatches.filter(b => b !== batch)
    }));
  };

  const generateUsername = () => {
    const name = formData.name.toLowerCase().replace(/\s+/g, '.');
    setFormData(prev => ({ ...prev, username: name }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter full name"
            required
            className="transition-all duration-200 focus:shadow-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter email address"
            required
            className="transition-all duration-200 focus:shadow-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Enter phone number"
            required
            className="transition-all duration-200 focus:shadow-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="flex gap-2">
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter username"
              required
              className="transition-all duration-200 focus:shadow-lg"
            />
            <Button type="button" variant="outline" onClick={generateUsername} size="sm">
              Generate
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => 
          setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="transition-all duration-200 focus:shadow-lg">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Assigned Batches</Label>
        <div className="grid grid-cols-2 gap-3">
          {availableBatches.map((batch) => (
            <div key={batch} className="flex items-center space-x-2">
              <Checkbox
                id={batch}
                checked={formData.assignedBatches.includes(batch)}
                onCheckedChange={(checked) => handleBatchToggle(batch, checked as boolean)}
              />
              <Label htmlFor={batch} className="text-sm font-normal">
                {batch}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          Add Trainer
        </Button>
      </div>
    </form>
  );
};

export default AddTrainerForm;