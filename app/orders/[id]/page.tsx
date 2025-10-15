"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, MessageCircle, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import api from "@/lib/api";

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const { id } = params; // Next.js App Router param
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Define the order status steps
  const orderStatuses = [
    { id: 'paid', label: 'Payment Confirmed', icon: CheckCircle },
    { id: 'review', label: 'In Review', icon: Clock },
    { id: 'slicing', label: 'Slicing', icon: Package },
    { id: 'printing', label: 'Printing', icon: Package },
    { id: 'postproc', label: 'Post-Processing', icon: Package },
    { id: 'qa', label: 'Quality Check', icon: CheckCircle },
    { id: 'packing', label: 'Packing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
  ];

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const res = await api.getOrder(id);
      if (res.data) {
        setOrder(res.data);
        // Set initial progress based on status
        const currentIndex = orderStatuses.findIndex(s => s.id === res.data.status);
        setProgress(((currentIndex + 1) / orderStatuses.length) * 100);
      } else {
        console.error(res.error);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    // Optional: simulate live progress increment
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  const getStatusIndex = () => orderStatuses.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/orders" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Orders</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PrintFlow</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Order Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order {order.id}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <p className="text-2xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
              <p className="text-gray-600">Expected: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg capitalize">{order.status.replace('_',' ')}</h3>
                      <p className="text-blue-600">Your order is currently in progress</p>
                    </div>
                    <Badge className="bg-blue-600">In Progress</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-blue-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => {
                    const StatusIcon = status.icon;
                    const isCompleted = index < getStatusIndex();
                    const isCurrent = index === getStatusIndex();
                    return (
                      <div key={status.id} className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-600 text-white' : isCurrent ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-400'}`}>
                            {status.label}
                          </p>
                        </div>
                        {isCompleted && <Badge variant="secondary" className="bg-green-100 text-green-800">Complete</Badge>}
                        {isCurrent && <Badge className="bg-blue-600">In Progress</Badge>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline?.map((event: any, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{event.status.replace('_', ' ')}</p>
                            <p className="text-gray-600 text-sm">{event.note}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items & Shipping */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{item.fileName}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between"><span>Material:</span><Badge variant="outline">{item.material}</Badge></div>
                      <div className="flex justify-between"><span>Color:</span><span>{item.color}</span></div>
                      <div className="flex justify-between"><span>Quantity:</span><span>{item.quantity}</span></div>
                      <div className="flex justify-between font-medium"><span>Price:</span><span>₹{item.price}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Method:</span><span>Express Shipping</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Estimated Delivery:</span><span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Tracking:</span><span className="text-blue-600">Available once shipped</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
