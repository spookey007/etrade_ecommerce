"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole) {
      // Redirect to login if not logged in
      router.push('/auth');
    } else {
      setUserRole(storedRole);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/auth');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {userRole}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard 
              title="Total Users" 
              value="1,240" 
              change="+12%" 
              icon="👥" 
              color="bg-blue-500"
            />
            <DashboardCard 
              title="Revenue" 
              value="$24,560" 
              change="+8.2%" 
              icon="💰" 
              color="bg-green-500"
            />
            <DashboardCard 
              title="Orders" 
              value="567" 
              change="+3.1%" 
              icon="📦" 
              color="bg-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <ActivityItem 
                  user="John Doe" 
                  action="placed a new order" 
                  time="2 minutes ago" 
                  avatar="JD" 
                />
                <ActivityItem 
                  user="Sarah Smith" 
                  action="updated profile information" 
                  time="15 minutes ago" 
                  avatar="SS" 
                />
                <ActivityItem 
                  user="Mike Johnson" 
                  action="completed payment" 
                  time="1 hour ago" 
                  avatar="MJ" 
                />
                <ActivityItem 
                  user="Emma Wilson" 
                  action="left a product review" 
                  time="3 hours ago" 
                  avatar="EW" 
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Sales Overview</h2>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">📊</div>
                  <p className="text-gray-300">Sales chart visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>

          {userRole === 'admin' && (
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Admin Panel</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminAction 
                  title="Manage Users" 
                  description="View and edit user accounts" 
                  icon="👤" 
                  color="bg-indigo-500"
                />
                <AdminAction 
                  title="Product Management" 
                  description="Add, edit, or remove products" 
                  icon="🛍️" 
                  color="bg-blue-500"
                />
                <AdminAction 
                  title="View Reports" 
                  description="Access detailed analytics" 
                  icon="📈" 
                  color="bg-green-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function DashboardCard({ title, value, change, icon, color }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: string; 
  color: string; 
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <p className="text-green-400 text-sm mt-3">{change} from last month</p>
    </div>
  );
}

function ActivityItem({ user, action, time, avatar }: { 
  user: string; 
  action: string; 
  time: string; 
  avatar: string; 
}) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
          {avatar}
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-white">{user}</p>
        <p className="text-sm text-gray-300">{action}</p>
      </div>
      <div className="ml-auto text-sm text-gray-400">
        {time}
      </div>
    </div>
  );
}

function AdminAction({ title, description, icon, color }: { 
  title: string; 
  description: string; 
  icon: string; 
  color: string; 
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-300 mt-1">{description}</p>
    </div>
  );
}
