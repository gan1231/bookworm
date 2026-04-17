import { redirect } from 'next/navigation';

// Root page redirects to library (auth middleware handles unauthenticated users)
export default function RootPage() {
  redirect('/library');
}
