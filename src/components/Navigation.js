'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaRobot, FaUser } from 'react-icons/fa';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: FaHome },
  { href: '/chat', label: 'Chatbot', icon: FaRobot },
  { href: '/profile', label: 'Profile', icon: FaUser },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-[64px] 
                transition-colors duration-200 ease-in-out
                ${isActive 
                  ? 'text-primary border-t-2 border-primary' 
                  : 'text-muted-foreground hover:text-primary'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}