import { useState, useEffect, useCallback, memo, useRef } from 'react'
import Header from '../components/Header'
import { ArrowLeft, ArrowRight, Trash2, Plus } from 'lucide-react'

// Memoized SWOT Card Component
const SWOTCard = memo(({
  title,
  description,
  bgColor,
  borderColor,
  items,
  inputValue,
  onInputChange,
  onAddItem,
  onDeleteItem,
  onClearAll,
  darkMode,
  placeholder,
  noItemsText,
  clearAllText
}) => {
  return (
    <div className={`p-6 rounded-2xl border-2 ${borderColor} transition-all duration-300 ${bgColor}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAddItem()
            }
          }}
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 rounded-lg outline-none transition-all duration-200 text-sm ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
              : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
          }`}
        />
        <button
          onClick={onAddItem}
          className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-1 ${
            darkMode
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Items List */}
      <div className="mb-3 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <p className={`text-center py-8 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {noItemsText}
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={`p-3 rounded-lg flex items-center justify-between gap-2 transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white/50 hover:bg-white'
                }`}
              >
                <span className={`flex-1 text-sm break-words`}>
                  {item.text}
                </span>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className={`p-2 rounded transition-all duration-200 flex-shrink-0 ${
                    darkMode
                      ? 'text-red-400 hover:bg-red-600/20'
                      : 'text-red-600 hover:bg-red-100'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear All Button */}
      {items.length > 0 && (
        <button
          onClick={onClearAll}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            darkMode
              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          {clearAllText}
        </button>
      )}
    </div>
  )
})

SWOTCard.displayName = 'SWOTCard'

const SWOTModel = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [items, setItems] = useState({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  })

  const [inputValues, setInputValues] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const inputValuesRef = useRef(inputValues)

  // Update ref whenever inputValues changes
  useEffect(() => {
    inputValuesRef.current = inputValues
  }, [inputValues])

  // Load items and input values from localStorage on mount ONLY
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('swotItems')
      const savedInputs = localStorage.getItem('swotInputs')

      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }

      if (savedInputs) {
        setInputValues(JSON.parse(savedInputs))
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
    }

    setIsLoaded(true)
  }, [])

  // Save items to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('swotItems', JSON.stringify(items))
      } catch (error) {
        console.error('Error saving items:', error)
      }
    }
  }, [items, isLoaded])

  // Save input values to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('swotInputs', JSON.stringify(inputValues))
      } catch (error) {
        console.error('Error saving inputs:', error)
      }
    }
  }, [inputValues, isLoaded])

  const texts = {
    ar: {
      title: 'نموذج SWOT',
      description: 'حلل نقاط قوتك وضعفك والفرص والتهديدات',
      strengths: 'نقاط القوة',
      strengthsDesc: 'المميزات والإمكانيات الخاصة بك',
      weaknesses: 'نقاط الضعف',
      weaknessesDesc: 'الجوانب التي تحتاج تحسين',
      opportunities: 'الفرص',
      opportunitiesDesc: 'الإمكانيات المتاحة في السوق',
      threats: 'التهديدات',
      threatsDesc: 'التحديات والمخاطر المحتملة',
      placeholder: 'أدخل عنصراً جديداً...',
      backHome: 'العودة للرئيسية',
      noItems: 'لا توجد عناصر',
      clearAll: 'حذف الكل',
      addItem: 'إضافة عنصر',
      analysis: 'التحليل',
      summary: 'ملخص التحليل',
      totalItems: 'إجمالي العناصر',
      strongPoints: 'نقاط قوة',
      weakPoints: 'نقاط ضعف',
      opportunities_label: 'فرص',
      threats_label: 'تهديدات',
    },
    en: {
      title: 'SWOT Model',
      description: 'Analyze your strengths, weaknesses, opportunities, and threats',
      strengths: 'Strengths',
      strengthsDesc: 'Your advantages and capabilities',
      weaknesses: 'Weaknesses',
      weaknessesDesc: 'Areas that need improvement',
      opportunities: 'Opportunities',
      opportunitiesDesc: 'Available market possibilities',
      threats: 'Threats',
      threatsDesc: 'Challenges and potential risks',
      placeholder: 'Enter a new item...',
      backHome: 'Back to Home',
      noItems: 'No items',
      clearAll: 'Clear All',
      addItem: 'Add Item',
      analysis: 'Analysis',
      summary: 'Analysis Summary',
      totalItems: 'Total Items',
      strongPoints: 'Strengths',
      weakPoints: 'Weaknesses',
      opportunities_label: 'Opportunities',
      threats_label: 'Threats',
    },
  }

  const t = texts[language]

  // Memoized callback for input changes
  const handleInputChange = useCallback((category, value) => {
    setInputValues(prev => ({
      ...prev,
      [category]: value
    }))
  }, [])

  // Fixed callback for adding items - using ref to avoid closure issues
  const handleAddItem = useCallback((category) => {
    const itemText = inputValuesRef.current[category].trim()

    if (itemText === '') {
      return
    }

    // Add item
    setItems(prevItems => ({
      ...prevItems,
      [category]: [
        ...prevItems[category],
        {
          id: Date.now(),
          text: itemText,
        },
      ],
    }))

    // Clear input - separate state update
    setInputValues(prevInputs => ({
      ...prevInputs,
      [category]: '',
    }))
  }, [])

  // Memoized callback for deleting items
  const handleDeleteItem = useCallback((category, itemId) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId),
    }))
  }, [])

  // Memoized callback for clearing all items
  const handleClearAll = useCallback((category) => {
    setItems(prev => ({
      ...prev,
      [category]: [],
    }))
  }, [])

  // Clear everything
  const clearEverything = useCallback(() => {
    setItems({
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
    })
    setInputValues({
      strengths: '',
      weaknesses: '',
      opportunities: '',
      threats: '',
    })
  }, [])

  if (!isLoaded) {
    return null
  }

  // Calculate statistics
  const totalItems = items.strengths.length + items.weaknesses.length + items.opportunities.length + items.threats.length

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
            <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.description}
            </p>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Strengths - Green */}
            <SWOTCard
              title={t.strengths}
              description={t.strengthsDesc}
              bgColor={darkMode ? 'bg-green-950/20' : 'bg-green-50/50'}
              borderColor={darkMode ? 'border-green-700' : 'border-green-300'}
              items={items.strengths}
              inputValue={inputValues.strengths}
              onInputChange={(value) => handleInputChange('strengths', value)}
              onAddItem={() => handleAddItem('strengths')}
              onDeleteItem={(itemId) => handleDeleteItem('strengths', itemId)}
              onClearAll={() => handleClearAll('strengths')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noItemsText={t.noItems}
              clearAllText={t.clearAll}
            />

            {/* Weaknesses - Red */}
            <SWOTCard
              title={t.weaknesses}
              description={t.weaknessesDesc}
              bgColor={darkMode ? 'bg-red-950/20' : 'bg-red-50/50'}
              borderColor={darkMode ? 'border-red-700' : 'border-red-300'}
              items={items.weaknesses}
              inputValue={inputValues.weaknesses}
              onInputChange={(value) => handleInputChange('weaknesses', value)}
              onAddItem={() => handleAddItem('weaknesses')}
              onDeleteItem={(itemId) => handleDeleteItem('weaknesses', itemId)}
              onClearAll={() => handleClearAll('weaknesses')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noItemsText={t.noItems}
              clearAllText={t.clearAll}
            />

            {/* Opportunities - Blue */}
            <SWOTCard
              title={t.opportunities}
              description={t.opportunitiesDesc}
              bgColor={darkMode ? 'bg-blue-950/20' : 'bg-blue-50/50'}
              borderColor={darkMode ? 'border-blue-700' : 'border-blue-300'}
              items={items.opportunities}
              inputValue={inputValues.opportunities}
              onInputChange={(value) => handleInputChange('opportunities', value)}
              onAddItem={() => handleAddItem('opportunities')}
              onDeleteItem={(itemId) => handleDeleteItem('opportunities', itemId)}
              onClearAll={() => handleClearAll('opportunities')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noItemsText={t.noItems}
              clearAllText={t.clearAll}
            />

            {/* Threats - Orange */}
            <SWOTCard
              title={t.threats}
              description={t.threatsDesc}
              bgColor={darkMode ? 'bg-orange-950/20' : 'bg-orange-50/50'}
              borderColor={darkMode ? 'border-orange-700' : 'border-orange-300'}
              items={items.threats}
              inputValue={inputValues.threats}
              onInputChange={(value) => handleInputChange('threats', value)}
              onAddItem={() => handleAddItem('threats')}
              onDeleteItem={(itemId) => handleDeleteItem('threats', itemId)}
              onClearAll={() => handleClearAll('threats')}
              darkMode={darkMode}
              placeholder={t.placeholder}
              noItemsText={t.noItems}
              clearAllText={t.clearAll}
            />
          </div>

          {/* Analysis Summary */}
          <div
            className={`p-6 md:p-8 rounded-2xl mb-8 transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6">{t.summary}</h3>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div
                className={`p-4 rounded-xl text-center ${
                  darkMode
                    ? 'bg-green-900/30 border border-green-700'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {items.strengths.length}
                </p>
                <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.strongPoints}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  darkMode
                    ? 'bg-red-900/30 border border-red-700'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {items.weaknesses.length}
                </p>
                <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.weakPoints}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  darkMode
                    ? 'bg-blue-900/30 border border-blue-700'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {items.opportunities.length}
                </p>
                <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.opportunities_label}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  darkMode
                    ? 'bg-orange-900/30 border border-orange-700'
                    : 'bg-orange-50 border border-orange-200'
                }`}
              >
                <p className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {items.threats.length}
                </p>
                <p className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.threats_label}
                </p>
              </div>
            </div>

            {/* Total Items */}
            <div className="text-center mb-6">
              <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.totalItems}: <span className={`${darkMode ? 'text-indigo-400' : 'text-blue-600'}`}>{totalItems}</span>
              </p>
            </div>

            {/* Clear All Analysis Button */}
            {totalItems > 0 && (
              <button
                onClick={clearEverything}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {t.clearAll}
              </button>
            )}
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigateTo('home')}
              className={`px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
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
    </div>
  )
}

export default SWOTModel