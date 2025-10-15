// Shared types between frontend and backend

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'OPERATOR' | 'SUPPORT';
  createdAt: string;
}

export interface File {
  id: string;
  originalName: string;
  extension: string;
  sizeBytes: number;
  volumeCm3?: number;
  areaCm2?: number;
  bboxX?: number;
  bboxY?: number;
  bboxZ?: number;
  isWatertight?: boolean;
  scanStatus: 'PENDING' | 'SCANNING' | 'CLEAN' | 'INFECTED' | 'ERROR';
  createdAt: string;
}

export interface Material {
  id: string;
  code: string;
  name: string;
  type: 'FDM' | 'SLA' | 'SLS';
  costPerKg: number;
  densityGCm3: number;
  colorOptions: string[];
  description?: string;
  isActive: boolean;
}

export interface PrintProfile {
  id: string;
  name: string;
  materialId: string;
  technology: 'FDM' | 'SLA' | 'SLS';
  layerHeightMm: number;
  nozzleMm?: number;
  infillDefault: number;
  supportStyle?: string;
  machineHourRate: number;
  isActive: boolean;
}

export interface Quote {
  id: string;
  purpose: 'PROTOTYPE' | 'GIFT' | 'FUNCTIONAL' | 'BULK';
  deadline?: string;
  status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'CONVERTED';
  validUntil: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  pricing: {
    currency: string;
    min: number;
    max: number;
  };
  estimates: {
    hours: {
      min: number;
      max: number;
    };
    filamentGrams: number;
  };
  items: QuoteItem[];
  createdAt: string;
}

export interface QuoteItem {
  id: string;
  file: {
    id: string;
    name: string;
    volume?: number;
  };
  material: {
    id: string;
    name: string;
    type: string;
  };
  printProfile: {
    id: string;
    name: string;
    layerHeight: number;
  };
  quantity: number;
  color?: string;
  infill: number;
  supports: boolean;
  estimatedPrice: number;
  estimatedHours: number;
  filamentWeight: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  paymentStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  invoiceNo?: string;
  total: number;
  tax: number;
  shippingFee: number;
  currency: string;
  estimatedDelivery?: string;
  createdAt: string;
  items: OrderItem[];
  events: ProductionEvent[];
  address: Address;
}

export type OrderStatus = 
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'IN_REVIEW'
  | 'SLICING'
  | 'PRINTING'
  | 'POST_PROCESSING'
  | 'QA'
  | 'PACKING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'FINISHED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  finalPrice: number;
  file: {
    id: string;
    name: string;
  };
  material: string;
  quantity: number;
  assignedPrinter?: string;
  scheduledAt?: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface ProductionEvent {
  id: string;
  stage: 'REVIEW' | 'SLICING' | 'PRINTING' | 'POST_PROCESSING' | 'QA' | 'PACKING' | 'SHIPPED' | 'DELIVERED' | 'FINISHED';
  note?: string;
  createdBy?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Printer {
  id: string;
  name: string;
  tech: 'FDM' | 'SLA' | 'SLS';
  bedX: number;
  bedY: number;
  bedZ: number;
  status: 'IDLE' | 'PRINTING' | 'MAINTENANCE' | 'OFFLINE';
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}