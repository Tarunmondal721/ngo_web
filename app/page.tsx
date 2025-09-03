import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Users, Globe, ArrowRight, Quote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/diverse-group-of-people-helping-in-community--warm.png')",
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Building Hope,
            <span className="text-primary block">Changing Lives</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join us in creating lasting positive change in communities worldwide. Together, we can build a brighter
            future for those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">25</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
                Our Mission: Creating Sustainable Change
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Hope Foundation, we believe that every person deserves access to basic necessities, education, and
                opportunities for growth. Our mission is to create sustainable, positive change in underserved
                communities worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Through collaborative partnerships, innovative programs, and unwavering commitment, we work to break the
                cycle of poverty and build foundations for lasting prosperity.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/about">
                  Read Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/community-development-project--people-working-toge.png"
                alt="Community development project"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Our Impact Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how we're making a difference through targeted programs designed to address the most pressing
              needs in communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img src="/education-program--children-learning-in-classroom-.png" alt="Education Program" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-heading font-semibold text-xl">Education for All</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Providing quality education and learning resources to children in underserved communities, building
                  foundations for brighter futures.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/programs/education">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src="/clean-water-project--well-construction--community-.png"
                  alt="Clean Water Initiative"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Globe className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-heading font-semibold text-xl">Clean Water Access</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Building sustainable water systems and sanitation facilities to ensure communities have access to
                  clean, safe drinking water.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/programs/water">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img src="/healthcare-program--medical-care--community-health.png" alt="Healthcare Program" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-heading font-semibold text-xl">Healthcare Access</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Delivering essential healthcare services and medical support to remote and underserved communities
                  worldwide.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/programs/healthcare">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Stories of Hope</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from the communities and individuals whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-4 italic">
                "Thanks to Hope Foundation's education program, my daughter can now attend school. She dreams of
                becoming a doctor to help our community."
              </p>
              <div className="flex items-center">
                <img src="/smiling-woman--mother--hope-and-gratitude.png" alt="Maria Santos" className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold">Maria Santos</div>
                  <div className="text-sm text-muted-foreground">Guatemala</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-4 italic">
                "The clean water project changed everything for our village. No more walking hours for water - now we
                can focus on building our future."
              </p>
              <div className="flex items-center">
                <img src="/smiling-man--community-leader--hope-and-determinat.png" alt="James Ochieng" className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold">James Ochieng</div>
                  <div className="text-sm text-muted-foreground">Kenya</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-4 italic">
                "The healthcare program saved my son's life. Hope Foundation doesn't just provide aid - they provide
                hope for families like mine."
              </p>
              <div className="flex items-center">
                <img src="/smiling-woman--mother--gratitude-and-relief.png" alt="Priya Sharma" className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold">Priya Sharma</div>
                  <div className="text-sm text-muted-foreground">India</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your support can transform lives and build stronger communities. Join thousands of donors who are already
            making an impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/donate">Start Donating Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
