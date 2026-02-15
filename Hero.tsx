import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 pb-16 pt-20 sm:pb-24 lg:pb-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-instagram-gradient opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-sm">
          Join the Creator Squad
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 font-medium">
          Kami mencari influencer berbakat untuk berkolaborasi dengan brand-brand ternama.
          Isi formulir di bawah ini untuk memulai perjalanan Anda bersama kami.
        </p>
      </div>
    </div>
  );
};