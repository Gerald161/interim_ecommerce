import React, { useState } from 'react';
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
  Menu,
  X
} from 'lucide-react';

const DriverPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverStatus, setDriverStatus] = useState('available');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications] = useState(3); // Sample notification count

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
    ]
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      available: "bg-green-100 text-green-800",
      on_delivery: "bg-blue-100 text-blue-800", 
      offline: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Driver Dashboard</h2>
          <StatusBadge status={driverStatus} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Today's Earnings</p>
                <p className="text-2xl font-bold text-blue-800">₵{sampleData.driver.todayEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-800">{sampleData.driver.completedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-orange-800">{sampleData.driver.pendingToday}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <Bell className="w-5 h-5 text-yellow-400 mr-2" />
            <div>
              <p className="text-yellow-800 font-medium">Admin Notification</p>
              <p className="text-yellow-700 text-sm">New delivery protocol effective today. Check Communication Hub for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryAssignments = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Assignments</h2>
        
        {sampleData.orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{order.id}</h3>
                <p className="text-gray-600">{order.customer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'ready_pickup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><MapPin className="w-4 h-4 inline mr-1" />{order.address}</p>
                <p><Phone className="w-4 h-4 inline mr-1" />{order.phone}</p>
                <p><Clock className="w-4 h-4 inline mr-1" />{order.timeWindow}</p>
              </div>
              <div>
                <p>Items: {order.items.join(', ')}</p>
                <p>Order Value: ₵{order.value}</p>
                <p>Delivery Fee: ₵{order.fee}</p>
                <p>Payment: {order.paymentStatus}</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                View Details
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                Start Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPickupManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Pickup Management</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Warehouse Location</h3>
          <p className="text-gray-700">Main Distribution Center</p>
          <p className="text-gray-600">789 Industrial Rd, Accra</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Order: ORD-2024-001</h3>
            <button className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-sm">
              <QrCode className="w-4 h-4 mr-1" />
              Scan Code
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="item1" className="mr-2"/>
              <label htmlFor="item1">Samsung Galaxy S24 (Qty: 1)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="item2" className="mr-2"/>
              <label htmlFor="item2">Phone Case (Qty: 1)</label>
            </div>
          </div>
          
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Mark as Picked Up
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeliveryTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Active Delivery</h2>
        
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold">ORD-2024-001 - In Progress</h3>
          <p className="text-gray-700">Delivering to: Sarah Johnson</p>
          <p className="text-gray-600">123 Main St, Accra</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button className="bg-blue-600 text-white p-3 rounded flex items-center justify-center">
            <Navigation className="w-5 h-5 mr-2" />
            Open Navigation
          </button>
          <button className="bg-green-600 text-white p-3 rounded flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            Call Customer
          </button>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gray-100 p-3 rounded text-left flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            Picked up from warehouse
          </button>
          <button className="w-full bg-blue-100 p-3 rounded text-left flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            En route to customer
          </button>
          <button className="w-full bg-gray-50 p-3 rounded text-left flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
            Arrived at location
          </button>
        </div>

        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600">Take delivery photo</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            Capture Photo
          </button>
        </div>

        <button className="w-full mt-4 bg-green-600 text-white p-3 rounded font-semibold">
          Mark as Delivered
        </button>
      </div>
    </div>
  );

  const renderPaymentEarnings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Payment & Earnings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <h3 className="font-semibold text-green-800">Today</h3>
            <p className="text-2xl font-bold text-green-600">₵285.50</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <h3 className="font-semibold text-blue-800">This Week</h3>
            <p className="text-2xl font-bold text-blue-600">₵1,245.80</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <h3 className="font-semibold text-purple-800">This Month</h3>
            <p className="text-2xl font-bold text-purple-600">₵4,890.25</p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">COD Collections Today</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>ORD-2024-002 (M. Asante)</span>
              <span className="font-semibold">₵2,800.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total to Remit:</span>
              <span>₵2,800.00</span>
            </div>
          </div>
          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
            Report COD Collection
          </button>
        </div>
      </div>
    </div>
  );

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, primary: true },
    { id: 'assignments', label: 'Assignments', icon: Package, primary: true },
    { id: 'pickup', label: 'Pickup', icon: QrCode, primary: false },
    { id: 'tracking', label: 'Delivery', icon: MapPin, primary: true },
    { id: 'route', label: 'Route', icon: Route, primary: false },
    { id: 'history', label: 'History', icon: History, primary: false },
    { id: 'payments', label: 'Earnings', icon: DollarSign, primary: true },
    { id: 'profile', label: 'Profile', icon: User, primary: true },
    { id: 'messages', label: 'Messages', icon: MessageSquare, primary: false }
  ];

  const primaryNavs = navigationItems.filter(item => item.primary);
  const secondaryNavs = navigationItems.filter(item => !item.primary);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'assignments': return renderDeliveryAssignments();
      case 'pickup': return renderPickupManagement();
      case 'tracking': return renderDeliveryTracking();
      case 'payments': return renderPaymentEarnings();
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{navigationItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Driver Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 hidden sm:block">Welcome, {sampleData.driver.name}</span>
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm">Status:</span>
                <select 
                  value={driverStatus} 
                  onChange={(e) => setDriverStatus(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
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

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-51">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Navigation</h2>
              <button onClick={() => setIsDrawerOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {secondaryNavs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsDrawerOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Navigation - Sticky */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 sticky top-24">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30">
        <div className="flex justify-around py-2">
          {primaryNavs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'text-blue-700'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
          <button
            className="flex flex-col items-center py-2 px-3 rounded-md text-gray-600 relative"
          >
            <Bell className="w-5 h-5 mb-1" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
            <span className="text-xs">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;