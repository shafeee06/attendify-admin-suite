import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { UserPlus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Trainer } from '@/types';
import AddTrainerForm from './AddTrainerForm';
import { useToast } from '@/hooks/use-toast';

const TrainerManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@attendify.com',
      phone: '+1234567890',
      assignedBatches: ['Batch A', 'Batch B'],
      username: 'john.smith',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@attendify.com',
      phone: '+1234567891',
      assignedBatches: ['Batch C'],
      username: 'sarah.wilson',
      status: 'active',
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@attendify.com',
      phone: '+1234567892',
      assignedBatches: ['Batch D', 'Batch E'],
      username: 'mike.johnson',
      status: 'inactive',
      createdAt: '2024-01-05',
    },
  ]);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (trainerId: string, newStatus: 'active' | 'inactive') => {
    setTrainers(prev => prev.map(trainer =>
      trainer.id === trainerId ? { ...trainer, status: newStatus } : trainer
    ));
    
    const trainer = trainers.find(t => t.id === trainerId);
    toast({
      title: "Trainer Status Updated",
      description: `${trainer?.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleAddTrainer = (newTrainer: Omit<Trainer, 'id' | 'createdAt'>) => {
    const trainer: Trainer = {
      ...newTrainer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setTrainers(prev => [...prev, trainer]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Trainer Added Successfully",
      description: `${trainer.name} has been added to the system.`,
    });
  };

  const handleDeleteTrainer = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    setTrainers(prev => prev.filter(t => t.id !== trainerId));
    
    toast({
      title: "Trainer Deleted",
      description: `${trainer?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Trainer Management</h2>
          <p className="text-gray-600">Manage trainer accounts and permissions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="shadow-lg">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Trainer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <DialogTitle>Add New Trainer</DialogTitle>
              <DialogDescription>
                Create a new trainer account with access credentials.
              </DialogDescription>
            </DialogHeader>
            <AddTrainerForm onSubmit={handleAddTrainer} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg border-0 animate-fade-in">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search trainers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:shadow-lg"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-2">
              {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer, index) => (
          <Card key={trainer.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{trainer.name}</CardTitle>
                  <CardDescription>@{trainer.username}</CardDescription>
                </div>
                <Badge variant={trainer.status === 'active' ? 'default' : 'secondary'}>
                  {trainer.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {trainer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {trainer.phone}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Assigned Batches</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.assignedBatches.map((batch) => (
                    <Badge key={batch} variant="outline" className="text-xs">
                      {batch}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">Active Status</span>
                  <Switch
                    checked={trainer.status === 'active'}
                    onCheckedChange={(checked) => 
                      handleStatusToggle(trainer.id, checked ? 'active' : 'inactive')
                    }
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteTrainer(trainer.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {trainer.lastLogin && (
                <p className="text-xs text-gray-500">
                  Last login: {trainer.lastLogin}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerManagement;