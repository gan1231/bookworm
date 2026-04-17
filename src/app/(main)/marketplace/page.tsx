'use client';

import { useState } from 'react';
import { Search, Plus, Tag, ShoppingCart, Heart, HandCoins } from 'lucide-react';
import { motion } from 'motion/react';
import type { Listing } from '@/types';

const demoListings: Listing[] = [
  { id: 'l1', type: 'sell', title: 'Ерөнхий сэтгэл зүй', author: 'Н.Батсүх', price: 25000, description: 'Шинэ төстэй, хэрэглээгүй', seller: 'Болд', category: 'Сэтгэл судлал', userId: '1', status: 'active' },
  { id: 'l2', type: 'sell', title: 'Python хичээлийн ном', author: 'Eric Matthes', price: 35000, description: 'Англи хэл дээр, сайн байдалтай', seller: 'Төмөр', category: 'Боловсрол', userId: '3', status: 'active' },
  { id: 'l3', type: 'wanted', title: 'Харри Поттер цуврал', author: 'J.K. Rowling', description: 'Монгол орчуулгатай, бүх цувралыг авах сонирхолтой', seller: 'Сарнай', category: 'Уран зохиол', userId: '2', status: 'active' },
  { id: 'l4', type: 'buy', title: 'Nomadiin ажлын туршлага', author: 'Ц.Өлзийбаяр', price: 18000, description: 'Хямд үнээр худалдана', seller: 'Оюунцэцэг', category: 'Бизнес', userId: '4', status: 'active' },
];

const TYPE_META = {
  sell:   { label: 'Зарна',       icon: Tag,         color: 'bg-emerald-100 text-emerald-700' },
  buy:    { label: 'Авна',        icon: ShoppingCart, color: 'bg-blue-100 text-blue-700' },
  wanted: { label: 'Хайж байна', icon: Heart,        color: 'bg-rose-100 text-rose-700' },
};

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sell' | 'buy' | 'wanted'>('all');

  const filteredListings = demoListings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || l.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-full flex flex-col bg-[#faf8f3]">
      <div className="p-4 md:p-6 bg-[#f5f0e8] border-b border-[#d4c5a9] shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d6e63]" />
            <input
              type="text"
              placeholder="Хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#fefdfb] border border-[#d4c5a9] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[{ id: 'all', label: 'Бүгд' }, { id: 'sell', label: 'Зарна' }, { id: 'buy', label: 'Авна' }, { id: 'wanted', label: 'Хайж байна' }].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as typeof filterType)}
                className={`px-3 py-1 text-xs whitespace-nowrap transition-colors ${filterType === f.id ? 'text-[#5d4037] border-b-2 border-[#8d6e63] font-medium' : 'text-[#8d6e63] hover:text-[#5d4037]'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto">
          {filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <HandCoins className="w-10 h-10 mb-3 text-[#bcaaa4]" />
              <p className="text-sm text-[#8d6e63]">Хайлтад тохирох зар байхгүй байна</p>
            </div>
          ) : (
            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing, i) => {
                const meta = TYPE_META[listing.type];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#fefdfb] border-2 border-[#d4c5a9] shadow-lg p-4 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 font-medium ${meta.color}`}>
                        <Icon className="w-3 h-3" /> {meta.label}
                      </span>
                      {listing.price && (
                        <span className="text-lg font-serif font-bold text-[#5d4037]">
                          {listing.price.toLocaleString()}₮
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <h3 className="font-serif font-bold text-[#3e2723] text-lg leading-tight mb-1">{listing.title}</h3>
                      <p className="text-sm text-[#8d6e63] mb-2">{listing.author}</p>
                      <div className="text-sm text-[#6d4c41] font-serif italic bg-[#f5f0e8] p-3 border-l-2 border-[#8d6e63]">
                        "{listing.description}"
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t-2 border-[#e8dcc8]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#5d4037] rounded-full flex items-center justify-center text-[#f5deb3] text-xs font-bold">
                          {listing.seller.charAt(0)}
                        </div>
                        <span className="text-xs text-[#6d4c41] font-medium">{listing.seller}</span>
                      </div>
                      <button className="px-4 py-1.5 bg-[#5d4037] text-[#f5deb3] text-xs font-medium hover:bg-[#4e342e] transition-colors shadow-md">
                        Холбогдох
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button className="fixed md:absolute bottom-6 right-4 md:right-6 w-12 h-12 bg-[#5d4037] text-[#f5deb3] flex items-center justify-center hover:bg-[#4e342e] transition-colors z-20 shadow-lg">
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
