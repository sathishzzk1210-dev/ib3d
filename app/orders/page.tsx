"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Download, Package, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import api from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // useEffect(() => {
  //   async function fetchOrders() {
  //     setLoading(true);
  //     const res = await api.getAllOrders(1, 20); // page=1, limit=20
  //     if (res.data) {
  //       setOrders(res.data.orders); // depends on your backend response shape
  //     } else {
  //       console.error(res.error);
  //     }
  //     setLoading(false);
  //   }
  //   fetchOrders();
  // }, []);

  useEffect(() => {
  async function fetchOrders() {
    setLoading(true);
    const res = await api.getAllOrders(1, 20); // page=1, limit=20

    if (res?.data) {
      const fetchedOrders = Array.isArray(res.data)
        ? res.data
        : res.data.orders || [];
      setOrders(fetchedOrders);
    } else {
      console.error(res?.error || "Failed to fetch orders");
      setOrders([]);
    }

    setLoading(false);
  }
  fetchOrders();
}, []);

// Safe filter usage
const filteredOrders = (orders || []).filter((order) => {
  const matchesSearch =
    order.id.toString().includes(searchTerm.toLowerCase()) ||
    order.files?.some((file: any) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const matchesStatus =
    statusFilter === 'all' || order.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      printing: 'bg-blue-600',
      in_review: 'bg-yellow-600',
      shipped: 'bg-purple-600',
      delivered: 'bg-green-600',
      finished: 'bg-gray-600',
      cancelled: 'bg-red-600',
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      printing: 'Printing',
      in_review: 'In Review',
      shipped: 'Shipped',
      delivered: 'Delivered',
      finished: 'Finished',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      printing: Package,
      in_review: Clock,
      shipped: Package,
      delivered: CheckCircle,
      finished: CheckCircle,
      cancelled: Clock,
    };
    return icons[status] || Clock;
  };

  // const filteredOrders = orders.filter((order) => {
  //   const matchesSearch =
  //     order.id.toString().includes(searchTerm.toLowerCase()) ||
  //     order.files?.some((file: any) =>
  //       file.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //   const matchesStatus =
  //     statusFilter === 'all' || order.status === statusFilter;

  //   return matchesSearch && matchesStatus;
  // });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PrintFlow</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/quote">
              <Button variant="outline">New Quote</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your 3D printing orders</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by order ID or file name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : "You haven't placed any orders yet"}
                </p>
                <Link href="/quote">
                  <Button>Get Your First Quote</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Items:</strong> {order.itemCount} file(s)</p>
                            <p>
                              <strong>Files:</strong>{" "}
                              {order.files.slice(0, 2).map((f: any) => f.name).join(", ")}
                              {order.files.length > 2 && ` +${order.files.length - 2} more`}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Ordered:</strong>{" "}
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                            <p>
                              <strong>Expected:</strong>{" "}
                              {order.estimatedDelivery
                                ? new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                  })
                                : '—'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col lg:items-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">{order.currency}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Track Order
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter((o) => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter((o) =>
                  ['printing', 'in_review', 'shipped'].includes(o.status)
                ).length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                ₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
