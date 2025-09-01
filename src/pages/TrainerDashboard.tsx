import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, LogOut, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TrainerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mockBatches = [
    { id: '1', name: 'Batch A', students: 30, nextClass: '10:00 AM', status: 'active' },
    { id: '2', name: 'Batch B', students: 25, nextClass: '2:00 PM', status: 'active' },
  ];

  const mockAttendance = [
    { date: '2024-01-20', batch: 'Batch A', present: 28, total: 30 },
    { date: '2024-01-20', batch: 'Batch B', present: 23, total: 25 },
    { date: '2024-01-19', batch: 'Batch A', present: 29, total: 30 },
  ];

  const handleMarkAttendance = (batchId: string) => {
    toast({
      title: "Attendance Marked",
      description: "Attendance has been successfully recorded.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-success bg-clip-text text-transparent">
                Trainer Portal
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="animate-scale-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">Manage your batches and track attendance</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Batches</p>
                    <p className="text-3xl font-bold text-gray-900">{mockBatches.length}</p>
                  </div>
                  <div className="p-3 bg-success rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {mockBatches.reduce((acc, batch) => acc + batch.students, 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-primary rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Classes</p>
                    <p className="text-3xl font-bold text-gray-900">2</p>
                  </div>
                  <div className="p-3 bg-accent rounded-full">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Batches */}
            <Card className="shadow-lg border-0 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  My Batches
                </CardTitle>
                <CardDescription>Manage your assigned batches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBatches.map((batch, index) => (
                  <div key={batch.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                       style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                        <p className="text-sm text-gray-600">{batch.students} students</p>
                      </div>
                      <Badge variant="default">{batch.status}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="h-4 w-4" />
                      Next class: {batch.nextClass}
                    </div>
                    
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleMarkAttendance(batch.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Attendance
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Attendance */}
            <Card className="shadow-lg border-0 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Attendance
                </CardTitle>
                <CardDescription>Your recent attendance records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAttendance.map((record, index) => {
                  const percentage = Math.round((record.present / record.total) * 100);
                  return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg animate-fade-in"
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{record.batch}</h4>
                          <p className="text-sm text-gray-600">{record.date}</p>
                        </div>
                        <Badge variant={percentage >= 90 ? 'default' : percentage >= 80 ? 'secondary' : 'destructive'}>
                          {percentage}%
                        </Badge>
                      </div>
                      
                      <div className="flex gap-4 text-sm">
                        <span className="text-success">Present: {record.present}</span>
                        <span className="text-destructive">Absent: {record.total - record.present}</span>
                        <span className="text-gray-600">Total: {record.total}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;