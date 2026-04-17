'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/library');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Нэвтрэхэд алдаа гарлаа');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#3e2723] flex items-center justify-center mb-4 shadow-lg">
            <BookOpen className="w-7 h-7 text-[#d4a574]" />
          </div>
          <h1 className="text-2xl font-serif text-[#3e2723]">Bookworm</h1>
          <p className="text-sm text-[#8d6e63] mt-1">Номын сошиал платформ</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#fefdfb] border border-[#d4c5a9] shadow-sm p-6 space-y-4">
          <h2 className="text-base font-medium text-[#3e2723] mb-4">Нэвтрэх</h2>

          <div className="space-y-1">
            <label className="text-xs text-[#6d4c41] font-medium">И-мэйл</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-3 py-2 bg-[#faf8f3] border border-[#d4c5a9] text-sm text-[#3e2723] focus:outline-none focus:border-[#8d6e63] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#6d4c41] font-medium">Нууц үг</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#faf8f3] border border-[#d4c5a9] text-sm text-[#3e2723] focus:outline-none focus:border-[#8d6e63] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#5d4037] text-[#f5deb3] text-sm font-medium hover:bg-[#4e342e] transition-colors disabled:opacity-60 mt-2"
          >
            {isLoading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
          </button>

          <p className="text-center text-xs text-[#8d6e63] pt-2">
            Бүртгэл байхгүй юу?{' '}
            <Link href="/auth/register" className="text-[#5d4037] font-medium hover:underline">
              Бүртгүүлэх
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
