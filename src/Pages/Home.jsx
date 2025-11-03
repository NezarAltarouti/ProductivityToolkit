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
    {
      ar: 'الأشياء العظيمة لا تحدث بالصدفة، بل بالتخطيط والعمل المستمر',
      en: 'Great things never come from comfort zones',
      author: 'أوبرا وينفري / Oprah Winfrey',
    },
    {
      ar: 'لا تنتظر الفرصة المثالية، بل اصنعها بنفسك',
      en: 'Don\'t wait for opportunity, create it',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'التركيز على مهمة واحدة أفضل من تشتت الانتباه بألف مهمة',
      en: 'Focus on one task at a time is better than thousand scattered tasks',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'الإنجاز يبدأ برغبة قوية وتصميم ثابت',
      en: 'Achievement starts with a strong desire and firm determination',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'كل دقيقة تنفقها بحكمة هي استثمار في مستقبلك',
      en: 'Every minute you spend wisely is an investment in your future',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'النجاح ليس الوصول إلى الهدف، بل الطريق الذي تسلكه للوصول إليه',
      en: 'Success is not reaching the goal, but the journey you take to reach it',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'الانضباط هو الفرق بين من يحلم وبين من ينجح',
      en: 'Discipline is the difference between dreamers and achievers',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'إدارة وقتك بذكاء تعني إدارة حياتك بذكاء',
      en: 'Managing your time wisely means managing your life wisely',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'لا تؤجل ما يمكن أن تفعله اليوم إلى غد',
      en: 'Don\'t postpone what you can do today until tomorrow',
      author: 'بنجامين فرانكلين / Benjamin Franklin',
    },
    {
      ar: 'الأولويات الواضحة تقودك إلى الإنجازات الحقيقية',
      en: 'Clear priorities lead you to real achievements',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'كل خطوة صغيرة نحو هدفك هي انتصار تستحق الاحتفال',
      en: 'Every small step towards your goal is a victory worth celebrating',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'المثابرة والاستمرار أهم من السرعة',
      en: 'Persistence and consistency are more important than speed',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'أنت المسؤول الوحيد عن إنجازاتك وفشلك',
      en: 'You are the only person responsible for your success and failure',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'الحياة المنظمة هي حياة ناجحة',
      en: 'An organized life is a successful life',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'ابدأ الآن ولا تنتظر الوقت المناسب، فالوقت المناسب هو الآن',
      en: 'Start now and don\'t wait for the right time, the right time is now',
      author: 'مجهول / Unknown',
    },
    {
      ar: 'الأهداف الواضحة والخطط المحددة هي طريق النجاح الحقيقي',
      en: 'Clear goals and specific plans are the true path to success',
      author: 'مجهول / Unknown',
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
          <div className={`mb-16 md:mb-20 p-8 md:p-12 lg:p-16 rounded-3xl shadow-lg backdrop-blur-sm min-h-[280px] md:min-h-[320px] flex flex-col justify-center ${
            darkMode
              ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/50'
              : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200'
          }`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center ${
              darkMode ? 'text-indigo-300' : 'text-blue-600'
            }`}>
              ✨ {t.quote}
            </h2>
            <p className={`text-xl md:text-3xl lg:text-4xl italic mb-6 md:mb-8 text-center leading-relaxed font-medium ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              "{language === 'ar' ? currentQuote.ar : currentQuote.en}"
            </p>
            <p className={`text-lg md:text-xl text-right md:text-center font-semibold ${
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