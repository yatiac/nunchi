export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {currentYear} Hecho por <a href="https://github.com/yatiac" className="text-blue-400" target="_blank">Yatiac</a> con ❤️</p>
      <p>Contacto: <a href="mailto:info@yatiac.com" className="text-blue-400">info@yatiac.com</a></p>
    </footer>
  )
}

