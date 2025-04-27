'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaRobot } from 'react-icons/fa';

export default function ChatbotPage() {
  const router = useRouter();

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
        <h1 className="text-xl font-bold">AI Health Assistant</h1>
      </motion.header>

      {/* Chatbot Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
              >
                <FaRobot className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                Our AI health assistant is currently under development. Stay tuned for updates!
              </p>
              <div className="space-y-4 w-full max-w-md">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">What to Expect</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• 24/7 health advice and support</li>
                    <li>• Symptom assessment and guidance</li>
                    <li>• Medication reminders</li>
                    <li>• Health tracking and insights</li>
                  </ul>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push('/dashboard')}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}