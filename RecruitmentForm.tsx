import React, { useState } from 'react';
import { Button } from './ui/Button';
import { FormData, NicheType } from '../types';
import { generateInfluencerPitch } from '../services/geminiService';

// Ganti URL ini dengan URL Web App dari Google Apps Script Anda nanti
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9ali8JVI-zBD2qCdTDcx86Zuj0ahmzx1yY88ZXVv6D4UojFCP63YULARwgb1_X1c/exec";

export const RecruitmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    instagramHandle: '',
    instagramPassword: '',
    followersCount: '',
    niche: NicheType.LIFESTYLE,
    engagementRate: '',
    portfolioUrl: '',
    pitch: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePitch = async () => {
    if (!formData.niche || !formData.followersCount) {
      alert("Mohon isi Niche dan Jumlah Followers terlebih dahulu agar AI dapat membuat pitch yang relevan.");
      return;
    }

    setIsGenerating(true);
    const pitch = await generateInfluencerPitch(formData.niche, formData.followersCount, formData.fullName);
    setFormData(prev => ({ ...prev, pitch }));
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      if (GOOGLE_SCRIPT_URL === "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE") {
        // Simulasi sukses jika user belum memasang URL (untuk demo preview)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.warn("URL Google Script belum diatur. Data tidak tersimpan ke Sheet.");
      } else {
        // Pengiriman data sesungguhnya ke Google Sheet
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Penting untuk Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMsg('Gagal mengirim formulir. Mohon periksa koneksi internet Anda.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto -mt-20 relative z-10 p-8 bg-white rounded-2xl shadow-xl text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Aplikasi Terkirim!</h2>
        <p className="text-gray-600 mb-8">
          Terima kasih {formData.fullName}. Tim kami akan meninjau profil Instagram Anda (@{formData.instagramHandle}) dan menghubungi Anda melalui email jika profil Anda cocok dengan kampanye kami.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Kirim Aplikasi Lain
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto -mt-20 relative z-10 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulir Pendaftaran Influencer</h2>
          <p className="text-gray-500 mb-8">Lengkapi data diri Anda untuk bergabung dengan database eksklusif kami.</p>

          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  placeholder="budi@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Social Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">Instagram Username</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">@</span>
                  <input
                    type="text"
                    name="instagramHandle"
                    id="instagramHandle"
                    required
                    className="block w-full min-w-0 flex-1 rounded-r-lg border-gray-300 focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                    placeholder="username_anda"
                    value={formData.instagramHandle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="instagramPassword" className="block text-sm font-medium text-gray-700">Password Instagram</label>
                <input
                  type="password"
                  name="instagramPassword"
                  id="instagramPassword"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  placeholder="••••••••"
                  value={formData.instagramPassword}
                  onChange={handleInputChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  * Dibutuhkan untuk verifikasi analitik akun secara otomatis.
                </p>
              </div>

              <div>
                <label htmlFor="followersCount" className="block text-sm font-medium text-gray-700">Jumlah Followers</label>
                <select
                  name="followersCount"
                  id="followersCount"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  value={formData.followersCount}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Range Followers</option>
                  <option value="1k-5k">Nano (1k - 5k)</option>
                  <option value="5k-10k">Micro (5k - 10k)</option>
                  <option value="10k-50k">Mid-Tier (10k - 50k)</option>
                  <option value="50k-100k">Macro (50k - 100k)</option>
                  <option value="100k+">Mega (100k+)</option>
                </select>
              </div>

               <div>
                <label htmlFor="engagementRate" className="block text-sm font-medium text-gray-700">Engagement Rate (Estimasi %)</label>
                <input
                  type="number"
                  name="engagementRate"
                  id="engagementRate"
                  step="0.1"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  placeholder="Contoh: 3.5"
                  value={formData.engagementRate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="niche" className="block text-sm font-medium text-gray-700">Kategori / Niche</label>
                <select
                  name="niche"
                  id="niche"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  value={formData.niche}
                  onChange={handleInputChange}
                >
                  {Object.values(NicheType).map((niche) => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">Link Portfolio / Media Kit</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  id="portfolioUrl"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3"
                  placeholder="https://..."
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* AI Pitch Section */}
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="pitch" className="block text-sm font-bold text-gray-900">
                  Mengapa kami harus memilih Anda?
                </label>
                <div className="hidden sm:block">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-instagram-start to-instagram-end text-white">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                    AI Powered
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Ceritakan tentang style konten Anda dan bagaimana Anda bisa membantu brand.
                Bingung mau nulis apa? Gunakan fitur AI kami!
              </p>
              
              <div className="relative">
                <textarea
                  name="pitch"
                  id="pitch"
                  rows={4}
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-instagram-purple focus:ring-instagram-purple sm:text-sm border p-3 mb-3"
                  placeholder="Halo, saya konten kreator yang fokus pada..."
                  value={formData.pitch}
                  onChange={handleInputChange}
                />
                
                <div className="flex justify-end">
                   <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleGeneratePitch}
                    isLoading={isGenerating}
                    className="text-xs py-2 px-3"
                  >
                    ✨ Buatkan Pitch dengan AI
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
               <Button type="submit" className="w-full text-lg" isLoading={isSubmitting}>
                 Kirim Aplikasi
               </Button>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
           <p className="text-xs text-center text-gray-500">
             Dengan mengirimkan formulir ini, Anda menyetujui Kebijakan Privasi kami.
           </p>
        </div>
      </div>
    </div>
  );
};