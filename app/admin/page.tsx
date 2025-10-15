"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Package, 
  Users, 
  DollarSign, 
  Settings, 
  Eye,
  Edit,
  Play,
  Pause
} from 'lucide-react';

const mockStats = {
  revenue: 125000,
  orders: 340,
  customers: 180,
  machines: 8
};

const mockOrders = [
  { id: 'ORD-001234', customer: 'John Doe', status: 'printing', total: 812, items: 3, date: '2025-01-16' },
  { id: 'ORD-001235', customer: 'Jane Smith', status: 'review', total: 425, items: 1, date: '2025-01-16' },
  { id: 'ORD-001236', customer: 'Mike Johnson', status: 'shipped', total: 680, items: 2, date: '2025-01-15' },
  { id: 'ORD-001237', customer: 'Sarah Wilson', status: 'slicing', total: 320, items: 1, date: '2025-01-15' }
];

const mockPrinters = [
  { id: 'PRT-001', name: 'Ender 3 Pro #1', status: 'printing', job: 'ORD-001234', progress: 65 },
  { id: 'PRT-002', name: 'Prusa i3 MK3S+ #1', status: 'idle', job: null, progress: 0 },
  { id: 'PRT-003', name: 'Ender 3 Pro #2', status: 'printing', job: 'ORD-001240', progress: 23 },
  { id: 'PRT-004', name: 'Artillery Sidewinder', status: 'maintenance', job: null, progress: 0 }
];

const mockMaterials = [
  { id: 'pla', name: 'PLA', stock: 15.2, unit: 'kg', cost: 45, active: true },
  { id: 'petg', name: 'PETG', stock: 8.5, unit: 'kg', cost: 65, active: true },
  { id: 'abs', name: 'ABS', stock: 12.1, unit: 'kg', cost: 55, active: true },
  { id: 'nylon', name: 'Nylon', stock: 3.2, unit: 'kg', cost: 125, active: false }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    const colors = {
      'printing': 'bg-blue-600',
      'review': 'bg-yellow-600',
      'shipped': 'bg-green-600',
      'slicing': 'bg-purple-600',
      'idle': 'bg-gray-400',
      'maintenance': 'bg-red-600'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'printing': 'Printing',
      'review': 'In Review',
      'shipped': 'Shipped',
      'slicing': 'Slicing',
      'idle': 'Idle',
      'maintenance': 'Maintenance'
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PrintFlow Admin</span>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="printers">Printers</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold">₹{mockStats.revenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Orders</p>
                      <p className="text-2xl font-bold">{mockStats.orders}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Customers</p>
                      <p className="text-2xl font-bold">{mockStats.customers}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Machines</p>
                      <p className="text-2xl font-bold">{mockStats.machines}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-center">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.total}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-center">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{order.items} items</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">₹{order.total}</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="printers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Printers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockPrinters.map((printer) => (
                    <Card key={printer.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{printer.name}</h3>
                            <p className="text-sm text-gray-600">{printer.id}</p>
                          </div>
                          <Badge className={getStatusColor(printer.status)}>
                            {getStatusLabel(printer.status)}
                          </Badge>
                        </div>
                        
                        {printer.job && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">Current Job: {printer.job}</p>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{printer.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all" 
                                  style={{ width: `${printer.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Material Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMaterials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{material.name}</h4>
                        <p className="text-sm text-gray-600">₹{material.cost}/{material.unit}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{material.stock} {material.unit}</p>
                        <p className={`text-xs ${material.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {material.stock < 5 ? 'Low Stock' : 'In Stock'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={material.active ? 'default' : 'secondary'}>
                          {material.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}