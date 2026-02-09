'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { Menu, X, User as UserIcon, LogOut, ScanLine, Swords } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/#events' },
    { name: 'Schedule', path: '/#schedule' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ronin Navigation */}
      <nav className="nav-ronin sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo - Katana/Sword Icon */}
            <div
              className="flex items-center cursor-pointer gap-3"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-[#2F5C5C] border-2 border-[#EFE6D5] flex items-center justify-center">
                <Swords className="w-5 h-5 text-[#EFE6D5]" />
              </div>
              <span className="font-mega text-xl text-[#EFE6D5] tracking-wider">
                NEXOTHSAV
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-header text-sm text-[#EFE6D5] hover:text-[#4A7A7A] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === UserRole.ADMIN && (
                    <button
                      onClick={() => router.push('/admin/scanner')}
                      className="btn-ronin btn-ronin-jade text-xs py-2 px-3"
                    >
                      <ScanLine className="w-4 h-4" />
                      Scanner
                    </button>
                  )}
                  <button
                    onClick={() => router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin')}
                    className="btn-ronin btn-ronin-cream text-xs py-2 px-3"
                  >
                    <UserIcon className="w-4 h-4" />
                    {user.role === UserRole.PARTICIPANT ? 'Dashboard' : 'Admin'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-ronin btn-ronin-ghost text-xs py-2 px-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="btn-ronin btn-ronin-jade"
                >
                  Enter the Arena
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#EFE6D5] p-2 border-2 border-[#EFE6D5]"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#080808] border-t-4 border-[#2F5C5C]">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block font-header text-[#EFE6D5] hover:text-[#4A7A7A] py-2 border-b border-[#2F5C5C]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  {user.role === UserRole.ADMIN && (
                    <button
                      onClick={() => {
                        router.push('/admin/scanner');
                        setIsMenuOpen(false);
                      }}
                      className="w-full btn-ronin btn-ronin-jade text-left"
                    >
                      🔍 Food Scanner
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin');
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-ronin btn-ronin-cream text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-ronin btn-ronin-ghost text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    router.push('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn-ronin btn-ronin-jade"
                >
                  Enter the Arena
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Ronin Footer */}
      <footer className="footer-ronin text-[#EFE6D5] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2F5C5C] border-2 border-[#EFE6D5] flex items-center justify-center">
                  <Swords className="w-5 h-5 text-[#EFE6D5]" />
                </div>
                <span className="font-mega text-xl text-[#EFE6D5]">NEXOTHSAV</span>
              </div>
              <p className="font-body text-[#EFE6D5] opacity-70 max-w-sm">
                Experience Srinathon, our flagship 24-hour hackathon, along with Robo Race, Aero Events, and more exciting activities.
              </p>
            </div>
            <div>
              <h3 className="font-header text-[#4A7A7A] mb-4">Events</h3>
              <ul className="space-y-2 font-body text-sm">
                <li><a href="#" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">⚔️ Srinathon</a></li>
                <li><a href="#" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">🤖 Robo Race</a></li>
                <li><a href="#" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">✈️ Aero Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-header text-[#4A7A7A] mb-4">Quick Links</h3>
              <ul className="space-y-2 font-body text-sm">
                <li><Link href="/login" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">Register</Link></li>
                <li><Link href="/dashboard" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">Dashboard</Link></li>
                <li><a href="#" className="text-[#EFE6D5] opacity-70 hover:opacity-100 hover:text-[#4A7A7A]">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Ink Divider */}
          <div className="my-8 divider-ink-jagged"></div>

          <div className="text-center">
            <p className="font-body text-sm text-[#EFE6D5] opacity-50">© 2024 NEXOTHSAV • Made by Manish</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;