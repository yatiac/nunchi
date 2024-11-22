'use client'

import { useState } from 'react'
import { Menu, User, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Define menu options as an object
  const menuOptions = {
    home: { label: 'Inicio', href: '#' },   
    settings: { label: 'Configuración', href: '#' },
  }

  return (
    <header className="bg-gray-800 text-white">
      <div className="p-4 flex justify-between items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <h1 className="text-2xl font-bold">Mi Lista Nunchi</h1>
        <button className="text-2xl" aria-label="User profile">
          <User />
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
    </header>
  )
}

