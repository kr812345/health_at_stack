'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const statusColors = {
  Pending: 'bg-yellow-500 hover:bg-yellow-600',
  Confirmed: 'bg-green-500 hover:bg-green-600',
  Completed: 'bg-blue-500 hover:bg-blue-600',
  Rejected: 'bg-red-500 hover:bg-red-600'
};

const statusTextColors = {
  Pending: 'text-yellow-700',
  Confirmed: 'text-green-700',
  Completed: 'text-blue-700',
  Rejected: 'text-red-700'
};

export default function AppointmentStatus({ appointment }) {
  const { status, specialist, date, time } = appointment;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="hover:shadow-md transition-all">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-medium text-lg">{specialist}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {time}
                </div>
              </div>
            </div>
            <Badge 
              className={`${statusColors[status]} ${statusTextColors[status]} font-medium`}
            >
              {status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}