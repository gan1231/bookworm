'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { BookCard } from '@/components/books/BookCard';

const demoUsers = [
  { id: '1', name: 'Болд', bookCount: 24 },
  { id: '2', name: 'Сарнай', bookCount: 18 },
  { id: '3', name: 'Төмөр', bookCount: 32 },
  { id: '4', name: 'Оюун', bookCount: 15 },
];

const demoCommunityBooks = [
  { id: 'c1', title: 'Монголын түүх', author: 'Б.Батбаяр', category: 'Түүх', owner: 'Болд', available: true, status: 'shared' as const, userId: '1', cover: 'https://images.unsplash.com/photo-1632038585992-fecf8a0cf59d?w=400&q=80' },
  { id: 'c2', title: 'Бизнес удирдлага', author: 'Ж.Ганбат', category: 'Бизнес', owner: 'Сарнай', available: true, status: 'shared' as const, userId: '2', cover: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80' },
  { id: 'c3', title: 'JavaScript гарын авлага', author: 'М.Төмөр', category: 'Боловсрол', owner: 'Төмөр', available: false, status: 'lending' as const, userId: '3', cover: 'https://images.unsplash.com/photo-1484665739383-a1069a82d4be?w=400&q=80' },
  { id: 'c4', title: 'Сэтгэл зүйн ухаан', author: 'Д.Оюунцэцэг', category: 'Сэтгэл судлал', owner: 'Оюун', available: true, status: 'shared' as const, userId: '4', cover: 'https://images.unsplash.com/photo-1549186723-be943b08f2c9?w=400&q=80' },
  { id: 'c5', title: 'Дэлхийн зохиолчид', author: 'Ц.Нарантуяа', category: 'Уран зохиол', owner: 'Болд', available: true, status: 'shared' as const, userId: '1', cover: 'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?w=400&q=80' },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredBooks = demoCommunityBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !selectedUser || book.owner === selectedUser;
    return matchesSearch && matchesUser;
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
            <button
              onClick={() => setSelectedUser(null)}
              className={`px-3 py-1 text-xs whitespace-nowrap transition-colors ${!selectedUser ? 'text-[#5d4037] border-b-2 border-[#8d6e63] font-medium' : 'text-[#8d6e63] hover:text-[#5d4037]'}`}
            >
              Бүгд
            </button>
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.name)}
                className={`px-3 py-1 text-xs whitespace-nowrap transition-colors ${selectedUser === user.name ? 'text-[#5d4037] border-b-2 border-[#8d6e63] font-medium' : 'text-[#8d6e63] hover:text-[#5d4037]'}`}
              >
                {user.name} ({user.bookCount})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-[#bcaaa4]" />
              <p className="text-sm text-[#8d6e63]">Хайлтад тохирох ном олдсонгүй</p>
            </div>
          ) : (
            <div className="relative px-4 py-6">
              <div className="space-y-12">
                {Array.from({ length: Math.ceil(filteredBooks.length / 5) }).map((_, shelfIndex) => (
                  <div key={shelfIndex} className="relative">
                    <div className="flex flex-wrap gap-6 justify-start pb-4 min-h-[220px]">
                      {filteredBooks.slice(shelfIndex * 5, (shelfIndex + 1) * 5).map((book, i) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (shelfIndex * 5 + i) * 0.05 }}
                          className="relative group"
                        >
                          <BookCard book={book} />
                          <div className="absolute -top-2 -right-2 bg-[#5d4037] text-[#f5deb3] text-[8px] px-2 py-0.5 rounded-full shadow-md z-10">
                            {book.owner}
                          </div>
                          {book.available ? (
                            <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="mb-2 px-3 py-1.5 bg-[#5d4037] text-[#f5deb3] text-xs hover:bg-[#4e342e] transition-colors shadow-lg rounded">
                                Зээлэх
                              </button>
                            </div>
                          ) : (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3e2723]/80 text-[#f5deb3] text-xs px-2 py-1 rounded shadow-lg">
                              Боломжгүй
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-[#6d4c41] to-[#5d4037] shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8d6e63]/20 to-transparent" />
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#3e2723]/40 blur-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
