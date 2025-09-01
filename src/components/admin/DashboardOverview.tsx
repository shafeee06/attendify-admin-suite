import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Trainers',
      value: '12',
      change: '+2 this month',
      icon: Users,
      color: 'bg-primary',
    },
    {
      title: 'Active Trainers',
      value: '10',
      change: '83% active rate',
      icon: UserCheck,
      color: 'bg-success',
    },
    {
      title: 'Total Batches',
      value: '8',
      change: '+1 this week',
      icon: Calendar,
      color: 'bg-accent',
    },
    {
      title: 'Attendance Rate',
      value: '94%',
      change: '+5% from last week',
      icon: TrendingUp,
      color: 'bg-gradient-success',
    },
  ];

  const recentActivity = [
    { action: 'New trainer added', trainer: 'Sarah Wilson', time: '2 hours ago' },
    { action: 'Attendance marked', trainer: 'John Smith', time: '4 hours ago' },
    { action: 'Trainer activated', trainer: 'Mike Johnson', time: '1 day ago' },
    { action: 'New batch created', trainer: 'Admin User', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your attendance management system at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0 animate-slide-in-right">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.trainer}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Database</span>
                </div>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Authentication</span>
                </div>
                <span className="text-sm text-success font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Last Backup</span>
                </div>
                <span className="text-sm text-primary font-medium">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;