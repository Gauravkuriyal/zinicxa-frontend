"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_DOMAIN+"/api/public/contact-form", formData);

      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been successfully submitted. We will get back to you shortly.",
      });

      // Reset Form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "General Inquiry",
        message: "",
      });
    } catch (error: any) {
      setStatusMessage({
        type: "error",
        text: error.message || "Failed to submit form. Please check your inputs.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Get in Touch
          </h1>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            Have questions about our electronic products, warranty support, or looking to join our B2B partner network? Reach out to us below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="border border-neutral-200 shadow-sm bg-neutral-50/50">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-base font-semibold text-neutral-900">
                  Contact Information
                </h2>
                
                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900">Registered Office</p>
                      <p className="text-xs mt-0.5 text-neutral-600">ABC address</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-neutral-700 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">Email Address</p>
                      <p className="text-xs mt-0.5 text-neutral-600">info@zinicxa.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neutral-700 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">Phone Support</p>
                      <p className="text-xs mt-0.5 text-neutral-600">+91 XXXXXXXXX</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-4 text-xs text-neutral-500">
                  <p>Working Hours: Mon - Fri (9:00 AM - 6:00 PM)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Container */}
          <div className="lg:col-span-2">
            <Card className="border border-neutral-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-900">Send us a Message</CardTitle>
                <CardDescription className="text-xs text-neutral-500">
                  Fill out the details below and our support or business team will respond promptly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statusMessage && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm ${
                      statusMessage.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={20}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Inquiry Category <span className="text-red-500">*</span></Label>
                      <Select value={formData.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Customer Support">Customer Support</SelectItem>
                          <SelectItem value="Warranty/Returns">Warranty/Returns</SelectItem>
                          <SelectItem value="B2B Partnership">B2B Partnership</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief summary of your inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      maxLength={150}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Please describe your query or request in detail (minimum 10 characters)..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>

                  <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}