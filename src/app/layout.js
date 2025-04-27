import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import { BarbaProvider } from "@/lib/barba";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://healthatstack.com'),
  title: {
    default: 'Health at Stack - Your Trusted Health Service Platform',
    template: '%s | Health at Stack'
  },
  description: 'Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services.',
  keywords: ['health', 'healthcare', 'medical services', 'mobile health', 'health platform'],
  authors: [{ name: 'Health at Stack Team' }],
  creator: 'Health at Stack',
  publisher: 'Health at Stack',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthatstack.com',
    siteName: 'Health at Stack',
    title: 'Health at Stack - Your Trusted Health Service Platform',
    description: 'Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health at Stack - Your Trusted Health Service Platform',
    description: 'Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services.',
    creator: '@healthatstack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased min-h-screen bg-background`}>
        <BarbaProvider>
          <div data-barba="wrapper">
            <div data-barba="container" data-barba-namespace="home">
              {children}
            </div>
          </div>
          <Navigation />
        </BarbaProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
