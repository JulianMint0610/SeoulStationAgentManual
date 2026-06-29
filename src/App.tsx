import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, 
  Accessibility, 
  MapPin, 
  MessageSquare, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  PlayCircle,
  QrCode,
  Info,
  ExternalLink,
  Search,
  FileText,
  Download,
  X,
  Share,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';
import { MANUAL_CATEGORIES } from './constants';
import { Category, ManualItem } from './types';
import { cn } from './lib/utils';
import InteractiveStationMap from './components/InteractiveStationMap';
import CheongryongBlueprint from './components/CheongryongBlueprint';
import MugunghwaBlueprint from './components/MugunghwaBlueprint';

const iconMap = {
  Wheelchair: Accessibility,
  Train: Train,
  UserCheck: MessageSquare,
  Award: Award,
  FileText: FileText,
  MapPin: MapPin,
  AlertCircle: AlertCircle,
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<ManualItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [subTab, setSubTab] = useState<'departure' | 'arrival' | 'manual' | 'new_lift'>('departure');
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const filteredCategories = MANUAL_CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={cn(
      "min-h-screen font-sans flex flex-col relative transition-colors duration-500",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfoModal(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "relative w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden transition-colors duration-300",
                isDarkMode ? "bg-slate-900 border border-slate-800" : "bg-white"
              )}
            >
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "p-3 rounded-2xl rotate-12 transition-colors",
                    isDarkMode ? "bg-blue-600" : "bg-slate-900"
                  )}>
                    <Train className="w-6 h-6 text-white" />
                  </div>
                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                    )}
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                    Seoul Station<br />
                    <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>Legacy Project</span>
                  </h3>
                  <div className={cn("h-1 w-12 rounded-full", isDarkMode ? "bg-blue-400" : "bg-blue-600")}></div>
                  <p className={cn(
                    "leading-relaxed font-medium",
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  )}>
                    본 매뉴얼은 21개월간의 서울역 사회복무를 마무리하며, 
                    후배 사회복무요원들이 현장에서 겪을 수 있는 시행착오를 줄이고 
                    더 안전한 서비스를 제공하기 위해 제작된 실무 지식 아카이브입니다.
                  </p>
                </div>

                <div className={cn(
                  "grid grid-cols-2 gap-4 py-6 border-y transition-colors",
                  isDarkMode ? "border-slate-800" : "border-slate-100"
                )}>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Version</div>
                    <div className="text-sm font-bold">V5.0</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</div>
                    <div className="text-sm font-bold">2026. 06. 30</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Developer & Media</div>
                    <div className={cn("text-sm font-bold", isDarkMode ? "text-slate-100" : "text-slate-900")}>
                      <div>24-26 서울역 사회복무요원 C조 우상준</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-1">영상촬영 및 편집 : C조 황인우</div>
                    </div>
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-colors",
                  isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-100"
                )}>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-colors",
                    isDarkMode ? "bg-slate-800" : "bg-white"
                  )}>
                    <Award className={cn("w-5 h-5", isDarkMode ? "text-blue-400" : "text-blue-600")} />
                  </div>
                  <p className="text-[11px] md:text-xs text-slate-500 font-bold leading-tight">
                    "21개월동안 다치는 곳 없이 건강하게 잘 복무하시길 바랍니다."
                  </p>
                </div>

                <button 
                  onClick={() => setShowInfoModal(false)}
                  className={cn(
                    "w-full py-4 text-white rounded-2xl font-bold transition-all shadow-xl active:scale-95",
                    isDarkMode 
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-900/10" 
                      : "bg-slate-900 hover:bg-blue-600 shadow-slate-900/10"
                  )}
                >
                  확인했습니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Image Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-in-out overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1590457621453-e962821f574d?auto=format&fit=crop&q=80&w=2000"
          alt="Seoul Station"
          referrerPolicy="no-referrer"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105",
            (selectedCategory || selectedItem) ? "opacity-30 scale-100" : "opacity-0"
          )}
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isDarkMode ? "bg-slate-950/80" : "bg-white/60",
          (selectedCategory || selectedItem) ? "opacity-100" : "opacity-0"
        )} />
      </div>

      {/* Top Navigation - Compact on Mobile */}
      <header className={cn(
        "sticky top-0 z-50 px-4 md:px-6 py-3 md:py-4 backdrop-blur-xl border-b transition-colors duration-300",
        isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-100"
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {(selectedCategory || selectedItem) ? (
              <button 
                onClick={handleBack}
                className={cn(
                  "p-2 rounded-xl transition-all border border-transparent active:scale-95",
                  isDarkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
                )}
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className={cn(
                "p-2 rounded-xl rotate-12 hidden sm:block transition-colors",
                isDarkMode ? "bg-blue-600" : "bg-slate-900"
              )}>
                <Train className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h1 className={cn(
                "text-xs md:text-sm font-black tracking-widest uppercase transition-colors",
                isDarkMode ? "text-slate-100" : "text-slate-900"
              )}>
                Seoul Station <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>Manual</span>
              </h1>
              <div className="flex items-center gap-2">
                 <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Legacy Archive V5.0</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="어떤 업무가 궁금하신가요?"
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 ring-blue-500/20 transition-all duration-300",
                  isDarkMode 
                    ? "bg-slate-800 border-slate-700 text-white focus:bg-slate-900 placeholder-slate-500" 
                    : "bg-slate-50 border-slate-100 focus:bg-white text-slate-900 placeholder-slate-400"
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
             {/* Dark Mode Toggle Switch */}
             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className={cn(
                 "p-2 md:p-2.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center",
                 isDarkMode 
                   ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-755 hover:border-slate-600" 
                   : "bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100 hover:border-slate-200"
               )}
               title={isDarkMode ? "라이트 모드로 변경" : "다크 모드로 변경"}
               aria-label="Toggle Theme"
             >
               {isDarkMode ? <Sun className="w-5 h-5 animate-pulse" /> : <Moon className="w-5 h-5" />}
             </button>

             <button className={cn(
               "hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg",
               isDarkMode 
                 ? "bg-blue-600 text-white shadow-blue-900/10" 
                 : "bg-blue-600 text-white shadow-lg shadow-blue-200"
             )}>
                <QrCode className="w-4 h-4" />
                QR 스캔
             </button>
             <button 
               onClick={() => setShowInfoModal(true)}
               className={cn(
                 "p-2 md:p-2.5 rounded-xl border transition-all active:scale-95 group",
                 isDarkMode 
                   ? "bg-slate-800 border-slate-700 hover:bg-slate-750" 
                   : "bg-white hover:bg-slate-50 border-slate-100"
               )}
             >
                <Info className={cn("w-5 h-5 transition-colors", isDarkMode ? "text-slate-400 group-hover:text-blue-400" : "text-slate-400 group-hover:text-blue-600")} />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Only on Main Page */}
      {!selectedCategory && !selectedItem && (
        <div className={cn(
          "px-4 py-3 md:hidden sticky top-[61px] z-40 backdrop-blur-md border-b transition-colors duration-300",
          isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/60 border-slate-100"
        )}>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="무엇이든 검색해보세요"
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 ring-blue-500/20 shadow-sm transition-all duration-300",
                isDarkMode 
                  ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" 
                  : "bg-white border-slate-100 text-slate-900 placeholder-slate-400"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-12 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Modern Grid Layout */
            <motion.div 
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-8 md:space-y-12"
            >
              {/* Hero Banner with Train Blueprint Backdrop */}
              <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden py-10 md:py-16 px-4 md:px-8 flex flex-col items-center justify-center">
                {/* Translucent Blueprint Background */}
                <div 
                  className="absolute inset-0 z-0 opacity-[0.75] dark:opacity-[0.55] pointer-events-none transition-opacity duration-500 select-none flex items-center justify-center mask-image"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)'
                  }}
                >
                  {isDarkMode ? (
                    <CheongryongBlueprint isDarkMode={isDarkMode} className="scale-[1.3] md:scale-[1.15] transform origin-center" />
                  ) : (
                    <MugunghwaBlueprint isDarkMode={isDarkMode} className="scale-[1.3] md:scale-[1.15] transform origin-center" />
                  )}
                </div>

                <div className="relative z-10 text-center space-y-3 md:space-y-4 max-w-2xl mx-auto px-2">
                  <h2 className={cn(
                    "text-3xl md:text-5xl font-black tracking-tight leading-tight md:leading-[1.1] transition-colors",
                    isDarkMode ? "text-white" : "text-slate-900"
                  )}>
                     서울역 업무 <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>지식 아카이브</span>
                  </h2>
                  <p className={cn(
                    "text-sm md:text-lg leading-relaxed transition-colors",
                    isDarkMode ? "text-slate-400" : "text-slate-700"
                  )}>
                    21개월의 복무 노하우를 담았습니다.<br className="hidden md:block" />
                    스마트폰에서 바로 업무 가이드를 확인하세요.
                  </p>
                </div>
              </div>

              {/* Main Categories Section */}
              <div className="space-y-8 md:space-y-12">
                {/* Featured Category: Practical Assistance (The most important one) */}
                {(() => {
                  const cat1 = MANUAL_CATEGORIES.find(c => c.id === 'passenger-aid-1');
                  const cat2 = MANUAL_CATEGORIES.find(c => c.id === 'passenger-aid-2');
                  if (!cat1 || !cat2) return null;

                  const cat1Matches = searchQuery === '' || 
                    cat1.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cat1.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

                  const cat2Matches = searchQuery === '' || 
                    cat2.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cat2.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

                  if (!cat1Matches && !cat2Matches) return null;

                  return (
                    <div
                      className="w-full p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 text-white border border-slate-800 relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(30,41,59,0.3)] ring-1 ring-white/10 space-y-6 md:space-y-8"
                    >
                      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 relative z-20 border-b border-white/10 pb-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                          <Accessibility className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        
                        <div className="flex-1 space-y-1.5 text-center lg:text-left">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1 border border-blue-500/20">
                            Critical Mission
                          </div>
                          <h3 className="text-xl md:text-3xl font-black tracking-tight leading-none text-white">
                             1. 교통약자 실전 안내
                          </h3>
                          <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
                             사회복무요원 업무의 80%를 차지하는 가장 핵심적인 파트입니다. 신입 요원의 효율적인 지식 습득을 위해 분야별로 세분화했습니다.
                          </p>
                        </div>
                      </div>

                      {/* Sub-Banners */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-20">
                        {/* 1-1. 출도착 업무 */}
                        {cat1Matches && (
                          <motion.button
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => { setSelectedCategory(cat1); }}
                            className="group text-left p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between h-40 md:h-48 relative overflow-hidden"
                          >
                            <div className="space-y-1.5 md:space-y-2 relative z-10 animate-fade-in">
                              <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Section 1-1</div>
                              <h4 className="text-base md:text-xl font-black text-white group-hover:text-blue-400 transition-colors">1-1. 출도착 업무</h4>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed line-clamp-2 md:line-clamp-3">
                                휠체어(휠필) 서비스, 휠필수거, 시각장애인 고객 안내, 휠프트, 휠체어 리프트 가이드 실무입니다.
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-3 relative z-10 w-full">
                              <span className="text-[10px] md:text-xs font-bold text-slate-400 bg-white/5 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1 rounded-lg border border-white/5 transition-all">
                                {cat1.items.length}개 가이드 보기
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/15 transition-all"></div>
                          </motion.button>
                        )}

                        {/* 1-2. 필수로 알고 있어야 하는 지식 */}
                        {cat2Matches && (
                          <motion.button
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => { setSelectedCategory(cat2); }}
                            className="group text-left p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between h-40 md:h-48 relative overflow-hidden"
                          >
                            <div className="space-y-1.5 md:space-y-2 relative z-10 animate-fade-in">
                              <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Section 1-2</div>
                              <h4 className="text-base md:text-xl font-black text-white group-hover:text-blue-400 transition-colors">1-2. 필수로 알고 있어야 하는 지식</h4>
                              <p className="text-xs text-slate-300 font-medium leading-relaxed line-clamp-2 md:line-clamp-3">
                                도우미 쪽지 보는법, 휠체어 이동 안전 수칙, 차내신청 대응, 열차 종류별 특징과 구조, 행신발 열차 주의사항입니다.
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-3 relative z-10 w-full">
                              <span className="text-[10px] md:text-xs font-bold text-slate-400 bg-white/5 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1 rounded-lg border border-white/5 transition-all">
                                {cat2.items.length}개 가이드 보기
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/15 transition-all"></div>
                          </motion.button>
                        )}
                      </div>

                      {/* Dynamic Glow Elements */}
                      <div className="absolute right-[5%] top-[-5%] w-[35%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full"></div>
                      <div className="absolute left-[-5%] bottom-[-5%] w-[25%] h-[40%] bg-blue-900/30 blur-[80px] rounded-full"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.04)_0%,transparent_70%)]"></div>
                      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    </div>
                  );
                })()}

                {/* Sub Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filteredCategories.filter(c => c.id !== 'passenger-aid' && c.id !== 'passenger-aid-1' && c.id !== 'passenger-aid-2').map((category, idx) => {
                    const Icon = iconMap[category.icon as keyof typeof iconMap] || Info;
                    return (
                      <motion.button
                        key={category.id}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all text-left flex flex-col relative overflow-hidden h-48 md:h-64 shadow-sm",
                          isDarkMode 
                            ? "bg-slate-900 border-slate-800 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 text-white" 
                            : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 text-slate-900"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-colors",
                          isDarkMode ? "bg-blue-950/50 text-blue-400 border border-blue-900/30" : "bg-blue-50 text-blue-600"
                        )}>
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <div className="mt-auto">
                          <h3 className={cn("text-xl md:text-2xl font-bold tracking-tight mb-1 md:mb-2 transition-colors", isDarkMode ? "text-white" : "text-slate-900")}>{category.title}</h3>
                          <p className={cn("text-xs md:text-sm line-clamp-1 md:line-clamp-2 leading-relaxed opacity-60 transition-colors", isDarkMode ? "text-slate-400" : "text-slate-500")}>
                             {category.items.length}개의 가이드
                          </p>
                        </div>
                        
                        <ChevronRight className="absolute right-6 bottom-6 md:right-8 md:bottom-8 w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2 text-slate-300" />
                        
                        <div className={cn(
                          "absolute -right-4 -top-4 w-24 h-24 md:w-32 md:h-32 blur-3xl opacity-20 transition-all group-hover:opacity-40",
                          isDarkMode ? "bg-blue-950" : "bg-blue-200"
                        )}></div>
                      </motion.button>
                    );
                  })}

                  {/* Legacy Tribute Card */}
                  <motion.div 
                    className={cn(
                      "border p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-center items-center text-center group transition-colors duration-300",
                      isDarkMode ? "bg-slate-900/30 border-slate-800/50 text-slate-400" : "bg-slate-100/50 border-slate-200/50 text-slate-500"
                    )}
                  >
                    <Award className="w-8 h-8 text-slate-300 md:mb-4 transition-transform group-hover:scale-110" />
                    <h4 className={cn("font-bold text-sm mt-2 md:mt-0 transition-colors", isDarkMode ? "text-slate-300" : "text-slate-500")}>Legacy Project</h4>
                    <p className="hidden md:block text-[10px] text-slate-400 mt-2 leading-relaxed uppercase tracking-widest">
                      Dedicated to future<br/>social service agents
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : !selectedItem ? (
            /* Streamlined Item List */
            <motion.div 
              key="items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-4xl mx-auto space-y-6 md:space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-6 md:pb-8 gap-4 px-1 border-slate-200/20">
                 <div className="space-y-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      {selectedCategory.id === 'passenger-aid-1' ? 'Section 1-1' : selectedCategory.id === 'passenger-aid-2' ? 'Section 1-2' : selectedCategory.id}
                   </div>
                   <h2 className={cn("text-3xl md:text-4xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{selectedCategory.title}</h2>
                 </div>
                 <div className={cn(
                   "text-xs md:text-sm font-bold backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-xl border w-fit transition-colors",
                   isDarkMode 
                     ? "text-slate-400 bg-slate-900/40 border-slate-800" 
                     : "text-slate-500 bg-white/40 border-white/50"
                 )}>총 {selectedCategory.items.length}개 가이드</div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {selectedCategory.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedItem(item); setSubTab('departure'); }}
                    className={cn(
                      "p-5 md:p-6 backdrop-blur-md border rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-between transition-all group active:scale-[0.99]",
                      isDarkMode 
                        ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/90 hover:border-blue-500/50 text-white" 
                        : "bg-white/40 border-white/60 hover:bg-white hover:shadow-xl hover:border-blue-400 text-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={cn(
                        "text-xl md:text-2xl font-black italic transition-colors",
                        isDarkMode ? "text-slate-800 group-hover:text-blue-500/20" : "text-slate-300 group-hover:text-blue-600/20"
                      )}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="text-left">
                        <h4 className={cn("font-bold text-base md:text-lg line-clamp-1 transition-colors", isDarkMode ? "text-slate-100" : "text-slate-800")}>{item.title}</h4>
                        <p className={cn("text-[11px] md:text-xs mt-0.5 md:mt-1 line-clamp-1 pr-4 transition-colors", isDarkMode ? "text-slate-400" : "text-slate-500")}>{item.description}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-sm border transition-all shrink-0",
                      isDarkMode 
                        ? "bg-slate-800 border-slate-700 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600" 
                        : "bg-white/80 border-white text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900"
                    )}>
                      <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Clean Cinema-View Detail */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto space-y-6 md:space-y-10"
            >
              <div className="space-y-6 md:space-y-8 px-1">
                <div className="space-y-3">
                  <h2 className={cn(
                    "text-2xl md:text-5xl font-black tracking-tight leading-tight transition-colors",
                    isDarkMode ? "text-white" : "text-slate-900"
                  )}>
                    {selectedItem.hasSubTabs 
                      ? (
                          subTab === 'departure' 
                            ? selectedItem.departureTitle 
                            : subTab === 'arrival' 
                            ? selectedItem.arrivalTitle 
                            : subTab === 'manual'
                            ? selectedItem.manualTitle || selectedItem.title
                            : selectedItem.newLiftTitle || selectedItem.title
                        )
                      : selectedItem.title
                    }
                  </h2>
                  <div className={cn(
                    "flex flex-wrap items-center gap-3 text-[9px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm inline-flex px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-colors",
                    isDarkMode 
                      ? "text-slate-400 bg-slate-900/40 border-slate-800" 
                      : "text-slate-500 bg-white/30 border-white/50"
                  )}>
                     <div className="flex items-center gap-1.5">
                       <MapPin className={cn("w-3 h-3 md:w-4 md:h-4", isDarkMode ? "text-blue-400" : "text-blue-600")} /> 서울역
                     </div>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span>Service Manual</span>
                  </div>
                </div>

                {/* Sub Tab Toggle (출발/도착/수동조작/신형리프트) */}
                {selectedItem.hasSubTabs && (() => {
                  const hasManual = !!selectedItem.manualTips;
                  const hasNewLift = !!selectedItem.newLiftTips;
                  const tabCount = 2 + (hasManual ? 1 : 0) + (hasNewLift ? 1 : 0);
                  
                  return (
                    <div className={cn(
                      "flex p-1 rounded-[1.2rem] w-full border relative transition-colors duration-300",
                      tabCount === 4 ? "max-w-xl" : tabCount === 3 ? "max-w-md" : "max-w-xs",
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200/50"
                    )}>
                      <button
                        onClick={() => setSubTab('departure')}
                        className={cn(
                          "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                          subTab === 'departure' 
                            ? (isDarkMode ? "text-blue-400 font-black" : "text-blue-600 font-black") 
                            : (isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800")
                        )}
                      >
                        <span>출발 안내</span>
                      </button>
                      <button
                        onClick={() => setSubTab('arrival')}
                        className={cn(
                          "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                          subTab === 'arrival' 
                            ? (isDarkMode ? "text-blue-400 font-black" : "text-blue-600 font-black") 
                            : (isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800")
                        )}
                      >
                        <span>도착 안내</span>
                      </button>
                      {hasManual && (
                        <button
                          onClick={() => setSubTab('manual')}
                          className={cn(
                            "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                            subTab === 'manual' 
                              ? (isDarkMode ? "text-blue-400 font-black" : "text-blue-600 font-black") 
                              : (isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800")
                          )}
                        >
                          <span>수동 조작법</span>
                        </button>
                      )}
                      {hasNewLift && (
                        <button
                          onClick={() => setSubTab('new_lift')}
                          className={cn(
                            "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                            subTab === 'new_lift' 
                              ? (isDarkMode ? "text-blue-400 font-black" : "text-blue-600 font-black") 
                              : (isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800")
                          )}
                        >
                          <span>신형 리프트</span>
                        </button>
                      )}
                      {/* Sliding highlight bar */}
                      <div 
                        className={cn(
                          "absolute top-1 bottom-1 rounded-[0.9rem] shadow-sm border transition-all duration-300 ease-out",
                          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200/40"
                        )}
                        style={{
                          width: `calc(${100 / tabCount}% - 6px)`,
                          left: `calc(${(subTab === 'departure' ? 0 : subTab === 'arrival' ? 1 : subTab === 'manual' ? 2 : 3) * (100 / tabCount)}% + ${subTab === 'departure' ? '4px' : '2px'})`
                        }}
                      />
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {(() => {
                    const currentVideoUrl = selectedItem.hasSubTabs
                      ? (subTab === 'departure'
                          ? (selectedItem.departureVideoUrl || selectedItem.videoUrl)
                          : subTab === 'arrival'
                            ? (selectedItem.arrivalVideoUrl || selectedItem.videoUrl)
                            : subTab === 'manual'
                              ? (selectedItem.manualVideoUrl || selectedItem.videoUrl)
                              : (selectedItem.newLiftVideoUrl || selectedItem.videoUrl))
                      : selectedItem.videoUrl;

                    if (!currentVideoUrl) return null;

                    return (
                      <motion.a
                        href={currentVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "flex flex-col sm:flex-row items-center justify-between p-6 border rounded-3xl gap-4 group transition-all shadow-sm",
                          isDarkMode 
                            ? "bg-red-950/20 hover:bg-red-950/30 border-red-900/40 text-red-100" 
                            : "bg-red-50/50 hover:bg-red-50 border-red-200/60 text-red-900"
                        )}
                      >
                        <div className="flex items-center gap-4 text-center sm:text-left">
                          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/20">
                            <PlayCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className={cn("font-bold text-lg", isDarkMode ? "text-red-200" : "text-red-900")}>유튜브 실전 가이드 영상 시청</h4>
                            <p className={cn("text-xs font-semibold mt-0.5", isDarkMode ? "text-red-400/80" : "text-red-600/80")}>상세한 실무 이동 동선과 장비 작동법을 유튜브 영상으로 자세히 확인합니다.</p>
                          </div>
                        </div>
                        <span className={cn(
                          "flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all shrink-0",
                          isDarkMode 
                            ? "text-red-200 bg-red-900/40 border-red-800 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600" 
                            : "text-red-700 bg-white border-red-200/50 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600"
                        )}>
                           영상 시청하기 <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </motion.a>
                    );
                  })()}
                  
                  <div className={cn(
                    "space-y-4 p-6 md:p-8 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] border transition-colors duration-300",
                    isDarkMode 
                      ? "bg-slate-900/40 border-slate-800/60 text-slate-300" 
                      : "bg-white/40 border-white/60 text-slate-700"
                  )}>
                    <h3 className={cn(
                      "text-lg md:text-xl font-bold border-l-4 pl-4 transition-colors",
                      isDarkMode ? "border-blue-500 text-white" : "border-blue-600 text-slate-900"
                    )}>상세 설명</h3>
                    <p className="leading-relaxed text-base md:text-lg font-medium">
                      {selectedItem.hasSubTabs 
                        ? (
                            subTab === 'departure' 
                              ? selectedItem.departureDesc 
                              : subTab === 'arrival' 
                              ? selectedItem.arrivalDesc 
                              : subTab === 'manual'
                              ? selectedItem.manualDesc || selectedItem.description
                              : selectedItem.newLiftDesc || selectedItem.description
                          )
                        : selectedItem.description
                      }
                    </p>
                  </div>

                  {/* Interactive Facility Maps, Platforms & Cafeteria widgets */}
                  <InteractiveStationMap itemId={selectedItem.id} />
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className={cn(
                    "backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 space-y-6 md:space-y-8 border transition-colors duration-300",
                    isDarkMode 
                      ? "bg-slate-900/40 border-slate-800/60" 
                      : "bg-white/40 border-white/60"
                  )}>
                    <div>
                      <h3 className={cn(
                        "text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 transition-colors",
                        isDarkMode ? "text-slate-400" : "text-slate-400"
                      )}>Expert Checklist</h3>
                      <div className="space-y-3 md:space-y-4">
                        {(selectedItem.hasSubTabs 
                          ? (
                              subTab === 'departure' 
                                ? selectedItem.departureTips 
                                : subTab === 'arrival' 
                                ? selectedItem.arrivalTips 
                                : subTab === 'manual'
                                ? selectedItem.manualTips || selectedItem.tips
                                : selectedItem.newLiftTips || selectedItem.tips
                            )
                          : selectedItem.tips
                        )?.map((tip, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                             <span className={cn("text-sm font-black shrink-0 min-w-[22px] mt-0.5", isDarkMode ? "text-blue-400" : "text-blue-600")}>{idx + 1})</span>
                             <p className={cn("text-sm leading-relaxed font-semibold transition-colors", isDarkMode ? "text-slate-300" : "text-slate-700")}>
                               {(() => {
                                 let content: any = tip;
                                 if (tip.includes("'딱 5분간만 정차'")) {
                                   const parts = tip.split("'딱 5분간만 정차'");
                                   content = (
                                     <>
                                       {parts[0]}
                                       <span className={isDarkMode ? "text-blue-400 font-extrabold" : "text-blue-600 font-extrabold"}>'딱 5분간만 정차'</span>
                                       {parts[1]}
                                     </>
                                   );
                                 } else if (tip.includes("승무원 인계를 직접 할 필요가 없습니다.")) {
                                   const parts = tip.split("승무원 인계를 직접 할 필요가 없습니다.");
                                   content = (
                                     <>
                                       {parts[0]}
                                       <span className={isDarkMode ? "text-blue-400 font-extrabold" : "text-blue-600 font-extrabold"}>승무원 인계를 직접 할 필요가 없습니다.</span>
                                       {parts[1]}
                                     </>
                                   );
                                 }
                                 return content;
                               })()}
                             </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={cn(
        "py-8 md:py-12 border-t transition-colors duration-500",
        isDarkMode ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-100"
      )}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
              <h4 className={cn("text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 transition-colors", isDarkMode ? "text-slate-200" : "text-slate-900")}>Seoul Station Legacy Project</h4>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Social Service Agent Knowledge Base</p>
           </div>
           <div className="flex items-center gap-8">
              <QrCode className={cn("w-6 h-6 md:w-8 md:h-8 transition-colors", isDarkMode ? "text-slate-800" : "text-slate-200")} />
              <div className={cn("text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-right transition-colors", isDarkMode ? "text-slate-500" : "text-slate-300")}>
                 MADE BY 24-26 서울역 사회복무요원 C조 우상준
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
