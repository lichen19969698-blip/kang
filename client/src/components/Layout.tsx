import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "首页", path: "/" },
    { label: "产品中心", path: "/products" },
    { label: "联系我们", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> 13926962928</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> 15829053969@163.com</span>
          </div>
          <div className="hidden md:block">
            工业级电子板材专业供应商
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <div className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
                <path d="M9 15h.01" />
                <path d="M15 15h.01" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
            </div>
            ElecBoard<span className="text-foreground">Tech</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" asChild>
              <Button size="sm" className="rounded-sm font-semibold">获取报价</Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b bg-background p-4 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "block py-2 text-base font-medium",
                  location === item.path ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" asChild>
              <Button className="w-full mt-4" onClick={() => setIsMobileMenuOpen(false)}>获取报价</Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 9h.01" />
                  <path d="M15 9h.01" />
                  <path d="M9 15h.01" />
                  <path d="M15 15h.01" />
                </svg>
              </div>
              西安达康电子材料有限公司
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              专注于高品质工业电子板材的研发与销售，为全球电子制造企业提供可靠的基础材料解决方案。
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">产品系列</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">FR-4 环氧玻纤板</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">CEM-1/CEM-3 复合基板</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">金属基覆铜板 (IMS)</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">高频微波板材</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">首页</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">产品中心</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">索取样品</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">联系方式</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>陕西省西安市经济技术开发区<br />二环北路东段1375号亚冠大厦<br />1号楼2单元</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>13926962928</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>15829053969@163.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} 西安达康电子材料有限公司 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
