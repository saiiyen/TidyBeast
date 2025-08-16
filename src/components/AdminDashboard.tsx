import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Download,
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  service_type: string;
  service_name: string;
  address: string;
  date: string;
  time: string;
  price: number;
  payment_status: 'pending' | 'completed' | 'failed';
  booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  special_requirements?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    completedBookings: 0,
    pendingBookings: 0,
    avgRating: 4.8
  });
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    try {
      // Read bookings from localStorage
      const storedBookings = localStorage.getItem('tidybeast_bookings');
      const bookingsData = storedBookings ? JSON.parse(storedBookings) : [];
      
      // Sort by created_at descending
      const sortedBookings = bookingsData.sort((a: Booking, b: Booking) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setBookings(sortedBookings);
      calculateStats(sortedBookings);
      
      console.log('Loaded bookings from localStorage:', sortedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData: Booking[]) => {
    const totalBookings = bookingsData.length;
    const totalRevenue = bookingsData
      .filter(b => b.payment_status === 'completed')
      .reduce((sum, b) => sum + b.price, 0);
    const completedBookings = bookingsData.filter(b => b.booking_status === 'completed').length;
    const pendingBookings = bookingsData.filter(b => b.booking_status === 'pending').length;

    setStats({
      totalBookings,
      totalRevenue,
      completedBookings,
      pendingBookings,
      avgRating: 4.8
    });
  };

  const updateBookingStatus = (bookingId: string, status: string) => {
    try {
      // Update booking in localStorage
      const storedBookings = localStorage.getItem('tidybeast_bookings');
      const bookingsData = storedBookings ? JSON.parse(storedBookings) : [];
      
      const updatedBookings = bookingsData.map((booking: Booking) => 
        booking.id === bookingId 
          ? { ...booking, booking_status: status }
          : booking
      );
      
      localStorage.setItem('tidybeast_bookings', JSON.stringify(updatedBookings));

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, booking_status: status as any }
            : booking
        )
      );

      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Date', 'Customer Name', 'Email', 'Phone', 'Service', 'Amount', 'Payment Status', 'Booking Status'].join(','),
      ...bookings.map(booking => [
        new Date(booking.created_at).toLocaleDateString(),
        booking.user_name,
        booking.user_email,
        booking.user_phone,
        booking.service_name,
        booking.price,
        booking.payment_status,
        booking.booking_status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tidy-beast-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Bookings exported successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TidyBeast Admin Dashboard</h1>
          <p className="text-gray-600">Manage your cleaning service bookings and track performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            icon={Calendar} 
            color="text-blue-600"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toLocaleString()}`} 
            icon={DollarSign} 
            color="text-green-600"
          />
          <StatCard 
            title="Completed" 
            value={stats.completedBookings} 
            icon={CheckCircle} 
            color="text-emerald-600"
          />
          <StatCard 
            title="Pending" 
            value={stats.pendingBookings} 
            icon={Clock} 
            color="text-yellow-600"
          />
          <StatCard 
            title="Avg Rating" 
            value={stats.avgRating} 
            icon={Star} 
            color="text-purple-600"
          />
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            
            <Button onClick={exportToExcel} className="bg-teal-600 hover:bg-teal-700">
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Service</th>
                        <th className="text-left p-4 font-medium">Date & Time</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Payment</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.user_name}</p>
                              <p className="text-sm text-gray-500">{booking.user_email}</p>
                              <p className="text-sm text-gray-500">{booking.user_phone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.service_name}</p>
                              <p className="text-sm text-gray-500">{booking.service_type}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.date}</p>
                              <p className="text-sm text-gray-500">{booking.time}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-green-600">₹{booking.price.toLocaleString()}</p>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(booking.payment_status)}>
                              {booking.payment_status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(booking.booking_status)}>
                              {booking.booking_status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              {booking.booking_status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Confirm
                                </Button>
                              )}
                              {booking.booking_status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Complete
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue chart would go here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Service distribution chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Customer management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
