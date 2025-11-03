import Header from '../components/Header'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CreateSchedule = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const texts = {
    ar: {
      title: 'إنشاء جدول',
      description: 'قريبا...',
      backHome: 'العودة للرئيسية',
    },
    en: {
      title: 'Create Schedule',
      description: 'Coming Soon...',
      backHome: 'Back to Home',
    },
  }

  const t = texts[language]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.description}
            </p>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className={`mt-8 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              darkMode
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {language === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            {t.backHome}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSchedule