"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send, Map } from "lucide-react"
import { storeContactMessage } from "@/lib/public"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)

    // Store contact message via API
    storeContactMessage(formData)
      .then((response) => {
        console.log("Message stored successfully:", response.data)
      })
      .catch((error) => {
        console.error("Error storing message:", error)
      })

    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions about our programs, want to get involved, or need
            support, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-3xl text-foreground mb-6">Get In Touch</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Have questions about our work or want to learn how you can make a difference? We're here to help and
                  would love to connect with you.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-1">suhritorganization@gmail.com</p>
                      {/* <p className="text-muted-foreground">partnerships@hopefoundation.org</p> */}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Call Us</h3>
                      <p className="text-muted-foreground mb-1">+91  8653-681-154</p>
                      {/* <p className="text-muted-foreground">+1 (555) 123-4568 (Partnerships)</p> */}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Visit Us</h3>
                      <p className="text-muted-foreground mb-1">NH116B</p>
                      <p className="text-muted-foreground mb-1">Contai, West Bengal 721401</p>
                      <p className="text-muted-foreground">India</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Office Hours</h3>
                      <p className="text-muted-foreground mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                         Enter Valid Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="8856-XXX-XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about how we can help..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stylish Map Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Find Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit our headquarters or connect with us virtually. We're always happy to meet with
              supporters, partners, and community members.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto group">
            {/* Glassmorphic Card */}
            <div className="bg-background/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 overflow-hidden
                      transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.01]">

              {/* Floating Pin Badge */}
              <div className="absolute -top-6 left-8 z-20 animate-bounce">
                <div className="relative">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Map Container with Gradient Overlay */}
              <div className="relative rounded-xl overflow-hidden">
                <div className="relative w-full pb-[56.25%] h-0">
                  <iframe
                    title="Contai, West Bengal – Google Maps"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5610.000000000001!2d87.7525231!3d21.7771972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0326e5394d8237%3A0x7bb6b4d525857f71!2sContai%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1731234567890!5m2!1sen!2sin"
                  ></iframe>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Address & CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                  <p className="text-sm font-medium opacity-90">Contai, West Bengal, India</p>
                  <p className="text-xs opacity-70">Headquarters</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center mt-4">
                <a
                  href="https://www.google.com/maps/place/Contai,+West+Bengal/@21.7771972,87.7525231,5610m/data=!3m1!1e3!4m6!3m5!1s0x3a0326e5394d8237:0x7bb6b4d525857f71!8m2!3d21.778109!4d87.7517427!16zL20vMGRsbXFw?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-sm
                       shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 pointer-events-auto
                       backdrop-blur-sm border border-white/20"
                >
                  <Map className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our work and how you can get involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">How can I donate?</h3>
              <p className="text-muted-foreground">
                You can donate securely online through our donation page, which accepts credit cards, debit cards, and
                UPI payments. We also accept bank transfers and checks.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">How do I volunteer?</h3>
              <p className="text-muted-foreground">
                We offer both local and international volunteer opportunities. Contact us to learn about current
                openings and how your skills can make a difference.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">Where does my donation go?</h3>
              <p className="text-muted-foreground">
                85% of donations go directly to programs, 10% to operations, and 5% to fundraising. We publish annual
                reports with detailed financial information.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">Can I visit your projects?</h3>
              <p className="text-muted-foreground">
                Yes! We organize donor visits and volunteer trips to our project sites. Contact us to learn about
                upcoming opportunities to see our work firsthand.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
