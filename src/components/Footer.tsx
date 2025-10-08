import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors">
              Skills
            </Link>
            <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Works
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Jian Aquino. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;