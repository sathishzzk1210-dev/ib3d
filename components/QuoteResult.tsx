"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Package, Truck, Calculator } from 'lucide-react';

interface QuoteResultProps {
  quoteData: any;
}

export default function QuoteResult({ quoteData }: QuoteResultProps) {
  // Mock calculation based on quote data
  const calculations = {
    materialCost: 245,
    machineCost: 180,
    postProcessCost: 150,
    setupFee: 50,
    subtotal: 625,
    tax: 112,
    shipping: 75,
    total: 812,
    minTotal: 750,
    maxTotal: 875,
    estimatedDays: { min: 3, max: 5 },
    filamentWeight: 45,
    printTime: 6.5
  };

  return (
    <div className="space-y-6">
      {/* Quote Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Total Price</h3>
            <p className="text-2xl font-bold text-green-900">
              ₹{calculations.minTotal} - ₹{calculations.maxTotal}
            </p>
            <p className="text-sm text-green-600 mt-1">Including all fees</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-800 mb-2">Delivery Time</h3>
            <p className="text-2xl font-bold text-blue-900">
              {calculations.estimatedDays.min}-{calculations.estimatedDays.max} Days
            </p>
            <p className="text-sm text-blue-600 mt-1">From order confirmation</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2">Print Stats</h3>
            <p className="text-lg font-bold text-purple-900">{calculations.filamentWeight}g</p>
            <p className="text-sm text-purple-600">{calculations.printTime}h print time</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Price Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Material Cost ({calculations.filamentWeight}g PLA)</span>
              <span className="font-medium">₹{calculations.materialCost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Machine Time ({calculations.printTime}h)</span>
              <span className="font-medium">₹{calculations.machineCost}</span>
            </div>
            {quoteData.postProcessing?.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Post-Processing</span>
                <span className="font-medium">₹{calculations.postProcessCost}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Setup & Handling</span>
              <span className="font-medium">₹{calculations.setupFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{calculations.subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">₹{calculations.tax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₹{calculations.shipping}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{calculations.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Files & Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Files:</span>
                  <span>{quoteData.files?.length || 1} file(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <Badge variant="secondary">{quoteData.material || 'PLA'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span>{quoteData.color || 'White'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Layer Height:</span>
                  <span>{quoteData.layerHeight?.[0] || 0.2}mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Infill:</span>
                  <span>{quoteData.infill?.[0] || 20}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span>{quoteData.quantity || 1}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Delivery Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated:</span>
                  <span>{calculations.estimatedDays.min}-{calculations.estimatedDays.max} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping to:</span>
                  <span>{quoteData.contact?.address?.city || 'Mumbai'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span>{quoteData.contact?.name || 'Customer'}</span>
                </div>
                {quoteData.contact?.deadline && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Required by:</span>
                    <span>{new Date(quoteData.contact.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-800 mb-3">What happens next?</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium text-blue-800">Payment</p>
                <p className="text-blue-600">Secure online payment to confirm your order</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium text-blue-800">Production</p>
                <p className="text-blue-600">We'll start printing and keep you updated</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium text-blue-800">Delivery</p>
                <p className="text-blue-600">Shipped to your address with tracking</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}