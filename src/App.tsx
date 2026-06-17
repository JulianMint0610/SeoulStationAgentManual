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
  AlertCircle
} from 'lucide-react';
import { MANUAL_CATEGORIES } from './constants';
import { Category, ManualItem } from './types';
import { cn } from './lib/utils';
import InteractiveStationMap from './components/InteractiveStationMap';

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
  const [copied, setCopied] = useState(false);
  const [subTab, setSubTab] = useState<'departure' | 'arrival'>('departure');
  
  const handleCopyLink = () => {
    if (!selectedItem) return;
    
    let textToCopy = '';
    if (selectedItem.hasSubTabs) {
      if (subTab === 'departure') {
        textToCopy = `[서울역 사회복무요원 실무가이드 - ${selectedItem.departureTitle || selectedItem.title}]\n가이드 영상: ${selectedItem.videoUrl}\n\n${selectedItem.departureDesc || selectedItem.description}\n\n[핵심 수칙]\n${(selectedItem.departureTips || selectedItem.tips).map(tip => `• ${tip}`).join('\n')}`;
      } else {
        textToCopy = `[서울역 사회복무요원 실무가이드 - ${selectedItem.arrivalTitle || selectedItem.title}]\n가이드 영상: ${selectedItem.videoUrl}\n\n${selectedItem.arrivalDesc || selectedItem.description}\n\n[핵심 수칙]\n${(selectedItem.arrivalTips || selectedItem.tips).map(tip => `• ${tip}`).join('\n')}`;
      }
    } else {
      textToCopy = selectedItem.videoUrl 
        ? `[서울역 사회복무요원 실무가이드 - ${selectedItem.title}]\n가이드 영상: ${selectedItem.videoUrl}\n\n${selectedItem.description}`
        : `[서울역 사회복무요원 실무가이드 - ${selectedItem.title}]\n\n${selectedItem.description}\n\n[핵심 수칙]\n${selectedItem.tips.map(tip => `• ${tip}`).join('\n')}`;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative transition-colors duration-700">
      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfoModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="bg-slate-900 p-3 rounded-2xl rotate-12">
                    <Train className="w-6 h-6 text-white" />
                  </div>
                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">Seoul Station<br /><span className="text-blue-600">Legacy Project</span></h3>
                  <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    본 매뉴얼은 21개월간의 서울역 사회복무를 마무리하며, 
                    후배 사회복무요원들이 현장에서 겪을 수 있는 시행착오를 줄이고 
                    더 안전한 서비스를 제공하기 위해 제작된 실무 지식 저장소입니다.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Version</div>
                    <div className="text-sm font-bold">V3.0</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</div>
                    <div className="text-sm font-bold">2026. 06. 10</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Developer & Media</div>
                    <div className="text-sm font-bold text-slate-900">
                      <div>24-26 서울역 사회복무요원 C조 우상준</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-1">영상촬영 및 편집 : C조 황인우</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-[11px] md:text-xs text-slate-500 font-bold leading-tight">
                    "가장 위대한 유산은 서로를 돕는 지식의 공유입니다."
                  </p>
                </div>

                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
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
          "absolute inset-0 bg-white/60 transition-opacity duration-1000",
          (selectedCategory || selectedItem) ? "opacity-100" : "opacity-0"
        )} />
      </div>

      {/* Top Navigation - Compact on Mobile */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {(selectedCategory || selectedItem) ? (
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all border border-transparent active:scale-95"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            ) : (
              <div className="bg-slate-900 p-2 rounded-xl rotate-12 hidden sm:block">
                <Train className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-xs md:text-sm font-black tracking-widest text-slate-900 uppercase">
                Seoul Station <span className="text-blue-600">Manual</span>
              </h1>
              <div className="flex items-center gap-2">
                 <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Legacy Archive V3.0</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="어떤 업무가 궁금하신가요?"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 ring-blue-500/20 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
             <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                <QrCode className="w-4 h-4" />
                QR 스캔
             </button>
             <button 
               onClick={() => setShowInfoModal(true)}
               className="p-2 md:p-2.5 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all active:scale-95 group"
             >
                <Info className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Only on Main Page */}
      {!selectedCategory && !selectedItem && (
        <div className="px-4 py-3 md:hidden sticky top-[61px] z-40 bg-white/60 backdrop-blur-md border-b border-slate-100">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="무엇이든 검색해보세요"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 ring-blue-500/20 shadow-sm transition-all"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Hero Banner */}
              <div className="text-center space-y-3 md:space-y-4 max-w-2xl mx-auto px-2">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight md:leading-[1.1]">
                   서울역 실전 <span className="text-blue-600">지식 저장소</span><br className="hidden md:block" /><span className="text-slate-500 text-2xl md:text-3xl font-bold block mt-2">(테스트용)</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-lg leading-relaxed">
                  21개월의 복무 노하우를 담았습니다.<br className="hidden md:block" />
                  스마트폰에서 바로 업무 가이드를 확인하세요.
                </p>
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
                             사회복무요원 업무의 80%를 차지하는 가장 핵심적인 파트입니다. 신입 대원의 효율적인 지식 습득을 위해 분야별로 세분화했습니다.
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
                                도우미 쪽지 판독법, 휠체어 이동 안전 수칙, 차내신청 대응, 열차 종류별 휠체어석 위치, 행신발 열차 주의사항입니다.
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
                        className="group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all text-left flex flex-col relative overflow-hidden h-48 md:h-64 bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 shadow-sm"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 bg-blue-50 text-blue-600">
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <div className="mt-auto">
                          <div className="text-[10px] font-bold text-blue-600/50 uppercase tracking-widest mb-1">Guide {idx + 1}</div>
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 md:mb-2">{category.title}</h3>
                          <p className="text-xs md:text-sm line-clamp-1 md:line-clamp-2 leading-relaxed opacity-60 text-slate-500">
                             {category.items.length}개의 전문 가이드
                          </p>
                        </div>
                        
                        <ChevronRight className="absolute right-6 bottom-6 md:right-8 md:bottom-8 w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2 text-slate-300" />
                        
                        <div className="absolute -right-4 -top-4 w-24 h-24 md:w-32 md:h-32 blur-3xl opacity-20 transition-opacity group-hover:opacity-40 bg-blue-200"></div>
                      </motion.button>
                    );
                  })}

                  {/* Legacy Tribute Card */}
                  <motion.div 
                    className="bg-slate-100/50 border border-slate-200/50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-center items-center text-center group"
                  >
                    <Award className="w-8 h-8 text-slate-300 md:mb-4 transition-transform group-hover:scale-110" />
                    <h4 className="font-bold text-slate-500 text-sm mt-2 md:mt-0">Legacy Project</h4>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-6 md:space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-6 md:pb-8 gap-4 px-1">
                 <div className="space-y-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      {selectedCategory.id === 'passenger-aid-1' ? 'Section 1-1' : selectedCategory.id === 'passenger-aid-2' ? 'Section 1-2' : selectedCategory.id}
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black tracking-tight">{selectedCategory.title}</h2>
                 </div>
                 <div className="text-[10px] md:text-sm font-bold text-slate-500 bg-white/40 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-white/50 w-fit">총 {selectedCategory.items.length}개 가이드</div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {selectedCategory.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedItem(item); setSubTab('departure'); }}
                    className="p-5 md:p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-between hover:bg-white hover:shadow-xl hover:border-blue-400 transition-all group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-xl md:text-2xl font-black text-slate-300 italic group-hover:text-blue-600/20 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-800 text-base md:text-lg line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] md:text-xs text-slate-500 mt-0.5 md:mt-1 line-clamp-1 pr-4">{item.description}</p>
                      </div>
                    </div>
                    <div className="p-2.5 md:p-3 bg-white/80 rounded-lg md:rounded-xl shadow-sm border border-white group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0">
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl mx-auto space-y-6 md:space-y-10"
            >
              <div className="space-y-6 md:space-y-8 px-1">
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-5xl font-black tracking-tight leading-tight">
                    {selectedItem.hasSubTabs 
                      ? (subTab === 'departure' ? selectedItem.departureTitle : selectedItem.arrivalTitle)
                      : selectedItem.title
                    }
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-500 bg-white/30 backdrop-blur-sm inline-flex px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/50">
                     <div className="flex items-center gap-1.5">
                       <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-600" /> 서울역
                     </div>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span>Service Manual</span>
                  </div>
                </div>

                {/* Sub Tab Toggle (출발/도착) */}
                {selectedItem.hasSubTabs && (
                  <div className="flex p-1 bg-slate-100 rounded-[1.2rem] w-full max-w-xs border border-slate-200/50 relative">
                    <button
                      onClick={() => setSubTab('departure')}
                      className={cn(
                        "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                        subTab === 'departure' 
                          ? "text-blue-600 font-black" 
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <span>출발 안내</span>
                    </button>
                    <button
                      onClick={() => setSubTab('arrival')}
                      className={cn(
                        "flex-1 py-2.5 text-center rounded-[0.9rem] text-xs font-semibold transition-all relative z-10 flex items-center justify-center gap-1.5",
                        subTab === 'arrival' 
                          ? "text-blue-600 font-black" 
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <span>도착 안내</span>
                    </button>
                    {/* Sliding highlight bar */}
                    <div 
                      className={cn(
                        "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-[0.9rem] shadow-sm border border-slate-200/40 transition-all duration-300 ease-out",
                        subTab === 'departure' ? "left-1" : "left-[calc(50%+3px)]"
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {selectedItem.videoUrl && (
                    <motion.a
                      href={selectedItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex flex-col sm:flex-row items-center justify-between p-6 bg-red-50/50 hover:bg-red-50 border border-red-200/60 rounded-3xl gap-4 group transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4 text-center sm:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/20">
                          <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900 text-lg">유튜브 실전 가이드 영상 시청</h4>
                          <p className="text-xs text-red-600/80 font-semibold mt-0.5">상세한 실무 이동 동선과 장비 작동법을 유튜브 영상으로 자세히 확인합니다.</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-white px-4 py-2.5 rounded-xl border border-red-200/50 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all shrink-0">
                         영상 시청하기 <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </motion.a>
                  )}
                  
                  <div className="space-y-4 p-6 md:p-8 bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] border border-white/60">
                    <h3 className="text-lg md:text-xl font-bold border-l-4 border-blue-600 pl-4">상세 설명</h3>
                    <p className="text-slate-700 leading-relaxed text-base md:text-lg font-medium">
                      {selectedItem.hasSubTabs 
                        ? (subTab === 'departure' ? selectedItem.departureDesc : selectedItem.arrivalDesc)
                        : selectedItem.description
                      }
                    </p>
                  </div>

                  {/* Interactive Facility Maps, Platforms & Cafeteria widgets */}
                  <InteractiveStationMap itemId={selectedItem.id} />
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 space-y-6 md:space-y-8 border border-white/60">
                    <div>
                      <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Expert Checklist</h3>
                      <div className="space-y-3 md:space-y-4">
                        {(selectedItem.hasSubTabs 
                          ? (subTab === 'departure' ? selectedItem.departureTips : selectedItem.arrivalTips)
                          : selectedItem.tips
                        )?.map((tip, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                             <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mt-1.5 md:mt-2 shrink-0"></div>
                             <p className="text-sm text-slate-700 leading-relaxed font-semibold">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 md:pt-8 border-t border-slate-200 flex flex-col gap-3">
                       <button 
                         onClick={handleCopyLink}
                         className={cn(
                           "w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95",
                           copied 
                             ? "bg-green-600 text-white shadow-green-600/10" 
                             : "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-900/10"
                         )}
                       >
                          <ExternalLink className="w-4 h-4" />
                          {copied ? "클립보드에 복사 완료!" : "가이드 정보 복사"}
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 md:py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
              <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-2">Seoul Station Legacy Project</h4>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Social Service Agent Knowledge Base</p>
           </div>
           <div className="flex items-center gap-8">
              <QrCode className="w-6 h-6 md:w-8 md:h-8 text-slate-200" />
              <div className="text-[9px] md:text-[10px] text-slate-300 font-bold uppercase tracking-widest text-right">
                 MADE BY 24-26 서울역 사회복무요원 C조 우상준
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
