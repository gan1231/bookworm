'use client';

import { Book, Trash2, Edit } from 'lucide-react';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    category: string;
    cover?: string;
    isbn?: string;
    notes?: string;
  };
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function BookCard({ book, onDelete, onEdit }: BookCardProps) {
  // Generate gradient for book spine based on category
  const spineColors: Record<string, string> = {
    'Уран зохиол': 'from-[#8b4513] to-[#654321]',
    'Шинжлэх ухаан': 'from-[#2c5f2d] to-[#1b4332]',
    'Түүх': 'from-[#7c2d12] to-[#5c1f0a]',
    'Бизнес': 'from-[#1e3a5f] to-[#0f2847]',
    'Сэтгэл судлал': 'from-[#6b2d5c] to-[#4a1f3f]',
    'Хүүхдийн ном': 'from-[#d97706] to-[#b45309]',
    'Боловсрол': 'from-[#475569] to-[#334155]',
    'Урлаг': 'from-[#881337] to-[#5f0f28]',
    'Бусад': 'from-[#57534e] to-[#44403c]'
  };

  const spineGradient = spineColors[book.category] || spineColors['Бусад'];

  return (
    <div className="group relative">
      {/* Book standing on shelf */}
      <div className="relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 duration-300">
        {/* Book Cover */}
        <div className={`relative w-32 h-44 shadow-lg transform perspective-1000 hover:shadow-2xl transition-shadow duration-300 ${!book.cover ? `bg-gradient-to-br ${spineGradient}` : ''}`}>
          {/* Book Spine (left edge) */}
          <div className={`absolute -left-2 top-0 w-2 h-full bg-gradient-to-b ${spineGradient} shadow-md`} />

          {/* Book Cover Face */}
          <div className="relative w-full h-full overflow-hidden border-2 border-[#5d4037]/30">
            {book.cover ? (
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${spineGradient} flex items-center justify-center p-3`}>
                <div className="text-center">
                  <h4 className="text-[#f5deb3] font-serif text-xs font-bold leading-tight mb-2 line-clamp-4">
                    {book.title}
                  </h4>
                  <Book className="w-6 h-6 text-[#f5deb3]/50 mx-auto" />
                </div>
              </div>
            )}
          </div>

          {/* Book pages (right edge) */}
          <div className="absolute -right-1 top-1 w-1 h-[calc(100%-4px)] bg-[#f5f0e8] shadow-sm" />
        </div>

        {/* Book title label below */}
        <div className="mt-3 w-32 text-center px-2">
          <h3 className="font-serif text-xs font-medium text-[#3e2723] leading-tight mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-[8px] text-[#8d6e63] truncate">{book.author}</p>
        </div>

        {/* Action buttons - show on hover */}
        {(onDelete || onEdit) && (
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-[#3e2723]/90 rounded p-1">
            {onEdit && (
              <button
                onClick={() => onEdit(book.id)}
                className="w-6 h-6 flex items-center justify-center text-[#d4a574] hover:text-[#f5deb3] transition-colors"
                title="Засах"
              >
                <Edit className="w-3 h-3" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(book.id)}
                className="w-6 h-6 flex items-center justify-center text-[#d4a574] hover:text-[#ff6b6b] transition-colors"
                title="Устгах"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tooltip with notes on hover */}
      {book.notes && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#3e2723] text-[#f5deb3] text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
          <p className="font-serif italic">"{book.notes}"</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#3e2723]" />
        </div>
      )}
    </div>
  );
}
