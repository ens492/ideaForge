
import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            <Link to="/faq" className="text-gray-600 hover:text-idea-600 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-idea-600 transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-idea-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-idea-600 transition-colors">
              Terms of Use
            </Link>
          </nav>

          {/* Right side - Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-idea-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-idea-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-idea-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
