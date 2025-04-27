'use client';

import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { FaHeart, FaBrain, FaBone, FaUserMd, FaStethoscope } from 'react-icons/fa';
import { Avatar } from '@/components/ui/avatar';
import AppointmentStatus from '@/components/AppointmentStatus';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const services = [
  { id: 'cardiology', name: 'Cardiology', icon: FaHeart, color: 'text-red-500' },
  { id: 'neurology', name: 'Neurology', icon: FaBrain, color: 'text-purple-500' },
  { id: 'orthopedics', name: 'Orthopedics', icon: FaBone, color: 'text-blue-500' },
  { id: 'general', name: 'General Medicine', icon: FaUserMd, color: 'text-green-500' },
  { id: 'dermatology', name: 'Dermatology', icon: FaStethoscope, color: 'text-orange-500' },
];

const mockAppointments = [
  { id: 1, status: 'Confirmed', specialist: 'Dr. Smith', date: '2025-05-01', time: '10:00 AM' },
  { id: 2, status: 'Pending', specialist: 'Dr. Johnson', date: '2025-05-03', time: '2:30 PM' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-40"
      >
        <div>
          <h1 className="text-xl font-bold">Health at Stack</h1>
          <p className="text-sm text-muted-foreground">Welcome back!</p>
        </div>
        <Link href="/profile">
          <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all" />
        </Link>
      </motion.header>

      {/* Services Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4"
      >
        <h2 className="text-lg font-semibold mb-4">Our Services</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => router.push(`/services/${service.id}`)}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${service.color}`} />
                    <h3 className="text-sm font-medium">{service.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          <motion.div variants={itemVariants}>
            <Card className="opacity-50 cursor-not-allowed">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded-full" />
                <h3 className="text-sm font-medium">More coming soon</h3>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Appointment Status */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4"
      >
        <h2 className="text-lg font-semibold mb-4">Recent Appointments</h2>
        <div className="space-y-4">
          {mockAppointments.map((appointment) => (
            <motion.div key={appointment.id} variants={itemVariants}>
              <AppointmentStatus appointment={appointment} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}