"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Clock, Users, ExternalLink, Filter } from "lucide-react"
import { caterorys, GetEvents } from "@/lib/public"



const upcomingEvents = [
  {
    id: 1,
    title: "Annual Charity Gala: Hope for Tomorrow",
    date: "2024-03-15",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Ballroom, City Hotel",
    category: "Fundraising",
    description:
      "Join us for an elegant evening of dining, entertainment, and fundraising to support our global initiatives.",
    image: "/charity-gala-elegant-ballroom-fundraising.png",
    attendees: 250,
    price: "$150 per person",
    featured: true,
  },
  {
    id: 2,
    title: "Community Volunteer Day",
    date: "2024-02-28",
    time: "9:00 AM - 4:00 PM",
    location: "Local Community Center",
    category: "Volunteer",
    description: "Roll up your sleeves and help us pack care packages for families in need. All ages welcome!",
    image: "/volunteer-day-community-packing-supplies.png",
    attendees: 100,
    price: "Free",
    featured: false,
  },
  {
    id: 3,
    title: "Educational Workshop: Sustainable Development",
    date: "2024-03-08",
    time: "2:00 PM - 5:00 PM",
    location: "University Conference Center",
    category: "Education",
    description: "Learn about sustainable development practices and how communities can build resilient futures.",
    image: "/educational-workshop-sustainable-development.png",
    attendees: 75,
    price: "$25 per person",
    featured: false,
  },
  {
    id: 4,
    title: "5K Run for Clean Water",
    date: "2024-04-20",
    time: "8:00 AM - 12:00 PM",
    location: "City Park",
    category: "Fundraising",
    description: "Run, walk, or jog to raise funds for clean water projects. Every step makes a difference!",
    image: "/charity-run-clean-water-fundraising.png",
    attendees: 500,
    price: "$30 registration",
    featured: false,
  },
]



const pastEvents = [
  {
    id: 5,
    title: "Holiday Gift Drive 2023",
    date: "2023-12-15",
    location: "Multiple Locations",
    category: "Community",
    description: "Successfully collected and distributed over 1,000 gifts to children in need.",
    image: "/holiday-gift-drive-community-giving.png",
    impact: "1,000+ children received gifts",
  },
  {
    id: 6,
    title: "Medical Mission to Guatemala",
    date: "2023-11-10",
    location: "Guatemala",
    category: "Healthcare",
    description: "Our medical team provided free healthcare services to remote communities.",
    image: "/medical-mission-guatemala-healthcare.png",
    impact: "500+ patients treated",
  },
]

// const categories = ["All", "Fundraising", "Volunteer", "Education", "Community", "Healthcare"]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")
  const [loading, setLoading] = useState(true)
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [pastEvents, setpastEvents] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await GetEvents();
        const allevents = (Array.isArray(res?.data?.data) ? res?.data?.data : []);
        const upcoming = allevents.filter((event: any) => event.status === "processing");
        const past = allevents.filter((event: any) => event.status === "completed");
        // console.log("rrrr",allevents);
        // console.log('up',upcoming);
        // console.log('past',past);
        setUpcomingEvents(upcoming);
        setpastEvents(past);

      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent()
  }, [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await caterorys()
        setCategories(Array.isArray(res?.data?.data) ? res?.data?.data : [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const filteredUpcomingEvents =
    selectedCategory === "All" ? upcomingEvents : upcomingEvents.filter((event) => event.category.name === selectedCategory)

  const filteredPastEvents =
    selectedCategory === "All" ? pastEvents : pastEvents.filter((event) => event.category.name === selectedCategory)

  return (
    <div className="min-h-screen">
      <Navigation />

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Loading Events...</h2>
          <p className="text-gray-500 mt-2">Just a moment — something memorable is coming up ✨</p>

        </div>
      ) : (
        <>

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">Events</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join us at our upcoming events and be part of our mission to create positive change. From fundraising galas
                to volunteer opportunities, there's something for everyone.
              </p>
            </div>
          </section>

          {/* Filter and Tabs Section */}
          <section className="py-12 bg-muted">
            <div className="container mx-auto px-4">
              {/* Event Type Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-background rounded-lg p-1 shadow-sm">
                  <Button
                    variant={activeTab === "upcoming" ? "default" : "ghost"}
                    onClick={() => setActiveTab("upcoming")}
                    className="px-6"
                  >
                    Upcoming Events
                  </Button>
                  <Button
                    variant={activeTab === "past" ? "default" : "ghost"}
                    onClick={() => setActiveTab("past")}
                    className="px-6"
                  >
                    Past Events
                  </Button>
                </div>
              </div>

              {/* Category Filter */}
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

          {/* Events Content */}
          <section className="py-20">
            <div className="container mx-auto px-4">



              {activeTab === "upcoming" && (
                <>
                  {/* Featured Event */}
                  {filteredUpcomingEvents.find((event) => event.featured) && (
                    <div className="mb-16">
                      <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
                        Featured Event
                      </h2>
                      {(() => {
                        const featuredEvent =
                          filteredUpcomingEvents.find((event) => event.featured)!;
                        return (
                          <Card className="overflow-hidden max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                              <div className="relative h-64 lg:h-auto">
                                <img
                                  src={featuredEvent.image || "/placeholder.svg"}
                                  alt={featuredEvent.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <CardContent className="p-8 flex flex-col justify-center">
                                <Badge variant="outline" className="w-fit mb-4">
                                  {featuredEvent.category.name}
                                </Badge>
                                <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                                  {featuredEvent.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                  {featuredEvent.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(featuredEvent.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      }
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {featuredEvent.time}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {featuredEvent.location}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {featuredEvent.attendees} expected attendees
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-lg text-primary capitalize">
                                    {featuredEvent.price}
                                  </span>
                                  <Button size="lg">
                                    Register Now
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        );
                      })()}
                    </div>
                  )}

                  {/* Upcoming Events Grid */}
                  <div className="mb-8">
                    <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
                      All Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredUpcomingEvents
                        .filter((event) => !event.featured)
                        .map((event) => (
                          <Card
                            key={event.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <div className="relative h-48">
                              <div
                                className={`absolute inset-0 flex items-center justify-center bg-gray-200 transition-opacity duration-500 ${imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                                  }`}
                              >
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <img
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageLoaded(true)}
                              />
                              <Badge className="absolute top-2 left-2">
                                {event.category.name}
                              </Badge>
                            </div>
                            <CardHeader className="pb-3">
                              <CardTitle className="font-heading text-xl leading-tight">
                                {event.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-muted-foreground mb-4 leading-relaxed">
                                {event.description}
                              </p>

                              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="font-medium text-primary capitalize">
                                  {event.price}
                                </span>
                                <Button size="sm">
                                  Register
                                  <ExternalLink className="ml-2 h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "past" && (
                <div>
                  <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
                    Past Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {filteredPastEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 left-2">
                            {event.category.name}
                          </Badge>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="font-heading text-xl leading-tight">
                            {event.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          </div>

                          <div className="bg-primary/10 rounded-lg p-3">
                            <p className="font-medium text-primary text-sm">
                              Impact: {event.impact}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>
        </>
      )}


      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Don't miss out on upcoming events and opportunities to make a difference. Subscribe to our newsletter for
            the latest updates.
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

      <Footer />
    </div>
  )
}
