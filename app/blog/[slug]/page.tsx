import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const blogPosts = {
  "clean-water-success-story": {
    title: "Clean Water Changes Everything: Maria's Story",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Impact Stories",
    image: "/clean-water-project--well-construction--community-.png",
    content: `
      <p>In the small village of San Pedro, Guatemala, Maria Gonzalez used to walk three hours every day just to collect water for her family. The nearest clean water source was miles away, and even then, the water wasn't always safe to drink.</p>
      
      <p>"My children were often sick," Maria recalls. "We spent so much money on medicine, and I couldn't work because I was always caring for them or walking to get water."</p>
      
      <h2>The Transformation</h2>
      
      <p>Everything changed when Hope Foundation partnered with the local community to build a well and water purification system right in the heart of San Pedro. The project took six months to complete, involving local workers and community members every step of the way.</p>
      
      <p>The impact was immediate and profound. Children who were frequently absent from school due to waterborne illnesses began attending regularly. Mothers like Maria could start small businesses instead of spending hours each day collecting water.</p>
      
      <h2>Beyond Clean Water</h2>
      
      <p>"Now my daughter wants to become a teacher," Maria says with pride. "She has time to study, and she's healthy. This well didn't just give us water – it gave us hope for the future."</p>
      
      <p>The San Pedro project has become a model for our water initiatives across Central America. We've learned that when communities have access to clean water, everything else becomes possible: education, economic opportunity, and better health outcomes.</p>
      
      <h2>Looking Forward</h2>
      
      <p>Thanks to supporters like you, we're planning to bring clean water to 15 more communities this year. Each well serves approximately 200 families and costs $8,000 to build and maintain for the first five years.</p>
      
      <p>Maria's story reminds us why this work matters. Clean water isn't just about health – it's about dignity, opportunity, and hope. It's about giving families the chance to build better futures for their children.</p>
    `,
  },
  "education-program-expansion": {
    title: "Expanding Education: 500 New Students This Year",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Program Updates",
    image: "/education-program--children-learning-in-classroom-.png",
    content: `
      <p>We're thrilled to announce that our education programs have reached a significant milestone: 500 new students have enrolled across our schools in Kenya, Guatemala, and Bangladesh this academic year.</p>
      
      <p>This expansion represents more than just numbers – it's 500 young minds who now have access to quality education, nutritious meals, and the support they need to build brighter futures.</p>
      
      <h2>What This Means</h2>
      
      <p>Each new student represents a family's hope and a community's investment in its future. Our comprehensive education program includes:</p>
      
      <ul>
        <li>Quality classroom instruction with trained local teachers</li>
        <li>Daily nutritious meals to support learning and growth</li>
        <li>School supplies and uniforms for every student</li>
        <li>After-school tutoring and mentorship programs</li>
        <li>Parent engagement and community involvement initiatives</li>
      </ul>
      
      <h2>Success Stories</h2>
      
      <p>In our Kenyan schools, graduation rates have increased by 40% over the past three years. Many of our graduates are now attending university or starting successful businesses in their communities.</p>
      
      <p>In Guatemala, our bilingual education program is helping preserve indigenous languages while preparing students for opportunities in the global economy.</p>
      
      <h2>The Road Ahead</h2>
      
      <p>With your continued support, we're planning to open two new schools next year and expand our teacher training programs. Education is the foundation of sustainable development, and every child deserves the chance to learn and grow.</p>
      
      <p>Thank you for making this expansion possible. Together, we're building a more educated, empowered world.</p>
    `,
  },
  "healthcare-mobile-clinics": {
    title: "Mobile Clinics Bring Healthcare to Remote Areas",
    author: "Dr. Amara Okafor",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Healthcare",
    image: "/healthcare-program--medical-care--community-health.png",
    content: `
      <p>In many remote communities around the world, the nearest hospital or clinic can be days away by foot. For families living in these areas, a simple illness can become a life-threatening emergency due to lack of access to basic medical care.</p>
      
      <p>That's why we launched our mobile clinic initiative – bringing essential healthcare services directly to the communities that need them most.</p>
      
      <h2>How It Works</h2>
      
      <p>Our mobile clinics are fully equipped medical units that travel to remote villages on a regular schedule. Each clinic is staffed by qualified medical professionals and equipped with:</p>
      
      <ul>
        <li>Basic diagnostic equipment</li>
        <li>Essential medications and vaccines</li>
        <li>Maternal and child health services</li>
        <li>Health education materials</li>
        <li>Emergency medical supplies</li>
      </ul>
      
      <h2>Real Impact</h2>
      
      <p>Since launching six months ago, our mobile clinics have:</p>
      
      <ul>
        <li>Served over 3,000 patients across 25 remote communities</li>
        <li>Provided vaccinations to 800 children</li>
        <li>Delivered 45 babies safely</li>
        <li>Treated hundreds of cases of preventable diseases</li>
        <li>Trained 50 community health workers</li>
      </ul>
      
      <h2>Community Health Workers</h2>
      
      <p>One of the most important aspects of our mobile clinic program is training local community health workers. These dedicated individuals provide basic care and health education between clinic visits, creating a sustainable healthcare network in their communities.</p>
      
      <h2>Looking Forward</h2>
      
      <p>We're planning to expand our mobile clinic program to reach 50 more communities this year. Each mobile clinic costs $75,000 to equip and operate annually, but the impact on community health is immeasurable.</p>
      
      <p>Healthcare is a human right, and no one should suffer or die from preventable diseases simply because they live in a remote area. With your support, we can bring quality healthcare to every corner of the world.</p>
    `,
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <Badge variant="outline" className="mb-4">
              {post.category}
            </Badge>

            <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-muted-foreground prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Inspired by This Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your support makes stories like this possible. Join us in creating lasting change in communities around the
            world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
