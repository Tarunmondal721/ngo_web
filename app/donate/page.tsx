"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Heart,
  Shield,
  CreditCard,
  Smartphone,
  Users,
  Droplets,
  GraduationCap,
  Stethoscope,
  Home,
  ArrowRight,
  Check,
  Lock,
} from "lucide-react"

const donationAmounts = [25, 50, 100, 250, 500, 1000]

const donationProjects = [
  {
    id: "general",
    title: "Where Most Needed",
    description: "Support our most urgent projects and greatest needs",
    icon: Heart,
    color: "bg-primary",
  },
  {
    id: "water",
    title: "Clean Water Projects",
    description: "Provide clean water access to communities in need",
    icon: Droplets,
    color: "bg-blue-500",
    impact: "$50 provides clean water for 1 person for a year",
  },
  {
    id: "education",
    title: "Education Programs",
    description: "Support schools and educational initiatives",
    icon: GraduationCap,
    color: "bg-green-500",
    impact: "$100 sponsors a child's education for 1 month",
  },
  {
    id: "healthcare",
    title: "Healthcare Services",
    description: "Fund medical care and health programs",
    icon: Stethoscope,
    color: "bg-red-500",
    impact: "$75 provides medical care for 5 patients",
  },
  {
    id: "housing",
    title: "Housing & Infrastructure",
    description: "Build homes and community infrastructure",
    icon: Home,
    color: "bg-orange-500",
    impact: "$250 helps build safe housing for 1 family",
  },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedProject, setSelectedProject] = useState("general")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState("monthly")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  })

  const finalAmount = selectedAmount || Number.parseFloat(customAmount) || 0

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle donation submission
    console.log("Donation submitted:", {
      amount: finalAmount,
      project: selectedProject,
      paymentMethod,
      isRecurring,
      recurringFrequency,
      formData,
    })
    setStep(4) // Go to thank you step
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">Make a Donation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your generosity creates lasting change in communities around the world. Every donation, no matter the size,
            makes a real difference in someone's life.
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted-foreground/20"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {step === 1 && "Choose Amount & Project"}
                {step === 2 && "Your Information"}
                {step === 3 && "Payment Details"}
                {step === 4 && "Thank You!"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <div className="space-y-12">
                {/* Amount Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Choose Your Donation Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          size="lg"
                          onClick={() => handleAmountSelect(amount)}
                          className="h-16 text-lg"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount">Or enter a custom amount:</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="0.00"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          className="pl-8 text-lg h-12"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Choose a Project to Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedProject} onValueChange={setSelectedProject}>
                      <div className="space-y-4">
                        {donationProjects.map((project) => {
                          const IconComponent = project.icon
                          return (
                            <div
                              key={project.id}
                              className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <RadioGroupItem value={project.id} id={project.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={`p-2 rounded-lg ${project.color} text-white`}>
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <Label
                                    htmlFor={project.id}
                                    className="font-heading font-semibold text-lg cursor-pointer"
                                  >
                                    {project.title}
                                  </Label>
                                </div>
                                <p className="text-muted-foreground mb-2">{project.description}</p>
                                {project.impact && (
                                  <Badge variant="secondary" className="text-xs">
                                    {project.impact}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Recurring Donation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Donation Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                        <Label htmlFor="recurring" className="font-medium">
                          Make this a recurring donation
                        </Label>
                      </div>

                      {isRecurring && (
                        <RadioGroup value={recurringFrequency} onValueChange={setRecurringFrequency}>
                          <div className="flex space-x-6 ml-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="quarterly" id="quarterly" />
                              <Label htmlFor="quarterly">Quarterly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="annually" id="annually" />
                              <Label htmlFor="annually">Annually</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <div></div>
                  <Button size="lg" onClick={() => setStep(2)} disabled={finalAmount <= 0} className="px-8">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Your Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep(3)}
                    disabled={!formData.firstName || !formData.lastName || !formData.email}
                    className="px-8"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                {/* Donation Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Donation Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-semibold">${finalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Project:</span>
                        <span>{donationProjects.find((p) => p.id === selectedProject)?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span>{isRecurring ? `${recurringFrequency}` : "One-time"}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>${finalAmount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <Label htmlFor="card" className="font-medium cursor-pointer">
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value="upi" id="upi" />
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <Label htmlFor="upi" className="font-medium cursor-pointer">
                            UPI Payment
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="upiId">UPI ID *</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@upi"
                            value={formData.upiId}
                            onChange={(e) => handleInputChange("upiId", e.target.value)}
                            required
                          />
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to your UPI app to complete the payment.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">Secure Payment</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Your payment information is encrypted and secure. We never store your payment details.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button size="lg" onClick={handleSubmit} className="px-8 bg-primary hover:bg-primary/90">
                    <Lock className="mr-2 h-4 w-4" />
                    Complete Donation
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Thank You!</h2>
                  <p className="text-xl text-muted-foreground mb-6">
                    Your generous donation of ${finalAmount} has been received and will make a real difference.
                  </p>
                  <p className="text-muted-foreground">
                    You will receive a confirmation email shortly with your donation receipt.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <a href="/">Return to Homepage</a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="/blog">Read Impact Stories</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      {step < 4 && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and protected with industry-standard security.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-2">Trusted by Thousands</h3>
                  <p className="text-sm text-muted-foreground">
                    Join over 10,000 donors who trust us to make their contributions count.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Heart className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-2">100% Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    85% of every donation goes directly to programs, with full transparency reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
