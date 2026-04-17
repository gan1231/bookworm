'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '@/types';

const DEMO_BOOKS: Book[] = [
  {
    id: '1',
    userId: 'demo',
    title: 'Монгол хэлний дүрэм',
    author: 'Ц.Дамдинсүрэн',
    category: 'Боловсрол',
    isbn: '978-99929-0-123-4',
    status: 'private',
    cover: 'https://images.unsplash.com/photo-1632038585992-fecf8a0cf59d?w=400&q=80',
  },
  {
    id: '2',
    userId: 'demo',
    title: 'Бичил бизнесийн гарын авлага',
    author: 'Б.Ганбат',
    category: 'Бизнес',
    notes: 'Маш хэрэгтэй ном байсан',
    status: 'private',
    cover: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80',
  },
  {
    id: '3',
    userId: 'demo',
    title: 'Хүүхдийн сэтгэл зүй',
    author: 'Н.Сарнай',
    category: 'Сэтгэл судлал',
    status: 'shared',
    cover: 'https://images.unsplash.com/photo-1549186723-be943b08f2c9?w=400&q=80',
  },
];

interface BookStore {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'userId'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      books: DEMO_BOOKS,
      addBook: (bookData) =>
        set((state) => ({
          books: [
            ...state.books,
            { ...bookData, id: Date.now().toString(), userId: 'demo' },
          ],
        })),
      updateBook: (id, bookData) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, ...bookData } : b)),
        })),
      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),
    }),
    { name: 'bookworm-books' }
  )
);
