'use client';

import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useBookStore } from '@/store/useBookStore';
import { BookCard } from '@/components/books/BookCard';
import { AddBookModal } from '@/components/books/AddBookModal';
import type { Book } from '@/types';

export default function LibraryPage() {
  const { books, addBook, updateBook, deleteBook } = useBookStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Бүгд');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const categories = ['Бүгд', ...Array.from(new Set(books.map((b) => b.category)))];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Бүгд' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const handleEdit = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (book) { setEditingBook(book); setIsAddModalOpen(true); }
  };

  const handleSave = (bookData: Omit<Book, 'id' | 'userId' | 'status'>) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook({ ...bookData, status: 'private' });
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-[#faf8f3]">
      <div className="p-4 md:p-6 bg-[#f5f0e8] sticky top-0 z-10 border-b border-[#d4c5a9] shadow-sm">
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'text-[#5d4037] border-b-2 border-[#8d6e63] font-medium'
                    : 'text-[#8d6e63] hover:text-[#5d4037]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
              <Search className="w-10 h-10 text-[#bcaaa4] mb-3" />
              <p className="text-sm text-[#8d6e63]">
                {searchQuery || selectedCategory !== 'Бүгд'
                  ? 'Хайлтад тохирох ном олдсонгүй'
                  : 'Таны номын сан хоосон байна'}
              </p>
            </div>
          ) : (
            <div className="relative px-4 py-6">
              <div className="space-y-12">
                {Array.from({ length: Math.ceil(filteredBooks.length / 5) }).map((_, shelfIndex) => (
                  <div key={shelfIndex} className="relative">
                    <div className="flex flex-wrap gap-6 justify-start pb-4 min-h-[220px]">
                      {filteredBooks.slice(shelfIndex * 5, (shelfIndex + 1) * 5).map((book, index) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (shelfIndex * 5 + index) * 0.05 }}
                        >
                          <BookCard book={book} onDelete={deleteBook} onEdit={handleEdit} />
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

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed md:absolute bottom-6 right-4 md:right-6 w-12 h-12 bg-[#5d4037] text-[#f5deb3] flex items-center justify-center hover:bg-[#4e342e] transition-colors z-20 shadow-lg"
      >
        <Plus className="w-5 h-5" />
      </button>

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setEditingBook(null); }}
        onSave={handleSave}
        editBook={editingBook}
      />
    </div>
  );
}
