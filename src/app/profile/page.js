'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { logout } from '@/lib/auth';

// Mock user data
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinedDate: '2025-01-15',
  appointments: [
    {
      id: 1,
      specialist: 'Dr. Sarah Wilson',
      date: '2025-05-01',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'Cardiology'
    },
    {
      id: 2,
      specialist: 'Dr. Michael Chen',
      date: '2025-05-10',
      time: '2:30 PM',
      status: 'Pending',
      type: 'Neurology'
    }
  ]
};

const statusColors = {
  Pending: 'bg-yellow-500',
  Confirmed: 'bg-green-500',
  Completed: 'bg-blue-500',
  Cancelled: 'bg-red-500'
};

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      {/* User Info */}
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <div className="bg-blue-100 h-full w-full flex items-center justify-center text-blue-500 text-xl font-semibold">
                  <FaUser />
                </div>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{mockUserData.name}</h2>
                <p className="text-gray-500">{mockUserData.email}</p>
                <p className="text-sm text-gray-400">
                  Member since {new Date(mockUserData.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment History */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Appointment History</h3>
          <div className="space-y-3">
            {mockUserData.appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.specialist}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} • {appointment.time}
                      </p>
                    </div>
                    <Badge className={statusColors[appointment.status]}>
                      {appointment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Sign Out
        </Button>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}