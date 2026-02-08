'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { Menu, X, Sparkles, User as UserIcon, LogOut, ScanLine, Sun } from 'lucide-react';

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
    { name: 'Events', path: '/#about' },
    { name: 'Schedule', path: '/#schedule' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Carnival Nav */}
      <nav className="nav-carnival sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-[#FFD700] border-2 border-[#FFD700] rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#FF0000]" />
              </div>
              <span className="font-carnival text-xl text-[#FFD700]">
                Nexothsav
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-carnival text-sm text-white hover:text-[#FFD700] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === UserRole.ADMIN && (
                    <button
                      onClick={() => router.push('/admin/scanner')}
                      className="btn-carnival btn-carnival-red text-xs py-2 px-3"
                    >
                      <ScanLine className="w-4 h-4" />
                      Scanner
                    </button>
                  )}
                  <button
                    onClick={() => router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin')}
                    className="btn-carnival btn-carnival-yellow text-xs py-2 px-3"
                  >
                    <UserIcon className="w-4 h-4" />
                    {user.role === UserRole.PARTICIPANT ? 'Dashboard' : 'Admin'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-carnival btn-carnival-white text-xs py-2 px-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="btn-carnival btn-carnival-yellow"
                >
                  Join the Party!
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#FFD700] p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1A1A2E] border-t-2 border-[#FFD700]">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block font-carnival text-white hover:text-[#FFD700] py-2"
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
                      className="w-full btn-carnival btn-carnival-red text-left"
                    >
                      🔍 Food Scanner
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin');
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-carnival btn-carnival-yellow text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-carnival btn-carnival-white text-left text-[#FF0000]"
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
                  className="w-full btn-carnival btn-carnival-yellow"
                >
                  Join the Party!
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Carnival Footer */}
      <footer className="footer-carnival text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] border-2 border-[#FFD700] rounded-full flex items-center justify-center">
                  <Sun className="w-6 h-6 text-[#FF0000]" />
                </div>
                <span className="font-carnival text-xl text-[#FFD700]">Nexothsav</span>
              </div>
              <p className="text-gray-300 max-w-sm">
                Experience Srinathon, our flagship 24-hour hackathon, along with Robo Race, Aero Events, and more exciting activities!
              </p>
            </div>
            <div>
              <h3 className="font-carnival text-[#FFD700] mb-4">Events</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-[#FFD700]">🔥 Srinathon</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">🤖 Robo Race</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">✈️ Aero Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-carnival text-[#FFD700] mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/login" className="hover:text-[#FFD700]">Register</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#FFD700]">Dashboard</Link></li>
                <li><a href="#" className="hover:text-[#FFD700]">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Zigzag Divider */}
          <div className="my-8 h-4 bg-[#FFD700]" style={{
            clipPath: 'polygon(0 100%, 2.5% 0, 5% 100%, 7.5% 0, 10% 100%, 12.5% 0, 15% 100%, 17.5% 0, 20% 100%, 22.5% 0, 25% 100%, 27.5% 0, 30% 100%, 32.5% 0, 35% 100%, 37.5% 0, 40% 100%, 42.5% 0, 45% 100%, 47.5% 0, 50% 100%, 52.5% 0, 55% 100%, 57.5% 0, 60% 100%, 62.5% 0, 65% 100%, 67.5% 0, 70% 100%, 72.5% 0, 75% 100%, 77.5% 0, 80% 100%, 82.5% 0, 85% 100%, 87.5% 0, 90% 100%, 92.5% 0, 95% 100%, 97.5% 0, 100% 100%)'
          }}></div>

          <div className="text-center text-gray-400">
            <p className="font-carnival text-sm">© 2024 Nexothsav • Made by Manish</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;