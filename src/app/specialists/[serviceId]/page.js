'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import SpecialistCard from '@/components/SpecialistCard';

const mockSpecialists = {
  cardiology: [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Cardiologist',
      rating: 4.9,
      availability: 'Tomorrow, 10:00 AM',
      imageUrl: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      title: 'Cardiologist',
      rating: 4.8,
      availability: 'Today, 2:30 PM',
      imageUrl: null
    },
    {
      id: 3,
      name: 'Dr. Emily Brown',
      title: 'Cardiologist',
      rating: 4.7,
      availability: 'Next Monday, 11:00 AM',
      imageUrl: null
    }
  ],
  neurology: [
    {
      id: 4,
      name: 'Dr. James Wilson',
      title: 'Neurologist',
      rating: 4.9,
      availability: 'Tomorrow, 9:00 AM',
      imageUrl: null
    },
    {
      id: 5,
      name: 'Dr. Lisa Martinez',
      title: 'Neurologist',
      rating: 4.8,
      availability: 'Today, 3:00 PM',
      imageUrl: null
    }
  ],
  orthopedics: [
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      title: 'Orthopedic Surgeon',
      rating: 4.9,
      availability: 'Tomorrow, 1:00 PM',
      imageUrl: null
    },
    {
      id: 7,
      name: 'Dr. Maria Garcia',
      title: 'Orthopedic Specialist',
      rating: 4.7,
      availability: 'Next Tuesday, 10:30 AM',
      imageUrl: null
    }
  ],
  general: [
    {
      id: 8,
      name: 'Dr. John Smith',
      title: 'General Practitioner',
      rating: 4.8,
      availability: 'Today, 4:00 PM',
      imageUrl: null
    },
    {
      id: 9,
      name: 'Dr. Anna Lee',
      title: 'Family Medicine',
      rating: 4.9,
      availability: 'Tomorrow, 11:30 AM',
      imageUrl: null
    }
  ],
  dermatology: [
    {
      id: 10,
      name: 'Dr. David Kim',
      title: 'Dermatologist',
      rating: 4.9,
      availability: 'Today, 1:30 PM',
      imageUrl: null
    },
    {
      id: 11,
      name: 'Dr. Rachel Patel',
      title: 'Dermatologist',
      rating: 4.8,
      availability: 'Next Monday, 2:00 PM',
      imageUrl: null
    }
  ]
};

export default function SpecialistsPage({ params }) {
  const router = useRouter();
  const { serviceId } = params;
  const specialists = mockSpecialists[serviceId] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-40"
      >
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Select Specialist</h1>
      </motion.header>

      {/* Specialists List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-4"
      >
        {specialists.length > 0 ? (
          specialists.map((specialist) => (
            <motion.div
              key={specialist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SpecialistCard
                specialist={specialist}
                onClick={() => router.push(`/appointment/${serviceId}/${specialist.id}`)}
              />
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-muted-foreground">No specialists available</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}