import { Sun, Moon, Globe } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import Header from '../components/Header'

const Home = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const quotes = [
    {
      ar: 'النجاح لا يأتي بين عشية وضحاها، بل هو ثمرة التخطيط والعمل الجاد',
      en: 'Success does not come overnight, but is the fruit of planning and hard work',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'الوقت هو أثمن ما نملكه في الحياة',
      en: 'Time is the most precious thing we have in life',
      author: 'مثل شعبي / Popular saying',
    },
    {
      ar: 'من لم يخطط فقد خطط للفشل',
      en: 'Those who fail to plan, plan to fail',
      author: 'بنجامين فرانكلين / Benjamin Franklin',
    },
    {
      ar: 'كل يوم جديد هو فرصة جديدة للنجاح',
      en: 'Each new day is a new opportunity for success',
      author: 'رالف مارستون / Ralph Marston',
    },
  ]

  const currentQuote = quotes[Math.floor(Math.random() * quotes.length)]

  const services = [
    {
      id: 'eisenhower',
      arName: 'مصفوفة أيزنهاور',
      enName: 'Eisenhower Matrix',
      arDescription: 'نظم أولوياتك بحكمة',
      enDescription: 'Organize your priorities wisely',
      icon: '📊',
    },
    {
      id: 'pomodoro',
      arName: 'تقنية بومودورو',
      enName: 'Pomodoro Technique',
      arDescription: 'أتقن إدارة وقتك',
      enDescription: 'Master time management',
      icon: '⏱️',
    },
    {
      id: 'todo',
      arName: 'قائمة المهام',
      enName: 'To-do List',
      arDescription: 'تابع مهامك اليومية',
      enDescription: 'Track your daily tasks',
      icon: '✓',
    },
    {
      id: 'schedule',
      arName: 'إنشاء جدول',
      enName: 'Create Schedule',
      arDescription: 'خطط يومك بكفاءة',
      enDescription: 'Plan your day efficiently',
      icon: '📅',
    },
    {
      id: 'notes',
      arName: 'الملاحظات',
      enName: 'Notes',
      arDescription: 'احفظ أفكارك المهمة',
      enDescription: 'Save your important ideas',
      icon: '📝',
    },
    {
      id: 'swot',
      arName: 'نموذج SWOT',
      enName: 'SWOT Model',
      arDescription: 'حلل نقاط قوتك وضعفك',
      enDescription: 'Analyze your strengths and weaknesses',
      icon: '🎯',
    },
    {
      id: 'johari',
      arName: 'نافذة جوهاري',
      enName: 'Johari Window',
      arDescription: 'فهم ذاتك بشكل أعمق',
      enDescription: 'Understand yourself better',
      icon: '🪟',
    },
  ]

  const texts = {
    ar: {
      welcome: 'مرحبا بك في مساعدك الشخصي',
      subtitle: 'تطبيق شامل لإدارة وقتك وأولوياتك وتطويرك الشخصي',
      quote: 'الاقتباس اليومي',
      services: 'خدماتنا',
      allServices: 'استكشف جميع الخدمات المتاحة',
    },
    en: {
      welcome: 'Welcome to Your Personal Assistant',
      subtitle: 'A comprehensive app to manage your time, priorities, and personal development',
      quote: 'Daily Quote',
      services: 'Our Services',
      allServices: 'Explore all available services',
    },
  }

  const t = texts[language]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* Hero Section */}
      <div className="pt-16 md:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.welcome}
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.subtitle}
            </p>
          </div>

          {/* Quote Section - Fixed Height Container */}
          <div className={`mb-16 md:mb-20 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm min-h-[180px] flex flex-col justify-center ${
            darkMode
              ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/50'
              : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200'
          }`}>
            <h2 className={`text-lg md:text-xl font-bold mb-4 text-center ${
              darkMode ? 'text-indigo-300' : 'text-blue-600'
            }`}>
              ✨ {t.quote}
            </h2>
            <p className={`text-base md:text-lg italic mb-4 text-center leading-relaxed ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              "{language === 'ar' ? currentQuote.ar : currentQuote.en}"
            </p>
            <p className={`text-right md:text-center font-semibold ${
              darkMode ? 'text-indigo-400' : 'text-blue-700'
            }`}>
              — {currentQuote.author}
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.services}
              </h2>
              <p className={`text-base md:text-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.allServices}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  navigateTo={navigateTo}
                  darkMode={darkMode}
                  language={language}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-8 border-t ${
        darkMode
          ? 'border-gray-700 bg-gray-900/50'
          : 'border-gray-200 bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm md:text-base ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {language === 'ar'
              ? '© 2024 مساعدك الشخصي. جميع الحقوق محفوظة.'
              : '© 2024 Your Personal Assistant. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home