"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ 
    type: 'success' | 'error' | null; 
    message: string 
  }>({ 
    type: null, 
    message: '' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setSubmitStatus({ type: 'error', message: 'Email is required' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! We\'ll be in touch soon.' 
      });
      setFormData({ name: '', email: '', phone: '' });
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        setIsModalOpen(false);
        // Reset status after closing
        setTimeout(() => setSubmitStatus({ type: null, message: '' }), 300);
      }, 2000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to submit. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      // Small delay to allow modal close animation before resetting status
      setTimeout(() => setSubmitStatus({ type: null, message: '' }), 300);
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-col justify-center overflow-hidden">
      {/* Background image via Next/Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/coffee-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10" /> 
      </div>

      {/* Top rail phrases */}
      <div className="w-full px-28 py-7 text-sm tracking-wide text-white/80 drop-shadow-sm md:text-base">
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap">IT'S OK TO BE A SNOB</span>
          <span className="whitespace-nowrap">FOR COFFEE PEOPLE</span>
          <span className="whitespace-nowrap max-sm:hidden">IT'S OK TO BE A SNOB</span>
          <span className="whitespace-nowrap max-md:hidden">FOR COFFEE PEOPLE</span>
        </div>
      </div>

      {/* Main content */}
      <section className="w-full px-28 grid grid-cols-1 items-center gap-20 py-20 md:py-30 lg:grid-cols-2 lg:gap-16">
        {/* Left copy block */}
        <div>
          <h1 className="space-y-[-10px] text-4xl font-[900] leading-tight tracking-tight text-[#bf711e] sm:text-5xl md:text-[60px]">
            <span className="block">Find coffee</span>
            <span className="block whitespace-nowrap">worth the detour</span>
          </h1>
          <div className="mt-3 space-y-1">
            <div className="w-[320px] sm:w-[380px] md:w-[440px]">
              <p className="font-[700] text-[#e1dfca] text-2xl sm:text-3xl md:text-[40px] tracking-tight whitespace-nowrap">
                Curated by coffee people
              </p>
            </div>
            <div className="w-[320px] sm:w-[380px] md:w-[440px]">
              <p className="font-[300] text-[#e1dfca] text-2xl sm:text-3xl md:text-[37px] tracking-tighter whitespace-nowrap">
                Get notified when we launch
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 px-8 py-3 bg-[#07899b] hover:bg-[#067a8a] text-[#e1dfca] rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#07899b] focus:ring-offset-2 focus:ring-offset-[#e1dfca]"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Right brand wordmark (SVG) */}
        <div className="flex items-center justify-end">
          <Image
            src="/snob-wordmark.svg"
            alt="Snob wordmark"
            width={800}
            height={240}
            priority
            className="h-auto w-[60vw] max-w-[720px] lg:w-[30vw]"
          />
        </div>
      </section>

      {/* Bottom rail phrases */}
      <div className="w-full px-28 py-7 text-sm tracking-wide text-white/80 drop-shadow-sm md:text-base">
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap">FOR COFFEE PEOPLE</span>
          <span className="whitespace-nowrap">IT'S OK TO BE A SNOB</span>
          <span className="whitespace-nowrap max-sm:hidden">FOR COFFEE PEOPLE</span>
          <span className="whitespace-nowrap max-md:hidden">IT'S OK TO BE A SNOB</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-[#e1dfca] rounded-2xl p-8 border-2 border-[#471405] shadow-xl">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-[#471405] hover:text-[#bf711e] disabled:opacity-50"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-[#471405] mb-6">Get Early Access</h2>
            
            {submitStatus.type === 'success' ? (
              <div className="text-center py-4">
                <div className="text-green-600 mb-2">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-lg font-medium">{submitStatus.message}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus.type === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {submitStatus.message}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#471405] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#471405] rounded-md focus:ring-2 focus:ring-[#07899b] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#471405] mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#471405] rounded-md focus:ring-2 focus:ring-[#07899b] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#471405] mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#471405] rounded-md focus:ring-2 focus:ring-[#07899b] focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-[#07899b] hover:bg-[#067a8a] text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#07899b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Get Notified'}
                  </button>
                </div>
              </form>
            )}
            
            <p className="mt-4 text-xs text-[#471405]/70 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}