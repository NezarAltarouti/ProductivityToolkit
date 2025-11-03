import { Sun, Moon, Globe } from "lucide-react";
import { useMemo } from "react";
import ServiceCard from "../components/ServiceCard";
import Header from "../components/Header";

const Home = ({
  navigateTo,
  darkMode,
  toggleDarkMode,
  language,
  toggleLanguage,
}) => {
  const quotes = useMemo(
    () => [
      {
        ar: "النجاح لا يأتي بين عشية وضحاها، بل هو ثمرة التخطيط والعمل الجاد",
        en: "Success does not come overnight, but is the fruit of planning and hard work",
        author: "مجهول / Unknown",
      },
      {
        ar: "الوقت هو أثمن ما نملكه في الحياة",
        en: "Time is the most precious thing we have in life",
        author: "مثل شعبي / Popular saying",
      },
      {
        ar: "من لم يخطط فقد خطط للفشل",
        en: "Those who fail to plan, plan to fail",
        author: "بنجامين فرانكلين / Benjamin Franklin",
      },
      {
        ar: "كل يوم جديد هو فرصة جديدة للنجاح",
        en: "Each new day is a new opportunity for success",
        author: "رالف مارستون / Ralph Marston",
      },
      {
        ar: "الأشياء العظيمة لا تحدث بالصدفة، بل بالتخطيط والعمل المستمر",
        en: "Great things never come from comfort zones",
        author: "أوبرا وينفري / Oprah Winfrey",
      },
      {
        ar: "لا تنتظر الفرصة المثالية، بل اصنعها بنفسك",
        en: "Don't wait for opportunity, create it",
        author: "مجهول / Unknown",
      },
      {
        ar: "التركيز على مهمة واحدة أفضل من تشتت الانتباه بألف مهمة",
        en: "Focus on one task at a time is better than thousand scattered tasks",
        author: "مجهول / Unknown",
      },
      {
        ar: "الإنجاز يبدأ برغبة قوية وتصميم ثابت",
        en: "Achievement starts with a strong desire and firm determination",
        author: "مجهول / Unknown",
      },
      {
        ar: "كل دقيقة تنفقها بحكمة هي استثمار في مستقبلك",
        en: "Every minute you spend wisely is an investment in your future",
        author: "مجهول / Unknown",
      },
      {
        ar: "النجاح ليس الوصول إلى الهدف، بل الطريق الذي تسلكه للوصول إليه",
        en: "Success is not reaching the goal, but the journey you take to reach it",
        author: "مجهول / Unknown",
      },
      {
        ar: "الانضباط هو الفرق بين من يحلم وبين من ينجح",
        en: "Discipline is the difference between dreamers and achievers",
        author: "مجهول / Unknown",
      },
      {
        ar: "إدارة وقتك بذكاء تعني إدارة حياتك بذكاء",
        en: "Managing your time wisely means managing your life wisely",
        author: "مجهول / Unknown",
      },
      {
        ar: "لا تؤجل ما يمكن أن تفعله اليوم إلى غد",
        en: "Don't postpone what you can do today until tomorrow",
        author: "بنجامين فرانكلين / Benjamin Franklin",
      },
      {
        ar: "الأولويات الواضحة تقودك إلى الإنجازات الحقيقية",
        en: "Clear priorities lead you to real achievements",
        author: "مجهول / Unknown",
      },
      {
        ar: "كل خطوة صغيرة نحو هدفك هي انتصار تستحق الاحتفال",
        en: "Every small step towards your goal is a victory worth celebrating",
        author: "مجهول / Unknown",
      },
      {
        ar: "المثابرة والاستمرار أهم من السرعة",
        en: "Persistence and consistency are more important than speed",
        author: "مجهول / Unknown",
      },
      {
        ar: "أنت المسؤول الوحيد عن إنجازاتك وفشلك",
        en: "You are the only person responsible for your success and failure",
        author: "مجهول / Unknown",
      },
      {
        ar: "الحياة المنظمة هي حياة ناجحة",
        en: "An organized life is a successful life",
        author: "مجهول / Unknown",
      },
      {
        ar: "ابدأ الآن ولا تنتظر الوقت المناسب، فالوقت المناسب هو الآن",
        en: "Start now and don't wait for the right time, the right time is now",
        author: "مجهول / Unknown",
      },
      {
        ar: "الأهداف الواضحة والخطط المحددة هي طريق النجاح الحقيقي",
        en: "Clear goals and specific plans are the true path to success",
        author: "مجهول / Unknown",
      },
    ],
    []
  );

  // Memoize the current quote selection so it doesn't change on re-renders
  const currentQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [quotes]);

  const services = [
    {
      id: "eisenhower",
      arName: "مصفوفة أيزنهاور",
      enName: "Eisenhower Matrix",
      arDescription: "نظم أولوياتك بحكمة",
      enDescription: "Organize your priorities wisely",
      icon: "📊",
    },
    {
      id: "pomodoro",
      arName: "تقنية بومودورو",
      enName: "Pomodoro Technique",
      arDescription: "أتقن إدارة وقتك",
      enDescription: "Master time management",
      icon: "⏱️",
    },
    {
      id: "todo",
      arName: "قائمة المهام",
      enName: "To-do List",
      arDescription: "تابع مهامك اليومية",
      enDescription: "Track your daily tasks",
      icon: "✓",
    },
    {
      id: "notes",
      arName: "الملاحظات",
      enName: "Notes",
      arDescription: "احفظ أفكارك المهمة",
      enDescription: "Save your important ideas",
      icon: "📝",
    },
    {
      id: "swot",
      arName: "نموذج SWOT",
      enName: "SWOT Model",
      arDescription: "حلل نقاط قوتك وضعفك",
      enDescription: "Analyze your strengths and weaknesses",
      icon: "🎯",
    },
  ];

  const texts = {
    ar: {
      welcome: "مرحبا بك في مساعدك الشخصي",
      subtitle: "تطبيق شامل لإدارة وقتك وأولوياتك وتطويرك الشخصي",
      quote: "الاقتباس اليومي",
      services: "خدماتنا",
      allServices: "استكشف جميع الخدمات المتاحة",
    },
    en: {
      welcome: "Welcome to Your Personal Assistant",
      subtitle:
        "A comprehensive app to manage your time, priorities, and personal development",
      quote: "Daily Quote",
      services: "Our Services",
      allServices: "Explore all available services",
    },
  };

  const t = texts[language];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
      }`}
    >
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
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.welcome}
            </h1>
            <p
              className={`text-lg md:text-xl mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Quote Section - Fixed Height Container */}
          <div
            className={`mb-16 md:mb-20 p-8 md:p-12 lg:p-16 rounded-3xl shadow-lg backdrop-blur-sm min-h-[280px] md:min-h-[320px] flex flex-col justify-center ${
              darkMode
                ? "bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/50"
                : "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200"
            }`}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center ${
                darkMode ? "text-indigo-300" : "text-blue-600"
              }`}
            >
              ✨ {t.quote}
            </h2>
            <p
              className={`text-xl md:text-3xl lg:text-4xl italic mb-6 md:mb-8 text-center leading-relaxed font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              "{language === "ar" ? currentQuote.ar : currentQuote.en}"
            </p>
            <p
              className={`text-lg md:text-xl text-right md:text-center font-semibold ${
                darkMode ? "text-indigo-400" : "text-blue-700"
              }`}
            >
              — {currentQuote.author}
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <div className="text-center mb-8 md:mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t.services}
              </h2>
              <p
                className={`text-base md:text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t.allServices}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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
      <footer
        className={`mt-16 py-8 border-t ${
          darkMode
            ? "border-gray-700 bg-gray-900/50"
            : "border-gray-200 bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Developed by Text - Bold with LinkedIn Link */}
          <div
            className={`text-center text-sm md:text-base mb-6 font-bold ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span>
                {language === "ar"
                  ? "طور من قبل نزار التاروتي"
                  : "Developed by Nezar Altarouti"}
              </span>
              <a
                href="https://www.linkedin.com/in/nezaraltarouti/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-110 inline-flex items-center ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
                title={language === "ar" ? "ملف ليندكن الشخصي" : "LinkedIn Profile"}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L1 10m6-6l6 6m6-6v12m0 0l6-6m-6 6l-6-6"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 md:gap-8 mb-4">
            {/* Website Link with Diagonal Arrow */}
            <a
              href="https://sf.iau.edu.sa/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "text-gray-400 hover:text-indigo-400"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              title={language === "ar" ? "الموقع الإلكتروني" : "Website"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/company/studentfellowship/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "text-gray-400 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>

            {/* X (Twitter) Link */}
            <a
              href="https://x.com/sf_fellowship?t=R9rZdbDy9yHWZaCnjpXbHA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="X"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.104-6.66-5.835 6.66H2.556l7.73-8.835L1.75 2.25h6.822l4.607 6.114 5.289-6.114zM16.777 19.932h1.833L5.946 4.046H4.033l12.744 15.886z" />
              </svg>
            </a>
          </div>

          {/* Social Media Text - NOT Bold */}
          <p
            className={`text-center text-sm md:text-base ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {language === "ar"
              ? "وسائل التواصل الاجتماعي لبرنامج الزمالة الطلابية"
              : "Social Media for Student Fellowship Program"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;