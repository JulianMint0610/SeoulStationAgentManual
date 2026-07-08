import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2,
  BookOpen,
  Layout,
  FileCheck
} from 'lucide-react';

interface NotePart {
  id: string;
  title: string;
  shortName: string;
  position: string;
  example: string;
  description: string;
  details: string[];
  importantHint?: string;
}

export default function HelperNoteVisualizer() {
  const [mode, setMode] = useState<'departure' | 'arrival'>('departure');
  const [activePart, setActivePart] = useState<string>('dep_train_num');
  const [showHaengshinPen, setShowHaengshinPen] = useState<boolean>(true);

  // Sync active parts when switching mode
  useEffect(() => {
    if (mode === 'arrival') {
      setActivePart('time');
    } else {
      setActivePart('dep_train_num');
    }
  }, [mode]);

  const arrivalParts: NotePart[] = [
    {
      id: 'time',
      title: '① 열차 시간',
      shortName: '열차 시간',
      position: '시간 (1행 우측)',
      example: '12:47',
      description: '열차가 서울역에 도착하는 예정 시각을 의미합니다.',
      details: [
        '도착예정 시각 전에 정해진 홈으로 내려가 대기 장소 및 장비를 세팅해야 합니다.'
      ]
    },
    {
      id: 'train_num',
      title: '② 열차 번호',
      shortName: '열차 번호',
      position: '열차번호 (2행 좌측)',
      example: '254',
      description: '도착하는 기차의 열차 번호입니다.',
      details: [
        '열차 유형에 따라 휠체어석 위치가 다를 수 있으므로 미리 유형을 파악하는 데 필요한 정보입니다.'
      ]
    },
    {
      id: 'platform',
      title: '③ 승강장 홈',
      shortName: '승강장 홈',
      position: '홈 (2행 우측)',
      example: '11',
      description: '도착 열차가 진입하는 서울역 승강장 번호입니다.',
      details: [
        '안내가 예약된 승강장 홈으로 신속히 이동하여 정해진 위치에서 대기합니다.'
      ]
    },
    {
      id: 'stations',
      title: '④ 구간 경로',
      shortName: '구간 경로',
      position: '구간 (3행)',
      example: '부산',
      description: '해당 기차의 운행 노선(구간)을 나타냅니다.',
      details: [
        '정확한 경로 정보를 참고하여 오승하차를 방지하고 역무에 참고합니다.'
      ]
    },
    {
      id: 'seat_num',
      title: '⑤ 호차 및 좌석번호',
      shortName: '호차 및 좌석',
      position: '좌석번호 (4행)',
      example: '15호차 11A',
      description: '도착 승객이 탑승 중인 기차의 호차와 좌석 번호입니다.',
      details: []
    },
    {
      id: 'services_content',
      title: '⑥ 서비스 종류',
      shortName: '서비스 종류',
      position: '내용 (5행 하단)',
      example: '휠필, 리프트 체크 등',
      description: '해당 고객에게 지원해야 하는 서비스 범위(휠체어 대여 및 안내, 전동 리프트 장비 사용)를 명시합니다.',
      details: []
    }
  ];

  const departureParts: NotePart[] = [
    {
      id: 'dep_train_num',
      title: '① 열차 번호 (# 219)',
      shortName: '열차 번호',
      position: '좌측 상단',
      example: '# 219',
      description: '열차 번호 (# 뒤의 기호와 숫자는 열차 번호를 의미합니다.)',
      details: [
        '수기 메모 좌측 상단에 적힌 # 219는 해당 안내 대상 열차 편명이 KTX 219열차임을 나타냅니다.'
      ]
    },
    {
      id: 'dep_destination',
      title: '② 행선지 (부산)',
      shortName: '행선지',
      position: '중앙 상단',
      example: '부산',
      description: '열차의 도착지(행선지)를 나타냅니다.',
      details: [
        '수기 메모 전면에 적힌 "부산"은 이 열차가 부산역 방면 하행 열차임을 나타냅니다.'
      ]
    },
    {
      id: 'dep_time',
      title: '⚠️ 열차 출발 시간 (18:03)',
      shortName: '출발 시간',
      position: '우측 상단',
      example: '18:03',
      description: '열차의 발차 시각을 수기로 기입한 것입니다.',
      details: [
        '승객이 탑승할 예정 기차 편명의 출발 시각이 18시 03분임을 정의합니다.'
      ]
    },
    {
      id: 'dep_seat',
      title: '④ 플랫폼/호차&좌석 (4 / 2)',
      shortName: '플랫폼/호차&좌석',
      position: '중앙',
      example: '4 / 2',
      description: '탑승할 열차의 플랫폼과 호차의 정보를 나타냅니다.',
      details: []
    },
    {
      id: 'dep_service',
      title: '⑤ 서비스 종류 (리프트)',
      shortName: '서비스 종류',
      position: '중앙 하단',
      example: '리프트',
      description: '(혹은 휠필/시각) 교통약자 관련 서비스 형태입니다.',
      details: []
    },
    {
      id: 'dep_platform',
      title: '⑥ 미팅 정보 (10홈)',
      shortName: '미팅 정보',
      position: '우측 하단',
      example: '10홈',
      description: '',
      details: [
        '15종 : 15분 전 종합에서 픽업',
        '10홈 : 10분 전에 호차 앞에서 미팅',
        '9창 : 9번 장애인 매표창구 앞에서 미팅'
      ]
    },
    {
      id: 'haengshin_warning',
      title: '⚠️ 행신발 경유 기차 표시',
      shortName: '행신발 경고',
      position: '',
      example: '"행 (  )"',
      description: '서울역이 시발역이 아닌, 행신역에서 출발하여 서울역에 경유하는 열차입니다.',
      details: [
        '서울역 정차 예정 시간이 약 5분으로 매우 짧아 사전에 탑승 조기 배치를 매끄럽게 준비해야 서비스 지연을 막을 수 있습니다.'
      ]
    }
  ];

  const currentPartsList = mode === 'arrival' ? arrivalParts : departureParts;
  const currentPart = currentPartsList.find(p => p.id === activePart) || currentPartsList[0];

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-[1.8rem] p-5 md:p-8 space-y-6 md:space-y-8 shadow-sm text-slate-800" id="helper-note-decoder-container">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight ml-1" id="helper-note-title">도우미 쪽지 보는법</h3>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
            각 항목을 클릭하여 정보를 확인해 보세요.
          </p>
        </div>

        {/* Action Toggle Zone: Departure / Arrival One-Touch (Swapped Order) */}
        <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto shadow-inner">
          <button
            id="toggle-departure-mode-btn"
            onClick={() => setMode('departure')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              mode === 'departure' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            [출발] 쪽지
          </button>

          <button
            id="toggle-arrival-mode-btn"
            onClick={() => setMode('arrival')}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              mode === 'arrival' 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            [도착]쪽지
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Column: Interactive Docket Paper Widget (LG: 6cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">

          <AnimatePresence mode="wait">
            {mode === 'arrival' ? (
              /* Arrival Printed Grid Mock Template */
              <motion.div
                key="arrival_grid"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[460px] bg-white border-2 border-slate-400 rounded-xl shadow-md p-3 xs:p-4 relative select-none"
              >
                {/* Main Gridded Table structure */}
                <div className="border border-slate-500 divide-y divide-slate-500 text-center font-bold text-slate-900 bg-[#fbfbf8] overflow-hidden rounded shadow-inner">
                  
                  {/* Row 1: 시간 | [시각값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[46px] xs:min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      시간
                    </div>

                    <button
                      type="button"
                      id="arr-field-time"
                      onClick={() => setActivePart('time')}
                      className={`col-span-9 flex flex-col items-start justify-center px-3 xs:px-4 transition-all cursor-pointer ${
                        activePart === 'time'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[7px] xs:text-[8px] text-slate-400 font-bold block mb-0.5">① 시각</span>
                      <span className="text-sm xs:text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">12:47</span>
                    </button>
                  </div>

                  {/* Row 2: 열차번호 | [값] | 홈 | [값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[46px] xs:min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      열차번호
                    </div>

                    <button
                      type="button"
                      id="arr-field-train-num"
                      onClick={() => setActivePart('train_num')}
                      className={`col-span-3 flex flex-col items-center justify-center border-r border-slate-500 px-1.5 xs:px-2 transition-all cursor-pointer ${
                        activePart === 'train_num'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[7px] xs:text-[8px] text-slate-400 font-bold block">② 번호</span>
                      <span className="text-[11px] xs:text-xs sm:text-sm font-black text-slate-800 tracking-tight">254</span>
                    </button>

                    <div className="col-span-2 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      홈
                    </div>

                    <button
                      type="button"
                      id="arr-field-platform"
                      onClick={() => setActivePart('platform')}
                      className={`col-span-4 flex flex-col items-center justify-center px-1.5 xs:px-2 transition-all cursor-pointer ${
                        activePart === 'platform'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[7px] xs:text-[8px] text-slate-400 font-bold block">③ 홈선</span>
                      <span className="text-[11px] xs:text-xs sm:text-sm font-black text-slate-800">11</span>
                    </button>
                  </div>

                  {/* Row 3: 구간 | [구간값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[46px] xs:min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      구간
                    </div>

                    <button
                      type="button"
                      id="arr-field-stations"
                      onClick={() => setActivePart('stations')}
                      className={`col-span-9 flex flex-col items-start justify-center px-3 xs:px-4 transition-all cursor-pointer ${
                        activePart === 'stations'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[7px] xs:text-[8px] text-slate-400 font-bold block">④ 구간경로</span>
                      <span className="text-[11px] xs:text-xs sm:text-sm font-black text-slate-800 tracking-wide text-left">부산</span>
                    </button>
                  </div>

                  {/* Row 4: 좌석번호 | [값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[46px] xs:min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      좌석번호
                    </div>

                    <button
                      type="button"
                      id="arr-field-seat-num"
                      onClick={() => setActivePart('seat_num')}
                      className={`col-span-9 flex flex-col items-start justify-center px-3 xs:px-4 transition-all cursor-pointer ${
                        activePart === 'seat_num'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[11px] xs:text-xs sm:text-sm font-black text-slate-800 tracking-wider">15호차 11A</span>
                    </button>
                  </div>

                  {/* Row 5: 내용 | 휠필  리프트 */}
                  <div className="grid grid-cols-12 items-stretch min-h-[48px] xs:min-h-[58px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-[10px] xs:text-xs font-black">
                      내용
                    </div>

                    <button
                      type="button"
                      id="arr-field-services-content"
                      onClick={() => setActivePart('services_content')}
                      className={`col-span-9 flex items-center justify-around px-1 xs:px-2 md:px-5 transition-all text-[10px] xs:text-xs cursor-pointer ${
                        activePart === 'services_content'
                          ? 'bg-amber-100/50 ring-2 ring-inset ring-amber-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="flex items-center gap-0.5 xs:gap-1 font-extrabold text-blue-700 shrink-0 bg-blue-100/50 px-1 xs:px-1.5 py-0.5 rounded border border-blue-200">
                        <span className="text-[8px] xs:text-[9px]">☑</span> 휠필
                      </span>
                      <span className="flex items-center gap-0.5 xs:gap-1 font-semibold text-slate-300 shrink-0 bg-slate-50/50 px-1 xs:px-1.5 py-0.5 rounded border border-slate-200/50">
                        <span className="text-[8px] xs:text-[9px]">☐</span> 리프트
                      </span>
                      <span className="text-slate-300 font-semibold shrink-0">시각</span>
                      <span className="text-slate-300 font-semibold shrink-0">무표</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Departure Hand written Style Mock Template - EXACTLY match the uploaded photo format */
              <motion.div
                key="departure_handwriting"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[460px] aspect-auto sm:aspect-[1.62] min-h-[210px] xs:min-h-[230px] sm:min-h-0 bg-[#f8f5ff] border-2 border-[#b0a0cf]/60 rounded-2xl shadow-xl p-3.5 xs:p-5 sm:p-8 flex flex-col justify-between relative select-none"
              >

                {/* Row 1 Grid: # 219 (left), 부산 (center), 18:03 (right) */}
                <div className="grid grid-cols-12 items-center w-full mt-1.5 sm:mt-2">
                  {/* Left Column: # 219 */}
                  <div className="col-span-4 justify-self-start">
                    <button
                      type="button"
                      id="dep-field-train-num"
                      onClick={() => setActivePart('dep_train_num')}
                      className={`relative px-1.5 xs:px-2.5 sm:px-3 py-0.5 sm:py-1.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        activePart === 'dep_train_num'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                      }`}
                    >
                      <span className="font-serif italic font-extrabold text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-800 tracking-wider"># 219</span>
                    </button>
                  </div>

                  {/* Center Column: 부산 */}
                  <div className="col-span-4 justify-self-center">
                    <button
                      type="button"
                      id="dep-field-destination"
                      onClick={() => setActivePart('dep_destination')}
                      className={`relative px-2 xs:px-3 sm:px-4 py-0.5 sm:py-1.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        activePart === 'dep_destination'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                      }`}
                    >
                      <span className="font-sans font-extrabold text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-800 tracking-wider">부산</span>
                    </button>
                  </div>

                  {/* Right Column: 18:03 */}
                  <div className="col-span-4 justify-self-end">
                    <button
                      type="button"
                      id="dep-field-time"
                      onClick={() => setActivePart('dep_time')}
                      className={`relative px-1.5 xs:px-2.5 sm:px-3 py-0.5 sm:py-1.5 rounded-xl border-2 transition-all cursor-pointer text-right ${
                        activePart === 'dep_time'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                      }`}
                    >
                      <span className="font-sans font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-800 tracking-tight">18:03</span>
                    </button>
                  </div>
                </div>

                {/* Row 2 Grid: 4 / 2 (Center) with haengshin container on its right */}
                <div className="flex justify-center items-center w-full my-1 relative">
                  <button
                    type="button"
                    id="dep-field-seat"
                    onClick={() => setActivePart('dep_seat')}
                    className={`relative px-4 xs:px-5 sm:px-6 py-0.5 xs:py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer text-center ${
                      activePart === 'dep_seat'
                        ? 'border-purple-600 bg-purple-100/50 shadow-md scale-105'
                        : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                    }`}
                  >
                    <span className="font-serif italic font-black text-xl xs:text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-widest">
                      4 / 2
                    </span>
                  </button>

                  {/* Red pen handwritten circle "행 (  )" note markup placed on the right of the seat button */}
                  {showHaengshinPen && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: -5 }}
                      onClick={() => setActivePart('haengshin_warning')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-30 cursor-pointer group bg-transparent"
                      title="빨간펜 행신 경유 경고 수필 - 클릭하여 학습"
                      id="departure-haengshin-stamp"
                    >
                      <div className={`relative border-[3px] rounded-full px-2.5 xs:px-3 py-0.5 bg-white/95 text-red-600 text-xs font-black tracking-tight rotate-6 shadow-md hover:scale-105 transition-transform duration-100 flex flex-col items-center ${
                        activePart === 'haengshin_warning'
                          ? 'border-red-600 bg-red-100 ring-2 ring-red-400'
                          : 'border-red-500'
                      }`}>
                        <span className="text-xs xs:text-sm font-extrabold text-red-600">행 (  )</span>
                        <span className="absolute -bottom-1 -right-1 text-[7px] xs:text-[8px] text-white bg-red-500 px-1 rounded-full animate-pulse font-bold">5분 주의</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Row 3 Grid: 리프트 (center), 10홈 (right) */}
                <div className="grid grid-cols-12 items-end w-full mb-1.5">
                  <div className="col-span-4">
                  </div>

                  {/* Center Bottom: 리프트 */}
                  <div className="col-span-4 justify-self-center">
                    <button
                      type="button"
                      id="dep-field-service"
                      onClick={() => setActivePart('dep_service')}
                      className={`relative px-2 xs:px-3 sm:px-5 py-0.5 xs:py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all cursor-pointer text-center ${
                        activePart === 'dep_service'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                      }`}
                    >
                      <span className="font-sans font-black text-sm xs:text-lg sm:text-xl md:text-2xl text-slate-950">리프트</span>
                    </button>
                  </div>

                  {/* Right Bottom: 10홈 */}
                  <div className="col-span-4 justify-self-end">
                    <button
                      type="button"
                      id="dep-field-platform"
                      onClick={() => setActivePart('dep_platform')}
                      className={`relative px-2 xs:px-3.5 sm:px-4 py-0.5 xs:py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all cursor-pointer text-right ${
                        activePart === 'dep_platform'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-purple-200 hover:bg-white/40'
                      }`}
                    >
                      <span className="font-sans font-extrabold text-sm xs:text-lg sm:text-xl md:text-2xl text-slate-950">10홈</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Quick Tab Selector */}
          <div className="flex flex-wrap gap-1.5 justify-center max-w-md pt-1">
            {currentPartsList.map(part => {
              const isActive = activePart === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => setActivePart(part.id)}
                  className={`px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-all border cursor-pointer ${
                    isActive 
                      ? mode === 'arrival'
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/10'
                        : 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10'
                      : part.id === 'haengshin_warning'
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100/60'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {part.shortName}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Instruction Card Panel (LG: 6cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPart.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 h-full flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Topic Header and Label Position */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      currentPart.id === 'haengshin_warning' 
                        ? 'bg-red-500 animate-pulse' 
                        : mode === 'arrival' ? 'bg-rose-500' : 'bg-purple-500'
                    }`}></span>
                    <h4 className="text-base font-extrabold text-slate-800">{currentPart.title}</h4>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${
                    currentPart.id === 'haengshin_warning'
                      ? 'bg-red-50 text-red-600 border-red-100'
                      : mode === 'arrival'
                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                      : 'bg-purple-50 text-purple-600 border-purple-100'
                  }`}>
                    {currentPart.position}
                  </span>
                </div>

                {/* Example preview section */}
                <div className="bg-slate-50 p-3 border border-slate-200/40 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">지문 표시 형태:</span>
                  <span className={`text-sm font-mono font-black px-2.5 py-1 rounded-lg border ${
                    currentPart.id === 'haengshin_warning' 
                      ? 'bg-red-500/10 text-red-600 border-red-200' 
                      : mode === 'arrival'
                      ? 'bg-rose-500/10 text-rose-600 border-rose-200'
                      : 'bg-purple-500/10 text-purple-600 border-purple-200'
                  }`}>
                    {currentPart.example}
                  </span>
                </div>

                {/* Plain-text Core description */}
                {currentPart.description && (
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50/50 p-3.5 rounded-lg border border-slate-100 text-justify">
                    {currentPart.description}
                  </p>
                )}

                {/* Sub Bullet Protocol Guidelines */}
                {currentPart.details && currentPart.details.length > 0 && (
                  <div className="pt-2 space-y-2.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wide flex items-center gap-1">
                      <BookOpen className={`w-3 h-3 ${mode === 'arrival' ? 'text-rose-500' : 'text-purple-500'}`} /> 
                      주요 설명
                    </span>
                    <div className="space-y-2">
                      {currentPart.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-600 leading-relaxed font-semibold">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                            currentPart.id === 'haengshin_warning' 
                              ? 'text-red-500' 
                              : mode === 'arrival' ? 'text-rose-500' : 'text-purple-500'
                          }`} />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Special Tip warning card */}
              {currentPart.importantHint && (
                <div className={`mt-4 p-3.5 rounded-xl border flex gap-3 items-start ${
                  currentPart.id === 'haengshin_warning'
                    ? 'bg-red-50/70 border-red-200 text-red-800'
                    : 'bg-amber-50/70 border-amber-200 text-amber-800'
                }`}>
                  <AlertTriangle className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${
                    currentPart.id === 'haengshin_warning' ? 'text-red-500' : 'text-amber-500'
                  }`} />
                  <div className="text-[11px] font-bold leading-normal">
                    <span className="block font-black text-[10px] tracking-wider mb-0.5 uppercase">
                      {currentPart.id === 'haengshin_warning' ? '⚠️ 지연 및 출발 인계 경고수칙' : '💡 주요 안내사항'}
                    </span>
                    {currentPart.importantHint}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {mode === 'departure' && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setShowHaengshinPen(!showHaengshinPen)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              showHaengshinPen 
                ? 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/20' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${showHaengshinPen ? 'bg-white animate-ping' : 'bg-red-400'}`} />
            {showHaengshinPen ? '빨간펜 행( ) 표시 켜짐' : '빨간펜 행( ) 표시 끔'}
          </button>
        </div>
      )}

    </div>
  );
}
