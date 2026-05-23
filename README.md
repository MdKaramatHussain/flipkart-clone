# Flipkart - Full-Stack eCommerce Platform

A complete, production-ready eCommerce platform inspired by Flipkart, built with Next.js 16, TypeScript, Tailwind CSS, and modern web technologies.

## 🎨 Design System (NEW!)

This project now includes a **comprehensive, production-grade design system** inspired by Flipkart's world-class UI/UX!

### 📚 Design System Documentation
- **[DESIGN_SYSTEM_README.md](./DESIGN_SYSTEM_README.md)** - Complete overview
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[DESIGN_SYSTEM.ts](./DESIGN_SYSTEM.ts)** - 800+ lines of detailed documentation
- **[REFACTORING_CHECKLIST.md](./REFACTORING_CHECKLIST.md)** - Step-by-step refactoring guide
- **[app/EXAMPLE_HOME_PAGE.tsx](./app/EXAMPLE_HOME_PAGE.tsx)** - Reference implementation

### ✨ What's Included
- ✅ Professional color palette with dark mode
- ✅ Typography system (Roboto + Inter)
- ✅ Responsive design system (4 breakpoints)
- ✅ 8 reusable UI components (Button, Input, Badge, etc.)
- ✅ 3 feature components (Header, ProductCard, CategoryNav)
- ✅ Spacing scale (8px baseline)
- ✅ Shadow & animation system
- ✅ Complete CSS variable implementation

### 🚀 Quick Start
```tsx
import { Button, FlipkartProductCard, SectionHeader } from '@/components';

// All components follow design system
<Button variant="primary" size="md">Shop Now</Button>
<FlipkartProductCard product={product} variant="grid" />
<SectionHeader title="Featured Products" />
```

---

## Features

### Customer App
- **Home Page** - Banners, featured products, categories, and product listings
- **Product Browsing** - Filter by category, price, brand, and search functionality
- **Product Details** - High-quality images, specifications, reviews, and variant selection
- **Shopping Cart** - Add/remove items, apply coupons, calculate taxes and shipping
- **Checkout** - Multi-step checkout with address and payment information
- **User Authentication** - Login, signup, and account management
- **Wishlist** - Save products for later
- **User Account** - Profile management, address book, order history

### Admin Dashboard
- **Dashboard Overview** - KPI cards showing orders, revenue, customers, and products
- **Analytics** - Revenue trends, orders distribution, category sales, top products
- **Product Management** - Add, edit, delete products with full CRUD operations
- **Order Management** - View and manage customer orders with status tracking
- **Customer Management** - View customer information and purchase history
- **Coupon Management** - Create and manage promotional coupons
- **Banner Management** - Create marketing banners
- **Store Settings** - Configure shipping, taxes, and business settings

## Tech Stack

- **Frontend Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.2
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charting**: Recharts
- **Notifications**: Sonner
- **Image Carousel**: Embla Carousel

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (customer routes)
│   │   ├── page.tsx             # Home page
│   │   ├── products/            # Products listing
│   │   ├── products/[id]/       # Product details
│   │   ├── cart/                # Shopping cart
│   │   ├── checkout/            # Checkout flow
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── account/             # User account
│   │   ├── wishlist/            # Wishlist
│   │   └── search/              # Search results
│   ├── admin/                   # Admin dashboard
│   │   ├── page.tsx             # Dashboard overview
│   │   ├── products/            # Product management
│   │   ├── orders/              # Order management
│   │   ├── customers/           # Customer management
│   │   ├── coupons/             # Coupon management
│   │   ├── banners/             # Banner management
│   │   ├── analytics/           # Analytics
│   │   └── settings/            # Store settings
│   └── layout.tsx               # Root layout
│
├── components/                  # Reusable components
│   ├── Header.tsx              # Main header
│   ├── Footer.tsx              # Footer
│   ├── ProductCard.tsx         # Product card
│   ├── CategorySidebar.tsx     # Category filter
│   ├── BannerCarousel.tsx      # Banner carousel
│   ├── AdminSidebar.tsx        # Admin sidebar
│   └── ui/                     # shadcn/ui components
│
├── constants/                  # Static data
│   └── data.ts                # Products, categories, coupons
│
├── services/                  # API services
│   └── api.ts                # Service layer with mock data
│
├── store/                     # State management
│   └── useStore.ts           # Zustand stores
│
├── types/                     # TypeScript types
│   └── index.ts              # Type definitions
│
├── styles/                    # Global styles
│   └── globals.css           # Tailwind & CSS variables
│
└── public/                    # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd flipkart-ecommerce
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Run the development server
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials
- **Email**: demo@example.com
- **Password**: password

### Admin Access
- **Admin Dashboard**: http://localhost:3000/admin
- No special login required for this mock application

## Key Features

### State Management
- **Auth Store** - User authentication and profile
- **Cart Store** - Shopping cart with automatic calculations
- **Wishlist Store** - Product favorites
- **Notification Store** - Toast notifications
- **UI Store** - Theme and sidebar state

All stores use Zustand with localStorage persistence.

### API Services
Mock services with simulated delays:
- `productService` - Product CRUD and filtering
- `categoryService` - Category management
- `orderService` - Order operations
- `reviewService` - Product reviews
- `couponService` - Coupon validation
- `dashboardService` - Analytics data

### Forms & Validation
- React Hook Form for efficient form handling
- Zod for schema validation
- Real-time error messages
- Automatic type inference from schemas

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Touch-friendly interfaces
- Optimized layouts for all screen sizes

## Customization

### Add New Products
Edit `constants/data.ts` and add products to the `PRODUCTS` array.

### Customize Colors
Update CSS variables in `styles/globals.css`:
```css
:root {
  --primary: oklch(0.205 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
}
```

### Modify Store Settings
Edit settings in `app/admin/settings/page.tsx`.

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS optimizations with Tailwind
- Efficient state management with Zustand
- Memoization of expensive computations

## Security Considerations

This is a demo application. In production:
- Implement real authentication with JWT tokens
- Use HTTPS for all communications
- Validate all inputs on the backend
- Implement rate limiting
- Use secure password hashing (bcrypt)
- Add CSRF protection
- Implement RLS policies in database
- Use environment variables for sensitive data

## Testing

To add tests:
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

## Deployment

Deploy to Vercel with one click:
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with automatic CI/CD

Environment variables are automatically configured.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
