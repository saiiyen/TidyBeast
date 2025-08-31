export interface Booking {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: string;
  serviceName: string;
  address: string;
  date: string;
  time: string;
  price: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  bookingStatus: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  specialRequirements?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  upiId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  bookingId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// Mock data for demonstration
const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    userId: 'user-1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '+91 9876543210',
    serviceType: 'Home Cleaning',
    serviceName: 'Deep Cleaning Service',
    address: '123 Main Street, Bangalore, Karnataka',
    date: '2024-01-20',
    time: '10:00 AM',
    price: 2500,
    paymentStatus: 'completed',
    paymentId: 'pay-1',
    bookingStatus: 'completed',
    specialRequirements: 'Please use eco-friendly products',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-2',
    userName: 'Sarah Wilson',
    userEmail: 'sarah@example.com',
    userPhone: '+91 9876543211',
    serviceType: 'Office Cleaning',
    serviceName: 'Regular Office Cleaning',
    address: '456 Business Park, Mumbai, Maharashtra',
    date: '2024-01-18',
    time: '2:00 PM',
    price: 4000,
    paymentStatus: 'completed',
    paymentId: 'pay-2',
    bookingStatus: 'in_progress',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-3',
    userName: 'Raj Patel',
    userEmail: 'raj@example.com',
    userPhone: '+91 9876543212',
    serviceType: 'Home Cleaning',
    serviceName: 'Move-in Cleaning',
    address: '789 Residency, Delhi, Delhi',
    date: '2024-01-22',
    time: '11:00 AM',
    price: 3500,
    paymentStatus: 'pending',
    bookingStatus: 'confirmed',
    specialRequirements: 'Need cleaning for 3BHK apartment',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-4',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    userPhone: '+91 9876543213',
    serviceType: 'Specialized Cleaning',
    serviceName: 'Carpet & Sofa Cleaning',
    address: '321 Green Avenue, Chennai, Tamil Nadu',
    date: '2024-01-15',
    time: '3:00 PM',
    price: 1800,
    paymentStatus: 'completed',
    paymentId: 'pay-3',
    bookingStatus: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'booking-5',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    userPhone: '+91 9876543214',
    serviceType: 'Home Cleaning',
    serviceName: 'Regular Cleaning',
    address: '555 Park View, Pune, Maharashtra',
    date: '2024-01-16',
    time: '9:00 AM',
    price: 2200,
    paymentStatus: 'completed',
    paymentId: 'pay-4',
    bookingStatus: 'completed',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    bookingId: 'booking-1',
    amount: 2500,
    paymentMethod: 'UPI',
    transactionId: 'TXN1234567890',
    upiId: '9959047238@axl',
    status: 'completed',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pay-2',
    bookingId: 'booking-2',
    amount: 4000,
    paymentMethod: 'UPI',
    transactionId: 'TXN1234567891',
    upiId: '9959047238@axl',
    status: 'completed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pay-3',
    bookingId: 'booking-4',
    amount: 1800,
    paymentMethod: 'UPI',
    transactionId: 'TXN1234567892',
    upiId: '9959047238@axl',
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pay-4',
    bookingId: 'booking-5',
    amount: 2200,
    paymentMethod: 'UPI',
    transactionId: 'TXN1234567893',
    upiId: '9959047238@axl',
    status: 'completed',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const MOCK_FEEDBACK: Feedback[] = [
  {
    id: 'feedback-1',
    bookingId: 'booking-1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    rating: 5,
    comment: 'Excellent service! Very thorough and professional.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'feedback-2',
    bookingId: 'booking-4',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    rating: 4,
    comment: 'Good job on the carpet cleaning. Very satisfied.',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'feedback-3',
    bookingId: 'booking-5',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    rating: 5,
    comment: 'Amazing work! Will definitely book again.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Mock Data Store Class
export class MockDataStore {
  private static instance: MockDataStore;
  
  static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore();
    }
    return MockDataStore.instance;
  }

  private constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with mock data if not already present
    if (!localStorage.getItem('tidybeast_bookings')) {
      localStorage.setItem('tidybeast_bookings', JSON.stringify(MOCK_BOOKINGS));
    }
    if (!localStorage.getItem('tidybeast_payments')) {
      localStorage.setItem('tidybeast_payments', JSON.stringify(MOCK_PAYMENTS));
    }
    if (!localStorage.getItem('tidybeast_feedback')) {
      localStorage.setItem('tidybeast_feedback', JSON.stringify(MOCK_FEEDBACK));
    }
  }

  // Bookings
  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem('tidybeast_bookings') || '[]');
  }

  addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem('tidybeast_bookings', JSON.stringify(bookings));
    return newBooking;
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('tidybeast_bookings', JSON.stringify(bookings));
    return bookings[index];
  }

  getBookingsByUser(userId: string): Booking[] {
    return this.getBookings().filter(b => b.userId === userId);
  }

  // Payments
  getPayments(): Payment[] {
    return JSON.parse(localStorage.getItem('tidybeast_payments') || '[]');
  }

  addPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Payment {
    const payments = this.getPayments();
    const newPayment: Payment = {
      ...payment,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    payments.push(newPayment);
    localStorage.setItem('tidybeast_payments', JSON.stringify(payments));
    return newPayment;
  }

  // Feedback
  getFeedback(): Feedback[] {
    return JSON.parse(localStorage.getItem('tidybeast_feedback') || '[]');
  }

  addFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback {
    const feedbackList = this.getFeedback();
    const newFeedback: Feedback = {
      ...feedback,
      id: `feedback-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    feedbackList.push(newFeedback);
    localStorage.setItem('tidybeast_feedback', JSON.stringify(feedbackList));
    return newFeedback;
  }

  // Analytics
  getAnalytics() {
    const bookings = this.getBookings();
    const payments = this.getPayments();
    const feedback = this.getFeedback();

    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedPayments = payments.filter(p => p.status === 'completed');
    
    return {
      totalRevenue: completedPayments.reduce((sum, p) => sum + p.amount, 0),
      monthlyRevenue: completedPayments
        .filter(p => new Date(p.createdAt) >= thisMonth)
        .reduce((sum, p) => sum + p.amount, 0),
      weeklyRevenue: completedPayments
        .filter(p => new Date(p.createdAt) >= thisWeek)
        .reduce((sum, p) => sum + p.amount, 0),
      
      totalBookings: bookings.length,
      monthlyBookings: bookings.filter(b => new Date(b.createdAt) >= thisMonth).length,
      weeklyBookings: bookings.filter(b => new Date(b.createdAt) >= thisWeek).length,
      
      completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
      pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
      inProgressBookings: bookings.filter(b => b.bookingStatus === 'in_progress').length,
      
      averageRating: feedback.length > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0,
      totalFeedback: feedback.length,
      
      recentBookings: bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
      recentPayments: payments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    };
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem('tidybeast_bookings');
    localStorage.removeItem('tidybeast_payments');
    localStorage.removeItem('tidybeast_feedback');
    this.initializeData();
  }
}

export const mockStore = MockDataStore.getInstance();
