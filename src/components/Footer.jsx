import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#fdfbf7] border-t border-[#e7e3dc] mt-12 text-[#70655d]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-[#2c2520] tracking-tight">
            VBlog
          </h4>
          <p className="font-sans text-[11px] text-[#a08e81]">
            &copy; {currentYear} VBlog. Crafted for readers.
          </p>
        </div>

        {/* Chuyển các link sang thẻ Link của React Router */}
        <div className="flex items-center gap-6 font-sans text-xs font-medium tracking-wide">
          <Link
            to="/facebook-mock"
            className="hover:text-[#2c2520] no-underline text-[#70655d]"
          >
            Facebook
          </Link>
          <Link
            to="/goodreads-mock"
            className="hover:text-[#2c2520] no-underline text-[#70655d]"
          >
            Goodreads
          </Link>
          <Link
            to="/instagram-mock"
            className="hover:text-[#2c2520] no-underline text-[#70655d]"
          >
            Instagram
          </Link>
          <Link
            to="/newsletter"
            className="hover:text-[#2c2520] no-underline text-[#70655d]"
          >
            Newsletter
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
