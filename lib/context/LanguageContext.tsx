"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "uk" | "de" | "ru";

// Define translation keys type
type TranslationKey =
  | "nav.home"
  | "nav.notes"
  | "nav.profile"
  | "nav.about"
  | "hero.title"
  | "hero.subtitle"
  | "hero.getStarted"
  | "hero.learnMore"
  | "features.title"
  | "features.easyToUse"
  | "features.easyToUseDesc"
  | "features.tagOrganization"
  | "features.tagOrganizationDesc"
  | "features.quickSearch"
  | "features.quickSearchDesc"
  | "features.dataSecurity"
  | "features.dataSecurityDesc"
  | "stats.title"
  | "stats.security"
  | "stats.availability"
  | "stats.categories"
  | "stats.notes"
  | "cta.title"
  | "cta.description"
  | "cta.createNote"
  | "about.title"
  | "about.whatIs"
  | "about.whatIsDesc"
  | "about.keyFeatures"
  | "about.noteCreation"
  | "about.noteCreationDesc"
  | "about.searchFiltering"
  | "about.searchFilteringDesc"
  | "about.personalProfile"
  | "about.personalProfileDesc"
  | "about.technologies"
  | "about.technologiesDesc"
  | "about.security"
  | "about.securityDesc"
  | "about.developer"
  | "about.developerDesc"
  | "notes.title"
  | "notes.subtitle"
  | "notes.featuresTitle"
  | "notes.creationEditing"
  | "notes.creationEditingDesc"
  | "notes.categorization"
  | "notes.categorizationDesc"
  | "notes.searchFiltering"
  | "notes.searchFilteringDesc"
  | "notes.responsiveDesign"
  | "notes.responsiveDesignDesc"
  | "notes.readyToStart"
  | "notes.ctaText"
  | "notes.signIn"
  | "notes.signUp"
  | "notes.examplesTitle"
  | "notes.todoLists"
  | "notes.todoListsDesc"
  | "notes.workNotes"
  | "notes.workNotesDesc"
  | "notes.meetings"
  | "notes.meetingsDesc"
  | "notes.shopping"
  | "notes.shoppingDesc"
  | "notes.allNotes"
  | "tags.todo"
  | "tags.personal"
  | "tags.meeting"
  | "tags.work"
  | "tags.shopping"
  | "profile.title"
  | "profile.editProfile"
  | "profile.contactInfo"
  | "profile.accountInfo"
  | "profile.registrationDate"
  | "profile.lastUpdated"
  | "profile.myNotes"
  | "profile.createNote"
  | "noteCard.view"
  | "noteCard.delete"
  | "noteCard.deleting"
  | "noteCard.created"
  | "noteCard.updated"
  | "noteCard.deleteConfirm"
  | "auth.signIn"
  | "auth.signUp"
  | "auth.email"
  | "auth.password"
  | "auth.emailPlaceholder"
  | "auth.passwordPlaceholder"
  | "auth.logIn"
  | "auth.loggingIn"
  | "auth.register"
  | "auth.registering"
  | "auth.noAccount"
  | "avatarPicker.choosePhoto"
  | "avatarPicker.changePhoto"
  | "avatarPicker.onlyImages"
  | "avatarPicker.maxSize"
  | "avatarUpload.chooseFile"
  | "avatarUpload.upload"
  | "avatarUpload.uploading"
  | "avatarUpload.remove"
  | "avatarUpload.noImage"
  | "avatarUpload.invalidType"
  | "avatarUpload.tooLarge"
  | "avatarUpload.unsupportedFormat"
  | "avatarUpload.supportedFormats"
  | "avatarUpload.maxSize"
  | "avatarUpload.tooLargeBase64"
  | "auth.haveAccount";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Translations
const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.notes": "Notes",
    "nav.profile": "Profile",
    "nav.about": "About",
    "hero.title": "Welcome to NoteHub",
    "hero.subtitle": "A modern platform for managing your personal notes",
    "hero.getStarted": "Get Started",
    "hero.learnMore": "Learn More",
    "features.title": "Why NoteHub?",
    "features.easyToUse": "Easy to Use",
    "features.easyToUseDesc":
      "Intuitive interface for quick note creation and editing",
    "features.tagOrganization": "Tag Organization",
    "features.tagOrganizationDesc":
      "Categorize notes with tags for better organization and search",
    "features.quickSearch": "Quick Search",
    "features.quickSearchDesc":
      "Find the information you need in seconds with powerful search",
    "features.dataSecurity": "Data Security",
    "features.dataSecurityDesc":
      "Your notes are protected and accessible only to you",
    "stats.title": "NoteHub in Numbers",
    "stats.security": "Security",
    "stats.availability": "Availability",
    "stats.categories": "Categories",
    "stats.notes": "Notes",
    "cta.title": "Ready to Start?",
    "cta.description":
      "Join thousands of users who have already organized their thoughts with NoteHub",
    "cta.createNote": "Create Your First Note",
    "about.title": "About NoteHub Platform",
    "about.whatIs": "What is NoteHub?",
    "about.whatIsDesc":
      "NoteHub is a modern platform for managing personal notes, designed with the needs of users who value simplicity and efficiency in everyday life.",
    "about.keyFeatures": "Key Features",
    "about.noteCreation": "Note Creation",
    "about.noteCreationDesc":
      "Quickly create and edit notes with rich text formatting",
    "about.searchFiltering": "Search & Filtering",
    "about.searchFilteringDesc":
      "Find the notes you need with search and filtering",
    "about.personalProfile": "Personal Profile",
    "about.personalProfileDesc": "Manage your profile and settings",
    "about.technologies": "Technologies",
    "about.technologiesDesc": "NoteHub is built on a modern technology stack:",
    "about.security": "Security",
    "about.securityDesc":
      "Your data is protected by modern authentication and authorization methods. All notes are stored securely and accessible only to you.",
    "about.developer": "Developer",
    "about.developerDesc":
      "NoteHub is developed by Yevhen Shymka as a demonstration of modern approaches to web application development.",
    "notes.title": "Note Management",
    "notes.subtitle":
      "Organize your thoughts and ideas with powerful NoteHub tools",
    "notes.featuresTitle": "Features for Working with Notes",
    "notes.creationEditing": "Creation & Editing",
    "notes.creationEditingDesc":
      "Quickly create new notes with rich text formatting and convenient editor",
    "notes.categorization": "Categorization",
    "notes.categorizationDesc":
      "Organize notes with tags: Todo, Work, Personal, Meeting, Shopping",
    "notes.searchFiltering": "Search & Filtering",
    "notes.searchFilteringDesc":
      "Find the notes you need with powerful search and filtering capabilities",
    "notes.responsiveDesign": "Responsive Design",
    "notes.responsiveDesignDesc":
      "Work with notes on any device with optimized interface",
    "notes.readyToStart": "Ready to Start?",
    "notes.ctaText": "Sign in or register to get access to all features",
    "notes.signIn": "Sign In",
    "notes.signUp": "Sign Up",
    "notes.examplesTitle": "Usage Examples",
    "notes.todoLists": "Todo Lists",
    "notes.todoListsDesc": "Create task lists and track their completion",
    "notes.workNotes": "Work Notes",
    "notes.workNotesDesc": "Store important work information and projects",
    "notes.meetings": "Meetings",
    "notes.meetingsDesc": "Record meeting plans and key points",
    "notes.shopping": "Shopping",
    "notes.shoppingDesc": "Keep shopping lists and plan expenses",
    "notes.allNotes": "All Notes",
    "tags.todo": "Todo",
    "tags.personal": "Personal",
    "tags.meeting": "Meeting",
    "tags.work": "Work",
    "tags.shopping": "Shopping",
    "profile.title": "User Profile",
    "profile.editProfile": "Edit Profile",
    "profile.contactInfo": "Contact Information",
    "profile.accountInfo": "Account Information",
    "profile.registrationDate": "Registration Date:",
    "profile.lastUpdated": "Last Updated:",
    "profile.myNotes": "My Notes",
    "profile.createNote": "Create Note",
    "noteCard.view": "View",
    "noteCard.delete": "Delete",
    "noteCard.deleting": "Deleting...",
    "noteCard.created": "Created:",
    "noteCard.updated": "Updated:",
    "noteCard.deleteConfirm": "Are you sure you want to delete this note?",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",

    "auth.email": "Email",
    "auth.password": "Password",
    "auth.emailPlaceholder": "Enter your email",
    "auth.passwordPlaceholder": "Enter your password",
    "auth.logIn": "Log In",
    "auth.loggingIn": "Logging in...",
    "auth.register": "Register",
    "auth.registering": "Registering...",
    "auth.noAccount": "Don't have an account?",
    "auth.haveAccount": "Already have an account?",
    "avatarPicker.choosePhoto": "📷 Choose photo",
    "avatarPicker.changePhoto": "📷 Change photo",
    "avatarPicker.onlyImages": "Only images",
    "avatarPicker.maxSize": "Max file size 2MB",
    "avatarUpload.chooseFile": "Choose File",
    "avatarUpload.upload": "Upload",
    "avatarUpload.uploading": "Uploading...",
    "avatarUpload.remove": "Remove",
    "avatarUpload.noImage": "No Image",
    "avatarUpload.invalidType": "Only image files are allowed",
    "avatarUpload.tooLarge": "File size too large. Maximum 1MB allowed",
    "avatarUpload.unsupportedFormat":
      "Unsupported format. Use JPEG, PNG or WebP",
    "avatarUpload.supportedFormats": "Supported formats: JPEG, PNG, WebP",
    "avatarUpload.maxSize": "Maximum file size: 1MB",
    "avatarUpload.tooLargeBase64":
      "Image too large for storage. Try reducing size or quality.",
  },
  uk: {
    "nav.home": "Головна",
    "nav.notes": "Нотатки",
    "nav.profile": "Профіль",
    "nav.about": "Про платформу",
    "hero.title": "Ласкаво просимо до NoteHub",
    "hero.subtitle":
      "Сучасна платформа для управління вашими особистими нотатками",
    "hero.getStarted": "Почати роботу",
    "hero.learnMore": "Дізнатися більше",
    "features.title": "Чому NoteHub?",
    "features.easyToUse": "Простота використання",
    "features.easyToUseDesc":
      "Інтуїтивно зрозумілий інтерфейс для швидкого створення та редагування нотаток",
    "features.tagOrganization": "Організація за тегами",
    "features.tagOrganizationDesc":
      "Категорізуйте нотатки за тегами для кращої організації та пошуку",
    "features.quickSearch": "Швидкий пошук",
    "features.quickSearchDesc":
      "Знаходьте потрібну інформацію за секунди за допомогою потужного пошуку",
    "features.dataSecurity": "Безпека даних",
    "features.dataSecurityDesc": "Ваші нотатки захищені та доступні тільки вам",
    "stats.title": "NoteHub у цифрах",
    "stats.security": "Безпека",
    "stats.availability": "Доступність",
    "stats.categories": "Категорій",
    "stats.notes": "Нотаток",
    "cta.title": "Готові почати?",
    "cta.description":
      "Приєднуйтесь до тисяч користувачів, які вже організували свої думки з NoteHub",
    "cta.createNote": "Створити першу нотатку",
    "about.title": "Про платформу NoteHub",
    "about.whatIs": "Що таке NoteHub?",
    "about.whatIsDesc":
      "NoteHub - це сучасна платформа для управління особистими нотатками, розроблена з урахуванням потреб користувачів, які цінують простоту та ефективність у повсякденному житті.",
    "about.keyFeatures": "Основні можливості",
    "about.noteCreation": "Створення нотаток",
    "about.noteCreationDesc":
      "Швидко створюйте та редагуйте нотатки з багатим текстовим форматуванням",
    "about.searchFiltering": "Пошук та фільтрація",
    "about.searchFilteringDesc":
      "Знаходьте потрібні нотатки за допомогою пошуку та фільтрів",
    "about.personalProfile": "Особистий профіль",
    "about.personalProfileDesc": "Управляйте своїм профілем та налаштуваннями",
    "about.technologies": "Технології",
    "about.technologiesDesc":
      "NoteHub побудований на сучасному стекі технологій:",
    "about.security": "Безпека",
    "about.securityDesc":
      "Ваші дані захищені сучасними методами аутентифікації та авторизації. Всі нотатки зберігаються безпечно та доступні тільки вам.",
    "about.developer": "Розробник",
    "about.developerDesc":
      "NoteHub розроблений Євгеном Шимкою як демонстрація сучасних підходів до розробки веб-застосунків.",
    "notes.title": "Управління нотатками",
    "notes.subtitle":
      "Організуйте свої думки та ідеї з потужними інструментами NoteHub",
    "notes.featuresTitle": "Можливості для роботи з нотатками",
    "notes.creationEditing": "Створення та редагування",
    "notes.creationEditingDesc":
      "Швидко створюйте нові нотатки з багатим текстовим форматуванням та зручним редактором",
    "notes.categorization": "Категорізація",
    "notes.categorizationDesc":
      "Організуйте нотатки за тегами: Todo, Work, Personal, Meeting, Shopping",
    "notes.searchFiltering": "Пошук та фільтрація",
    "notes.searchFilteringDesc":
      "Знаходьте потрібні нотатки за допомогою потужного пошуку та фільтрації",
    "notes.responsiveDesign": "Адаптивний дизайн",
    "notes.responsiveDesignDesc":
      "Працюйте з нотатками на будь-якому пристрої з оптимізованим інтерфейсом",
    "notes.readyToStart": "Готові почати?",
    "notes.ctaText":
      "Увійдіть в систему або зареєструйтесь, щоб отримати доступ до всіх можливостей",
    "notes.signIn": "Увійти",
    "notes.signUp": "Зареєструватися",
    "notes.examplesTitle": "Приклади використання",
    "notes.todoLists": "Todo список",
    "notes.todoListsDesc":
      "Створюйте списки завдань та відстежуйте їх виконання",
    "notes.workNotes": "Робочі нотатки",
    "notes.workNotesDesc": "Зберігайте важливу інформацію з роботи та проекти",
    "notes.meetings": "Зустрічі",
    "notes.meetingsDesc": "Записуйте плани зустрічей та ключові моменти",
    "notes.shopping": "Покупки",
    "notes.shoppingDesc": "Ведіть списки покупок та плануйте витрати",
    "notes.allNotes": "Всі нотатки",
    "tags.todo": "Завдання",
    "tags.personal": "Особисте",
    "tags.meeting": "Зустрічі",
    "tags.work": "Робота",
    "tags.shopping": "Покупки",
    "profile.title": "Профіль користувача",
    "profile.editProfile": "Редагувати профіль",
    "profile.contactInfo": "Контактна інформація",
    "profile.accountInfo": "Інформація про акаунт",
    "profile.registrationDate": "Дата реєстрації:",
    "profile.lastUpdated": "Останнє оновлення:",
    "profile.myNotes": "Мої нотатки",
    "profile.createNote": "Створити нотатку",
    "noteCard.view": "Переглянути",
    "noteCard.delete": "Видалити",
    "noteCard.deleting": "Видалення...",
    "noteCard.created": "Створено:",
    "noteCard.updated": "Оновлено:",
    "noteCard.deleteConfirm": "Ви впевнені, що хочете видалити цю нотатку?",
    "auth.signIn": "Увійти",
    "auth.signUp": "Зареєструватися",

    "auth.email": "Email",
    "auth.password": "Пароль",
    "auth.emailPlaceholder": "Введіть ваш email",
    "auth.passwordPlaceholder": "Введіть ваш пароль",
    "auth.logIn": "Увійти",
    "auth.loggingIn": "Вхід...",
    "auth.register": "Зареєструватися",
    "auth.registering": "Реєстрація...",
    "auth.noAccount": "Немає облікового запису?",
    "auth.haveAccount": "Вже маєте обліковий запис?",
    "avatarPicker.choosePhoto": "📷 Обрати фото",
    "avatarPicker.changePhoto": "📷 Змінити фото",
    "avatarPicker.onlyImages": "Тільки зображення",
    "avatarPicker.maxSize": "Максимальний розмір файлу 2MB",
    "avatarUpload.chooseFile": "Вибрати файл",
    "avatarUpload.upload": "Завантажити",
    "avatarUpload.uploading": "Завантаження...",
    "avatarUpload.remove": "Видалити",
    "avatarUpload.noImage": "Немає зображення",
    "avatarUpload.invalidType": "Тільки зображення дозволені",
    "avatarUpload.tooLarge": "Файл занадто великий. Максимум 1MB",
    "avatarUpload.unsupportedFormat":
      "Непідтримуваний формат. Використовуйте JPEG, PNG або WebP",
    "avatarUpload.supportedFormats": "Підтримувані формати: JPEG, PNG, WebP",
    "avatarUpload.maxSize": "Максимальний розмір файлу: 1MB",
    "avatarUpload.tooLargeBase64":
      "Зображення занадто велике для зберігання. Спробуйте зменшити розмір або якість.",
  },
  de: {
    "nav.home": "Startseite",
    "nav.notes": "Notizen",
    "nav.profile": "Profil",
    "nav.about": "Über uns",
    "hero.title": "Willkommen bei NoteHub",
    "hero.subtitle":
      "Eine moderne Plattform zur Verwaltung Ihrer persönlichen Notizen",
    "hero.getStarted": "Loslegen",
    "hero.learnMore": "Mehr erfahren",
    "features.title": "Warum NoteHub?",
    "features.easyToUse": "Einfach zu bedienen",
    "features.easyToUseDesc":
      "Intuitive Benutzeroberfläche für schnelles Erstellen und Bearbeiten von Notizen",
    "features.tagOrganization": "Tag-Organisation",
    "features.tagOrganizationDesc":
      "Kategorisieren Sie Notizen mit Tags für bessere Organisation und Suche",
    "features.quickSearch": "Schnelle Suche",
    "features.quickSearchDesc":
      "Finden Sie die benötigten Informationen in Sekunden mit leistungsstarker Suche",
    "features.dataSecurity": "Datensicherheit",
    "features.dataSecurityDesc":
      "Ihre Notizen sind geschützt und nur für Sie zugänglich",
    "stats.title": "NoteHub in Zahlen",
    "stats.security": "Sicherheit",
    "stats.availability": "Verfügbarkeit",
    "stats.categories": "Kategorien",
    "stats.notes": "Notizen",
    "cta.title": "Bereit zu starten?",
    "cta.description":
      "Schließen Sie sich Tausenden von Benutzern an, die ihre Gedanken bereits mit NoteHub organisiert haben",
    "cta.createNote": "Erste Notiz erstellen",
    "about.title": "Über die NoteHub-Plattform",
    "about.whatIs": "Was ist NoteHub?",
    "about.whatIsDesc":
      "NoteHub ist eine moderne Plattform zur Verwaltung persönlicher Notizen, entwickelt für Benutzer, die Einfachheit und Effizienz im Alltag schätzen.",
    "about.keyFeatures": "Hauptfunktionen",
    "about.noteCreation": "Notizen erstellen",
    "about.noteCreationDesc":
      "Erstellen und bearbeiten Sie Notizen schnell mit Rich-Text-Formatierung",
    "about.searchFiltering": "Suche & Filterung",
    "about.searchFilteringDesc":
      "Finden Sie die benötigten Notizen mit Suche und Filterung",
    "about.personalProfile": "Persönliches Profil",
    "about.personalProfileDesc":
      "Verwalten Sie Ihr Profil und Ihre Einstellungen",
    "about.technologies": "Technologien",
    "about.technologiesDesc":
      "NoteHub basiert auf einem modernen Technologie-Stack:",
    "about.security": "Sicherheit",
    "about.securityDesc":
      "Ihre Daten sind durch moderne Authentifizierungs- und Autorisierungsmethoden geschützt. Alle Notizen werden sicher gespeichert und sind nur für Sie zugänglich.",
    "about.developer": "Entwickler",
    "about.developerDesc":
      "NoteHub wird von Yevhen Shymka als Demonstration moderner Ansätze zur Webanwendungsentwicklung entwickelt.",
    "notes.title": "Notizenverwaltung",
    "notes.subtitle":
      "Organisieren Sie Ihre Gedanken und Ideen mit leistungsstarken NoteHub-Tools",
    "notes.featuresTitle": "Funktionen für die Arbeit mit Notizen",
    "notes.creationEditing": "Erstellung & Bearbeitung",
    "notes.creationEditingDesc":
      "Erstellen Sie schnell neue Notizen mit Rich-Text-Formatierung und praktischem Editor",
    "notes.categorization": "Kategorisierung",
    "notes.categorizationDesc":
      "Organisieren Sie Notizen mit Tags: Todo, Work, Personal, Meeting, Shopping",
    "notes.searchFiltering": "Suche & Filterung",
    "notes.searchFilteringDesc":
      "Finden Sie die benötigten Notizen mit leistungsstarker Suche und Filterung",
    "notes.responsiveDesign": "Responsives Design",
    "notes.responsiveDesignDesc":
      "Arbeiten Sie mit Notizen auf jedem Gerät mit optimierter Benutzeroberfläche",
    "notes.readyToStart": "Bereit zu starten?",
    "notes.ctaText":
      "Melden Sie sich an oder registrieren Sie sich, um Zugang zu allen Funktionen zu erhalten",
    "notes.signIn": "Anmelden",
    "notes.signUp": "Registrieren",
    "notes.examplesTitle": "Verwendungsbeispiele",
    "notes.todoLists": "Todo-Listen",
    "notes.todoListsDesc":
      "Erstellen Sie Aufgabenlisten und verfolgen Sie deren Abschluss",
    "notes.workNotes": "Arbeitsnotizen",
    "notes.workNotesDesc":
      "Speichern Sie wichtige Arbeitsinformationen und Projekte",
    "notes.meetings": "Besprechungen",
    "notes.meetingsDesc": "Notieren Sie Besprechungspläne und wichtige Punkte",
    "notes.shopping": "Einkaufen",
    "notes.shoppingDesc": "Führen Sie Einkaufslisten und planen Sie Ausgaben",
    "notes.allNotes": "Alle Notizen",
    "tags.todo": "Aufgaben",
    "tags.personal": "Persönlich",
    "tags.meeting": "Besprechungen",
    "tags.work": "Arbeit",
    "tags.shopping": "Einkaufen",
    "profile.title": "Benutzerprofil",
    "profile.editProfile": "Profil bearbeiten",
    "profile.contactInfo": "Kontaktinformationen",
    "profile.accountInfo": "Kontoinformationen",
    "profile.registrationDate": "Registrierungsdatum:",
    "profile.lastUpdated": "Zuletzt aktualisiert:",
    "profile.myNotes": "Meine Notizen",
    "profile.createNote": "Notiz erstellen",
    "noteCard.view": "Anzeigen",
    "noteCard.delete": "Löschen",
    "noteCard.deleting": "Wird gelöscht...",
    "noteCard.created": "Erstellt:",
    "noteCard.updated": "Aktualisiert:",
    "noteCard.deleteConfirm":
      "Sind Sie sicher, dass Sie diese Notiz löschen möchten?",
    "auth.signIn": "Anmelden",
    "auth.signUp": "Registrieren",

    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.emailPlaceholder": "Geben Sie Ihre E-Mail ein",
    "auth.passwordPlaceholder": "Geben Sie Ihr Passwort ein",
    "auth.logIn": "Anmelden",
    "auth.loggingIn": "Anmeldung...",
    "auth.register": "Registrieren",
    "auth.registering": "Registrierung...",
    "auth.noAccount": "Haben Sie kein Konto?",
    "auth.haveAccount": "Haben Sie bereits ein Konto?",
    "avatarPicker.choosePhoto": "📷 Foto auswählen",
    "avatarPicker.changePhoto": "📷 Foto ändern",
    "avatarPicker.onlyImages": "Nur Bilder",
    "avatarPicker.maxSize": "Maximale Dateigröße 2MB",
    "avatarUpload.chooseFile": "Datei auswählen",
    "avatarUpload.upload": "Hochladen",
    "avatarUpload.uploading": "Wird hochgeladen...",
    "avatarUpload.remove": "Entfernen",
    "avatarUpload.noImage": "Kein Bild",
    "avatarUpload.invalidType": "Nur Bilddateien sind erlaubt",
    "avatarUpload.tooLarge": "Datei zu groß. Maximum 1MB erlaubt",
    "avatarUpload.unsupportedFormat":
      "Nicht unterstütztes Format. Verwenden Sie JPEG, PNG oder WebP",
    "avatarUpload.supportedFormats": "Unterstützte Formate: JPEG, PNG, WebP",
    "avatarUpload.maxSize": "Maximale Dateigröße: 1MB",
    "avatarUpload.tooLargeBase64":
      "Bild zu groß für Speicherung. Versuchen Sie, die Größe oder Qualität zu reduzieren.",
  },
  ru: {
    "nav.home": "Главная",
    "nav.notes": "Заметки",
    "nav.profile": "Профиль",
    "nav.about": "О платформе",
    "hero.title": "Добро пожаловать в NoteHub",
    "hero.subtitle":
      "Современная платформа для управления вашими личными заметками",
    "hero.getStarted": "Начать работу",
    "hero.learnMore": "Узнать больше",
    "features.title": "Почему NoteHub?",
    "features.easyToUse": "Простота использования",
    "features.easyToUseDesc":
      "Интуитивно понятный интерфейс для быстрого создания и редактирования заметок",
    "features.tagOrganization": "Организация по тегам",
    "features.tagOrganizationDesc":
      "Категоризируйте заметки с помощью тегов для лучшей организации и поиска",
    "features.quickSearch": "Быстрый поиск",
    "features.quickSearchDesc":
      "Находите нужную информацию за секунды с помощью мощного поиска",
    "features.dataSecurity": "Безопасность данных",
    "features.dataSecurityDesc": "Ваши заметки защищены и доступны только вам",
    "stats.title": "NoteHub в цифрах",
    "stats.security": "Безопасность",
    "stats.availability": "Доступность",
    "stats.categories": "Категорий",
    "stats.notes": "Заметок",
    "cta.title": "Готовы начать?",
    "cta.description":
      "Присоединяйтесь к тысячам пользователей, которые уже организовали свои мысли с NoteHub",
    "cta.createNote": "Создать первую заметку",
    "about.title": "О платформе NoteHub",
    "about.whatIs": "Что такое NoteHub?",
    "about.whatIsDesc":
      "NoteHub - это современная платформа для управления личными заметками, разработанная с учетом потребностей пользователей, которые ценят простоту и эффективность в повседневной жизни.",
    "about.keyFeatures": "Основные возможности",
    "about.noteCreation": "Создание заметок",
    "about.noteCreationDesc":
      "Быстро создавайте и редактируйте заметки с богатым текстовым форматированием",
    "about.searchFiltering": "Поиск и фильтрация",
    "about.searchFilteringDesc":
      "Находите нужные заметки с помощью поиска и фильтров",
    "about.personalProfile": "Личный профиль",
    "about.personalProfileDesc": "Управляйте своим профилем и настройками",
    "about.technologies": "Технологии",
    "about.technologiesDesc":
      "NoteHub построен на современном технологическом стеке:",
    "about.security": "Безопасность",
    "about.securityDesc":
      "Ваши данные защищены современными методами аутентификации и авторизации. Все заметки хранятся безопасно и доступны только вам.",
    "about.developer": "Разработчик",
    "about.developerDesc":
      "NoteHub разработан Евгением Шимкой как демонстрация современных подходов к разработке веб-приложений.",
    "notes.title": "Управление заметками",
    "notes.subtitle":
      "Организуйте свои мысли и идеи с помощью мощных инструментов NoteHub",
    "notes.featuresTitle": "Возможности для работы с заметками",
    "notes.creationEditing": "Создание и редактирование",
    "notes.creationEditingDesc":
      "Быстро создавайте новые заметки с богатым текстовым форматированием и удобным редактором",
    "notes.categorization": "Категоризация",
    "notes.categorizationDesc":
      "Организуйте заметки с помощью тегов: Todo, Work, Personal, Meeting, Shopping",
    "notes.searchFiltering": "Поиск и фильтрация",
    "notes.searchFilteringDesc":
      "Находите нужные заметки с помощью мощного поиска и фильтрации",
    "notes.responsiveDesign": "Адаптивный дизайн",
    "notes.responsiveDesignDesc":
      "Работайте с заметками на любом устройстве с оптимизированным интерфейсом",
    "notes.readyToStart": "Готовы начать?",
    "notes.ctaText":
      "Войдите в систему или зарегистрируйтесь, чтобы получить доступ ко всем возможностям",
    "notes.signIn": "Войти",
    "notes.signUp": "Зарегистрироваться",
    "notes.examplesTitle": "Примеры использования",
    "notes.todoLists": "Списки задач",
    "notes.todoListsDesc":
      "Создавайте списки задач и отслеживайте их выполнение",
    "notes.workNotes": "Рабочие заметки",
    "notes.workNotesDesc": "Сохраняйте важную рабочую информацию и проекты",
    "notes.meetings": "Встречи",
    "notes.meetingsDesc": "Записывайте планы встреч и ключевые моменты",
    "notes.shopping": "Покупки",
    "notes.shoppingDesc": "Ведите списки покупок и планируйте расходы",
    "notes.allNotes": "Все заметки",
    "tags.todo": "Задачи",
    "tags.personal": "Личное",
    "tags.meeting": "Встречи",
    "tags.work": "Работа",
    "tags.shopping": "Покупки",
    "profile.title": "Профиль пользователя",
    "profile.editProfile": "Редактировать профиль",
    "profile.contactInfo": "Контактная информация",
    "profile.accountInfo": "Информация об аккаунте",
    "profile.registrationDate": "Дата регистрации:",
    "profile.lastUpdated": "Последнее обновление:",
    "profile.myNotes": "Мои заметки",
    "profile.createNote": "Создать заметку",
    "noteCard.view": "Просмотреть",
    "noteCard.delete": "Удалить",
    "noteCard.deleting": "Удаление...",
    "noteCard.created": "Создано:",
    "noteCard.updated": "Обновлено:",
    "noteCard.deleteConfirm": "Вы уверены, что хотите удалить эту заметку?",
    "auth.signIn": "Войти",
    "auth.signUp": "Зарегистрироваться",

    "auth.email": "Email",
    "auth.password": "Пароль",
    "auth.emailPlaceholder": "Введите ваш email",
    "auth.passwordPlaceholder": "Введите ваш пароль",
    "auth.logIn": "Войти",
    "auth.loggingIn": "Вход...",
    "auth.register": "Зарегистрироваться",
    "auth.registering": "Регистрация...",
    "auth.noAccount": "Нет аккаунта?",
    "auth.haveAccount": "Уже есть аккаунт?",
    "avatarPicker.choosePhoto": "📷 Выбрать фото",
    "avatarPicker.changePhoto": "📷 Изменить фото",
    "avatarPicker.onlyImages": "Только изображения",
    "avatarPicker.maxSize": "Максимальный размер файла 2MB",
    "avatarUpload.chooseFile": "Выбрать файл",
    "avatarUpload.upload": "Загрузить",
    "avatarUpload.uploading": "Загрузка...",
    "avatarUpload.remove": "Удалить",
    "avatarUpload.noImage": "Нет изображения",
    "avatarUpload.invalidType": "Только изображения разрешены",
    "avatarUpload.tooLarge": "Файл слишком большой. Максимум 1MB",
    "avatarUpload.unsupportedFormat":
      "Неподдерживаемый формат. Используйте JPEG, PNG или WebP",
    "avatarUpload.supportedFormats": "Поддерживаемые форматы: JPEG, PNG, WebP",
    "avatarUpload.maxSize": "Максимальный размер файла: 1MB",
    "avatarUpload.tooLargeBase64":
      "Изображение слишком большое для хранения. Попробуйте уменьшить размер или качество.",
  },
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
