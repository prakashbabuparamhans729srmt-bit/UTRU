'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="bg-white rounded-b-lg text-black">
        <header className="p-4 flex items-center gap-4 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-grow -ml-12">About Us</h1>
        </header>
        <main className="p-6 space-y-8">
          <div>
            <p className="text-sm">
              Welcome to [App Name], your ultimate destination for a seamless shopping experience! We are an innovative, customer-centric eCommerce platform designed to bring you the best products, exceptional deals, and unrivaled convenience—all at your fingertips. Our mission is to revolutionize the way people shop by offering a user-friendly, secure, and personalized online shopping experience that makes finding what you love easier than ever before.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 text-center">Our Story</h2>
            <p className="text-sm">
              At [App Name], we began with a simple idea: to provide an online shopping platform that not only offers a wide variety of products but also makes the entire process effortless and enjoyable. Founded by a group of passionate eCommerce professionals, tech enthusiasts, and retail experts, we set out to create an app that would combine the best aspects of shopping—choice, convenience, and customer service.
            </p>
            <p className="text-sm mt-4">
              From humble beginnings, we quickly grew into one of the most trusted eCommerce platforms, offering everything from fashion, beauty, electronics, home essentials, and more. Our core values of customer satisfaction, accessibility, and constant innovation continue to drive us as we aim to expand our
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
