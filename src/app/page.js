'use client';

import Image from "next/image";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import Head from 'next/head';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Health at Stack - Your Trusted Health Service Platform</title>
        <meta name="description" content="Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services." />
        <meta name="keywords" content="health, healthcare, medical services, mobile health, health platform" />
        <link rel="canonical" href="https://healthatstack.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Health at Stack - Your Trusted Health Service Platform" />
        <meta property="og:description" content="Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Health at Stack" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Health at Stack - Your Trusted Health Service Platform" />
        <meta name="twitter:description" content="Health at Stack is a mobile-first health service platform providing trusted healthcare solutions and services." />
      </Head>
      <div className="min-h-screen h-screen p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          <main className="flex flex-col items-center justify-center gap-8 animate-fade-in">
            <h1 className="text-2xl font-bold">Welcome to Health at Stack</h1>
            <p className="text-center">Your trusted mobile-first health service platform</p>
          </main>
        )}
      </div>
    </>
  );
}
