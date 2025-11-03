const ServiceCard = ({ service, navigateTo, darkMode, language }) => {
  return (
    <button
      onClick={() => navigateTo(service.id)}
      className={`group relative p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 hover:border-indigo-500 text-white'
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-500 text-gray-900'
      }`}
    >
      {/* Background Animation */}
      <div className={`absolute inset-0 ${
        darkMode
          ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20'
          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-5xl md:text-6xl mb-4">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-left">
          {language === 'ar' ? service.arName : service.enName}
        </h3>

        {/* Description */}
        <p className={`text-sm md:text-base mb-4 text-left leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'ar' ? service.arDescription : service.enDescription}
        </p>

        {/* Arrow */}
        <div className={`inline-block px-4 py-2 rounded-lg transition-all duration-300 ${
          darkMode
            ? 'bg-indigo-600/30 group-hover:bg-indigo-600 text-indigo-300 group-hover:text-white'
            : 'bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white'
        }`}>
          <span className="font-semibold text-sm md:text-base">
            {language === 'ar' ? '→' : '←'}
          </span>
        </div>
      </div>

      {/* Border Animation */}
      <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        darkMode ? 'border-indigo-500' : 'border-blue-400'
      }`} />
    </button>
  )
}

export default ServiceCard