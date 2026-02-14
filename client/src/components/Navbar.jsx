import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'History', to: '/history' },
  { label: 'Savings', to: '/savings' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-slate-900 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">Budget Tracker Pro</h1>
        <button
          className="rounded-md border border-slate-700 px-3 py-1 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          Menu ▾
        </button>
        <nav className="hidden gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-md px-3 py-2 text-sm ${
                location.pathname === item.to ? 'bg-sky-600' : 'hover:bg-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-slate-700 px-4 pb-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm ${
                location.pathname === item.to ? 'bg-sky-600' : 'hover:bg-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
