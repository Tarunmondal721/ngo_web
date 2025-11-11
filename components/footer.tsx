import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-t overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & Mission - Spans 4 columns */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  height={70} 
                  width={70} 
                  className="m-0 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110" 
                  alt="Suhrit Organization" 
                />
                <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
              </div>
              <span className="font-heading text-xl text-foreground">
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Suhrit
                </span>{" "}
                <span className="font-light text-lg text-muted-foreground">Organisation</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Creating positive change in communities worldwide through compassion, action, and hope.
            </p>
            <Button className="mt-4 shadow-lg hover:shadow-xl transition-shadow">
              Join Our Mission
            </Button>
          </div>

          {/* Quick Links - Spans 3 columns */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="font-heading font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 hover:font-medium group flex items-center space-x-1"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info - Glassmorphic Card */}
          <div className="md:col-span-3">
            <Card className="p-6 bg-background/70 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="font-heading font-bold text-lg mb-5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">suhritorganization@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">+91 8653-681-154</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Contai, West Bengal, 721401</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Media - Spans 2 columns */}
          <div className="md:col-span-2 space-y-5">
            <h3 className="font-heading font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Follow Us
            </h3>
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, href: "#", color: "hover:text-[#1877F2]" },
                { Icon: Twitter, href: "#", color: "hover:text-[#1DA1F2]" },
                { Icon: Instagram, href: "#", color: "hover:text-pink-500" },
                { Icon: Linkedin, href: "#", color: "hover:text-[#0A66C2]" },
              ].map(({ Icon, href, color }, i) => (
                <Link
                  key={i}
                  href={href}
                  className={`p-3 bg-muted/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} group`}
                >
                  <Icon className="h-5 w-5 group-hover:drop-shadow-md" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Suhrit Organization. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </footer>
  )
}