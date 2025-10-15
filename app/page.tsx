"use client";

import { ArrowRight, Upload, Calculator, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PrintFlow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <Link href="/orders">
              <Button variant="ghost" size="sm">My Orders</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
                        <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              3D Printing
            </span>{' '}
            Service
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Upload your design files and get instant quotes. From prototypes to production parts, 
            we deliver quality 3D printed parts with transparent pricing and real-time tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your parts printed in 4 simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Upload,
              title: 'Upload Files',
              description: 'Drag & drop your STL, OBJ, or STEP files. We support multiple file formats.',
              step: '01'
            },
            {
              icon: Calculator,
              title: 'Get Quote',
              description: 'Choose materials, finish options, and quantity. Get instant pricing and timeline.',
              step: '02'
            },
            {
              icon: CheckCircle,
              title: 'Place Order',
              description: 'Review your quote, make payment, and receive your order confirmation.',
              step: '03'
            },
            {
              icon: Truck,
              title: 'Track & Receive',
              description: 'Follow your order progress in real-time until it arrives at your door.',
              step: '04'
            }
          ].map((item, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="absolute top-4 right-4 text-6xl font-bold text-blue-50">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PrintFlow</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional quality, competitive pricing, and exceptional service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Quotes',
                description: 'Get accurate pricing and delivery estimates in seconds, not days.',
                icon: '⚡'
              },
              {
                title: 'Quality Materials',
                description: 'PLA, PETG, ABS, Nylon, and resin options for any application.',
                icon: '🏆'
              },
              {
                title: 'Real-time Tracking',
                description: 'Follow your order from upload to delivery with live updates.',
                icon: '📱'
              },
              {
                title: 'Expert Finishing',
                description: 'Professional post-processing including sanding, painting, and assembly.',
                icon: '✨'
              },
              {
                title: 'Secure & Private',
                description: 'Your files are encrypted and automatically deleted after completion.',
                icon: '🔒'
              },
              {
                title: 'Fast Turnaround',
                description: 'Standard delivery in 3-5 days, rush orders available.',
                icon: '🚀'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Printing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust us with their 3D printing needs.
          </p>
          <Link href="/quote">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get Your Quote Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3D</span>
                </div>
                <span className="text-xl font-bold">PrintFlow</span>
              </div>
              <p className="text-gray-400">
                Professional 3D printing service with instant quotes and real-time tracking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Prototyping</li>
                <li>Production Parts</li>
                <li>Custom Models</li>
                <li>Bulk Orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Materials</h4>
              <ul className="space-y-2 text-gray-400">
                <li>PLA & PETG</li>
                <li>ABS & Nylon</li>
                <li>Resin (SLA)</li>
                <li>Specialty Filaments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>File Guidelines</li>
                <li>Shipping Info</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PrintFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}