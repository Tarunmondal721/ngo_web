"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
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
                          Email Address *
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

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Find Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit our headquarters or connect with us virtually. We're always happy to meet with supporters, partners,
              and community members.
            </p>
          </div>

          <div className="bg-background rounded-lg p-8 shadow-lg">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map would be embedded here</p>
                <p className="text-sm text-muted-foreground mt-2">123 Hope Street, City, State 12345</p>
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
