import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Admin Control',
      description: 'Comprehensive admin panel for managing trainers and system settings',
    },
    {
      icon: Users,
      title: 'Trainer Management',
      description: 'Easily add, edit, and manage trainer accounts with role-based access',
    },
    {
      icon: BarChart3,
      title: 'Advanced Reports',
      description: 'Detailed attendance analytics and reporting with export capabilities',
    },
    {
      icon: CheckCircle,
      title: 'Real-time Tracking',
      description: 'Live attendance marking and instant synchronization across all devices',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 animate-scale-in">
            Attendify
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Modern Attendance Management System for Educational Institutions
          </p>
          <p className="text-lg text-white/80 mb-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
            Streamline attendance tracking with our comprehensive admin suite featuring trainer management, 
            real-time reporting, and intuitive dashboards.
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate('/login')}
              className="shadow-xl hover:shadow-2xl"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white hover:text-primary shadow-xl"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${800 + index * 100}ms` }}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-fit">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl animate-scale-in" style={{ animationDelay: '1200ms' }}>
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Attendance Management?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join educational institutions worldwide using Attendify for streamlined attendance tracking.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate('/login')}
                className="shadow-xl hover:shadow-2xl text-lg px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
