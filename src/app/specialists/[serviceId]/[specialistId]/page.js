'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Avatar } from '@/components/ui/avatar';
import SpecialistReviews from '@/components/SpecialistReviews';
import { mockSpecialists } from '../page';

export default function SpecialistDetailPage({ params }) {
  const router = useRouter();
  const { serviceId, specialistId } = params;
  const [specialist, setSpecialist] = useState(null);

  useEffect(() => {
    // Find the specialist from mock data (replace with API call in production)
    const specialists = mockSpecialists[serviceId] || [];
    const foundSpecialist = specialists.find(s => s.id === parseInt(specialistId));
    setSpecialist(foundSpecialist);
  }, [serviceId, specialistId]);

  if (!specialist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-center text-muted-foreground">Specialist not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <h1 className="text-xl font-bold">Specialist Details</h1>
      </motion.header>

      {/* Specialist Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <Avatar className="h-32 w-32 ring-2 ring-primary/10">
                {specialist.imageUrl ? (
                  <img src={specialist.imageUrl} alt={specialist.name} className="object-cover" />
                ) : (
                  <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary text-4xl font-semibold">
                    {specialist.name.charAt(0)}
                  </div>
                )}
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{specialist.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">{specialist.title}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                  <FaStar className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-medium">{specialist.rating}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>Next available: {specialist.availability}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    className="w-full md:w-auto"
                    onClick={() => router.push(`/appointment/${serviceId}/${specialist.id}`)}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            <SpecialistReviews specialistId={specialist.id} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 