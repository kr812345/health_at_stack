'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

const serviceDetails = {
  cardiology: {
    name: 'Cardiology',
    description: 'Expert care for heart health and cardiovascular conditions. Our cardiologists provide comprehensive diagnosis, treatment, and preventive care for all heart-related issues.',
    benefits: [
      'Comprehensive heart health assessment',
      'Advanced diagnostic procedures',
      'Personalized treatment plans',
      'Preventive care and lifestyle guidance',
      '24/7 emergency support'
    ],
    icon: '❤️'
  },
  neurology: {
    name: 'Neurology',
    description: 'Specialized care for neurological disorders and conditions. Our neurologists are experts in diagnosing and treating disorders of the nervous system.',
    benefits: [
      'Expert diagnosis of neurological conditions',
      'Advanced treatment options',
      'Comprehensive care plans',
      'Regular follow-up care',
      'Support for chronic conditions'
    ],
    icon: '🧠'
  },
  orthopedics: {
    name: 'Orthopedics',
    description: 'Comprehensive care for musculoskeletal system. Our orthopedic specialists provide expert treatment for bones, joints, ligaments, tendons, and muscles.',
    benefits: [
      'Expert diagnosis of bone and joint issues',
      'Advanced treatment options',
      'Rehabilitation programs',
      'Sports injury care',
      'Preventive care'
    ],
    icon: '🦴'
  },
  general: {
    name: 'General Medicine',
    description: 'Primary healthcare services for all ages. Our general practitioners provide comprehensive medical care and coordinate with specialists when needed.',
    benefits: [
      'Regular health check-ups',
      'Preventive care',
      'Chronic disease management',
      'Vaccinations',
      'Health screenings'
    ],
    icon: '👨‍⚕️'
  },
  dermatology: {
    name: 'Dermatology',
    description: 'Expert care for skin, hair, and nail conditions. Our dermatologists provide comprehensive diagnosis and treatment for all dermatological issues.',
    benefits: [
      'Skin condition diagnosis',
      'Treatment for skin diseases',
      'Cosmetic procedures',
      'Skin cancer screening',
      'Hair and nail care'
    ],
    icon: '🔬'
  }
};

export default function ServicePage({ params }) {
  const router = useRouter();
  const { serviceId } = params;
  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-center text-muted-foreground">Service not found</p>
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
        <h1 className="text-xl font-bold">{service.name}</h1>
      </motion.header>

      {/* Service Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-6"
      >
        {/* Service Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{service.icon}</span>
              <h2 className="text-2xl font-bold">{service.name}</h2>
            </div>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            <Button 
              className="w-full"
              onClick={() => router.push(`/specialists/${serviceId}`)}
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Benefits</h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <FaCheck className="w-4 h-4 text-green-500" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}