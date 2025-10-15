"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, User, Mail, Phone } from 'lucide-react';

interface ContactFormProps {
  onContactChange: (contact: any) => void;
}

export default function ContactForm({ onContactChange }: ContactFormProps) {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    deadline: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal: '',
      country: 'India'
    },
    notes: ''
  });

  const updateContact = (updates: any) => {
    const updated = { ...contact, ...updates };
    setContact(updated);
    onContactChange(updated);
  };

  const updateAddress = (updates: any) => {
    const updatedAddress = { ...contact.address, ...updates };
    updateContact({ address: updatedAddress });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={contact.name}
                onChange={(e) => updateContact({ name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={contact.email}
                onChange={(e) => updateContact({ email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={contact.phone}
                onChange={(e) => updateContact({ phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="deadline">Required by (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={contact.deadline}
                onChange={(e) => updateContact({ deadline: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                placeholder="House/Flat number, Street name"
                value={contact.address.line1}
                onChange={(e) => updateAddress({ line1: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                placeholder="Area, Landmark"
                value={contact.address.line2}
                onChange={(e) => updateAddress({ line2: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={contact.address.city}
                  onChange={(e) => updateAddress({ city: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => updateAddress({ state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postal">PIN Code</Label>
                <Input
                  id="postal"
                  placeholder="400001"
                  value={contact.address.postal}
                  onChange={(e) => updateAddress({ postal: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={contact.address.country} onValueChange={(value) => updateAddress({ country: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Instructions (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any special requirements or notes for your order..."
            value={contact.notes}
            onChange={(e) => updateContact({ notes: e.target.value })}
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
}