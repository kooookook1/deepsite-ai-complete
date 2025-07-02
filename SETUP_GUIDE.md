# 🚀 دليل التشغيل المحلي | Local Setup Guide

## 📋 المتطلبات الأساسية | Prerequisites

### 1. تثبيت Node.js | Install Node.js
```bash
# تحقق من الإصدار | Check version
node --version  # يجب أن يكون 18+ | Should be 18+
npm --version
```

إذا لم يكن مثبتاً، حمّل من: https://nodejs.org/

### 2. تثبيت Git | Install Git
```bash
git --version
```

## 🛠️ خطوات التثبيت | Installation Steps

### الخطوة 1: استنساخ المشروع | Step 1: Clone Repository
```bash
git clone https://github.com/kooookook1/deepsite-ai-complete.git
cd deepsite-ai-complete
```

### الخطوة 2: تثبيت التبعيات | Step 2: Install Dependencies
```bash
# استخدم أحد الأوامر التالية | Use one of the following commands:

# npm
npm install

# أو yarn | or yarn
npm install -g yarn
yarn install

# أو pnpm | or pnpm
npm install -g pnpm
pnpm install
```

### الخطوة 3: إعداد متغيرات البيئة | Step 3: Environment Setup
```bash
# انسخ ملف المثال | Copy example file
cp .env.example .env.local
```

### الخطوة 4: تحرير متغيرات البيئة | Step 4: Edit Environment Variables
افتح ملف `.env.local` وأضف:

```env
# مطلوب للذكاء الاصطناعي | Required for AI
HUGGINGFACE_API_TOKEN=hf_your_token_here

# اختياري | Optional
MONGODB_URI=mongodb://localhost:27017/deepsite
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

#### 🔑 الحصول على Hugging Face Token | Getting Hugging Face Token

1. اذهب إلى: https://huggingface.co/settings/tokens
2. سجل دخول أو أنشئ حساب جديد
3. اضغط "New token"
4. اختر "Read" permissions
5. انسخ الـ token وضعه في `.env.local`

### الخطوة 5: تشغيل الخادم | Step 5: Start Server
```bash
# للتطوير | For development
npm run dev

# أو | or
yarn dev

# أو | or
pnpm dev
```

### الخطوة 6: فتح المتصفح | Step 6: Open Browser
```
http://localhost:3000
```

## 🎯 اختبار الوظائف | Testing Features

### 1. اختبار الذكاء الاصطناعي | Test AI Functionality
1. اذهب إلى `/projects/new`
2. اكتب: "اصنع لي صفحة تسجيل دخول جميلة"
3. اضغط "Edit"
4. انتظر النتيجة (قد تستغرق 20-30 ثانية)

### 2. اختبار المحرر | Test Editor
1. عدّل الكود في المحرر
2. شاهد التغييرات في المعاينة المباشرة

## 🐛 حل المشاكل | Troubleshooting

### مشكلة: خطأ في تثبيت التبعيات | Issue: Dependencies Installation Error
```bash
# امسح الملفات وأعد التثبيت | Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### مشكلة: خطأ في الـ Port | Issue: Port Error
```bash
# استخدم port مختلف | Use different port
npm run dev -- -p 3001
```

### مشكلة: خطأ في الذكاء الاصطناعي | Issue: AI Error
1. تأكد من صحة `HUGGINGFACE_API_TOKEN`
2. تحقق من الاتصال بالإنترنت
3. جرب إعادة تشغيل الخادم

### مشكلة: بطء في الاستجابة | Issue: Slow Response
- هذا طبيعي، نماذج الذكاء الاصطناعي تحتاج وقت
- انتظر 20-30 ثانية للاستجابة

## 📦 البناء للإنتاج | Production Build

```bash
# بناء المشروع | Build project
npm run build

# تشغيل الإنتاج | Start production
npm start
```

## 🔧 تخصيص المشروع | Project Customization

### تغيير نماذج الذكاء الاصطناعي | Change AI Models
عدّل `app/api/ask-ai/route.ts`:
```typescript
const models = [
  "deepseek-ai/DeepSeek-V3-0324",
  "meta-llama/Llama-3.3-70B-Instruct",
  // أضف نموذجك هنا | Add your model here
];
```

### تخصيص التصميم | Customize Design
- **الألوان**: `tailwind.config.js`
- **الخطوط**: `app/layout.tsx`
- **المكونات**: مجلد `components/`

## 📞 الدعم | Support

إذا واجهت مشاكل:
1. تحقق من [Issues](https://github.com/kooookook1/deepsite-ai-complete/issues)
2. أنشئ issue جديد مع تفاصيل المشكلة
3. تأكد من إرفاق:
   - نظام التشغيل
   - إصدار Node.js
   - رسالة الخطأ كاملة

---

<div align="center">

**نتمنى لك تجربة ممتعة مع DeepSite! 🚀**

**Enjoy your experience with DeepSite! 🚀**

</div>