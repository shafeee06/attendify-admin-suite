import React, { useState } from 'react';
import { Users, UserPlus, BarChart3, Calendar, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TrainerManagement from '@/components/admin/TrainerManagement';
import AttendanceReports from '@/components/admin/AttendanceReports';
import DashboardOverview from '@/components/admin/DashboardOverview';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trainers', label: 'Trainer Management', icon: Users },
    { id: 'reports', label: 'Attendance Reports', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Attendify Admin
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
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="shadow-lg border-0 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
                <CardDescription>Manage your attendance system</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-gray-50 ${
                          activeTab === item.id
                            ? 'bg-primary text-primary-foreground border-r-4 border-primary'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="animate-scale-in">
              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'trainers' && <TrainerManagement />}
              {activeTab === 'reports' && <AttendanceReports />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;