# 3D Printing Service Platform

A comprehensive web platform for 3D printing services with instant quotes, order management, and real-time tracking.

## Features

- **Instant Quotes**: Upload 3D files and get immediate price estimates
- **Order Management**: Complete order lifecycle from quote to delivery
- **Real-time Tracking**: Live status updates and notifications
- **Admin Dashboard**: Manage materials, pricing, orders, and printers
- **File Processing**: Support for STL, OBJ, STEP files with validation
- **Payment Integration**: Secure payment processing with Stripe/Razorpay
- **Notifications**: Email and SMS notifications for order updates

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Hook Form** for form handling
- **React Dropzone** for file uploads

### Backend
- **NestJS** REST API with TypeScript
- **PostgreSQL** with Prisma ORM
- **Redis** for caching and queues
- **MinIO/S3** for file storage
- **WebSockets** for real-time updates

### Infrastructure
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Stripe/Razorpay** for payments
- **SendGrid** for emails
- **Twilio/MSG91** for SMS

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd 3d-printing-platform
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

3. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env

# Update environment variables with your values
```

4. **Start services with Docker**
```bash
docker-compose up -d
```

5. **Database Setup**
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
cd ..
```

6. **Start development servers**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run start:dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── orders/            # Order tracking pages
│   ├── quote/             # Quote wizard pages
│   └── api/               # API routes (if needed)
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── backend/               # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── files/         # File handling module
│   │   ├── quotes/        # Quote management
│   │   ├── orders/        # Order management
│   │   ├── payments/      # Payment processing
│   │   └── ...
│   ├── prisma/            # Database schema & migrations
│   └── docker/            # Docker configurations
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── docker-compose.yml     # Development services
```

## Environment Variables

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (backend/.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/printflow
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

## API Documentation

The API documentation is available at `http://localhost:3001/api/docs` when running in development mode.

### Key Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/files/upload` - File upload
- `POST /api/quotes` - Create quote
- `GET /api/quotes/:id` - Get quote details
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `POST /api/payments/intent` - Create payment intent

## Development

### Running Tests
```bash
# Frontend tests
npm run test

# Backend tests
cd backend
npm run test
```

### Database Operations
```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
cd backend
npm run build
```

## Deployment

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-specific Configurations
- Development: `docker-compose.yml`
- Staging: `docker-compose.staging.yml`
- Production: `docker-compose.prod.yml`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact [support@printflow.com](mailto:support@printflow.com)