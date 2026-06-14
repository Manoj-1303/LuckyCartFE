import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-dark text-slate-300 font-sans border-t border-slate-850 mt-16 relative">
      <button onClick={scrollToTop} className="absolute right-6 -top-6 bg-primary hover:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer"
        title="Scroll to top">
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">         
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block text-3xl font-heading font-extrabold text-white tracking-wider">
              Lucky<span className="text-primary">Cart</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your ultimate destination for premium laptops, smartphones, sound systems, and smartwatch accessories. Empowering your tech lifestyle with next-gen speed.
            </p>
            <div className="flex gap-4">
             {[
                { 
                  icon: (
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ), 
                  href: '#'
                },
                { 
                  icon: (
                    <svg className="w-[18px] h-[18px] stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  ), 
                  href: '#' 
                }
              ].map((social, i) => (
                <a  key={i} href={social.href} target="_blank" rel="noreferrer" className="bg-slate-800 text-slate-400 p-2.5 rounded-lg hover:text-white hover:bg-primary transition duration-250">
                  {social.icon} </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-l-2 border-primary pl-3">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="hover:text-primary hover:pl-1 transition-all duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products" state={{ category: 'Laptops' }} className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/products" state={{ category: 'Mobiles' }} className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products" state={{ category: 'Earphones' }} className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Audio & Speakers
                </Link>
              </li>
              <li>
                <Link to="/products" state={{ category: 'Smartwatches' }} className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-l-2 border-primary pl-3">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#faq" className="hover:text-primary hover:pl-1 transition-all duration-200">
                  FAQs & Help Center
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-primary hover:pl-1 transition-all duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide uppercase border-l-2 border-primary pl-3">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400">12/11, 1 lights street, Chennai, Tamil Nadu-600 007</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-slate-400">+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-slate-400">luckycart@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="font-heading">&copy; {new Date().getFullYear()} LuckyCart Electronics. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;