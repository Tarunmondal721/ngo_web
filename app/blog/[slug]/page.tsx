"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { SlugBlog } from "@/lib/public";
import { notFound } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const paramsSlug = params?.slug as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paramsSlug) return;

    const fetchSlugBlog = async () => {
      setLoading(true);
      try {
        const res = await SlugBlog(paramsSlug);
        const post = res?.data?.data;
        setPost(post || null);
      } catch (err: any) {
        console.log("Error fetching blog:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlugBlog();
  }, [paramsSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-700">Loading Blog...</h2>
        <p className="text-gray-500 mt-2 animate-pulse">
          Please wait — we’re fetching an inspiring story for you ✨
        </p>
      </div>
    );
  }

  if (!post) return notFound();

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
              {post?.category?.name || "Uncategorized"}
            </Badge>

            <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground mb-6">
              {post?.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post?.author || "Unknown"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post?.date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "No date"}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post?.read_time || "—"} read
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.share
                  ? navigator.share({
                    title: "Check out this article!",
                    url: window.location.href,
                  })
                  : alert("Sharing not supported on this browser");
              }}
            >
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
              src={post?.image || "/placeholder.svg"}
              alt={post?.title}
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
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Inspired by This Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your support makes stories like this possible. Join us in creating lasting change.
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
  );
}
