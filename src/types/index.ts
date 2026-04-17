export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  facebookMessengerId?: string;
  bookCount?: number;
  createdAt: string;
}

export interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  category: string;
  cover?: string;
  isbn?: string;
  notes?: string;
  status: 'private' | 'shared' | 'lending';
  owner?: string;
  available?: boolean;
}

export interface Listing {
  id: string;
  userId: string;
  bookId?: string;
  type: 'sell' | 'buy' | 'wanted';
  title: string;
  author: string;
  price?: number;
  description: string;
  seller: string;
  category: string;
  cover?: string;
  status: 'active' | 'closed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  channel: 'app' | 'messenger';
  readAt?: string;
  createdAt: string;
  senderName?: string;
  senderAvatar?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'loan_request' | 'loan_approved' | 'new_message' | 'listing_reply';
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  otherUser: User;
  lastMessage?: Message;
  unreadCount: number;
}
