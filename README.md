# 🚀 DeepSite AI - Complete Website Builder

![DeepSite AI](https://img.shields.io/badge/DeepSite-AI%20Powered-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ المميزات الرئيسية | Key Features

### 🤖 الذكاء الاصطناعي | AI-Powered
- **دعم اللغة العربية والإنجليزية** | Arabic & English Support
- **إنشاء مواقع ويب بالذكاء الاصطناعي** | AI Website Generation
- **معاينة مباشرة** | Live Preview
- **تحديث تلقائي للكود** | Auto Code Updates

### 🎨 التصميم | Design
- **تصميم حديث ومتجاوب** | Modern Responsive Design
- **محرر كود متقدم** | Advanced Code Editor (Monaco)
- **واجهة مستخدم سهلة** | User-Friendly Interface
- **دعم الوضع المظلم** | Dark Mode Support

### ⚡ الأداء | Performance
- **Next.js 15 مع Turbopack** | Next.js 15 with Turbopack
- **تحميل سريع** | Fast Loading
- **تحسين للأداء** | Performance Optimized

## 🛠️ التقنيات المستخدمة | Tech Stack

- **Frontend**: Next.js 15.3.3, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI Integration**: Hugging Face Inference API
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **Database**: MongoDB (optional)
- **Authentication**: NextAuth.js (optional)

## 🚀 التشغيل المحلي | Local Setup

### المتطلبات | Prerequisites
- Node.js 18+ 
- npm أو yarn أو pnpm

### خطوات التشغيل | Installation Steps

1. **استنساخ المشروع | Clone the repository**
```bash
git clone https://github.com/kooookook1/deepsite-ai-complete.git
cd deepsite-ai-complete
```

2. **تثبيت التبعيات | Install dependencies**
```bash
npm install
# أو | or
yarn install
# أو | or
pnpm install
```

3. **إعداد متغيرات البيئة | Environment Setup**
```bash
cp .env.example .env.local
```

أضف المتغيرات التالية في `.env.local`:
```env
# Hugging Face API Token (اختياري للاختبار | Optional for testing)
HUGGINGFACE_API_TOKEN=your_hf_token_here

# MongoDB (اختياري | Optional)
MONGODB_URI=your_mongodb_connection_string

# NextAuth (اختياري | Optional)
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

4. **تشغيل الخادم | Start the server**
```bash
npm run dev
# أو | or
yarn dev
# أو | or
pnpm dev
```

5. **فتح المتصفح | Open browser**
```
http://localhost:3000
```

## 🎯 كيفية الاستخدام | How to Use

### إنشاء موقع جديد | Create New Website

1. **اذهب إلى صفحة المشروع الجديد** | Go to new project page
2. **اكتب وصف الموقع المطلوب** | Enter website description
   - مثال عربي: "اصنع لي صفحة تسجيل دخول جميلة"
   - English example: "Create a beautiful e-commerce landing page"
3. **اضغط على "Edit"** | Click "Edit" button
4. **شاهد المعاينة المباشرة** | View live preview

### المميزات المتقدمة | Advanced Features

- **محرر الكود**: تعديل HTML/CSS مباشرة
- **المعاينة المباشرة**: رؤية التغييرات فوراً
- **حفظ المشروع**: حفظ العمل للعودة إليه لاحقاً
- **تصدير الكود**: تحميل الكود النهائي

## 🔧 التخصيص | Customization

### إضافة نماذج AI جديدة | Adding New AI Models

يمكنك تعديل ملف `app/api/ask-ai/route.ts` لإضافة نماذج جديدة:

```typescript
// إضافة نموذج جديد
const models = [
  "deepseek-ai/DeepSeek-V3-0324",
  "meta-llama/Llama-3.3-70B-Instruct",
  // نموذجك الجديد هنا
];
```

### تخصيص التصميم | Design Customization

- **الألوان**: عدّل `tailwind.config.js`
- **الخطوط**: أضف خطوط جديدة في `app/layout.tsx`
- **المكونات**: عدّل مكونات UI في مجلد `components/`

## 📁 هيكل المشروع | Project Structure

```
deepsite-ai-complete/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── projects/          # Project pages
│   └── layout.tsx         # Root layout
├── components/            # React Components
│   ├── ui/               # UI Components
│   ├── editor/           # Code Editor
│   └── ...
├── lib/                   # Utilities
├── hooks/                 # Custom Hooks
├── assets/               # Static Assets
└── public/               # Public Files
```

## 🐛 استكشاف الأخطاء | Troubleshooting

### مشاكل شائعة | Common Issues

1. **خطأ في API الذكاء الاصطناعي**
   - تأكد من صحة `HUGGINGFACE_API_TOKEN`
   - تحقق من الاتصال بالإنترنت

2. **مشاكل في التثبيت**
   ```bash
   # امسح node_modules وأعد التثبيت
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **مشاكل في الأداء**
   - استخدم `npm run build` للإنتاج
   - تأكد من Node.js 18+

## 🤝 المساهمة | Contributing

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير | Acknowledgments

- **المشروع الأصلي**: [DeepSite by enzostvs](https://t.me/c4ccz)
- **Hugging Face**: لتوفير نماذج الذكاء الاصطناعي
- **Next.js Team**: للإطار الرائع
- **Vercel**: للاستضافة والنشر

## 📞 التواصل | Contact

- **GitHub**: [@kooookook1](https://github.com/kooookook1)
- **المشروع**: [deepsite-ai-complete](https://github.com/kooookook1/deepsite-ai-complete)

---

<div align="center">

**صُنع بـ ❤️ للمطورين العرب والعالميين**

**Made with ❤️ for Arab and Global Developers**

</div>
