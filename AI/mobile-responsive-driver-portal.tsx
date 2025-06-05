import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Package, 
  FileText, 
  MapPin, 
  Navigation, 
  Route, 
  History, 
  DollarSign, 
  User, 
  MessageSquare,
  Bell,
  CheckCircle,
  Clock,
  Phone,
  Camera,
  QrCode,
  AlertCircle,
  Info,
  X,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

const DriverPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverStatus, setDriverStatus] = useState('available');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close drawer when tab changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  }, [activeTab]);

  const sampleData = {
    driver: {
      name: "John Smith",
      id: "DRV001",
      rating: 4.8,
      todayEarnings: 285.50,
      completedToday: 12,
      pendingToday: 3
    },
    orders: [
      {
        id: "ORD-2024-001",
        customer: "Sarah Johnson",
        address: "123 Main St, Accra",
        phone: "+233 24 123 4567",
        items: ["Samsung Galaxy S24", "Phone Case"],
        value: 1200.00,
        fee: 25.00,
        timeWindow: "2:00 PM - 4:00 PM",
        status: "ready_pickup",
        paymentStatus: "paid"
      },
      {
        id: "ORD-2024-002", 
        customer: "Michael Asante",
        address: "456 Oak Ave, Tema",
        phone: "+233 20 987 6543",
        items: ["MacBook Air", "Wireless Mouse"],
        value: 2800.00,
        fee: 45.00,
        timeWindow: "4:00 PM - 6:00 PM", 
        status: "assigned",
        paymentStatus: "COD"
      }
    ],
    notifications: [
      {
        id: 1,
        type: "urgent",
        title: "Delivery Protocol Update",
        message: "New contactless delivery procedures are now in effect. Please review the updated guidelines.",
        time: "2 hours ago",
        read: false
      },
      {
        id: 2,
        type: "info",
        title: "Route Optimization Available",
        message: "Your delivery route for today has been optimized. Check the Route tab for updates.",
        time: "4 hours ago",
        read: false
      },
      {
        id: 3,
        type: "success",
        title: "Payment Processed",
        message: "Your weekly earnings of ₵1,245.80 have been processed and will be deposited within 24 hours.",
        time: "1 day ago",
        read: true
      },
      {
        id: 4,
        type: "warning",
        title: "Weather Alert",
        message: "Heavy rain expected between 3-5 PM. Plan your deliveries accordingly.",
        time: "1 day ago",
        read: true
      },
      {
        id: 5,
        type: "info",
        title: "New Customer Feedback",
        message: "You received a 5-star rating from Sarah Johnson for order ORD-2024-001.",
        time: "2 days ago",
        read: true
      }
    ]
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      available: "bg-green-100 text-green-800",
      on_delivery: "bg-blue-100 text-blue-800", 
      offline: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${statusStyles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const renderNotifications = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold">Notifications</h2>
          <button className="text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium">
            Mark All as Read
          </button>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          {sampleData.notifications.map((notification) => {
            const getNotificationIcon = (type) => {
              switch(type) {
                case 'urgent': return <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />;
                case 'warning': return <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />;
                case 'success': return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />;
                default: return <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />;
              }
            };

            const getNotificationBg = (type, read) => {
              if (read) return 'bg-gray-50';
              switch(type) {
                case 'urgent': return 'bg-red-50 border-l-4 border-red-400';
                case 'warning': return 'bg-yellow-50 border-l-4 border-yellow-400';
                case 'success': return 'bg-green-50 border-l-4 border-green-400';
                default: return 'bg-blue-50 border-l-4 border-blue-400';
              }
            };

            return (
              <div key={notification.id} className={`p-3 md:p-4 rounded-lg ${getNotificationBg(notification.type, notification.read)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 md:space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-700 text-xs md:text-sm mb-2">{notification.message}</p>
                      <p className="text-gray-500 text-xs">{notification.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">Driver Dashboard</h2>
          <StatusBadge status={driverStatus} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-xs md:text-sm font-medium">Today's Earnings</p>
                <p className="text-xl md:text-2xl font-bold text-blue-800">₵{sampleData.driver.todayEarnings}</p>
              </div>
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="p-3 md:p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-xs md:text-sm font-medium">Completed</p>
                <p className="text-xl md:text-2xl font-bold text-green-800">{sampleData.driver.completedToday}</p>
              </div>
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </div>
          
          <div className="p-3 md:p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-xs md:text-sm font-medium">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-orange-800">{sampleData.driver.pendingToday}</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4">
          <div className="flex">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mr-2" />
            <div>
              <p className="text-yellow-800 font-medium text-sm md:text-base">Admin Notification</p>
              <p className="text-yellow-700 text-xs md:text-sm">New delivery protocol effective today. Check Communication Hub for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryAssignments = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Delivery Assignments</h2>
        
        {sampleData.orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-3 md:p-4 mb-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-base md:text-lg">{order.id}</h3>
                <p className="text-gray-600 text-sm">{order.customer}</p>
              </div>
              <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                order.status === 'ready_pickup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="space-y-1">
                <p className="flex items-center"><MapPin className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />{order.address}</p>
                <p className="flex items-center"><Phone className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />{order.phone}</p>
                <p className="flex items-center"><Clock className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />{order.timeWindow}</p>
              </div>
              <div className="space-y-1">
                <p>Items: {order.items.join(', ')}</p>
                <p>Order Value: ₵{order.value}</p>
                <p>Delivery Fee: ₵{order.fee}</p>
                <p>Payment: {order.paymentStatus}</p>
              </div>
            </div>
            
            <div className="mt-3 md:mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded hover:bg-blue-700 text-xs md:text-sm">
                View Details
              </button>
              <button className="bg-green-600 text-white px-3 md:px-4 py-2 rounded hover:bg-green-700 text-xs md:text-sm">
                Start Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPickupManagement = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Pickup Management</h2>
        
        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-sm md:text-base mb-2">Warehouse Location</h3>
          <p className="text-gray-700 text-sm">Main Distribution Center</p>
          <p className="text-gray-600 text-xs md:text-sm">789 Industrial Rd, Accra</p>
        </div>

        <div className="border rounded-lg p-3 md:p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h3 className="font-semibold text-sm md:text-base mb-2 md:mb-0">Order: ORD-2024-001</h3>
            <button className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-xs md:text-sm w-full md:w-auto justify-center">
              <QrCode className="w-4 h-4 mr-1" />
              Scan Code
            </button>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="item1" className="mr-2"/>
              <label htmlFor="item1" className="text-sm">Samsung Galaxy S24 (Qty: 1)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="item2" className="mr-2"/>
              <label htmlFor="item2" className="text-sm">Phone Case (Qty: 1)</label>
            </div>
          </div>
          
          <button className="mt-3 md:mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto text-sm">
            Mark as Picked Up
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeliveryTracking = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Active Delivery</h2>
        
        <div className="bg-green-50 p-3 md:p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-sm md:text-base">ORD-2024-001 - In Progress</h3>
          <p className="text-gray-700 text-sm">Delivering to: Sarah Johnson</p>
          <p className="text-gray-600 text-xs md:text-sm">123 Main St, Accra</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          <button className="bg-blue-600 text-white p-3 rounded flex items-center justify-center text-sm">
            <Navigation className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Open Navigation
          </button>
          <button className="bg-green-600 text-white p-3 rounded flex items-center justify-center text-sm">
            <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Call Customer
          </button>
        </div>

        <div className="space-y-2 md:space-y-3">
          <button className="w-full bg-gray-100 p-3 rounded text-left flex items-center text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            Picked up from warehouse
          </button>
          <button className="w-full bg-blue-100 p-3 rounded text-left flex items-center text-sm">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            En route to customer
          </button>
          <button className="w-full bg-gray-50 p-3 rounded text-left flex items-center text-sm">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
            Arrived at location
          </button>
        </div>

        <div className="mt-4 md:mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <Camera className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 text-sm">Take delivery photo</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Capture Photo
          </button>
        </div>

        <button className="w-full mt-4 bg-green-600 text-white p-3 rounded font-semibold text-sm">
          Mark as Delivered
        </button>
      </div>
    </div>
  );

  const renderPaymentEarnings = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Payment & Earnings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="p-3 md:p-4 bg-green-50 rounded-lg text-center">
            <h3 className="font-semibold text-green-800 text-sm">Today</h3>
            <p className="text-xl md:text-2xl font-bold text-green-600">₵285.50</p>
          </div>
          <div className="p-3 md:p-4 bg-blue-50 rounded-lg text-center">
            <h3 className="font-semibold text-blue-800 text-sm">This Week</h3>
            <p className="text-xl md:text-2xl font-bold text-blue-600">₵1,245.80</p>
          </div>
          <div className="p-3 md:p-4 bg-purple-50 rounded-lg text-center">
            <h3 className="font-semibold text-purple-800 text-sm">This Month</h3>
            <p className="text-xl md:text-2xl font-bold text-purple-600">₵4,890.25</p>
          </div>
        </div>

        <div className="border rounded-lg p-3 md:p-4">
          <h3 className="font-semibold text-sm md:text-base mb-3">COD Collections Today</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>ORD-2024-002 (M. Asante)</span>
              <span className="font-semibold">₵2,800.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-sm">
              <span>Total to Remit:</span>
              <span>₵2,800.00</span>
            </div>
          </div>
          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto text-sm">
            Report COD Collection
          </button>
        </div>
      </div>
    </div>
  );

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assignments', label: 'Assignments', icon: Package },
    { id: 'pickup', label: 'Pickup', icon: QrCode },
    { id: 'tracking', label: 'Delivery', icon: MapPin },
    { id: 'route', label: 'Route', icon: Route },
    { id: 'history', label: 'History', icon: History },
    { id: 'payments', label: 'Earnings', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Bottom navigation items for mobile
  const bottomNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'assignments': return renderDeliveryAssignments();
      case 'pickup': return renderPickupManagement();
      case 'tracking': return renderDeliveryTracking();
      case 'payments': return renderPaymentEarnings();
      case 'notifications': return renderNotifications();
      case 'settings': 
        return (
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Email notifications for new assignments</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">SMS alerts for urgent deliveries</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Push notifications for messages</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <input type="time" className="border rounded px-3 py-2 w-full" defaultValue="08:00" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Time</label>
                    <input type="time" className="border rounded px-3 py-2 w-full" defaultValue="18:00" />
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
                Save Settings
              </button>
            </div>
          </div>
        );
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">{navigationItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  const unreadNotifications = sampleData.notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* Mobile Navigation Drawer Overlay */}
      {isMobile && isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Desktop Sidebar / Mobile Navigation Drawer */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'fixed left-0 top-0 h-full z-30'
        }
        w-64 bg-white shadow-lg flex-shrink-0 flex flex-col
      `}>
        <div className="p-4 md:p-6 flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Driver Portal</h1>
          {isMobile && (
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <nav className="px-3 md:px-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isBottomNavItem = bottomNavItems.some(bnItem => bnItem.id === item.id);
              
              // Hide bottom nav items in drawer on mobile
              if (isMobile && isBottomNavItem) return null;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-md transition-colors text-sm ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </div>
                    {item.id === 'notifications' && unreadNotifications > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section with Settings and Sign Out */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-3 text-left rounded-md transition-colors text-sm ${
                  activeTab === 'settings'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to sign out?')) {
                    console.log('Signing out...');
                  }
                }}
                className="w-full flex items-center px-3 py-3 text-left rounded-md transition-colors text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'} ${isMobile ? 'pb-16' : 'pb-0'}`}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-20">
          <div className="px-4 md:px-6 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {isMobile && (
                  <button 
                    onClick={() => setIsDrawerOpen(true)}
                    className="mr-3 p-2 rounded-md hover:bg-gray-100"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h2>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <span className="text-xs md:text-sm text-gray-600 hidden md:inline">Welcome, {sampleData.driver.name}</span>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-xs md:text-sm">Status:</span>
                  <select 
                    value={driverStatus} 
                    onChange={(e) => setDriverStatus(e.target.value)}
                    className="border rounded px-1 md:px-2 py-1 text-xs md:text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="on_delivery">On Delivery</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="flex">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-1 py-2 px-1 text-center transition-colors ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Icon className="w-5 h-5 mb-1" />
                      {item.id === 'notifications' && unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </span>
                      )}
                    </div>
                    <span className="text-xs">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverPortal;