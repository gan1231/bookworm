'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import type { Message, Conversation } from '@/types';

// Demo conversations
const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    otherUser: { id: '2', name: 'Сарнай', email: 'sarnai@mail.com', createdAt: '' },
    unreadCount: 2,
    lastMessage: { id: 'm1', senderId: '2', receiverId: 'demo', content: 'Ном зээлдэх боломжтой юу?', channel: 'app', createdAt: new Date(Date.now() - 300000).toISOString() },
  },
  {
    id: 'conv2',
    otherUser: { id: '3', name: 'Төмөр', email: 'tumur@mail.com', createdAt: '' },
    unreadCount: 0,
    lastMessage: { id: 'm2', senderId: 'demo', receiverId: '3', content: 'За, болно дээ', channel: 'app', createdAt: new Date(Date.now() - 3600000).toISOString() },
  },
];

const DEMO_MESSAGES: Record<string, Message[]> = {
  conv1: [
    { id: 'm1', senderId: '2', receiverId: 'demo', content: 'Сайн байна уу?', channel: 'app', createdAt: new Date(Date.now() - 600000).toISOString() },
    { id: 'm2', senderId: '2', receiverId: 'demo', content: 'Ном зээлдэх боломжтой юу?', channel: 'app', createdAt: new Date(Date.now() - 300000).toISOString() },
  ],
  conv2: [
    { id: 'm3', senderId: '3', receiverId: 'demo', content: 'JavaScript номыг зарах гэж байна', channel: 'app', createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'm4', senderId: 'demo', receiverId: '3', content: 'За, болно дээ', channel: 'app', createdAt: new Date(Date.now() - 3600000).toISOString() },
  ],
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const { user } = useAuthStore();
  const { conversations, messages, activeConversationId, isConnected, setConversations, setMessages, setActiveConversation, addMessage, markAsRead } = useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConversations(DEMO_CONVERSATIONS);
    Object.entries(DEMO_MESSAGES).forEach(([id, msgs]) => setMessages(id, msgs));
    // Simulate connected state for demo
    useChatStore.getState().setConnected(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const activeMessages = activeConversationId ? (messages[activeConversationId] ?? []) : [];

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    markAsRead(id);
  };

  const handleSend = () => {
    if (!inputText.trim() || !activeConversationId || !user) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: activeConv?.otherUser.id ?? '',
      content: inputText.trim(),
      channel: 'app',
      createdAt: new Date().toISOString(),
    };
    addMessage(activeConversationId, msg);
    setInputText('');
    // TODO: emit via socket.io: socket.emit('message:send', msg)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="h-full flex bg-[#faf8f3]">
      {/* Conversations list */}
      <div className={`${activeConversationId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-[#d4c5a9] bg-[#f5f0e8]`}>
        <div className="p-4 border-b border-[#d4c5a9] flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#3e2723]">Яриа</h2>
          <div className="flex items-center gap-1 text-xs text-[#8d6e63]">
            {isConnected ? <Wifi className="w-3 h-3 text-green-600" /> : <WifiOff className="w-3 h-3 text-red-400" />}
            <span>{isConnected ? 'Холбогдсон' : 'Холбоогүй'}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 text-[#bcaaa4]" />
              <p className="text-sm text-[#8d6e63]">Яриа байхгүй байна</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-4 border-b border-[#e8dcc8] hover:bg-[#ede8df] transition-colors text-left ${activeConversationId === conv.id ? 'bg-[#e8dcc8]' : ''}`}
              >
                <div className="w-10 h-10 bg-[#5d4037] rounded-full flex items-center justify-center text-[#f5deb3] font-bold text-sm flex-shrink-0">
                  {conv.otherUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-[#3e2723]">{conv.otherUser.name}</span>
                    {conv.lastMessage && (
                      <span className="text-[10px] text-[#a1887f]">{formatTime(conv.lastMessage.createdAt)}</span>
                    )}
                  </div>
                  {conv.lastMessage && (
                    <p className="text-xs text-[#8d6e63] truncate">{conv.lastMessage.content}</p>
                  )}
                </div>
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-[#5d4037] rounded-full flex items-center justify-center text-[#f5deb3] text-[10px] font-bold flex-shrink-0">
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat window */}
      {activeConversationId ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="bg-[#f5f0e8] border-b border-[#d4c5a9] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setActiveConversation(null)} className="md:hidden text-[#8d6e63] hover:text-[#3e2723]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-[#5d4037] rounded-full flex items-center justify-center text-[#f5deb3] text-sm font-bold">
              {activeConv?.otherUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-[#3e2723]">{activeConv?.otherUser.name}</p>
              <p className="text-xs text-[#8d6e63]">App & Messenger-р дамжуулж харилцана</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeMessages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 text-sm shadow-sm ${isMe ? 'bg-[#5d4037] text-[#f5deb3] rounded-l-xl rounded-tr-xl' : 'bg-[#fefdfb] text-[#3e2723] border border-[#d4c5a9] rounded-r-xl rounded-tl-xl'}`}>
                    <p>{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-[10px] ${isMe ? 'text-[#d4a574]' : 'text-[#a1887f]'}`}>{formatTime(msg.createdAt)}</span>
                      {msg.channel === 'messenger' && <span className="text-[9px] bg-[#1877f2]/20 text-[#1877f2] px-1 rounded">FB</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-[#f5f0e8] border-t border-[#d4c5a9] p-3 flex gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Мессеж бичих..."
              rows={1}
              className="flex-1 px-3 py-2 bg-[#fefdfb] border border-[#d4c5a9] text-sm text-[#3e2723] focus:outline-none focus:border-[#8d6e63] resize-none transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-10 h-10 bg-[#5d4037] text-[#f5deb3] flex items-center justify-center hover:bg-[#4e342e] transition-colors disabled:opacity-40 shadow-md flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-center">
          <div>
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-[#bcaaa4]" />
            <p className="text-sm text-[#8d6e63]">Яриа сонгоно уу</p>
          </div>
        </div>
      )}
    </div>
  );
}
