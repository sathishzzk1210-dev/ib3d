import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // const headers: HeadersInit = {
    //   'Content-Type': 'application/json',
    //   ...options.headers,
    // };

    // if (this.token) {
    //   headers.Authorization = `Bearer ${this.token}`;
    // }


        const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(options.headers as Record<string, string>),
};

if (this.token) {
  headers['Authorization'] = `Bearer ${this.token}`;
}


    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string, phone?: string) {
    return this.request<{ access_token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone }),
    });
  }

  // File endpoints
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<any>('/files/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getFileMetadata(fileId: string) {
    return this.request<any>(`/files/${fileId}/metadata`);
  }

  async getFileUrl(fileId: string) {
    return this.request<{ url: string }>(`/files/${fileId}/url`);
  }

  // Quote endpoints
  async createQuote(quoteData: any) {
    return this.request<any>('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  }

  async getQuote(quoteId: string) {
    return this.request<any>(`/quotes/${quoteId}`);
  }

  // Order endpoints
  async createOrder(orderData: { quoteId: string; addressId: string }) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId: string) {
    return this.request<any>(`/orders/${orderId}`);
  }

  async updateOrderStatus(orderId: string, status: string, note?: string) {
    return this.request<any>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    });
  }

  // Payment endpoints
  async createPaymentIntent(orderId: string) {
    return this.request<{ clientSecret: string; amount: number; currency: string }>(
      `/payments/intent/${orderId}`,
      { method: 'POST' }
    );
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.request<any>('/admin/dashboard');
  }

  async getAllOrders(page = 1, limit = 20, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    
    return this.request<any>(`/admin/orders?${params}`);
  }

  async getMaterials() {
    return this.request<any>('/admin/materials');
  }

  async getPrinters() {
    return this.request<any>('/admin/printers');
  }

  async updatePrinterStatus(printerId: string, status: string) {
    return this.request<any>(`/admin/printers/${printerId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;