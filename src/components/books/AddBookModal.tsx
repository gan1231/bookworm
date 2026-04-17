'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: {
    title: string;
    author: string;
    category: string;
    cover?: string;
    isbn?: string;
    notes?: string;
  }) => void;
  editBook?: {
    id: string;
    title: string;
    author: string;
    category: string;
    cover?: string;
    isbn?: string;
    notes?: string;
  } | null;
}

const categories = [
  'Уран зохиол',
  'Шинжлэх ухаан',
  'Түүх',
  'Бизнес',
  'Сэтгэл судлал',
  'Хүүхдийн ном',
  'Боловсрол',
  'Урлаг',
  'Бусад'
];

export function AddBookModal({ isOpen, onClose, onSave, editBook }: AddBookModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [isbn, setIsbn] = useState('');
  const [notes, setNotes] = useState('');
  const [cover, setCover] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(editBook?.title || '');
      setAuthor(editBook?.author || '');
      setCategory(editBook?.category || categories[0]);
      setIsbn(editBook?.isbn || '');
      setNotes(editBook?.notes || '');
      setCover(editBook?.cover || '');
    }
  }, [isOpen, editBook]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      title,
      author,
      category,
      cover: cover || undefined,
      isbn: isbn || undefined,
      notes: notes || undefined,
    });
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#3e2723]/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#fefdfb] w-full md:max-w-lg max-h-[90vh] overflow-y-auto relative z-10 flex flex-col shadow-2xl"
          >
            <div className="sticky top-0 bg-[#f5f0e8] border-b border-[#d4c5a9] px-6 py-4 flex items-center justify-between z-20">
              <h2 className="text-lg font-serif font-medium text-[#3e2723]">
                {editBook ? 'Ном засах' : 'Шинэ ном нэмэх'}
              </h2>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-[#8d6e63] hover:text-[#3e2723] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-[#5d4037]">Номын хавтас</label>
                <div className="flex gap-4">
                  <div className={`w-20 h-28 border border-[#d4c5a9] overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm ${cover ? '' : 'bg-[#efebe9]'}`}>
                    {cover ? (
                      <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-[#a1887f]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1 justify-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 border border-[#8d6e63] bg-[#fefdfb] text-[#5d4037] text-sm font-medium py-2 hover:bg-[#f5f0e8] transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Зураг оруулах</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const mockImage = `https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rfGVufDB8fHx8MTcyNzA2MTY3Mw&ixlib=rb-4.1.0&q=80&w=400`;
                        setCover(mockImage);
                      }}
                      className="text-xs text-[#8d6e63] hover:text-[#5d4037] transition-colors"
                    >
                      Demo зураг ашиглах
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-1.5 text-sm font-medium text-[#5d4037]">Номын нэр <span className="text-[#a1887f]">*</span></label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4c5a9] bg-[#fefdfb] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723]"
                    placeholder="Жишээ: Монголын нууц товчоо"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block mb-1.5 text-sm font-medium text-[#5d4037]">Зохиогч <span className="text-[#a1887f]">*</span></label>
                  <input
                    id="author"
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4c5a9] bg-[#fefdfb] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723]"
                    placeholder="Жишээ: Б.Ринчен"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block mb-1.5 text-sm font-medium text-[#5d4037]">Ангилал <span className="text-[#a1887f]">*</span></label>
                    <select
                      id="category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-[#d4c5a9] bg-[#fefdfb] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723] appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="isbn" className="block mb-1.5 text-sm font-medium text-[#5d4037]">ISBN</label>
                    <input
                      id="isbn"
                      type="text"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      className="w-full px-3 py-2 border border-[#d4c5a9] bg-[#fefdfb] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723]"
                      placeholder="Код"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block mb-1.5 text-sm font-medium text-[#5d4037]">Тэмдэглэл</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4c5a9] bg-[#fefdfb] focus:outline-none focus:border-[#8d6e63] transition-colors text-sm text-[#3e2723] min-h-28 resize-none font-serif"
                    placeholder="Номын тухай болон өөрийн сэтгэгдлээ үлдээх..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 pb-8">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 border border-[#d4c5a9] text-[#6d4c41] text-sm font-medium hover:bg-[#f5f0e8] transition-colors"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#5d4037] text-[#f5deb3] text-sm font-medium hover:bg-[#4e342e] transition-colors shadow-md"
                >
                  {editBook ? 'Засварыг хадгалах' : 'Номын санд нэмэх'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
