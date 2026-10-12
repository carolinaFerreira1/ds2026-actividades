import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
export default Layout;