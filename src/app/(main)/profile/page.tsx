'use client';

import { User, BookOpen, Settings, LogOut, Heart, ChevronRight, CreditCard, Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useBookStore } from '@/store/useBookStore';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { books } = useBookStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
    toast.success('Системээс гарлаа');
  };

  return (
    <div className="h-full overflow-y-auto bg-[#faf8f3] pb-20 md:pb-6">
      <div className="pt-12 pb-8 px-6 bg-[#f5f0e8] border-b border-[#d4c5a9] shadow-sm">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-[#e8dcc8] flex items-center justify-center mb-4 shadow-sm">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-[#8d6e63]" />
            )}
          </div>
          <h2 className="text-lg font-serif font-medium text-[#3e2723] mb-1">{user?.name}</h2>
          <p className="text-sm text-[#8d6e63]">{user?.email}</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Stats */}
          <div className="bg-[#fefdfb] border border-[#d4c5a9] p-5 shadow-sm">
            <h3 className="text-sm font-medium text-[#3e2723] flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#8d6e63]" />
              Статистик
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Миний ном', value: books.length },
                { label: 'Нийтэлсэн', value: books.filter((b) => b.status !== 'private').length },
                { label: 'Зарууд', value: 3 },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-serif font-medium text-[#5d4037] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#8d6e63]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Facebook Messenger холболт */}
          <div className="bg-[#fefdfb] border border-[#d4c5a9] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1877f2] rounded-full flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3e2723]">Facebook Messenger</p>
                  <p className="text-xs text-[#8d6e63]">
                    {user?.facebookMessengerId ? 'Холбогдсон' : 'Холбоогүй'}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs border border-[#d4c5a9] text-[#5d4037] hover:bg-[#f5f0e8] transition-colors">
                {user?.facebookMessengerId ? 'Салгах' : 'Холбох'}
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-2">
            <h3 className="px-2 text-xs font-medium text-[#8d6e63] uppercase tracking-wider">Цэс</h3>
            <div className="bg-[#fefdfb] border border-[#d4c5a9] shadow-sm">
              {[
                { icon: Heart, label: 'Хадгалсан номнууд' },
                { icon: CreditCard, label: 'Миний зарууд' },
                { icon: Settings, label: 'Тохиргоо' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-4 border-b border-[#e8dcc8] last:border-0 hover:bg-[#f5f0e8] transition-colors text-left group"
                >
                  <item.icon className="w-5 h-5 text-[#a1887f]" />
                  <span className="text-sm font-medium text-[#6d4c41] group-hover:text-[#3e2723]">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#bcaaa4] ml-auto" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 bg-[#fefdfb] border border-[#d4c5a9] text-[#6d4c41] text-sm font-medium hover:bg-[#f5f0e8] transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Системээс гарах</span>
          </button>
        </div>
      </div>
    </div>
  );
}
