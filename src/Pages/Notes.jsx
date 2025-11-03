import { useState, useEffect, useCallback, useRef, memo } from 'react'
import Header from '../components/Header'
import { ArrowLeft, ArrowRight, Trash2, Plus, Pin, PinOff, Clock } from 'lucide-react'

// Memoized Note Card Component
const NoteCard = memo(({
  note,
  onDelete,
  onTogglePinned,
  onEdit,
  darkMode,
  language
}) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return language === 'ar' ? 'اليوم' : 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return language === 'ar' ? 'أمس' : 'Yesterday'
    } else {
      return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  return (
    <div
      onClick={() => onEdit(note)}
      className={`p-5 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden ${
        darkMode
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-indigo-500'
          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-500'
      }`}
    >
      {/* Background color indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        note.color === 'red' ? 'bg-red-500' :
        note.color === 'yellow' ? 'bg-yellow-500' :
        note.color === 'green' ? 'bg-green-500' :
        note.color === 'blue' ? 'bg-blue-500' :
        'bg-purple-500'
      }`} />

      {/* Pin badge */}
      {note.pinned && (
        <div className="absolute top-3 right-3 text-yellow-500">
          <Pin size={16} fill="currentColor" />
        </div>
      )}

      {/* Content */}
      <div className={note.pinned ? 'pr-6' : ''}>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 break-words">
          {note.title || (language === 'ar' ? 'بدون عنوان' : 'Untitled')}
        </h3>
        <p className={`text-sm mb-3 line-clamp-2 break-words ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {note.content || (language === 'ar' ? 'بدون محتوى' : 'No content')}
        </p>
      </div>

      {/* Date and Actions */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {formatDate(note.createdAt)}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTogglePinned(note.id)
            }}
            className={`p-1.5 rounded transition-all ${
              darkMode
                ? 'hover:bg-gray-600 text-yellow-500'
                : 'hover:bg-gray-200 text-yellow-600'
            }`}
            title={note.pinned ? (language === 'ar' ? 'إلغاء التثبيت' : 'Unpin') : (language === 'ar' ? 'تثبيت' : 'Pin')}
          >
            {note.pinned ? <PinOff size={16} /> : <Pin size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note.id)
            }}
            className={`p-1.5 rounded transition-all ${
              darkMode
                ? 'text-red-400 hover:bg-red-600/20'
                : 'text-red-600 hover:bg-red-100'
            }`}
            title={language === 'ar' ? 'حذف' : 'Delete'}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
})

NoteCard.displayName = 'NoteCard'

// Color Picker Component
const ColorPicker = memo(({ selectedColor, onColorChange, darkMode, language }) => {
  const colors = [
    { id: 'red', name: language === 'ar' ? 'أحمر' : 'Red' },
    { id: 'yellow', name: language === 'ar' ? 'أصفر' : 'Yellow' },
    { id: 'green', name: language === 'ar' ? 'أخضر' : 'Green' },
    { id: 'blue', name: language === 'ar' ? 'أزرق' : 'Blue' },
    { id: 'purple', name: language === 'ar' ? 'بنفسجي' : 'Purple' },
  ]

  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onColorChange(color.id)}
          className={`w-8 h-8 rounded-full transition-all ${
            color.id === 'red' ? 'bg-red-500' :
            color.id === 'yellow' ? 'bg-yellow-500' :
            color.id === 'green' ? 'bg-green-500' :
            color.id === 'blue' ? 'bg-blue-500' :
            'bg-purple-500'
          } ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-white scale-110' : ''}`}
          title={color.name}
        />
      ))}
    </div>
  )
})

ColorPicker.displayName = 'ColorPicker'

const Notes = ({ navigateTo, darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [notes, setNotes] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')
  const [selectedColor, setSelectedColor] = useState('purple')
  const [searchQuery, setSearchQuery] = useState('')

  const contentRef = useRef(null)

  const texts = {
    ar: {
      title: 'الملاحظات',
      description: 'أنشئ وأدر ملاحظاتك الشخصية',
      newNote: 'ملاحظة جديدة',
      addNote: 'إضافة ملاحظة',
      updateNote: 'تحديث الملاحظة',
      cancelEdit: 'إلغاء',
      enterTitle: 'أدخل عنوان الملاحظة...',
      enterContent: 'أدخل محتوى الملاحظة...',
      noNotes: 'لا توجد ملاحظات',
      backHome: 'العودة للرئيسية',
      search: 'ابحث عن ملاحظة...',
      noResults: 'لم يتم العثور على ملاحظات',
      clearSearch: 'مسح البحث',
      createFirst: 'أنشئ ملاحظتك الأولى',
      deleteConfirm: 'حذف الملاحظة؟',
    },
    en: {
      title: 'Notes',
      description: 'Create and manage your personal notes',
      newNote: 'New Note',
      addNote: 'Add Note',
      updateNote: 'Update Note',
      cancelEdit: 'Cancel',
      enterTitle: 'Enter note title...',
      enterContent: 'Enter note content...',
      noNotes: 'No notes',
      backHome: 'Back to Home',
      search: 'Search notes...',
      noResults: 'No notes found',
      clearSearch: 'Clear Search',
      createFirst: 'Create your first note',
      deleteConfirm: 'Delete note?',
    },
  }

  const t = texts[language]

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes')
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    } catch (error) {
      console.error('Error loading notes:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('notes', JSON.stringify(notes))
      } catch (error) {
        console.error('Error saving notes:', error)
      }
    }
  }, [notes, isLoaded])

  // Handle adding/updating note
  const handleSaveNote = useCallback(() => {
    const title = titleInput.trim()
    const content = contentInput.trim()

    if (title === '' && content === '') {
      return
    }

    if (editingNote) {
      // Update existing note
      setNotes(prev =>
        prev.map(note =>
          note.id === editingNote.id
            ? {
              ...note,
              title,
              content,
              color: selectedColor,
              updatedAt: new Date().toISOString(),
            }
            : note
        )
      )
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title,
        content,
        color: selectedColor,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotes(prev => [newNote, ...prev])
    }

    // Reset form
    setTitleInput('')
    setContentInput('')
    setSelectedColor('purple')
    setEditingNote(null)
  }, [titleInput, contentInput, selectedColor, editingNote])

  // Handle editing note
  const handleEditNote = useCallback((note) => {
    setEditingNote(note)
    setTitleInput(note.title)
    setContentInput(note.content)
    setSelectedColor(note.color)
    setTimeout(() => {
      contentRef.current?.focus()
    }, 0)
  }, [])

  // Handle deleting note
  const handleDeleteNote = useCallback((noteId) => {
    if (window.confirm(t.deleteConfirm)) {
      setNotes(prev => prev.filter(note => note.id !== noteId))
      if (editingNote?.id === noteId) {
        setEditingNote(null)
        setTitleInput('')
        setContentInput('')
        setSelectedColor('purple')
      }
    }
  }, [editingNote, t.deleteConfirm])

  // Handle toggling pin status
  const handleTogglePinned = useCallback((noteId) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    )
  }, [])

  // Handle canceling edit
  const handleCancelEdit = useCallback(() => {
    setEditingNote(null)
    setTitleInput('')
    setContentInput('')
    setSelectedColor('purple')
  }, [])

  // Filter and sort notes
  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      }
      return a.pinned ? -1 : 1
    })

  if (!isLoaded) {
    return null
  }

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Note Editor Section */}
            <div
              className={`lg:col-span-1 p-6 rounded-2xl transition-all duration-300 sticky top-24 ${
                darkMode
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              }`}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {editingNote ? (language === 'ar' ? 'تحرير ملاحظة' : 'Edit Note') : t.newNote}
              </h2>

              {/* Title Input */}
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder={t.enterTitle}
                className={`w-full px-4 py-2 rounded-lg mb-3 outline-none transition-all duration-200 text-sm font-semibold ${
                  darkMode
                    ? 'bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
                    : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />

              {/* Content Input */}
              <textarea
                ref={contentRef}
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder={t.enterContent}
                className={`w-full px-4 py-3 rounded-lg mb-4 outline-none transition-all duration-200 resize-none h-32 text-sm ${
                  darkMode
                    ? 'bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
                    : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />

              {/* Color Picker */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {language === 'ar' ? 'اللون' : 'Color'}
                </label>
                <ColorPicker
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                  darkMode={darkMode}
                  language={language}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNote}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Plus size={18} />
                  {editingNote ? t.updateNote : t.addNote}
                </button>
                {editingNote && (
                  <button
                    onClick={handleCancelEdit}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                    }`}
                  >
                    {t.cancelEdit}
                  </button>
                )}
              </div>
            </div>

            {/* Notes List Section */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500'
                      : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Notes Grid */}
              {filteredNotes.length === 0 ? (
                <div
                  className={`p-8 rounded-2xl text-center ${
                    darkMode
                      ? 'bg-gray-800/50 border border-gray-700'
                      : 'bg-white/50 border border-gray-200'
                  }`}
                >
                  <Clock size={40} className="mx-auto mb-3 opacity-50" />
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {notes.length === 0 ? t.createFirst : t.noResults}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className={`mt-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                        darkMode
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {t.clearSearch}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={handleDeleteNote}
                      onTogglePinned={handleTogglePinned}
                      onEdit={handleEditNote}
                      darkMode={darkMode}
                      language={language}
                    />
                  ))}
                </div>
              )}
            </div>
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

export default Notes