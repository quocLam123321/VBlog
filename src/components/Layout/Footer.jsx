import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#F3EFE6] border-t border-stone-200 py-10 mt-auto transition-all">
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* BRAND & COPYRIGHT */}
        <div className="space-y-2 select-none">
          <Link 
            to="/" 
            className="font-serif text-2xl font-black tracking-tight text-primary hover:opacity-90 transition-all"
          >
            VBlog
          </Link>
          <p className="text-xs text-stone-500 font-sans tracking-normal">
            © {currentYear} VBlog. Crafted for readers.
          </p>
        </div>

        {/* SOCIAL CHANNELS */}
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-semibold text-stone-650 hover:text-stone-900 border-b border-transparent hover:border-primary pb-0.5 transition-all"
          >
            Facebook
          </a>
          <a 
            href="https://goodreads.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-semibold text-stone-650 hover:text-stone-900 border-b border-transparent hover:border-primary pb-0.5 transition-all"
          >
            Goodreads
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-semibold text-stone-650 hover:text-stone-900 border-b border-transparent hover:border-primary pb-0.5 transition-all"
          >
            Instagram
          </a>
          <a 
            href="#newsletter"
            className="text-xs font-semibold text-stone-650 hover:text-stone-900 border-b border-transparent hover:border-primary pb-0.5 transition-all"
          >
            Newsletter
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
