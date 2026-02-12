'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types';
import { Menu, X, User as UserIcon, LogOut, ScanLine, Hexagon } from 'lucide-react';

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
    { name: 'Tracks', path: '/#tracks' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== NEXATHON NAV ===== */}
      <nav className="nav-nex sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer gap-3"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-[#0E46A3] border-2 border-white flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <span className="font-mega text-2xl text-white tracking-wider">
                NEXATHON
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-header text-xs text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === UserRole.ADMIN && (
                    <button
                      onClick={() => router.push('/admin/scanner')}
                      className="btn-nex btn-nex-ghost text-xs py-2 px-3"
                    >
                      <ScanLine className="w-4 h-4" />
                      Scanner
                    </button>
                  )}
                  <button
                    onClick={() => router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin')}
                    className="btn-nex btn-nex-primary text-xs py-2 px-3"
                  >
                    <UserIcon className="w-4 h-4" />
                    {user.role === UserRole.PARTICIPANT ? 'Dashboard' : 'Admin'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-nex btn-nex-ghost text-xs py-2 px-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="btn-nex btn-nex-primary"
                >
                  Register Now
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 border-2 border-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#080808] border-t-3 border-[#0E46A3]">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block font-header text-white/80 hover:text-white py-2 border-b border-white/10"
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
                      className="w-full btn-nex btn-nex-ghost text-left"
                    >
                      🔍 Scanner
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push(user.role === UserRole.PARTICIPANT ? '/dashboard' : '/admin');
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-nex btn-nex-primary text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-nex btn-nex-ghost text-left"
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
                  className="w-full btn-nex btn-nex-primary"
                >
                  Register Now
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* ===== NEXATHON FOOTER ===== */}
      <footer className="footer-nex text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0E46A3] border-2 border-white flex items-center justify-center">
                  <Hexagon className="w-5 h-5 text-white" />
                </div>
                <span className="font-mega text-2xl text-white">NEXATHON</span>
              </div>
              <p className="font-body text-white/60 max-w-sm">
                Where code meets culture. A 24-hour hackathon experience blending
                innovation with tradition. Build, learn, and compete.
              </p>
            </div>
            <div>
              <h3 className="font-header text-[#1A5FCF] mb-4 text-sm">Events</h3>
              <ul className="space-y-2 font-body text-sm">
                <li><a href="#" className="text-white/60 hover:text-white">💻 Hackathon</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">🤖 Robo Race</a></li>
                <li><a href="#" className="text-white/60 hover:text-white">✈️ Aero Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-header text-[#1A5FCF] mb-4 text-sm">Quick Links</h3>
              <ul className="space-y-2 font-body text-sm">
                <li><Link href="/login" className="text-white/60 hover:text-white">Register</Link></li>
                <li><Link href="/dashboard" className="text-white/60 hover:text-white">Dashboard</Link></li>
                <li><a href="#" className="text-white/60 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="divider-white my-8 opacity-20"></div>

          <div className="text-center">
            <p className="font-body text-sm text-white/40">© 2026 NEXATHON • Made by Manish</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;