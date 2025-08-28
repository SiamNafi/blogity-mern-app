export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Brand name */}
          <h1 className="text-lg text-primary font-semibold">Blogity</h1>

          {/* Center - Navigation links */}
          <nav className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Right side - Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Blogity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
