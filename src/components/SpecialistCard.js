'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function SpecialistCard({ specialist, onClick }) {
  const { name, title, rating, availability, imageUrl } = specialist;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-md transition-all"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/10">
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="object-cover" />
              ) : (
                <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary text-xl font-semibold">
                  {name.charAt(0)}
                </div>
              )}
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Next available: {availability}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}