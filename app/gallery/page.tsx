"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X, ZoomIn, Filter } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { caterorys, getGalleryImages } from "@/lib/api"



const galleryImages = [
  {
    id: 1,
    src: "/clean-water-project--well-construction--community-.png",
    alt: "Clean water well construction in Guatemala",
    category: "Water Projects",
    title: "Well Construction in San Pedro",
    description: "Community members celebrating the completion of their new water well",
  },
  {
    id: 2,
    src: "/education-program--children-learning-in-classroom-.png",
    alt: "Children learning in classroom",
    category: "Education",
    title: "Classroom Learning in Kenya",
    description: "Students engaged in interactive learning at our school in Nairobi",
  },
  {
    id: 3,
    src: "/healthcare-program--medical-care--community-health.png",
    alt: "Healthcare program in action",
    category: "Healthcare",
    title: "Mobile Clinic Services",
    description: "Our medical team providing care in remote villages",
  },
  {
    id: 4,
    src: "/community-development-project--people-working-toge.png",
    alt: "Community development project",
    category: "Community Development",
    title: "Building Together",
    description: "Volunteers and community members working on infrastructure projects",
  },
  {
    id: 5,
    src: "/diverse-group-of-people-helping-in-community--warm.png",
    alt: "Diverse group helping community",
    category: "Volunteers",
    title: "International Volunteer Team",
    description: "Volunteers from around the world coming together to help",
  },
  {
    id: 6,
    src: "/sustainable-farming-community-garden.png",
    alt: "Sustainable farming project",
    category: "Agriculture",
    title: "Community Garden Project",
    description: "Teaching sustainable farming techniques for food security",
  },
  {
    id: 7,
    src: "/ngo-founders--diverse-group--inspiring-leadership.png",
    alt: "NGO leadership team",
    category: "Team",
    title: "Leadership Team Meeting",
    description: "Our dedicated team planning future initiatives",
  },
  {
    id: 8,
    src: "/smiling-woman--mother--hope-and-gratitude.png",
    alt: "Beneficiary portrait",
    category: "Impact Stories",
    title: "Maria's Story",
    description: "Maria, whose life was transformed by access to clean water",
  },
]

// const categories = [
//   "All",
//   "Water Projects",
//   "Education",
//   "Healthcare",
//   "Community Development",
//   "Volunteers",
//   "Agriculture",
//   "Team",
//   "Impact Stories",
// ]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<any | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { token } = useAuth()

  // Fetch galleries
  useEffect(() => {
    if (!token) return
    const fetchGalleries = async () => {
      setLoading(true)
      try {
        const res = await getGalleryImages(token)
        setGalleryImages(Array.isArray(res?.data?.data) ? res.data.data : [])
      } catch (error) {
        console.error(error)
        setGalleryImages([])
      } finally {
        setLoading(false)
      }
    }
    fetchGalleries()
  }, [token])

  // Fetch categories
  useEffect(() => {
    if (!token) return
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await caterorys(token)
        setCategories(Array.isArray(res?.data?.data) ? res?.data?.data : [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [token])

  // Filter images
  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.category.name === selectedCategory)


  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See the impact of your support through powerful images from our projects around the world. Every photo tells
            a story of hope, transformation, and community.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              key="All"
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className="mb-2"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id || category}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="mb-2"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl bg-gray-200 h-40 w-full"
                >
                  {/* Optional inner skeleton layers */}
                  <div className="h-24 bg-gray-300 rounded-t-xl"></div>
                  <div className="p-2 space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {image.category.name && (
                      <Badge className="absolute top-2 left-2 text-xs">{image.category.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg mb-2">{image.title}</h3>
                    <p className="text-muted-foreground text-sm">{image.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[60vh] object-contain"
            />
            <div className="p-6">
              {selectedImage.category.name && <Badge className="mb-3">{selectedImage.category.name}</Badge>}
              <h3 className="font-heading font-bold text-2xl mb-3">{selectedImage.title}</h3>
              <p className="text-muted-foreground">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Be Part of the Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Every image in our gallery represents lives changed and communities transformed. Your support makes these
            moments possible.
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
              <Link href="/contact">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
