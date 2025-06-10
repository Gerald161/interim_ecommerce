import { useState } from 'react';
import { 
  User, 
  Settings, 
  Package, 
  Bell, 
  Moon, 
  Sun, 
  Camera, 
  Mail, 
  UserCircle,
  Lock,
  MapPin,
  Smartphone,
  Home,
  Building
} from 'lucide-react';

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = useState('Edit Profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  // Notification toggles state
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: true,
    newsletter: false,
    securityAlerts: true,
    accountUpdates: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    browserNotifications: false,
    mobilePush: true,
    desktopAlerts: false
  });

  // Order management state
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [addresses] = useState([
    {
      id: 'home',
      type: 'Home',
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      isDefault: true
    },
    {
      id: 'work',
      type: 'Work',
      address: '456 Business Ave, Suite 200',
      city: 'New York, NY 10002',
      isDefault: false
    }
  ]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageClick = () => {
    // Simulate file input click
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Selected file:', file.name);
        // Handle image upload logic here
      }
    };
    input.click();
  };

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const menuItems = [
    { name: 'Edit Profile', icon: User },
    { name: 'Account Management', icon: Settings },
    { name: 'Order Management', icon: Package },
    { name: 'Notifications', icon: Bell }
  ];

  const renderEditProfile = () => (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Edit Profile
      </h2>
      <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Keep your personal details private. Information you add here is visible to anyone who can view your profile.
      </p>
      
      {/* Profile Image */}
      <div className="flex items-center mb-8">
        <div 
          onClick={handleImageClick}
          className="relative group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108755-2616b9dc4c3e?w=150&h=150&fit=crop&crop=face"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover transition-all duration-200 group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
            <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="First Name"
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Last Name"
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Username
        </label>
        <input
          type="text"
          value={profileData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder="Username"
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
        />
      </div>

      <div className="mb-8">
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Email
        </label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email"
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
        />
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Save Changes
      </button>
    </div>
  );

  const renderAccountManagement = () => (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Account Management
      </h2>
      
      <div className="space-y-6">
        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center mb-4">
            <Lock className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Change Password
            </h3>
          </div>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Update your password to keep your account secure.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Change Password
          </button>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center mb-4">
            <Smartphone className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Two-Factor Authentication
            </h3>
          </div>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Add an extra layer of security to your account.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Enable 2FA
          </button>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'} rounded-lg border ${isDarkMode ? 'border-red-800' : 'border-red-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>
            Danger Zone
          </h3>
          <p className={`mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrderManagement = () => (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Order Management
      </h2>
      
      <div className="space-y-6">
        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center mb-4">
            <MapPin className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Delivery Addresses
            </h3>
          </div>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your saved delivery addresses for faster checkout.
          </p>
          
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAddress === addr.id
                    ? `${isDarkMode ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-blue-500 bg-blue-50'}`
                    : `${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                }`}
                onClick={() => setSelectedAddress(addr.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    {addr.type === 'Home' ? (
                      <Home className={`w-5 h-5 mr-3 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <Building className={`w-5 h-5 mr-3 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                    <div>
                      <div className="flex items-center">
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {addr.type}
                        </h4>
                        {addr.isDefault && (
                          <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {addr.address}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {addr.city}
                      </p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAddress === addr.id
                      ? 'border-blue-500 bg-blue-500'
                      : `${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`
                  }`}>
                    {selectedAddress === addr.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Add New Address
            </button>
            <button className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Edit Selected
            </button>
          </div>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Order Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Preferred Delivery Time</span>
              <select className={`px-3 py-2 rounded border ${
                isDarkMode 
                  ? 'bg-gray-600 border-gray-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 5 PM)</option>
                <option>Evening (5 PM - 8 PM)</option>
                <option>No Preference</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Leave at Door</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className={`p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Notifications
      </h2>
      
      <div className="space-y-6">
        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Email Notifications
          </h3>
          <div className="space-y-4">
            {Object.entries(emailNotifications).map(([key, value]) => {
              const labels = {
                orderUpdates: 'Order Updates',
                promotionalEmails: 'Promotional Emails',
                newsletter: 'Newsletter',
                securityAlerts: 'Security Alerts',
                accountUpdates: 'Account Updates'
              };
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{labels[key]}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={value}
                      onChange={() => handleEmailToggle(key)}
                    />
                    <div className={`w-11 h-6 rounded-full peer transition-colors ${
                      value 
                        ? 'bg-blue-600' 
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                      value ? 'after:translate-x-full after:border-white' : 'after:left-[2px]'
                    }`}></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Push Notifications
          </h3>
          <div className="space-y-4">
            {Object.entries(pushNotifications).map(([key, value]) => {
              const labels = {
                browserNotifications: 'Browser Notifications',
                mobilePush: 'Mobile Push',
                desktopAlerts: 'Desktop Alerts'
              };
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{labels[key]}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={value}
                      onChange={() => handlePushToggle(key)}
                    />
                    <div className={`w-11 h-6 rounded-full peer transition-colors ${
                      value 
                        ? 'bg-blue-600' 
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                      value ? 'after:translate-x-full after:border-white' : 'after:left-[2px]'
                    }`}></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'Edit Profile':
        return renderEditProfile();
      case 'Account Management':
        return renderAccountManagement();
      case 'Order Management':
        return renderOrderManagement();
      case 'Notifications':
        return renderNotifications();
      default:
        return renderEditProfile();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sticky Sidebar */}
        <div className={`w-72 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r sticky top-0 h-screen overflow-y-auto`}>
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveSection(item.name)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors text-sm ${
                      activeSection === item.name
                        ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}