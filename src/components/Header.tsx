'use client'

import { useEffect, useState } from 'react'
import { Menu, User as UserIcon, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { User, Session } from "@supabase/supabase-js";
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  // const [user, setUser] = useState<User | null>(null);
  const { user, loading } = useAuth();

  // Define menu options as an object
  const menuOptions = {
    home: { label: 'Inicio', href: '#' },
    settings: { label: 'Configuración', href: '#' },
  }

  const profileMenuOptions = {
    profile: { label: 'Perfil', href: '#' },
    myLists: { label: 'Mis listas', href: '#' },
    mySavedGifts: { label: 'Mis regalos guardados', href: '#' },
    logout: { label: 'Cerrar sesión', href: 'logout' },
  }

  return (
    <header className="bg-gray-800 text-white">
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
            if (isProfileMenuOpen) setIsProfileMenuOpen(false)
          }}
          className="text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <h1 className="text-2xl font-bold">Mi Lista Nunchi
        </h1>
        <button
          className="text-2xl"
          aria-label="User profile"
          onClick={() => {
            setIsProfileMenuOpen(!isProfileMenuOpen)
            if (isMenuOpen) setIsMenuOpen(false)
          }}
        >
          {isProfileMenuOpen ? <X /> : 
            user === null ? <span>Sign in</span> : 
            <div className="flex items-center gap-2">
              <UserIcon />
              <span className="text-sm">{user.email}</span>
            </div>
          }
        </button>
      </div>
      {isMenuOpen && (
        <nav className="p-4 border-t border-gray-700">
          <ul className="space-y-2">
            {Object.values(menuOptions).map(option => (
              <li key={option.label}>
                <a href={option.href} className="block hover:text-gray-300">
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {isProfileMenuOpen && (
        <nav className="p-4 border-t border-gray-700">
          <ul className="space-y-2 text-right">
            {Object.values(profileMenuOptions).map(option => (
              <li key={option.label}>
                <a href={option.href} className="block hover:text-gray-300">
                  {option.label}
                </a>
              </li>
            ))}
            
          </ul>
        </nav>
      )}
    </header>
  )
}

