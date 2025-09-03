import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Target, Eye, Users, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">About Hope Foundation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over 3 years, we've been dedicated to creating sustainable change in communities worldwide. Learn about
            our journey, our values, and the incredible team making it all possible.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Suhrit Organization, we are dedicated to improving the lives of individuals and communities in need. Our mission is to provide support, resources, and hope to those facing challenges, whether through humanitarian aid, education, or healthcare initiatives.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe that lasting change comes from empowering people at the grassroots level. By working directly with communities, we are able to understand their unique needs and develop solutions that foster sustainable growth and development. Our dedicated team and volunteers work tirelessly to ensure that our programs make a tangible difference in the lives of those we serve.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
             Through collaboration, compassion, and a commitment to social justice, we aim to build a better world where every individual has access to the opportunities and resources they need to thrive. Join us in our efforts to create positive change and uplift communities, one step at a time.
              </p>
            </div>
            <div className="relative">
              <img
                src="/ngo-founders--diverse-group--inspiring-leadership.png"
                alt="Hope Foundation founders"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
               At Suhrit Organization, our mission is to empower vulnerable communities and individuals by providing essential resources, education, and support. We strive to create sustainable solutions that address critical issues such as poverty, healthcare, education, and environmental conservation. Through compassion, collaboration, and integrity, we aim to make a lasting, positive impact on the lives of those we serve.
              </p>
            </Card>

            <Card className="text-center p-8">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
               We envision a world where every person, regardless of their background or circumstances, has access to opportunities that allow them to thrive. A world where communities are resilient, empowered, and self-sufficient, and where social justice and equality are at the forefront of global progress. Our goal is to be a catalyst for change, inspiring hope and fostering sustainable development for future generations.
              </p>
            </Card>

            <Card className="text-center p-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-4">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compassion, integrity, sustainability, and community partnership guide everything we do. We believe in
                empowering communities to create their own solutions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Our Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in sustainable, community-driven solutions that create lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-3">Community Partnership</h3>
              <p className="text-muted-foreground">
                We work directly with local communities to understand their needs and develop solutions together.
              </p>
            </div>

            <div className="text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-3">Sustainable Impact</h3>
              <p className="text-muted-foreground">
                Our programs are designed to create long-term, sustainable change that continues beyond our involvement.
              </p>
            </div>

            <div className="text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We maintain complete transparency in our operations and regularly report on our impact and finances.
              </p>
            </div>

            <div className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-3">Measurable Results</h3>
              <p className="text-muted-foreground">
                Every program includes clear metrics and regular evaluation to ensure we're making a real difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate leaders driving our mission forward and making a difference in communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <img
                src="/professional-woman--ceo--confident-leadership.png"
                alt="Sarah Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-heading font-semibold text-xl mb-2">Sarah Johnson</h3>
              <p className="text-primary font-medium mb-3">CEO & Co-Founder</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                With 20+ years in international development, Sarah leads our strategic vision and global partnerships.
                She holds an MBA from Harvard and is passionate about sustainable community development.
              </p>
            </Card>

            <Card className="text-center p-6">
              <img
                src="/professional-man--program-director--experienced-lea.png"
                alt="Michael Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-heading font-semibold text-xl mb-2">Michael Chen</h3>
              <p className="text-primary font-medium mb-3">Program Director</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Michael oversees all our field programs and ensures quality implementation. His background in public
                health and 15 years of field experience drive our program excellence.
              </p>
            </Card>

            <Card className="text-center p-6">
              <img
                src="/professional-woman--operations-director--organized-.png"
                alt="Dr. Amara Okafor"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-heading font-semibold text-xl mb-2">Dr. Amara Okafor</h3>
              <p className="text-primary font-medium mb-3">Operations Director</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dr. Okafor brings expertise in healthcare delivery and operations management. She ensures our programs
                run efficiently and maintain the highest standards of care and service.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ready to be part of something bigger? Whether through donations, volunteering, or partnerships, there are
            many ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/donate">Support Our Work</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
