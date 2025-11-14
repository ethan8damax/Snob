"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    favoriteCoffeeShop: '',
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
        message: 'Consider yourself officially on the list.' 
      });
      setFormData({ name: '', email: '', phone: '', favoriteCoffeeShop: '' });
      
      // Keep modal open after successful submission
      // User needs to close it manually
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
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
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
      <div className="w-full px-4 sm:px-8 lg:px-28 py-2 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base tracking-wide text-white/80 drop-shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="whitespace-nowrap">IT'S OK TO BE A SNOB</span>
          <span className="whitespace-nowrap">FOR COFFEE PEOPLE</span>
          <span className="whitespace-nowrap max-sm:hidden">IT'S OK TO BE A SNOB</span>
          <span className="whitespace-nowrap max-md:hidden">FOR COFFEE PEOPLE</span>
        </div>
      </div>

      {/* Main content */}
      <section className="flex-1 w-full px-4 sm:px-8 lg:pl-28 lg:pr-0 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 sm:gap-14 lg:gap-16 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Left copy block */}
        <div className="max-w-xl">
          <h1 className="space-y-[-10px] text-3xl sm:text-4xl md:text-[52px] lg:text-[60px] font-[900] leading-tight tracking-tight text-[#bf711e]">
            <span className="block">Find coffee</span>
            <span className="block whitespace-nowrap">worth the detour</span>
          </h1>
          <div className="mt-3 space-y-1">
            <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px]">
              <p className="font-[700] text-[#e1dfca] text-xl sm:text-2xl md:text-[32px] lg:text-[40px] tracking-tight whitespace-nowrap">
                Curated by coffee people
              </p>
            </div>
            <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px]">
              <p className="font-[300] text-[#e1dfca] text-xl sm:text-2xl md:text-[30px] lg:text-[37px] tracking-tighter whitespace-nowrap">
                Get notified when we launch
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-5 sm:mt-6 px-6 sm:px-8 py-3 bg-transparent border border-[#e1dfca] text-[#e1dfca] rounded-full font-medium transition-colors duration-200 hover:bg-[#e1dfca]/10 focus:outline-none focus:ring-0 focus:ring-offset-0"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Right brand wordmark (SVG) */}
        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
          <Image
            src="/snob-wordmark.svg"
            alt="Snob wordmark"
            width={800}
            height={240}
            priority
            className="h-auto lg:mr-20 w-[70vw] max-w-[520px] sm:w-[60vw] sm:max-w-[620px] lg:w-[30vw] lg:max-w-[720px]"
          />
        </div>
      </section>

      {/* Bottom rail phrases */}
      <div className="w-full px-4 sm:px-8 lg:px-28 py-2 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base tracking-wide text-white/80 drop-shadow-sm">
        <div className="flex items-center justify-between gap-4">
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
          <div className="relative w-full max-w-md bg-[#471405] rounded-2xl p-6 sm:p-7 md:p-8 shadow-xl">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-[#07899b] hover:text-[#067a8a] disabled:opacity-50"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="italic text-center text-2xl sm:text-3xl md:text-4xl font-[900] leading-tight tracking-tighter text-[#e1dfca] mb-4 sm:mb-5 md:mb-6">
               Get early access.
            </h2>
            
            {submitStatus.type === 'success' ? (
              <div className="text-center py-4">
                <div className="text-[#07899b] mb-2">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-lg font-medium">Consider yourself officially on the list.</p>
                  <p className="text-lg font-medium">Now go gather the other coffee snobs.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus.type === 'error' && (
                  <div className="p-3 bg-[#07899b] text-[#e1dfca] rounded-md text-sm">
                    {submitStatus.message}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#e1dfca] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#e1dfca] rounded-none text-[#e1dfca] placeholder:text-[#e1dfca]/60 focus:ring-0 focus:border-b-2 focus:border-[#07899b] focus:outline-none focus:ring-0 focus:shadow-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#e1dfca] mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#e1dfca] rounded-none text-[#e1dfca] placeholder:text-[#e1dfca]/60 focus:ring-0 focus:border-b-2 focus:border-[#07899b] focus:outline-none focus:ring-0 focus:shadow-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#e1dfca] mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#e1dfca] rounded-none text-[#e1dfca] placeholder:text-[#e1dfca]/60 focus:ring-0 focus:border-b-2 focus:border-[#07899b] focus:outline-none focus:ring-0 focus:shadow-none"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="favoriteCoffeeShop" className="block text-sm font-medium text-[#e1dfca] mb-1">
                    Favorite Coffee Shop Right Now
                  </label>
                  <input
                    type="text"
                    id="favoriteCoffeeShop"
                    name="favoriteCoffeeShop"
                    value={formData.favoriteCoffeeShop}
                    onChange={handleInputChange}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#e1dfca] rounded-none text-[#e1dfca] placeholder:text-[#e1dfca]/60 focus:ring-0 focus:border-b-2 focus:border-[#07899b] focus:outline-none focus:ring-0 focus:shadow-none"
                    placeholder="e.g., Stumptown, East Pole, PERC"
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-[#bf711e] hover:bg-[#a45f16] text-[#e1dfca] font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bf711e] focus:ring-offset-[#471405] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                     <span className="italic">SUBMIT</span>
                    )}
                  </button>
                </div>
              </form>
            )}
            
          </div>
        </div>
      )}
    </main>
  );
}