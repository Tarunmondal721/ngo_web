"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { caterorys, GetBlogs } from "@/lib/public"
import { useEffect, useState } from "react"



export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [regularPosts, setRegularPosts] = useState<any[]>([]);

  useEffect(() => {

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await GetBlogs();
        const allblogs = (Array.isArray(res?.data?.data) ? res?.data?.data : []);
        const featuredPost = allblogs.filter((blog: any) => blog.featured);
        const regularPosts = allblogs.filter((blog: any) => !blog.featured);
        setFeaturedPost(featuredPost[0] || null);
        setRegularPosts(regularPosts);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Loading Blogs...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch the latest stories.</p>
        </div>
      ) : (
        <>
          {/* Your current page content */}
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">Our Blog</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stories of impact, program updates, and insights from the field. Stay connected with our mission and see how
                your support creates lasting change.
              </p>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <Badge variant="secondary" className="text-sm font-medium">
                    Featured Story
                  </Badge>
                </div>
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge variant="outline" className="w-fit mb-4">
                        {featuredPost.category.name}
                      </Badge>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.read_time}
                        </div>
                      </div>
                      <Button asChild className="w-fit">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          Read Full Story
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Latest Stories</h2>
                <p className="text-lg text-muted-foreground">
                  Discover more stories of impact and stay updated with our latest programs and initiatives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-3">
                      <Badge variant="outline" className="w-fit mb-2">
                        {post.category.name}
                      </Badge>
                      <h3 className="font-heading font-semibold text-xl leading-tight">{post.title}</h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.read_time}
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Stay Updated</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Subscribe to our newsletter to receive the latest stories, program updates, and ways to get involved
                directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md text-foreground"
                />
                <Button variant="secondary" size="lg" className="px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </>
      )}



      <Footer />
    </div>
  )
}
