# NoteHub - Modern Note Management System

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

A full-featured note management application built with Next.js 15 App Router, featuring complete authentication system, internationalization, and modern UI/UX patterns.

## ✨ Features

- 🔐 **Complete Authentication System** - Registration, login, logout with session management
- 🛡️ **Protected Routes** - Server and client-side route protection with middleware
- 🌍 **Internationalization** - Multi-language support (English, Ukrainian, German, Russian)
- 📝 **Note Management** - Create, read, update, delete notes with tags and filtering
- 🏷️ **Smart Tagging System** - Organize notes with translated tag categories
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- ⚡ **Performance Optimized** - SSR/CSR hybrid with React Query caching
- 🎨 **Modern UI** - Clean design with CSS Modules and smooth animations
- 🔄 **Real-time Updates** - Optimistic updates with React Query
- 🍪 **Session Management** - Secure cookie-based authentication

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Internationalization**: Custom i18n system

### Backend Integration

- **API**: RESTful API integration
- **Authentication**: Cookie-based sessions
- **Middleware**: Next.js middleware for route protection

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth-routes)/           # Authentication pages
│   │   ├── sign-in/             # Login page
│   │   ├── sign-up/             # Registration page
│   │   └── layout.tsx           # Auth layout
│   ├── (private-routes)/        # Protected pages
│   │   ├── profile/             # User profile
│   │   │   ├── edit/            # Profile editing
│   │   │   └── page.tsx         # Profile view
│   │   ├── notes/               # Notes management
│   │   │   ├── filter/          # Note filtering
│   │   │   ├── [id]/            # Individual note
│   │   │   └── action/create/   # Note creation
│   │   ├── @modal/              # Modal routes
│   │   └── layout.tsx           # Private layout
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── users/               # User management
│   │   ├── notes/               # Notes CRUD
│   │   └── upload/              # File upload
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── AuthNavigation/          # Authentication navigation
│   ├── AuthProvider/            # Auth context provider
│   ├── Header/                  # Application header
│   ├── NoteList/                # Notes display
│   ├── NoteForm/                # Note creation/editing
│   ├── TagsMenu/                # Tag filtering
│   ├── LanguageToggle/          # Language switcher
│   └── ...                      # Other components
├── lib/                         # Utility libraries
│   ├── api/                     # API functions
│   │   ├── clientApi.ts         # Client-side API calls
│   │   ├── serverApi.ts         # Server-side API calls
│   │   └── api.ts               # Shared axios instance
│   ├── context/                 # React contexts
│   │   ├── LanguageContext.tsx  # Internationalization
│   │   └── ThemeContext.tsx     # Theme management
│   └── store/                   # State management
│       ├── authStore.ts         # Authentication state
│       └── noteStore.ts         # Note drafts state
├── types/                       # TypeScript definitions
│   ├── user.ts                  # User interfaces
│   └── note.ts                  # Note interfaces
└── middleware.ts                # Route protection middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Shymka23/09-auth.git
cd 09-auth
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**
   Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Run development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
npm start
```

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/login`    | User login          |
| `POST` | `/api/auth/register` | User registration   |
| `POST` | `/api/auth/logout`   | User logout         |
| `GET`  | `/api/auth/session`  | Check user session  |
| `POST` | `/api/auth/refresh`  | Refresh auth tokens |

### User Management

| Method  | Endpoint        | Description              |
| ------- | --------------- | ------------------------ |
| `GET`   | `/api/users/me` | Get current user profile |
| `PATCH` | `/api/users/me` | Update user profile      |

### Notes Management

| Method   | Endpoint          | Description                                  |
| -------- | ----------------- | -------------------------------------------- |
| `GET`    | `/api/notes`      | Get notes list (with pagination & filtering) |
| `POST`   | `/api/notes`      | Create new note                              |
| `GET`    | `/api/notes/[id]` | Get specific note                            |
| `DELETE` | `/api/notes/[id]` | Delete note                                  |

### File Upload

| Method | Endpoint      | Description                         |
| ------ | ------------- | ----------------------------------- |
| `POST` | `/api/upload` | Upload files (avatars, attachments) |

## 🔐 Authentication & Security

### Route Protection

- **Middleware Protection**: Server-side route guarding with `middleware.ts`
- **Client Protection**: React component-based route protection
- **Session Management**: Secure cookie-based authentication
- **Auto-redirect**: Intelligent redirection based on auth status

### Security Features

- CSRF protection via cookies
- Secure HTTP-only cookies
- Route-level access control
- Session validation on each request

## 🌍 Internationalization

### Supported Languages

- 🇺🇸 **English** - Default language
- 🇺🇦 **Ukrainian** - Українська мова
- 🇩🇪 **German** - Deutsch
- 🇷🇺 **Russian** - Русский язык

### Translation Features

- **Dynamic Language Switching** - Change language without page reload
- **Translated Tags** - Note categories translate based on selected language
- **Context-aware Translations** - Different translations for different contexts
- **Persistent Language Selection** - Language preference saved in localStorage

## 📝 Note Management Features

### Core Functionality

- **CRUD Operations** - Create, read, update, delete notes
- **Tag System** - Organize notes with predefined categories
- **Smart Filtering** - Filter notes by tags with "All Notes" option
- **Search Capability** - Find notes by content
- **Pagination** - Efficient loading of large note collections

### Tag Categories

- **Todo** - Task and project management
- **Personal** - Personal notes and thoughts
- **Meeting** - Meeting notes and minutes
- **Work** - Professional and work-related notes
- **Shopping** - Shopping lists and planning

## 🎨 UI/UX Features

### Design System

- **CSS Modules** - Scoped styling with zero conflicts
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - User preference-based theming
- **Smooth Animations** - Polished micro-interactions
- **Accessible Components** - WCAG compliant interface elements

### User Experience

- **Optimistic Updates** - Immediate UI feedback
- **Loading States** - Clear loading indicators
- **Error Handling** - Graceful error recovery
- **Toast Notifications** - Non-intrusive feedback
- **Modal Interactions** - Overlay-based workflows

## 🚀 Performance Optimizations

- **SSR/CSR Hybrid** - Optimal rendering strategy per route
- **React Query Caching** - Intelligent data caching and synchronization
- **Code Splitting** - Route-based code splitting
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Optimized bundle size

## 📦 Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   ```
3. Deploy automatically on git push

### Manual Deployment

```bash
npm run build
npm run export  # For static export
```

## 🧪 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files
```

### Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code linting with Next.js config
- **Prettier** - Consistent code formatting
- **Git Hooks** - Pre-commit quality checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yevhen Shymka**

- GitHub: [@Shymka23](https://github.com/Shymka23)
- Project: [NoteHub Demo](https://github.com/Shymka23/09-auth)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Vercel](https://vercel.com/) - Deployment and hosting platform
- [TanStack Query](https://tanstack.com/query) - Data synchronization for React
- [Zustand](https://github.com/pmndrs/zustand) - State management solution

---

<div align="center">
  <strong>Built with ❤️ using modern web technologies</strong>
</div>
