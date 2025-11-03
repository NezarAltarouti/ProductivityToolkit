import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

const WelcomeAnimation = ({ onComplete, darkMode, language }) => {
  const [phase, setPhase] = useState(0)

  const messages = {
    ar: [
      'مرحبا بك! 👋',
      'استعد لتحقيق أحلامك 🎯',
      'الآن حان الوقت للنجاح ⭐',
    ],
    en: [
      'Welcome! 👋',
      'Get ready to achieve your dreams 🎯',
      'Your success starts now ⭐',
    ],
  }

  const currentMessages = messages[language]

  // Trigger animation phases with balanced timing
  useEffect(() => {
    if (phase < 3) {
      const timer = setTimeout(() => {
        setPhase(phase + 1)
      }, 1100) // Balanced timing
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        onComplete()
      }, 900) // Final fade out
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1200 ${
        phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-pulse ${
              darkMode ? 'bg-indigo-500' : 'bg-blue-400'
            }`}
            style={{
              width: `${150 + i * 100}px`,
              height: `${150 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Icon animation */}
        <div
          className={`mb-8 inline-block ${
            phase >= 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          } transition-all duration-800 ease-out`}
        >
          <div
            className={`relative w-24 h-24 flex items-center justify-center rounded-full ${
              darkMode
                ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}
            style={{
              animation: phase >= 0 ? 'bounce 1s ease-in-out infinite' : 'none',
            }}
          >
            <Sparkles size={40} className="text-white" />
          </div>
        </div>

        {/* Message animation */}
        <div className="mb-8 h-20 flex items-center justify-center">
          {phase > 0 && (
            <div
              className={`text-3xl md:text-5xl font-bold transition-all duration-800 ${
                phase > 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              } ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {currentMessages[phase - 1]}
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {currentMessages.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-600 ${
                i < phase
                  ? darkMode
                    ? 'bg-indigo-500 w-8'
                    : 'bg-blue-500 w-8'
                  : darkMode
                  ? 'bg-gray-600 w-2'
                  : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>

        {/* Motivational tagline */}
        <p
          className={`mt-8 text-sm md:text-base font-semibold transition-all duration-800 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${darkMode ? 'text-indigo-300' : 'text-blue-600'}`}
        >
          {language === 'ar'
            ? '✨ دع النجاح يبدأ الآن ✨'
            : '✨ Let success begin now ✨'}
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </div>
  )
}

export default WelcomeAnimation