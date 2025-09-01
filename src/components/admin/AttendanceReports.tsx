import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Filter, BarChart3 } from 'lucide-react';
import { AttendanceRecord } from '@/types';

const AttendanceReports = () => {
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      trainerId: '1',
      trainerName: 'John Smith',
      batchId: 'batch-a',
      batchName: 'Batch A',
      date: '2024-01-20',
      present: 28,
      absent: 2,
      total: 30,
    },
    {
      id: '2',
      trainerId: '2',
      trainerName: 'Sarah Wilson',
      batchId: 'batch-c',
      batchName: 'Batch C',
      date: '2024-01-20',
      present: 25,
      absent: 0,
      total: 25,
    },
    {
      id: '3',
      trainerId: '1',
      trainerName: 'John Smith',
      batchId: 'batch-b',
      batchName: 'Batch B',
      date: '2024-01-19',
      present: 22,
      absent: 3,
      total: 25,
    },
  ];

  const getAttendancePercentage = (record: AttendanceRecord) => {
    return Math.round((record.present / record.total) * 100);
  };

  const getBadgeVariant = (percentage: number) => {
    if (percentage >= 95) return 'default';
    if (percentage >= 85) return 'secondary';
    return 'destructive';
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Trainer', 'Batch', 'Present', 'Absent', 'Total', 'Percentage'].join(','),
      ...attendanceRecords.map(record => [
        record.date,
        record.trainerName,
        record.batchName,
        record.present,
        record.absent,
        record.total,
        `${getAttendancePercentage(record)}%`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const summaryStats = {
    totalSessions: attendanceRecords.length,
    averageAttendance: Math.round(
      attendanceRecords.reduce((acc, record) => acc + getAttendancePercentage(record), 0) / attendanceRecords.length
    ),
    totalStudents: attendanceRecords.reduce((acc, record) => acc + record.total, 0),
    totalPresent: attendanceRecords.reduce((acc, record) => acc + record.present, 0),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Attendance Reports</h2>
          <p className="text-gray-600">Monitor and analyze attendance patterns</p>
        </div>
        
        <Button variant="gradient" onClick={exportToCSV} className="shadow-lg">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalSessions}</p>
              </div>
              <div className="p-3 bg-primary rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.averageAttendance}%</p>
              </div>
              <div className="p-3 bg-success rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalStudents}</p>
              </div>
              <div className="p-3 bg-accent rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalPresent}</p>
              </div>
              <div className="p-3 bg-gradient-success rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="trainer">By Trainer</SelectItem>
                  <SelectItem value="batch">By Batch</SelectItem>
                  <SelectItem value="date">By Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date range..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card className="shadow-lg border-0 animate-slide-in-right">
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
          <CardDescription>Latest attendance submissions from trainers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceRecords.map((record, index) => {
              const percentage = getAttendancePercentage(record);
              return (
                <div key={record.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{record.batchName}</h4>
                        <Badge variant="outline">{record.date}</Badge>
                        <Badge variant={getBadgeVariant(percentage)}>
                          {percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Trainer: {record.trainerName}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-success">Present: {record.present}</span>
                        <span className="text-destructive">Absent: {record.absent}</span>
                        <span className="text-gray-600">Total: {record.total}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className={`text-2xl font-bold ${
                          percentage >= 95 ? 'text-success' : 
                          percentage >= 85 ? 'text-primary' : 'text-destructive'
                        }`}>
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceReports;