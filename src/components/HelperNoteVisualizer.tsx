import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2,
  MousePointer,
  BookOpen,
  Sparkles,
  ArrowRightLeft,
  Navigation,
  Clock,
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
  const [mode, setMode] = useState<'arrival' | 'departure'>('arrival');
  const [activePart, setActivePart] = useState<string>('arrival_departure');
  const [showHaengshinPen, setShowHaengshinPen] = useState<boolean>(true);

  // Sync active parts when switching mode
  useEffect(() => {
    if (mode === 'arrival') {
      setActivePart('arrival_departure');
    } else {
      setActivePart('dep_train_num');
    }
  }, [mode]);

  const arrivalParts: NotePart[] = [
    {
      id: 'arrival_departure',
      title: '① 출·도착 구분 (1행 좌측)',
      shortName: '출·도착 구분',
      position: '도착 (1행 좌측 대형 빨간 글씨)',
      example: '도착',
      description: '열차가 서울역에 승하차하기 위해 다가오는 중인지, 맞이방부터 승차 배웅해야 하는 차량인지를 정의하는 최우선 판단기입니다.',
      details: [
        '도착(붉은 기재): 열차 도착 예정 "5분 전"까지 플랫폼 리프트 세팅 포인트에 도달해 대기 완료하는 일체 규정을 실행합니다.',
        '출발: 맞이방 대여실 앞 약속 장소에서 승객을 조우하여 출발 시간 "15분 전"까지 탑승을 완수해야 합니다.',
        '경로와 대기 지점이 완벽히 반대로 흐르게 되는 역무 프로토콜의 최초 차단 필터입니다.'
      ],
      importantHint: '출/도착 글자를 혼동하는 것은 초보 도우미들이 가장 쉽게 범하거나 심각한 딜레이를 내는 요인이니 꼭 확인하십시오.'
    },
    {
      id: 'time',
      title: '② 예약 및 운행 시각 (1행 우측)',
      shortName: '예약 시간',
      position: '시간 (1행 우측 란)',
      example: '12:47',
      description: '열차가 기구 상 정시에 맞추어 발착 개시하는 가늠선 정보입니다.',
      details: [
        '출발 열차의 경우 정각에 지체 없이 문이 결속되므로 시각 기준 최소 20분 전 이동 트리거를 개시합니다.',
        '도착 열차의 경우 무전 방송의 조기/지연 보고 연동과 대조하여 지점 대기 리프트 도킹 준비 타임을 보정합니다.'
      ],
      importantHint: '단 1분의 지각도 승차를 영영 놓치게 만들어 여정에 중대 지장을 유발하므로 상시 스마트 시계 초단위를 모니터링하십시오.'
    },
    {
      id: 'train_num',
      title: '③ 열차 고유 코드 (2행 좌측)',
      shortName: '열차 번호',
      position: '열차번호 (2행 좌측 란)',
      example: 'KTX 254',
      description: '배정된 승수 기차 편대의 넘버입니다. 무전 통화 및 타 업무국 공조 소통 시 주축 체크키로 지정됩니다.',
      details: [
        '차량 번호를 보면 일반 KTX(18호차 긴 동석), 산천 중련(전면 후면 합체 부위 호차 유의), 이음 등을 역추산합니다기 위한 도구입니다.',
        '무전 규약: "[센터] 254열차 현장 진입 시작합니다"처럼 지시 번호를 소리 내어 복창 동기화하는 관습이 있습니다.'
      ],
      importantHint: '기차 제원에 따라 전철 도어와 리프트 위치가 전혀 다르게 전개되므로, 번호를 보는 즉시 머릿속으로 기차 열 구조를 투영해야 합니다.'
    },
    {
      id: 'platform',
      title: '④ 전용 승강 트랙 (2행 우측)',
      shortName: '승강장 홈',
      position: '홈 (2행 우측 란)',
      example: '10홈',
      description: '기차가 발주 또는 귀항하는 승강 선로 대열 넘버입니다.',
      details: [
        '수많은 배선망이 교차하는 복잡한 서울역에서 즉각적인 맞춤 루트를 고정 판단하게 합니다.',
        '홈이 지목되면 지체 없이 해당 홈과 인접한 역사 내 2층 수직 유도 엘리베이터 이동 노선을 계획합니다.'
      ],
      importantHint: '기습적인 선로 노선 조율이나 혼선으로 홈이 발차 직전에 변하는 기동 무선이 올 수 있어 상시 귀를 귀울여야 합니다.'
    },
    {
      id: 'stations',
      title: '⑤ 운행 방면 구간 (3행)',
      shortName: '운행 구간',
      position: '구간 (3행 란)',
      example: '서울 ➔ 부산',
      description: '열차가 도달하게 될 발착 구간 최종 목적 경로 시각 지표입니다.',
      details: [
        '해외 여행객이나 환승 승객 인도를 도울 때 기차가 올바른 방향으로 나아가는지 재점검하는 가림 방어막이 됩니다.',
        '서울을 거쳐 부산으로 가는지 상향 승강장으로 들어가 오배송하는 크리티컬 휴먼 에러를 안전하게 가로막아 줍니다.'
      ]
    },
    {
      id: 'seat_num',
      title: '⑥ 예약 탑승 좌석 (4행)',
      shortName: '좌석 번호',
      position: '좌석번호 (4행 란)',
      example: '15호차 11A',
      description: '휠체어 케어 전용 하드웨어 석 혹은 동행 시트 전임 배정 정보 구획입니다.',
      details: [
        'KTX 기종별로 장애인 정렬 승차 칸이 15호차(KTX) 등으로 사전에 배당되어 있습니다.',
        '발 위치 노란색 "휠체어 정선 리프트 세팅 안내선"을 지평삼아 오차 없이 리프트 이동 바퀴를 사전 접목해야 수량 낭비를 예방합니다.'
      ],
      importantHint: '아주 미세한 타공 오차로 정지선 호차가 어긋나면 단 5분 안에 수백 킬로그램 리프트를 밀고 전철을 배회해야 하는 비상이 연출됩니다.'
    },
    {
      id: 'services_content',
      title: '⑦ 도우미 서비스 세부 정보 (5행)',
      shortName: '서비스 내용',
      position: '내용 (5행 하단 체크항목)',
      example: '휠필 [V] / 리프트 [V] 체크',
      description: '수동 밀착 보조 장치 점검, 지상 리프트 조립 동원에 관한 세부 체크리스트 지휘 구역입니다.',
      details: [
        '휠필(휠체어필수): 승강 보관 창구에서 무상 지참한 휠체어로 고객 동선 수직 밀착 가이드를 실천하는 역무입니다.',
        '리프트: 승강판 구동 리프트 세팅 지시로, 역사 소유 리프트 전지 키와 대동인 구조를 필히 대조해야 정렬에 무리가 없습니다.',
        '무수하게 나열된 체크 란 중 V 체크 마크된 서비스만을 프로토콜에 따라 신속 결행합니다.'
      ],
      importantHint: '리프트 수기가 체크 되어 있다면 예비 지대에서 승하강 레일을 사전 조율 도킹 대기시켜 배웅 차질을 소거해야 합니다.'
    },
    {
      id: 'haengshin_warning',
      title: '⚠️ 행신발 경유 기차 알림 (빨간 펜 수동 표시)',
      shortName: '행신발 수동 경고',
      position: '실무지 상하 좌우 수필 마킹',
      example: '수동 빨간 펜 "행( )" 서명',
      description: '서울역 영내 시발 차가 아닌, 행신 차고지발로 서울역 승강장에서 대기 타임이 단 5분여인 긴박 유도 차량 표시입니다.',
      details: [
        '승객 하차 문 개폐 지연 시 곧바로 관제 발차가 들어와 도우미가 미처 하강하지 못하고 하행 강제 탑승되어 끌려가는 고위험 사고가 수시로 발발하는 구역입니다.',
        '쪽지 모서리에 수필로 붉은 "행"이나 "행( )"이 마킹되어 있다면, 모든 가이드 속도를 200% 앞당겨 조기 집결을 끝내야 생환합니다.'
      ],
      importantHint: '반드시 출발 역 전송 무전이 울리기 직전 승무원 도어마스터에게 협조 대화 수동 제륜을 사전에 요청해 문 개폐 협약을 맺는 것이 현지 비법입니다.'
    }
  ];

  const departureParts: NotePart[] = [
    {
      id: 'dep_train_num',
      title: '① 수기 열차 고유 기호 (# 219)',
      shortName: '수기 열차번호',
      position: '수기 메모 좌측 상단',
      example: '# 219',
      description: '현장 무전 속 수신되는 열차 코드를 빠르게 받아적기 위해 한글 브랜드를 생략하고 샵(#) 기호로 기차 번호를 기입한 수필 양식입니다.',
      details: [
        '# 219 기호는 실제 전산 전송 상의 "KTX 219 열차"를 다이렉트로 축약 수필한 실무 약식 부호입니다.',
        '도우미 일방 쪽지 제작 시, 바쁜 구두 접수 순간에는 # 기호 뒤의 세 자리 번호가 가장 중요한 고유 정렬 대상 번호가 됩니다.',
        '이 열차가 수입 일반 KTX인지 단층 산천 편성인지 머릿속으로 빨리 제원 맵을 파악해 장비 조율 플랜을 구상하셔야 최적 정렬선이 완성됩니다.'
      ],
      importantHint: '현업 약어로 통하지만, "#" 표시를 샵이나 다른 암식 부호로 미뤄 짐작해 번호를 헷갈려서는 전임 대조가 되지 않습니다.'
    },
    {
      id: 'dep_destination',
      title: '② 행선지 목표 구약 (부산)',
      shortName: '수기 목적역',
      position: '수기 메모 중앙 상단',
      example: '부산',
      description: '출발 승객의 하행 종착역이자 주행 방향을 식별하게 하는 지리적 정보 소형 수필입니다.',
      details: [
        '승객 배웅 과정 중 객실 내 해당 안심 휠체어 고정 좌석에 인도 완료한 뒤, 고객 승차권의 종착지와 도우미 쪽지의 지명을 대조 교차 검증합니다.',
        '서울역에서 상행 잘못 기획된 열차로 오승 유도해 내는 최후의 배송 대참사를 한 순간에 지켜내는 기계식 차폐 지명 코드입니다.'
      ]
    },
    {
      id: 'dep_time',
      title: '③ 열차 출발 시간 (12:25)',
      shortName: '수기 시간',
      position: '수기 메모 우측 상단',
      example: '12:25',
      description: '승객을 실은 열차가 서울역 승강 선을 뒤로하고 탈출 출발하는 마감 예정 시각입니다.',
      details: [
        '가운데 분수 약자 11/2번 앞에 탑승 완료한 뒤 객실 도어 렌즈가 완전 격리 봉쇄되는 절대 소모 초 계산기입니다.',
        '12:25 시각을 접하는 그 즉시, 골든 타임 15분 전인 "12:10"까지 플랫폼 계착 완결 세팅을 목표로 해 11:55~12:00 분 사이 맞이방 면담을 결행해야 최적 이동이 보장됩니다.'
      ],
      importantHint: '출발 시각 오독은 승차 완결이 실패해 도우미 귀책 요인이 되는 가장 뼈아픈 역무 미필 사태의 지각 기제가 됩니다.'
    },
    {
      id: 'dep_seat',
      title: '④ 수식 호차 및 좌석 약호 (11 / 2)',
      shortName: '수기 호차/좌석',
      position: '수기 메모 중앙 분수식',
      example: '11 / 2',
      description: '철도 요원이 가장 크게 사선을 이용해 기재해 놓은 실무 수필의 꽃이며, [11호차 의 전용 휠체어 2석]을 함축한 정예 정보입니다.',
      details: [
        '빗금 수식 앞 방향 숫자인 "11"은 승하강 리프트를 가설 접착해야 할 구동 타깃 "11호차 승차문"임을 지시합니다.',
        '우측 숫자 "2"는 객차 문을 열고 진입한 곳 배후 배정된 특수 전동/수동 휠체어 잠금 고정용 2번 앵커스팟(또는 승용 승객 2인)을 정확히 일컽는 실무자 고유 부호입니다.',
        '11호차 정렬 리프트 마킹 노면에 단 1센티 오차도 허용 않는 직각 정렬 대기를 시키는 근거 구동 넘버입니다.'
      ],
      importantHint: '이 수기 분수 암호의 가림 판독 실패 시 전혀 상관없는 호차 문 앞에 중장비를 세팅하여 통째로 홈에 갇히는 참혹한 상황이 생깁니다.'
    },
    {
      id: 'dep_service',
      title: '⑤ 수기 지정 장치 명령 (리프트)',
      shortName: '수기 지원내용',
      position: '수기 메모 하단 중앙',
      example: '리프트',
      description: '수동 및 시각 안내 수준의 도보 케어가 아닌, 크고 무거운 기계식 전동 휠체어 차량 리프트 장비를 대동하라는 강력한 장비 소명 수필입니다.',
      details: [
        '이 수기 서명을 인지하는 즉시, 보관소 지하에서 전용 마스터 키를 주머니에 파지했는지 확인한 후 승용 기중기를 정지선에 세팅합니다.',
        '기차 실무 정차 시 전등이 완수 점등되는지 점검하고, 리프트 발판 상승 유압 레버를 단숨에 구동 가능한 상태로 수평 맞추어 둡니다.'
      ],
      importantHint: '리프트가 기재되었는데 마스터 키가 없거나 1인 단독 출장 시 승하가 불가해 기차가 지연되는 무전 긴급 호출이 터질 수 있습니다.'
    },
    {
      id: 'dep_platform',
      title: '⑥ 열차 계류 트랙 승강선 (10홈)',
      shortName: '수기 승강홈',
      position: '수기 메모 우측 하단',
      example: '10홈',
      description: '출발할 지정 열차가 대기 및 주차되어 손님을 대행 승차 시키기를 도모하는 선로 트랙 지명 수필입니다.',
      details: [
        '서울역 게이트 중 10번 구동 통로 방향 수직 전용 엘리베이터 이동 계획망을 확립합니다.',
        '출발 전 역사 전송 무전이 들릴 때 타 승합 선로로 가변 변경 고지되는지 유의 깊게 수신 상태를 맞출 수 있게 합니다.'
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
            <span className="px-2.5 py-1 bg-purple-500/10 text-purple-600 text-[11px] font-black rounded-lg border border-purple-500/15 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600 animate-pulse" /> 실무 고증 100%
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 text-[11px] font-black rounded-lg border border-emerald-500/15">
              도우미 쪽지 완벽 분석 판독기
            </span>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight ml-1">실전 도우미 쪽지 분석기</h3>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1.5 leading-relaxed">
            코레일 실무 및 서울역 역사 현업 요원들이 수령하는 <span className="text-slate-800 font-bold">인쇄용 규격 전산식 양식(주로 도착)</span>과 
            구두 무전 수령 시 급히 흘겨 적는 <span className="text-purple-600 font-bold">수기 메모식 양식(주로 출발)</span>을 100% 실물 고증했습니다. 상단 탭을 눌러 즉시 전환해 보세요.
          </p>
        </div>

        {/* Action Toggle Zone: Arrival / Departure One-Touch */}
        <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto shadow-inner">
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
            [도착] 정식 규격 인쇄표
          </button>
          
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
            [출발] 수기 간편 메모
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Column: Interactive Docket Paper Widget (LG: 6cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
          
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <MousePointer className="w-3.5 h-3.5 animate-bounce text-purple-600" />
            {mode === 'arrival' ? '전산 규격 양식의 필드를 클릭하여 학습' : '수수 간이 메모의 실제 필기체를 클릭하여 학습'}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'arrival' ? (
              /* Arrival Printed Grid Mock Template */
              <motion.div
                key="arrival_grid"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[460px] bg-white border-2 border-slate-400 rounded-xl shadow-md p-4 relative select-none"
              >
                {/* Red pen handwritten circle "행( )" note markup if turned on */}
                {showHaengshinPen && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: -5 }}
                    onClick={() => setActivePart('haengshin_warning')}
                    className="absolute -top-2 -right-2 z-30 cursor-pointer group bg-transparent"
                    title="빨간펜 행신 경유 경고 수필 - 클릭하여 학습"
                    id="arrival-haengshin-stamp"
                  >
                    <div className="relative border-[3px] border-red-500 rounded-full px-3 py-1 bg-white/95 text-red-600 text-xs font-black tracking-tight rotate-12 shadow-md hover:scale-105 transition-transform duration-100 flex flex-col items-center">
                      <span className="text-[8px] font-black text-red-500/80 leading-none">행신경유</span>
                      <span className="text-sm font-extrabold text-red-600">행( ) 경유</span>
                      <span className="absolute -bottom-1 -right-1 text-[8px] text-white bg-red-500 px-1 rounded-full animate-pulse font-bold">5분 정차 주의!</span>
                    </div>
                  </motion.div>
                )}

                {/* Main Gridded Table structure mimicking the photo */}
                <div className="border border-slate-500 divide-y divide-slate-500 text-center font-bold text-slate-900 bg-[#fbfbf8] overflow-hidden rounded shadow-inner">
                  
                  {/* Row 1: 도착 | 시간 | [시각값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[55px]">
                    <button
                      type="button"
                      id="arr-field-arrival"
                      onClick={() => setActivePart('arrival_departure')}
                      className={`col-span-5 flex flex-col items-center justify-center border-r border-slate-500 px-2 transition-all cursor-pointer ${
                        activePart === 'arrival_departure'
                          ? 'bg-rose-100/80 ring-2 ring-inset ring-rose-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[9px] text-[#d13b4c] font-bold block mb-0.5">① 출·도착구분</span>
                      <span className="text-2xl font-black text-[#d13b4c] tracking-[0.25em] pl-[0.25em]">도착</span>
                    </button>

                    <div className="col-span-2 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      시간
                    </div>

                    <button
                      type="button"
                      id="arr-field-time"
                      onClick={() => setActivePart('time')}
                      className={`col-span-12 md:col-span-5 flex flex-col items-center justify-center px-3 transition-all cursor-pointer ${
                        activePart === 'time'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[9px] text-slate-400 font-bold block mb-0.5">② 시각</span>
                      <span className="text-lg font-black text-slate-800 font-mono tracking-tight">12:47</span>
                    </button>
                  </div>

                  {/* Row 2: 열차번호 | [값] | 홈 | [값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      열차번호
                    </div>

                    <button
                      type="button"
                      id="arr-field-train-num"
                      onClick={() => setActivePart('train_num')}
                      className={`col-span-3 flex flex-col items-center justify-center border-r border-slate-500 px-2 transition-all cursor-pointer ${
                        activePart === 'train_num'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[8px] text-slate-400 font-bold block">③ 번호</span>
                      <span className="text-xs font-black text-slate-800 tracking-tight">KTX 254</span>
                    </button>

                    <div className="col-span-2 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      홈
                    </div>

                    <button
                      type="button"
                      id="arr-field-platform"
                      onClick={() => setActivePart('platform')}
                      className={`col-span-4 flex flex-col items-center justify-center px-2 transition-all cursor-pointer ${
                        activePart === 'platform'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[8px] text-slate-400 font-bold block">④ 홈선</span>
                      <span className="text-sm font-black text-slate-800">10홈</span>
                    </button>
                  </div>

                  {/* Row 3: 구간 | [구간값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      구간
                    </div>

                    <button
                      type="button"
                      id="arr-field-stations"
                      onClick={() => setActivePart('stations')}
                      className={`col-span-9 flex flex-col items-start justify-center px-4 transition-all cursor-pointer ${
                        activePart === 'stations'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[8px] text-slate-400 font-bold block">⑤ 구간경로</span>
                      <span className="text-xs font-black text-slate-800 tracking-wide text-left">서울 ➔ 부산 (경부선)</span>
                    </button>
                  </div>

                  {/* Row 4: 좌석번호 | [값] */}
                  <div className="grid grid-cols-12 items-stretch min-h-[55px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      좌석번호
                    </div>

                    <button
                      type="button"
                      id="arr-field-seat-num"
                      onClick={() => setActivePart('seat_num')}
                      className={`col-span-9 flex flex-col items-start justify-center px-4 transition-all cursor-pointer ${
                        activePart === 'seat_num'
                          ? 'bg-purple-100/80 ring-2 ring-inset ring-purple-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="text-[8px] text-slate-400 font-bold block">⑥ 정밀 배정좌석</span>
                      <span className="text-xs font-black text-slate-800 tracking-wider">15호차 11A (전동 휠 고정석 인근)</span>
                    </button>
                  </div>

                  {/* Row 5: 내용 | 휠필  리프트  시각  무표 */}
                  <div className="grid grid-cols-12 items-stretch min-h-[58px]">
                    <div className="col-span-3 flex items-center justify-center border-r border-slate-500 bg-slate-100/60 px-1 text-slate-600 text-xs font-black">
                      내용
                    </div>

                    <button
                      type="button"
                      id="arr-field-services-content"
                      onClick={() => setActivePart('services_content')}
                      className={`col-span-9 flex items-center justify-around px-2 md:px-5 transition-all text-xs cursor-pointer ${
                        activePart === 'services_content'
                          ? 'bg-amber-100/50 ring-2 ring-inset ring-amber-500'
                          : 'hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="flex items-center gap-1 font-extrabold text-blue-700 shrink-0 bg-blue-100/50 px-1.5 py-0.5 rounded border border-blue-200">
                        <span className="text-[9px]">☑</span> 휠필
                      </span>
                      <span className="flex items-center gap-1 font-extrabold text-amber-700 shrink-0 bg-amber-100/50 px-1.5 py-0.5 rounded border border-amber-200">
                        <span className="text-[9px]">☑</span> 리프트
                      </span>
                      <span className="text-slate-300 line-through decoration-slate-300/80 font-semibold shrink-0">시각</span>
                      <span className="text-slate-300 line-through decoration-slate-300/80 font-semibold shrink-0">무표</span>
                    </button>
                  </div>
                </div>

                {/* Sub annotations info */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-mono">
                  <span>* CO_HELPER_DOCKET v4_REV</span>
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 도착 시 미팅 5분 전 필수 대기!
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Departure Hand written Style Mock Template - EXACTLY reproducing the second photo! */
              <motion.div
                key="departure_handwriting"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[460px] aspect-[1.62] bg-[#eae7f5] border-2 border-dashed border-[#bea9e4] rounded-2xl shadow-xl p-5 md:p-8 flex flex-col justify-between relative overflow-hidden select-none"
                style={{ backgroundImage: 'linear-gradient(rgba(190, 169, 228, 0.1) 1px, transparent 1px)', backgroundSize: '100% 24px' }}
              >
                {/* Visual indicators for handwriting paper atmosphere */}
                <div className="absolute top-2 right-4 text-[9px] text-[#a090cb] font-bold select-none tracking-widest font-mono">
                  MEMO DRAFT (출발 전지용)
                </div>

                {/* Row 1 Grid: # 219 (left), 부산 (center), 12:25 (right) */}
                <div className="grid grid-cols-12 items-center w-full mt-3">
                  {/* Left Column: # 219 */}
                  <div className="col-span-4 justify-self-start">
                    <button
                      type="button"
                      id="dep-field-train-num"
                      onClick={() => setActivePart('dep_train_num')}
                      className={`relative group px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        activePart === 'dep_train_num'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-[#bea9e4]/40 hover:bg-white/40'
                      }`}
                    >
                      <span className="block text-[8px] text-[#8e7cae] font-black leading-none mb-1">① 열차번호</span>
                      <span className="font-serif italic font-extrabold text-2xl text-slate-800 tracking-wider"># 219</span>
                    </button>
                  </div>

                  {/* Center Column: 부산 */}
                  <div className="col-span-4 justify-self-center">
                    <button
                      type="button"
                      id="dep-field-destination"
                      onClick={() => setActivePart('dep_destination')}
                      className={`relative group px-4 py-1.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        activePart === 'dep_destination'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-[#bea9e4]/40 hover:bg-white/40'
                      }`}
                    >
                      <span className="block text-[8px] text-[#8e7cae] font-black leading-none mb-1">② 행선지</span>
                      <span className="font-serif font-black text-2xl text-slate-800 tracking-widest">부산</span>
                    </button>
                  </div>

                  {/* Right Column: 12:25 */}
                  <div className="col-span-4 justify-self-end">
                    <button
                      type="button"
                      id="dep-field-time"
                      onClick={() => setActivePart('dep_time')}
                      className={`relative group px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer text-right ${
                        activePart === 'dep_time'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-[#bea9e4]/40 hover:bg-white/40'
                      }`}
                    >
                      <span className="block text-[8px] text-[#8e7cae] font-black leading-none mb-1">③ 출발시간</span>
                      <span className="font-mono font-bold text-2xl text-slate-800 tracking-tight">12:25</span>
                    </button>
                  </div>
                </div>

                {/* Row 2 Grid: 11 / 2 (Center) */}
                <div className="flex justify-center items-center w-full -my-1">
                  <button
                    type="button"
                    id="dep-field-seat"
                    onClick={() => setActivePart('dep_seat')}
                    className={`relative group px-6 py-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                      activePart === 'dep_seat'
                        ? 'border-purple-600 bg-purple-100/50 shadow-md scale-105 ring-2 ring-purple-600/10'
                        : 'border-transparent hover:border-[#bea9e4]/50 hover:bg-white/50'
                    }`}
                  >
                    <span className="block text-[9px] text-[#8e7cae] font-black leading-none mb-1">④ 정식 호차 / 좌석</span>
                    <span className="font-serif italic font-extrabold text-3xl text-slate-900 tracking-widest">
                      11 / 2
                    </span>
                    <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 text-[8px] bg-purple-600 text-white font-black px-1.5 py-0.5 rounded-md scale-90 whitespace-nowrap">
                      11호차 2석
                    </span>
                  </button>
                </div>

                {/* Row 3 Grid: 리프트 (center), 10홈 (right) */}
                <div className="grid grid-cols-12 items-end w-full mb-2">
                  <div className="col-span-4">
                    {/* Visual filler to match visual weight of the handwritten block under side notes */}
                    <div className="text-[10px] text-slate-400 italic font-medium leading-tight">
                      * 출발안전 <br/> 최우선!
                    </div>
                  </div>

                  {/* Center Bottom: 리프트 */}
                  <div className="col-span-4 justify-self-center">
                    <button
                      type="button"
                      id="dep-field-service"
                      onClick={() => setActivePart('dep_service')}
                      className={`relative group px-5 py-2 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        activePart === 'dep_service'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-[#bea9e4]/40 hover:bg-white/40'
                      }`}
                    >
                      <span className="block text-[8px] text-[#8e7cae] font-black leading-none mb-1">⑤ 장비요청</span>
                      <span className="font-serif font-black text-xl text-[#2b273d] underline decoration-purple-400 decoration-2">리프트</span>
                    </button>
                  </div>

                  {/* Right Bottom: 10홈 */}
                  <div className="col-span-4 justify-self-end">
                    <button
                      type="button"
                      id="dep-field-platform"
                      onClick={() => setActivePart('dep_platform')}
                      className={`relative group px-4 py-2 rounded-xl border-2 transition-all cursor-pointer text-right ${
                        activePart === 'dep_platform'
                          ? 'border-purple-600 bg-purple-100/50 shadow-sm scale-105'
                          : 'border-transparent hover:border-[#bea9e4]/40 hover:bg-white/40'
                      }`}
                    >
                      <span className="block text-[8px] text-[#8e7cae] font-black leading-none mb-1">⑥ 정렬선 홈</span>
                      <span className="font-serif font-extrabold text-2xl text-purple-950">10홈</span>
                    </button>
                  </div>
                </div>

                {/* Simulated signature or pencil scratching */}
                <div className="absolute left-4 bottom-1.5 text-[8px] text-[#a090cb] font-semibold italic">
                  * 수기 무전 속사 필기체
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sub Switch Instruction Tool */}
          <div className="flex items-center gap-1 bg-white p-2 rounded-xl border border-slate-200 text-xs text-slate-500 font-semibold shadow-sm w-full max-w-[460px] justify-center">
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>상단의</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mode === 'arrival' ? 'bg-rose-50 text-rose-600' : 'bg-purple-50 text-purple-600'}`}>
              {mode === 'arrival' ? '도착' : '출발'}
            </span>
            <span>탭을 누르면 실물 사진들의 서로 다른 규격으로 변경됩니다.</span>
          </div>

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
                  <span className="text-xs font-bold text-slate-500">지문 실제 기록 예문:</span>
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
                <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50/50 p-3.5 rounded-lg border border-slate-100 text-justify">
                  {currentPart.description}
                </p>

                {/* Sub Bullet Protocol Guidelines */}
                <div className="pt-2 space-y-2.5">
                  <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wide flex items-center gap-1">
                    <BookOpen className={`w-3 h-3 ${mode === 'arrival' ? 'text-rose-500' : 'text-purple-500'}`} /> 
                    실무 수칙 & 현직 도우미 대응 노하우
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
                      {currentPart.id === 'haengshin_warning' ? '⚠️ 지연 및 출발 인계 경고수칙' : '💡 필독 실무자 안전가이드'}
                    </span>
                    {currentPart.importantHint}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {mode === 'arrival' && (
        /* Additional Toggle Feature for Haengshin warning stamps */
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
