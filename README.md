# 🧽 TidyBeast - Professional Cleaning Services Platform

<div align="center">
  <img src="src/assets/tidybeast-logo.png" alt="TidyBeast Logo" width="120" height="120">
  
  <h3>🏠 Revolutionizing Cleaning Services in Hyderabad & Surrounding Areas 🌟</h3>
  
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
  <p><em>Ethics • Trust • Technology • Eco-Friendly 🌱</em></p>
</div>

A modern, responsive website for TidyBeast cleaning services with advanced booking system, specialized pricing models, and seamless payment processing.

---

## 🚀 **Latest Updates (v2.0.0)**

### ✨ **Major Service Pricing Overhaul**
- 🛋️ **Sofa Cleaning**: Now seater-based pricing (₹300-₹750 based on 1-6+ seaters)
- 🏠 **Carpet Cleaning**: Area-based pricing (₹20/sq.ft with ₹200 minimum)
- 🎨 **Unified UI**: Consistent TidyBeast teal/cyan theme across all modals
- 📱 **Mobile Optimized**: Perfect responsive design for all screen sizes
- 💰 **Price Transparency**: All buttons show exact pricing before payment

### 🎯 **Service Improvements**
- 🍳 **Kitchen Cleaning**: Direct quantity-based booking (no BHK selection needed)
- 🚿 **Washroom Cleaning**: Streamlined quantity-only selection
- 📐 **Grid Layout**: Optimized 3-column layout for perfect visual balance
- 🖼️ **New Assets**: Professional carpet cleaning image (CC.png)

---

## 🌟 **Core Features**

- **🎨 Modern Landing Page** - Professional design with service showcases
- **🧠 Smart Booking System** - Real-time booking with specialized pricing
- **💳 Payment Integration** - PhonePe QR code payment processing
- **📊 Admin Dashboard** - Complete booking management system
- **📱 Responsive Design** - Optimized for all devices and screen sizes
- **📋 Policy Compliance** - Privacy Policy, Terms of Service, and Cookie Policy
- **🛋️ Specialized Pricing** - Different models for different services
- **🎯 Service Optimization** - Streamlined booking flows

## 🛠️ **Technology Stack**

<div align="center">

### **Frontend Framework**
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

### **Styling & UI**
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### **Backend & Database**
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

### **Tools & Services**
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Deployment**: Lovable Platform

</div>

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/saiiyen/TidyBeast.git
cd TidyBeast
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## 🔧 **Development Commands**

```bash
# 🎮 Development
npm run dev              # Start dev server (port 8080)
npm run dev:host         # Start with network access

# 🏗️ Building
npm run build           # Production build
npm run build:dev       # Development build
npm run preview         # Preview production build

# 🧹 Code Quality
npm run lint           # ESLint check
npm run lint:fix       # Auto-fix linting issues

# 🧪 Testing
npm run type-check     # TypeScript validation
```

## 📋 **Services Overview**

<div align="center">

| Service | Pricing | Duration | Type |
|---------|---------|----------|------|
| 🏠 **Home Cleaning** | ₹1,400 - ₹5,000 | 2-3 hrs | BHK-based |
| ✨ **Deep Cleaning** | ₹2,400 - ₹9,000 | 4-5 hrs | BHK-based |
| 👥 **House Maiden** | ₹1,000 - ₹3,000 | 4-6 hrs | BHK-based |
| 📦 **Move-In/Out** | ₹4,000 - ₹10,500 | 4-6 hrs | BHK-based |
| 🛋️ **Sofa Cleaning** | ₹300 - ₹750 | 1-2 hrs | Seater-based |
| 🏠 **Carpet Cleaning** | ₹20/sq.ft (min ₹200) | 1-2 hrs | Area-based |
| 🦠 **Sanitization** | ₹1,250 - ₹7,500 | 2-3 hrs | BHK-based |
| 🍳 **Kitchen Cleaning** | ₹1,500 per kitchen | 1-2 hrs | Quantity-based |
| 🚿 **Washroom Cleaning** | ₹799 per washroom | 1 hr | Quantity-based |

</div>

---

## 🛋️ **New Pricing Features**

### **🆕 Sofa Cleaning (Seater-Based)**
```javascript
Pricing Structure:
├── 1-seater: ₹300
├── 2-seater: ₹350 (base price)
├── 3-seater: ₹450
├── 4-seater: ₹550
├── 5-seater: ₹650
└── 6+-seater: ₹750
```

### **🆕 Carpet Cleaning (Area-Based)**
```javascript
Pricing Structure:
├── Rate: ₹20 per square feet
├── Minimum charge: ₹200
└── Examples:
    ├── 10 sq.ft = ₹200 (minimum applied)
    ├── 50 sq.ft = ₹1,000
    └── 100 sq.ft = ₹2,000
```

---

## 🎯 **Key Features**

### **✨ User Experience**
- 📱 **Mobile-First Design** - Perfect on all devices
- 🎨 **Smooth Animations** - Engaging user interactions
- 💰 **Transparent Pricing** - No hidden fees, clear costs
- ⚡ **Fast Loading** - Optimized performance
- 🔒 **Secure Payments** - Integrated payment gateway

### **🛠️ Service Management**
- 🏠 **BHK-Based Pricing** - For home services
- 📊 **Quantity-Based Pricing** - For kitchen/washroom
- 🛋️ **Seater-Based Pricing** - For sofa cleaning
- 📐 **Area-Based Pricing** - For carpet cleaning
- 📧 **Automated Notifications** - Email confirmations

### **🎨 Design Excellence**
- 🌈 **Consistent Branding** - TidyBeast teal theme
- 📱 **Responsive Modals** - Perfect mobile experience
- 🎯 **Optimized Layouts** - 3-column grid for 9 services
- ✨ **Modern UI** - shadcn/ui component library

## 📁 **Project Structure**

```
src/
├── 📱 components/          # React components
│   ├── 🎯 Services.tsx     # Main services showcase
│   ├── 🛋️ SofaSelectionModal.tsx    # New: Sofa seater selection
│   ├── 🏠 CarpetSelectionModal.tsx  # New: Carpet area selection
│   ├── 📋 QuantitySelectionModal.tsx # Kitchen/Washroom quantity
│   ├── 🏘️ BHKSelectionModal.tsx     # Home size selection
│   ├── 💰 BookingModal.tsx  # Booking form with payment
│   └── 🎨 ui/              # shadcn/ui component library
├── 💰 config/             # Configuration files
│   └── 📊 pricing.ts      # Unified pricing system
├── 🧰 services/           # Business logic services
│   ├── 📧 emailService.ts # Email notifications
│   └── 📊 dataCollectionService.ts # Data handling
├── 🖼️ assets/             # Images and static files
│   ├── 🛋️ CC.png          # New: Carpet cleaning image
│   ├── 🏠 HomeCleaning.png # Service images
│   └── 🦌 tidybeast-*.png  # Branding assets
└── 📄 pages/              # Route pages
    └── 🏠 Index.tsx       # Main landing page
```

---

## 🎨 **Design System**

### **🎨 Color Palette**
```css
Primary: #0D9488 (Teal-600) - Main brand color
Secondary: #06B6D4 (Cyan-600) - Accent color
Success: #10B981 (Emerald-500) - Success states
Warning: #F59E0B (Amber-500) - Warnings
Error: #EF4444 (Red-500) - Error states
```

### **📱 Responsive Breakpoints**
- **Mobile**: `< 768px` - Single column layouts
- **Tablet**: `768px - 1024px` - 2-column service grid
- **Desktop**: `> 1024px` - 3-column optimal layout

## 🏗️ **Architecture**

### **📊 Pricing System**
```typescript
// Unified pricing configuration
interface ServiceConfig {
  id: string;
  name: string;
  basePrice: number;
  duration: string;
  description: string;
  pricing?: ServicePricing;      // BHK-based
  sofaPricing?: SofaPricing;     // Seater-based
  carpetPricing?: CarpetPricing; // Area-based
  isQuantityBased?: boolean;     // Kitchen/Washroom
}
```

### **🎨 Component Architecture**
- **Service Cards** → **Selection Modals** → **Booking Modal** → **Payment Modal**
- Specialized modals for different pricing types
- Responsive design patterns throughout

---

## 🌟 **Recent Improvements**

### **🆕 New Components**
- `SofaSelectionModal.tsx` - Seater-based sofa selection
- `CarpetSelectionModal.tsx` - Area-based carpet selection
- Enhanced `QuantitySelectionModal.tsx` - Streamlined kitchen/washroom
- Updated `BHKSelectionModal.tsx` - Price display improvements

### **🎨 UI/UX Enhancements**
- ✅ **Consistent TidyBeast Colors** - Teal/cyan theme throughout
- ✅ **Mobile-First Responsive** - Perfect on all screen sizes
- ✅ **Price Visibility** - Clear pricing on all buttons
- ✅ **Optimized Grid** - 3-column layout for 9 services
- ✅ **Touch-Friendly** - Mobile-optimized interactions

### **💰 Pricing Updates**
- ✅ **Hyderabad Market Rates** - Competitive local pricing
- ✅ **Transparent Structure** - Clear pricing methodology
- ✅ **Flexible Options** - Multiple pricing models
- ✅ **Minimum Charges** - Fair pricing for small jobs

---

## 📞 **Contact & Support**

<div align="center">

📱 **Phone**: [+91 99590 47238](tel:+919959047238)  
📧 **Email**: [choosetidybeast@gmail.com](mailto:choosetidybeast@gmail.com)  
📍 **Service Area**: Hyderabad & Surrounding Areas  

### **🔗 Social Media**
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/tidybeast_cleaning/)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=61569616935855)
[![Threads](https://img.shields.io/badge/Threads-000000?style=for-the-badge&logo=threads&logoColor=white)](https://www.threads.net/@tidybeast.co.in)

</div>

## 🤝 **Contributing**

We welcome contributions! Please feel free to submit a Pull Request.

### **Development Workflow**
1. 🍴 Fork the repository
2. 🌟 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- 🎨 **shadcn/ui** - Beautiful component library
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🤖 **Lovable** - AI-assisted development platform
- 🗄️ **Supabase** - Backend infrastructure

---

<div align="center">
  <h3>🧽 Made with ❤️ by TidyBeast Team</h3>
  <p><strong>Transforming homes, one clean at a time! ✨</strong></p>
</div>
