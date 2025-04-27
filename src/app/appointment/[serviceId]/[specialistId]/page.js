'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FaArrowLeft } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const appointmentSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  reason: z.string().min(10, 'Please provide a detailed reason for your visit'),
  mode: z.enum(['in-person', 'online'], {
    required_error: 'Please select a consultation mode',
  }),
});

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const mockSpecialists = {
  1: { name: 'Dr. Sarah Johnson', title: 'Cardiologist' },
  2: { name: 'Dr. Michael Chen', title: 'Cardiologist' },
  3: { name: 'Dr. Emily Brown', title: 'Cardiologist' },
  4: { name: 'Dr. James Wilson', title: 'Neurologist' },
  5: { name: 'Dr. Lisa Martinez', title: 'Neurologist' },
  6: { name: 'Dr. Robert Taylor', title: 'Orthopedic Surgeon' },
  7: { name: 'Dr. Maria Garcia', title: 'Orthopedic Specialist' },
  8: { name: 'Dr. John Smith', title: 'General Practitioner' },
  9: { name: 'Dr. Anna Lee', title: 'Family Medicine' },
  10: { name: 'Dr. David Kim', title: 'Dermatologist' },
  11: { name: 'Dr. Rachel Patel', title: 'Dermatologist' },
};

export default function AppointmentPage({ params }) {
  const router = useRouter();
  const { serviceId, specialistId } = params;
  const [isLoading, setIsLoading] = useState(false);
  const specialist = mockSpecialists[specialistId];

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: '',
      time: '',
      reason: '',
      mode: 'in-person',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // Mock API call to create appointment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock appointment ID
      const appointmentId = Math.floor(Math.random() * 1000000);
      
      toast.success('Appointment booked successfully!');
      router.push(`/payment/${appointmentId}`);
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-xl font-bold">Book Appointment</h1>
      </motion.header>

      {/* Appointment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-6"
      >
        {/* Specialist Info */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">{specialist.name}</h2>
            <p className="text-sm text-muted-foreground">{specialist.title}</p>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            min={format(new Date(), 'yyyy-MM-dd')}
                            {...field}
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-11 rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your symptoms or reason for visit"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Mode</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            type="button"
                            variant={field.value === 'in-person' ? 'default' : 'outline'}
                            className="w-full"
                            onClick={() => field.onChange('in-person')}
                          >
                            In-Person
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === 'online' ? 'default' : 'outline'}
                            className="w-full"
                            onClick={() => field.onChange('online')}
                          >
                            Online
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Booking...' : 'Proceed to Payment'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}