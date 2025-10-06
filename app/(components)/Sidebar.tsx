// app/(components)/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UploadIcon } from './icons/UploadIcon';
import { NoteIcon } from './icons/NoteIcon';
// Importa le altre icone...

const navItems = [
  { href: '/', label: 'Dashboard & Upload', icon: UploadIcon },
  { href: '/appunti', label: 'Appunti', icon: NoteIcon },
  // { href: '/fotocamera', label: 'Fotocamera', icon: CameraIcon },
  // { href: '/quiz', label: 'Quiz', icon: QuizIcon },
  // { href: '/visualizzatore-json', label: 'Visualizzatore JSON', icon: JsonIcon },
  // { href: '/impostazioni', label: 'Impostazioni', icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
      <div className="flex h-20 w-full items-center justify-center border-b border-gray-200">
        <span className="text-2xl font-bold text-indigo-600">SAI</span>
      </div>
      <nav className="flex flex-1 flex-col gap-y-4 pt-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative rounded-xl p-2 ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-6 w-6" />
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white" />
                  </div>
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="flex h-20 w-full items-center justify-center border-t border-gray-200">
        {/* <UserIcon className="h-7 w-7 text-gray-400" /> */}
      </div>
    </aside>
  );
}
