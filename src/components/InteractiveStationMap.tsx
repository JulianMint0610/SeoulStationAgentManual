import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HelperNoteVisualizer from './HelperNoteVisualizer';
import { 
  MapPin, 
  Map, 
  Navigation, 
  HelpCircle, 
  Compass, 
  Accessibility, 
  Utensils, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface InteractiveStationMapProps {
  itemId: string;
}

export default function InteractiveStationMap({ itemId }: InteractiveStationMapProps) {
  if (itemId === 'si-1') {
    return <SeoulStationLayoutMap />;
  } else if (itemId === 'si-2' || itemId === 'pa-4') {
    return <PlatformVisualizer />;
  } else if (itemId === 'si-3') {
    return <CafeteriaRouteMap />;
  } else if (itemId === 'pa-0') {
    return <HelperNoteVisualizer />;
  }
  return null;
}

/* ==========================================================================
   1. SEOUL STATION LAYOUT MAP (si-1)
   ========================================================================== */
interface RouteSim {
  id: string;
  startId: string;
  endId: string;
  name: string;
  title: string;
  badge: string;
  path: { x: string; y: string }[];
  steps: string[];
}

function SeoulStationLayoutMap() {
  const [activeSpot, setActiveSpot] = useState<string | null>('camp');

  const spots = [
    {
      id: 'camp',
      title: '출도착 사무실 (요원실)',
      coords: { x: '28.3%', y: '44.1%' },
      color: 'bg-blue-600',
      description: '사회복무요원들이 대기하고 출퇴근/도우미 무전을 인계받는 메인 허브입니다.',
      details: [
        '역사 2층 회의실 입구 옆 복도 안쪽에 위치해 있습니다.',
        '교통약자 대여용 휠체어 보관실 및 무전기 충전 구역입니다.',
        '오른쪽에는 "매표창구"와 "고지실(철경)"이 차례로 자리잡고 있습니다.',
        '출도착 사무실 바로 아래쪽(게이트 방면)으로 향하면 13, 14번 홈 내려가는 계단이 있고, 우측으로 길게 연결된 동선을 타고 가면 11, 12번 홈 내려가는 계단이 있습니다.'
      ]
    },
    {
      id: 'info_desk',
      title: '종합안내소 (2층 맞이방 정중앙)',
      coords: { x: '50.1%', y: '24.3%' },
      color: 'bg-amber-500',
      description: '2층 맞이방 한가운데 위치한 서울역의 가장 상징적이고 중요한 종합안내 센터입니다.',
      details: [
        '교통약자 이용객들이 가장 먼저 들러 예약 상태를 확인하거나 접선을 청하는 핵심 거점입니다.',
        '서울역 전체 안내의 허브로, 출도착 사무실과 함께 요원들의 동선에서 가장 중요도가 높습니다.',
        '대합실 시각 장애인용 바닥 유도 블록이 이곳 종합안내소를 기점으로 조밀하게 연결되어 있습니다.'
      ]
    },
    {
      id: 'east_clock',
      title: '동부 대합실 시계탑 앞',
      coords: { x: '92.2%', y: '46.7%' },
      color: 'bg-emerald-600',
      description: '서울역 동부(정문) 대합실 방면의 대표적인 핵심 약속 및 접선 위치입니다.',
      details: [
        '출발 교통약자 도우미 서비스 신청자와 접선 빈도가 대단히 높은 상징적인 존입니다.',
        '3층 대합실 에스컬레이터 옆 고지 광장 대형 시계탑 앞 구역입니다.',
        '대합실 한복판의 복잡성을 피해 3층 보도 데크에서 하향하는 접수자 연결 통로 역할을 감당합니다.'
      ]
    },
    {
      id: 'west_taxi',
      title: '서부 택시 승강장 (계단 하부)',
      coords: { x: '4.7%', y: '80.6%' },
      color: 'bg-indigo-600',
      description: '서부 출입구로 나와서 요원 시점 기준 왼쪽 계단으로 내려가면 위치하는 택시 탑승소입니다.',
      details: [
        '도착 교통약자를 안전하게 택시 차 내까지 탑승 지원 및 배웅하는 최종 구역입니다.',
        '계단 하부 및 급한 경사로 부근이므로 수동 휠체어 전개 및 제동에 상시 제동 가디언을 세워야 합니다.',
        '인도 완료 후에는 대여한 전용 휠체어를 유실 없이 수거해 요원실로 안전 복귀 처리합니다.'
      ]
    },
    {
      id: 'west_cargo',
      title: '서부 화물 하역장 (수평 연계)',
      coords: { x: '9.1%', y: '21.5%' },
      color: 'bg-purple-600',
      description: '서부 출입구로 나와서 계단을 내려가지 않고 수평 방향 오른쪽으로 향하면 나오는 하역장입니다.',
      details: [
        '계단이 없으며 폭이 넓고 아주 완만한 경사로만으로 구성되어 교통약자 이동 동선의 비밀 활로가 됩니다.',
        '엘리베이터가 극심하게 붐비거나 정비 중일 때 지상 이동의 최적 대안으로 권장됩니다.',
        '단, 하역장 특성상 물류 화물 차량 이동이 간헐적으로 활발하므로 주변 시야 안전에 필수로 대비해야 합니다.'
      ]
    },
    {
      id: 'airport_rail',
      title: '공항철도 연계통로 (지하 3층 연결)',
      coords: { x: '15.1%', y: '81.5%' },
      color: 'bg-teal-600',
      description: '15번 출구 방면 에스컬레이터를 타고 내리막 통로를 따라 공항철도 지하 환승 공간 및 승강장으로 연결됩니다.',
      details: [
        '서부 15번 출구에서 에스컬레이터를 타고 아래로 깊게 진입하는 핵심 연계 통로망입니다.',
        '경사각이 큰 연계 구간이므로 수동 및 동력 휠체어 전개 동행 시 낙상과 안전거리를 집중 방어합니다.',
        '지하철 환승 노선과 연계성이 높아 요원들의 인도 빈도가 매우 잦은 필수 접경 영역입니다.'
      ]
    },
    {
      id: 'platforms',
      title: '열차 타는 곳 (플랫폼 3~14)',
      coords: { x: '50.1%', y: '76.3%' },
      color: 'bg-rose-600',
      description: '1층에 배치된 고속철도 KTX 및 일반열차 승하차 승강장 구역입니다.',
      details: [
        '출도착 사무실 기점으로 하향 진입 시 복도의 우측은 13, 14번 홈 방향(가까움), 우측 복도를 따라 멀리 이동하면 11, 12번 홈 방향으로 연계됩니다.',
        '도착 안내 시에는 열차 진입 예정 5분 전에 지정 홈/지정 호차에 도달하여 승차 발판 리프트를 세팅해야 합니다.',
        '출발 안내 시에는 안전 타임 15분 전 배웅 승차 지원을 책임감 있게 완료 처리합니다.'
      ]
    }
  ];

  const currentSpot = spots.find(s => s.id === activeSpot) || spots[0];

  const backgroundBoxes = [
    // LOTTE OUTLET (Top Center)
    {
      id: 'lotte_outlet',
      name: 'LOTTE OUTLET (롯데아울렛 입구)',
      style: { left: '32.8%', width: '35.4%', top: '5.3%', height: '4.4%' },
      className: 'bg-slate-900/30 border border-slate-800 text-[6px] text-slate-400 font-bold',
      label: 'LOTTE OUTLET (롯데아울렛 입구)'
    },
    // West Cargo (Top Left) - Moved downwards closer to the main area as requested
    {
      id: 'west_cargo_box',
      name: '서부 화물하역장 (west_cargo)',
      style: { left: '1.3%', width: '15.6%', top: '15.3%', height: '12.5%' },
      className: 'border border-slate-800 bg-slate-950/60 flex-col',
      interactiveId: 'west_cargo',
      activeColor: 'border-purple-500 bg-purple-950/15 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
    },
    // West Port 3 (Mid-Left Tall)
    {
      id: 'west_port_3',
      name: '서부 3번 출구',
      style: { left: '1.3%', width: '6.8%', top: '34.2%', height: '25.5%' },
      className: 'border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center',
      label: (
        <div className="flex flex-col items-center justify-center p-0.5 text-center">
          <span className="text-[4px] text-slate-500 font-mono">WEST 3</span>
          <span className="flex items-center justify-center w-3 h-3 bg-amber-500 text-slate-950 text-[6px] font-black rounded-sm my-0.5">3</span>
          <span className="text-[6.5px] font-black text-slate-300">서부 3번</span>
          <span className="text-[4.5px] text-indigo-400 font-bold mt-1">▼ 계단</span>
        </div>
      )
    },
    // West Port 15 (Mid-Left Narrow & Tall/Vertical as requested)
    {
      id: 'west_port_15',
      name: '서부 15번 출구',
      style: { left: '12.7%', width: '4.8%', top: '57.0%', height: '11.5%' },
      className: 'border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center',
      label: (
        <div className="flex flex-col items-center justify-center p-0.5 text-center h-full justify-center">
          <span className="flex items-center justify-center w-2.5 h-2.5 bg-amber-500 text-slate-950 text-[5px] font-black rounded-sm">15</span>
          <span className="text-[5.5px] font-black text-slate-300 mt-0.5">15번</span>
          <span className="text-[5.5px] font-black text-slate-300">출구</span>
        </div>
      )
    },
    // West Taxi (Bottom Left Vertical)
    {
      id: 'west_taxi_box',
      name: '서부 택시승강장',
      style: { left: '1.3%', width: '6.8%', top: '69.2%', height: '22.8%' },
      className: 'border border-slate-800 bg-slate-950/80 flex-col',
      interactiveId: 'west_taxi',
      activeColor: 'border-indigo-400 bg-indigo-600/15 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
    },
    // Airport Rail (Bottom Left Narrow & Tall/Vertical as requested)
    {
      id: 'airport_rail_box',
      name: '공항철도 연계통로',
      style: { left: '12.7%', width: '4.8%', top: '71.0%', height: '21.0%' },
      className: 'border border-slate-800 bg-slate-950/80 flex flex-col items-center justify-center',
      interactiveId: 'airport_rail',
      activeColor: 'border-teal-400 bg-teal-600/15 text-teal-200 shadow-[0_0_12px_rgba(20,184,166,0.30)]'
    },
    // 2F Main Concourse container - Now fully interactive for Info Desk in center space
    {
      id: 'main_concourse_box',
      name: '2층 대합실 맞이방',
      style: { left: '21.9%', width: '56.5%', top: '15.3%', height: '18%' },
      className: 'border border-dashed border-slate-800 bg-slate-900/35 relative p-1 flex-col',
      interactiveId: 'info_desk',
      activeColor: 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
      label: (
        <div className="w-full h-full relative flex flex-col justify-center items-center select-none">
          <div className="text-[5px] font-bold text-slate-500 tracking-wider font-mono">
            2F MAIN CONCOURSE
          </div>
          <div className="text-[8px] font-black text-slate-300">
            2층 대합실 맞이방
          </div>
          <div className="mt-1 flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded-md">
            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-[6.5px] font-extrabold text-amber-400">★ 종합안내소</span>
          </div>
        </div>
      )
    },
    // Three middle blocks (HQ relocated to the Left block, Ticket in middle, Police on right)
    // 1. 출도착 사무실 [TEAM HQ] (Originally 중고명품마루)
    {
      id: 'camp_office_box',
      name: '출도착 사무실',
      style: { left: '21.9%', width: '12.8%', top: '38%', height: '12.3%' },
      className: 'border border-slate-800 bg-slate-950/95 p-1 flex-col',
      interactiveId: 'camp',
      activeColor: 'border-blue-400 bg-blue-600/15 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.30)]'
    },
    // 2. 매표창구 (Originally 출도착요원실)
    {
      id: 'ticket_box',
      name: '매표창구',
      style: { left: '43.8%', width: '12.8%', top: '38%', height: '12.3%' },
      className: 'border border-slate-850 bg-slate-950/60 p-1 flex-col',
      label: (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <span className="text-[4px] text-slate-500 font-mono">TICKET WINDOW</span>
          <span className="text-[6.8px] font-bold text-slate-300 tracking-tight">매표창구</span>
        </div>
      )
    },
    // 3. 고지실 [철경] (Originally 카카오프렌즈)
    {
      id: 'police_office_box',
      name: '고지실 (철경)',
      style: { left: '65.8%', width: '12.8%', top: '38%', height: '12.3%' },
      className: 'border border-slate-850 bg-slate-950/60 p-1 flex-col',
      label: (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <span className="text-[4px] text-slate-500 font-mono">RAILWAY POLICE</span>
          <span className="text-[6.5px] font-bold text-rose-500 tracking-tight">고지실 (철경)</span>
        </div>
      )
    },
    // platforms (Bottom Center Big box)
    {
      id: 'platforms_box',
      name: '열차 승강장 (플랫폼 3~14)',
      style: { left: '21.9%', width: '56.5%', top: '60.1%', height: '32.5%' },
      className: 'border border-slate-800 bg-slate-950/95 flex-col shadow-inner',
      interactiveId: 'platforms',
      activeColor: 'border-rose-500 bg-rose-950/15 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
    },
    // Upper-Right vertical narrow stack: 2번 출입구 placed below Subway L1&L4 as requested
    {
      id: 'subway_l1_l4',
      name: '지하 1·4호선 연계',
      style: { left: '87.5%', width: '9.5%', top: '15.0%', height: '8.5%' },
      className: 'border border-blue-900/35 bg-blue-900/10 flex-col',
      label: (
        <div className="flex flex-col justify-center items-center h-full text-center p-0.5">
          <span className="text-[3.5px] text-blue-300 font-bold font-mono leading-none">SUBWAY L1/4</span>
          <span className="text-[6px] font-black text-blue-400 leading-tight">지하 1·4호선</span>
        </div>
      )
    },
    {
      id: 'east_port_2',
      name: '동부 2번 출구',
      style: { left: '87.5%', width: '9.5%', top: '24.8%', height: '8.5%' },
      className: 'border border-slate-850 bg-slate-900/60 flex flex-col items-center justify-center',
      label: (
        <div className="flex items-center justify-center gap-1 p-0.5 text-center">
          <span className="flex items-center justify-center w-2.5 h-2.5 bg-amber-500 text-slate-950 text-[5px] font-black rounded-sm">2</span>
          <span className="text-[5.5px] font-black text-slate-300">2번 출구</span>
        </div>
      )
    },
    // Lower-Right vertical narrow box (Exit 1)
    {
      id: 'east_port_1',
      name: '동부 1번 출구',
      style: { left: '80.2%', width: '4.8%', top: '37.2%', height: '19%' },
      className: 'border border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center',
      label: (
        <div className="flex flex-col items-center justify-center p-0.5 text-center">
          <span className="text-[4px] text-slate-500 font-mono">EAST 1</span>
          <span className="flex items-center justify-center w-2.5 h-2.5 bg-amber-500 text-slate-950 text-[5.5px] font-black rounded-sm my-0.5">1</span>
          <span className="text-[5.5px] font-black text-slate-300">1번출구</span>
          <span className="text-[4px] text-emerald-400 font-bold leading-none mt-1">◀ 연결</span>
        </div>
      )
    },
    // Lower-Right square-ish box (⏰ 시계탑 앞 / east_clock)
    {
      id: 'east_clock_box',
      name: '⏰ 시계탑 앞',
      style: { left: '87.5%', width: '9.5%', top: '37.2%', height: '19%' },
      className: 'border border-slate-800 bg-slate-950/80 flex-col',
      interactiveId: 'east_clock',
      activeColor: 'border-emerald-400 bg-emerald-600/15 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
    }
  ];

  return (
    <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[1.8rem] text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-400 animate-pulse" /> 서울역 실무 위치 안내 설계도
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            2층 맞이방과 1층 승강장, 동서부 출구 라인의 실제 구조를 단순화하고 핵심 지점을 안내합니다.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-slate-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          OFFLINE ARCHITECTURAL VIEW ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        {/* Interactive Schematic Diagram with Blueprint Aesthetics */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[620px] md:max-w-[660px] aspect-[4/3] bg-slate-950/95 rounded-2xl border-2 border-slate-850 p-4 overflow-hidden shadow-inner bg-[radial-gradient(#3b82f612_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
            
            {/* North Indicator */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 font-mono text-[8px] text-slate-500 select-none z-10">
              <Navigation className="w-2.5 h-2.5 text-rose-500 rotate-[-45deg]" /> N (행신/신촌)
            </div>
            <div className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-slate-500 select-none z-10">
              S (용산/부산)
            </div>

            {/* 15 Blueprint boxes mapped directly from the uploaded image */}
            {backgroundBoxes.map((box) => {
              const isInteractive = box.interactiveId;
              const isSelected = isInteractive && activeSpot === box.interactiveId;
              
              return (
                <div
                  key={box.id}
                  style={box.style}
                  onClick={() => {
                    if (isInteractive) {
                      setActiveSpot(box.interactiveId);
                    }
                  }}
                  className={`absolute rounded-lg transition-all flex flex-col items-center justify-center p-1 text-center select-none ${
                    isInteractive ? 'cursor-pointer hover:border-slate-500 z-10' : ''
                  } ${box.className} ${
                    isSelected ? box.activeColor : isInteractive ? 'bg-slate-950/90 border-slate-800 hover:bg-slate-900/60' : ''
                  }`}
                >
                  {/* Render box contents */}
                  {box.id === 'west_cargo_box' && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[4px] font-mono text-purple-400 uppercase tracking-tighter">☣ FREE LEVELWAY</span>
                      <span className="text-[6.5px] font-bold text-slate-300">서부 화물하역장</span>
                      <span className="text-[4.5px] text-purple-400 font-semibold mt-0.5">◀ 평단 연계통로</span>
                    </div>
                  )}

                  {box.id === 'camp_box' && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[4.5px] text-blue-400 font-bold uppercase tracking-tighter">TEAM HQ</span>
                      <span className="text-[6.8px] font-black text-blue-300">출도착 요원실</span>
                    </div>
                  )}

                  {box.id === 'platforms_box' && (
                    <div className="flex flex-col justify-between items-center w-full h-full p-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1 select-none w-full">
                        <span className="text-[6px] font-mono font-bold tracking-wider text-rose-400 flex items-center gap-1">
                          <span className="w-1 h-1 bg-rose-500 rounded-full animate-ping"></span> 1F 고속열차 승강장 (PLATFORMS 3-14)
                        </span>
                        <span className="text-[4.5px] text-slate-500 font-mono">1F TRACK AREA</span>
                      </div>
                      <div className="relative w-full h-[55%] grid grid-cols-12 gap-0.5 opacity-75 mt-1">
                        {[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3].map((num) => (
                          <div key={num} className="h-full flex flex-col justify-between items-center relative border-r border-slate-900/40">
                            <span className="text-[5.5px] font-black text-rose-300 font-mono px-0.5 scale-90">
                              {num}
                            </span>
                            <div className="w-full h-[40%] flex flex-col justify-around items-center opacity-25 px-[1px]">
                              <div className="w-[1px] h-full bg-slate-400"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {box.id === 'west_taxi_box' && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[4px] font-mono text-indigo-400 uppercase tracking-tighter">☎ BUS & TAXI</span>
                      <span className="text-[6.3px] font-bold text-slate-300">서부 택시승강장</span>
                      <span className="text-[4.5px] text-indigo-400 font-bold mt-0.5">◀ 계단 하향 1F</span>
                    </div>
                  )}

                  {box.id === 'airport_rail_box' && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[4px] font-mono text-teal-400 uppercase tracking-tighter">☠ AREX TRANSFER</span>
                      <span className="text-[6.3px] font-bold text-slate-300">공항철도 연계통로</span>
                      <span className="text-[4.5px] text-teal-400 font-bold mt-0.5">◀ 에스컬레이터</span>
                    </div>
                  )}

                  {box.id === 'east_clock_box' && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[4px] text-emerald-400 font-bold uppercase tracking-tighter">MEETING ZONE</span>
                      <span className="text-[6.5px] font-black_text">⏰ 시계탑 앞</span>
                      <span className="text-[4px] text-slate-500 font-semibold mt-0.5">대합실 3F 광장</span>
                    </div>
                  )}

                  {/* Custom labels/UI elements inside the box */}
                  {box.label}
                </div>
              );
            })}

            {/* Visual Vector Connecting Paths with scaling viewBox */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Exit 3 to Taxi Terminal */}
              <line x1="4.7" y1="59.7" x2="4.7" y2="69.2" stroke="#6366f1" strokeWidth="0.4" strokeDasharray="1,1" className="opacity-70" />
              
              {/* Exit 15 to Airport Rail */}
              <line x1="15.1" y1="67.2" x2="15.1" y2="71.0" stroke="#14b8a6" strokeWidth="0.4" strokeDasharray="1,1" className="opacity-80" />
              
              {/* Exit 2 to Subway L1/L4 */}
              <line x1="82.6" y1="24.3" x2="87.5" y2="24.3" stroke="#2563eb" strokeWidth="0.4" strokeDasharray="1,1" className="opacity-70" />
              
              {/* Exit 1 to East Clocktower */}
              <line x1="85.0" y1="46.7" x2="87.5" y2="46.7" stroke="#10b981" strokeWidth="0.4" strokeDasharray="1,1" className="opacity-70" />

              {/* Stairs to Platform Descending paths from HQ */}
              <path d="M 43.8,44.15 C 38,44.15 35,50 35,60.1" fill="none" stroke="#3b82f6" strokeWidth="0.2" strokeDasharray="1,1" className="opacity-45" />
              <path d="M 56.6,44.15 C 62,44.15 65,50 65,60.1" fill="none" stroke="#3b82f6" strokeWidth="0.2" strokeDasharray="1,1" className="opacity-45" />
            </svg>

            {/* Stairs labels descending from Team HQ */}
            <div style={{ left: '33%', top: '53.5%', transform: 'translate(-50%, -50%)' }} className="absolute pointer-events-none select-none z-10 transition-opacity">
              <span className="text-[5.5px] text-blue-400 font-black tracking-tighter bg-slate-950/90 border border-slate-800 px-1 py-0.5 rounded shadow">
                ◀ 13.14번 홈 (계단)
              </span>
            </div>
            <div style={{ left: '67%', top: '53.5%', transform: 'translate(-50%, -50%)' }} className="absolute pointer-events-none select-none z-10 transition-opacity">
              <span className="text-[5.5px] text-blue-400 font-black tracking-tighter bg-slate-950/90 border border-slate-800 px-1 py-0.5 rounded shadow">
                11, 12번 홈 (계단) ▶
              </span>
            </div>

            {/* Clickable Hotspot Pins with fine scale alignment */}
            {spots.map((spot) => {
              const isActive = activeSpot === spot.id;

              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpot(spot.id)}
                  style={{ 
                    left: spot.coords.x, 
                    top: spot.coords.y,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.3s'
                  }}
                  className="absolute z-20 cursor-pointer hover:scale-110"
                >
                  {/* Outer Ring Animation (Pulse-glow) */}
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-60 animate-ping -left-1 -top-1 ${
                    isActive ? 'bg-amber-400' : spot.color
                  }`}></span>
                  
                  {/* Core Dot (Stays perfectly aligned) */}
                  <div className={`w-3.5 h-3.5 rounded-full border border-slate-950 flex items-center justify-center shadow-lg relative ${
                    isActive ? 'bg-amber-400 scale-110' : spot.color
                  }`}>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>

                  {/* Tiny floating Label always shown */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-800 px-1 py-0.5 rounded text-[6.5px] font-bold text-slate-300 whitespace-nowrap shadow-md pointer-events-none z-30 tracking-tighter">
                    {spot.id === 'camp' ? '요원실' : spot.id === 'info_desk' ? '안내소' : spot.id === 'east_clock' ? '시계탑' : spot.id === 'west_taxi' ? '택시승강장' : spot.id === 'west_cargo' ? '하역장' : spot.id === 'airport_rail' ? '공항철도' : '플랫폼'}
                  </div>
                </button>
              );
            })}

          </div>
          
          <p className="text-[10px] text-slate-500 font-mono mt-3 text-center select-none">
            ※ 실전 배치도의 발광 핀(Ping) 또는 요원실 내 각 매장을 클릭하여 해당 구역의 주요 실무 안전지침 카드를 한눈에 조회하세요.
          </p>
        </div>

        {/* Dynamic Detail Card or Simulation Path controls */}
        <div className="lg:col-span-2 flex flex-col justify-between h-full min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-950 p-5 md:p-6 rounded-2xl border border-slate-800 space-y-4 flex-1 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${currentSpot.color} ${currentSpot.id === 'info_desk' ? 'animate-pulse' : ''}`}></div>
                  <h4 className="text-lg font-black text-white">{currentSpot.title}</h4>
                </div>

                <p className="text-xs text-blue-400 font-semibold leading-relaxed bg-blue-500/5 px-3 py-2.5 rounded-xl border border-blue-500/10">
                  {currentSpot.description}
                </p>

                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-wider">주요 실무 안전지침</h5>
                  <div className="space-y-2.5">
                    {currentSpot.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-slate-300 leading-relaxed font-semibold">
                        <span className="text-blue-500 font-mono shrink-0">·</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>SPOT CODE: {currentSpot.id.toUpperCase()}</span>
                <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5 text-blue-400" /> 실전 인지사항</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. PLATFORM VISUALIZER WITH TRAIN CAR CARDS (si-2)
   ========================================================================== */
interface TrainConfig {
  name: string;
  totalCars: number;
  wheelchairCars: number[]; // e.g. [2]
  liftCars: number[]; // e.g. [2]
  specialCars: number[]; // e.g. [1, 3]
  elevatorsNextTo: number[]; // e.g. [7, 8] means between car 7 and 8
  note: string;
}

function PlatformVisualizer() {
  const trainTypes: Record<string, TrainConfig> = {
    ktx_std: {
      name: 'KTX 일반 (18호차)',
      totalCars: 18,
      wheelchairCars: [2],
      liftCars: [2],
      specialCars: [2, 3, 4],
      elevatorsNextTo: [6],
      note: '가장 자주 배차되는 기본 KTX입니다. 특실은 2, 3, 4호차에 위치하며 이 중 2호차는 특실과 휠체어석 및 리프트 위치가 중첩되므로 안내 시 "2호차(특실)" 표기를 확인하십시오. 휠체어 전용석은 2호차에 위치하고, 배터리식 휠체어 리프트 대기 점은 2호차 앞입니다. 엘리베이터는 6호차와 7호차 사이 승강장에 위치해 있어 이동 노선이 짧아 편리합니다.'
    },
    ktx_sancheon: {
      name: 'KTX-산천 (중련 1~18호차)',
      totalCars: 18,
      wheelchairCars: [1, 11],
      liftCars: [1, 11],
      specialCars: [3, 13],
      elevatorsNextTo: [9],
      note: '중련 편성열차(복합열차)로 운행할 시 1~8호차 및 11~18호차 구조를 가집니다. 휠체어석 및 리프트 승하차 작업은 1호차와 11호차에서 동시에 대응하며, 엘리베이터는 9호차와 10호차 사이에 오직 한 개가 위치합니다.\n\n* 용어 구분:\n- 중련편성열차: 같은 종류의 열차 2편성을 서로 연결해서 하나의 열차처럼 운행하는 열차. 두 열차의 도착지가 같다.\n- 복합편성열차: 하나로 출발했다가 중간역에서 분리하거나 반대로 따로 출발한 열차를 중간역에서 연결해서 운행하는 열차.'
    },
    ktx_eum: {
      name: 'KTX-이음 (1~12호차 중련)',
      totalCars: 12,
      wheelchairCars: [3, 9],
      liftCars: [3, 9],
      specialCars: [1, 7],
      elevatorsNextTo: [6],
      note: 'KTX-이음은 1~6호차와 7~12호차의 중련(복합) 편성 구조를 가지고 있습니다. 1호차와 7호차에 우등실이 위치하며, 3호차와 9호차에 휠체어석 및 리프트 승하차 위치가 배치되어 있습니다. 엘리베이터는 두 열차의 연결부 격인 6호차와 7호차 사이에 정확히 위치해 있어 편리합니다.'
    },
    ktx_cheongryong: {
      name: 'KTX-청룡 (1~18호차)',
      totalCars: 18,
      wheelchairCars: [3, 11],
      liftCars: [3, 11],
      specialCars: [1, 9],
      elevatorsNextTo: [8],
      note: 'KTX-청룡은 동력분산식 신형 고속열차로 1~8호차와 9~18호차의 복합편성 구조를 이룹니다. 휠체어석은 3호차와 11호차에 위치하고 있어 리프트 승하차 작업도 해당 호차에서 대응합니다. 우등실은 1호차와 9호차에 위치해 있으며, 엘리베이터는 8호차와 9호차 연결 부근 승강장에 위치합니다.'
    },
    itx_maum: {
      name: 'ITX-마음 (1~6호차)',
      totalCars: 6,
      wheelchairCars: [1, 5],
      liftCars: [1, 5],
      specialCars: [],
      elevatorsNextTo: [],
      note: 'ITX-마음은 신형 동력분산식 일반열차로 1~6호차 편성을 이룹니다. 휠체어석과 리프트 승하차 위치는 1호차와 5호차에 각각 위치하고 엘리베이터 이동 동선은 별도로 승강장 정렬선에 구속받지 않습니다.'
    },
    itx_saemaeul: {
      name: 'ITX-새마을 (3호차)',
      totalCars: 6,
      wheelchairCars: [3],
      liftCars: [3],
      specialCars: [],
      elevatorsNextTo: [],
      note: 'ITX-새마을은 3호차에 휠체어석이 매립되어 있습니다. 차체가 낮아 승차 경사 발판(또는 리프트)을 필요로 하는 경우가 존재하며, 엘리베이터는 별도로 표시되지 않습니다.'
    },
    mugunghwa: {
      name: '무궁화호 (3호차)',
      totalCars: 6,
      wheelchairCars: [3],
      liftCars: [3],
      specialCars: [],
      elevatorsNextTo: [],
      note: '무궁화호는 편성이 일정치 않으나 통상 3호차에 장애인 휠체어 객실이 세팅되어 수하물이 많은 시각/휠체어 요성 픽업 시 완만한 계단 보드가 요구되며, 엘리베이터는 별도로 표시되지 않습니다.'
    }
  };

  const [selectedTrain, setSelectedTrain] = useState<string>('ktx_std');
  const currentTrain = trainTypes[selectedTrain];

  return (
    <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[1.8rem] text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-blue-400" /> 열차 종류별 대기 플랫폼 정렬기
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">
            승하차 시 휠체어 전용 호차 및 엘리베이터 이동 동선을 열차별로 직관적으로 정렬하여 파악합니다.
          </p>
        </div>
      </div>

      {/* Selector of Train Types */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(trainTypes).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedTrain(key)}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all border ${
              selectedTrain === key
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/10'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 border-slate-700/50'
            }`}
          >
            {config.name.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Orientation Board */}
      <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 border-b border-slate-800 pb-2 px-1">
          <div className="flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5 text-rose-500" /> 북쪽 (행신/신촌 방향)
          </div>
          <span className="font-bold text-slate-400 uppercase tracking-widest">{currentTrain.name} PLATFORM ALIGNMENT</span>
          <div className="flex items-center gap-1.5">
            남쪽 (용산 방향) <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>

        {/* Scrollable Train Line-up Layout */}
        <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent w-full">
          <div className="flex items-center gap-2.5 px-4 min-w-max justify-start">
            {Array.from({ length: currentTrain.totalCars }).map((_, index) => {
              const carNumber = index + 1;
              const isWheelchair = currentTrain.wheelchairCars.includes(carNumber);
              const isLift = currentTrain.liftCars.includes(carNumber);
              const isSpecial = currentTrain.specialCars.includes(carNumber);
              const hasElevatorNext = currentTrain.elevatorsNextTo.includes(carNumber);

              return (
                <div key={carNumber} className="flex items-center shrink-0">
                  {/* Car Block Card */}
                  <div
                    className={`w-[68px] h-20 rounded-xl flex flex-col justify-between p-2.5 relative border transition-all ${
                      isWheelchair
                        ? 'bg-blue-500/20 text-blue-400 border-blue-400/80 shadow-md shadow-blue-500/10 font-bold'
                        : isSpecial
                        ? 'bg-red-500/15 text-red-400 border-red-500/40'
                        : 'bg-slate-800/40 text-slate-300 border-slate-700/40'
                    }`}
                  >
                    {/* Car Index Badge */}
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black">
                        {selectedTrain === 'ktx_std' && carNumber === 2 ? '2호차(특실)' : `${carNumber}호차`}
                      </span>
                      {isSpecial && (
                        <span className={`text-[8px] font-black px-1 py-[1.5px] rounded ${
                          isWheelchair 
                            ? 'bg-red-500/30 text-red-200' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {['ktx_eum', 'ktx_cheongryong'].includes(selectedTrain) ? '우등실' : '특실'}
                        </span>
                      )}
                    </div>

                    {/* Carriage Features Visuals */}
                    <div className="flex items-center justify-center gap-1">
                      {isWheelchair && (
                        <div className="relative group/w pointer-events-auto">
                          <Accessibility className="w-4 h-4 text-blue-400 animate-pulse" />
                        </div>
                      )}
                      {isLift && (
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute right-2 bottom-3"></div>
                      )}
                    </div>

                    {/* Sub indicators inside car */}
                    <div className="text-[7.5px] text-slate-400 text-center font-mono tracking-tighter">
                      {isWheelchair ? '휠체어석/리프트' : isSpecial ? (['ktx_eum', 'ktx_cheongryong'].includes(selectedTrain) ? '우등실' : '특실') : '일반석'}
                    </div>
                  </div>

                  {/* Elevator / Escalator connecting node between Cars */}
                  {hasElevatorNext && (
                    <div className="flex flex-col items-center justify-center mx-1.5 shrink-0 select-none">
                      <div className="h-6 w-0.5 bg-dashed bg-slate-700"></div>
                      <div className="p-1 px-1.5 bg-emerald-600/20 border border-emerald-500/40 rounded-md flex items-center gap-1 text-[8.5px] text-emerald-400 font-extrabold hover:bg-emerald-600 hover:text-white transition-all cursor-help relative group">
                        <span>E/V</span>
                        {/* Tooltip */}
                        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] p-2 rounded border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                          이 근처(보통 {carNumber}와 {carNumber+1}호차 사이)에 엘리베이터 이동 통로가 있습니다.
                        </span>
                      </div>
                      <div className="h-6 w-0.5 bg-dashed bg-slate-700"></div>
                    </div>
                  )}

                  {/* Standard Coupler Link between carriages */}
                  {!hasElevatorNext && index !== currentTrain.totalCars - 1 && (
                    <div className="w-2 h-1 bg-slate-800 shrink-0"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend / Helper Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs">
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-slate-300">승강장 정렬 분석 내용</h4>
            <p className="text-slate-400 leading-relaxed text-[11px] font-semibold whitespace-pre-line">
              {currentTrain.note}
            </p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
            <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-wider">포인터 범례</h5>
            <div className="flex flex-col gap-1.5 text-[10px] text-slate-300 font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500/50 block"></span>
                <span>교통약자 전용휠석</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500/50 block"></span>
                <span>특실 / 우등실 (빨간색)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500 block animate-pulse"></span>
                <span>리프트 세팅 장소 (수강)</span>
              </div>
              {currentTrain.elevatorsNextTo.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-600/30 border border-emerald-500/50 block"></span>
                  <span>엘리베이터 노드 (E/V)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. CAFETERIA ROUTE MAP WITH PASSWORD GAME (si-3)
   ========================================================================== */
function CafeteriaRouteMap() {
  const [passcode, setPasscode] = useState<string>('');
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleKeyPress = (num: string) => {
    if (passcode.length < 4) {
      const newCode = passcode + num;
      setPasscode(newCode);
      
      if (newCode === '8887') {
        setTimeout(() => {
          setUnlocked(true);
          setErrorMessage('');
        }, 150);
      } else if (newCode.length === 4) {
        setTimeout(() => {
          setErrorMessage('비밀번호 불일치! 공지된 번호를 다시 확인하세요.');
          setPasscode('');
        }, 300);
      }
    }
  };

  const handleClear = () => {
    setPasscode('');
    setErrorMessage('');
  };

  return (
    <div className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[1.8rem] text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black flex items-center gap-2">
            <Utensils className="w-5 h-5 text-blue-400" /> 서울역 직원 구내식당 이용자 보안가이드
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">
            4층 깊숙이 입지한 직원 구내식당 위치 및 분기별 잠금번호를 해독하는 실물 안내형 훈련소입니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        {/* Step List Route */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-black text-slate-300 text-sm tracking-wider uppercase border-l-2 border-blue-500 pl-3">4층 구내식당 진입 4단계 도면</h4>
          
          <div className="relative space-y-4 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {/* Step 1 */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-blue-400 shrink-0">
                1
              </div>
              <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex-1">
                <h5 className="font-bold text-xs text-slate-200">역사 3층 대합실 전용 엘리베이터 탑승</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  3층 회의실 들어가는 입구(수유실 옆 통로 근처)에 소지가 표기된 보안 엘리베이터가 있습니다. 이를 타고 4층으로 안전하게 수직 이동합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-blue-400 shrink-0">
                2
              </div>
              <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex-1">
                <h5 className="font-bold text-xs text-slate-200">우측 꺾어 회의실 통로 복도 진입</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  4층 게이트 하차 후, 유도 가이드선을 확인합니다. 왼편 본부 행정실들을 등지고 큰 홀 복도가 나오는 우측 방향으로 완전히 꺾습니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-blue-400 shrink-0">
                3
              </div>
              <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex-1">
                <h5 className="font-bold text-xs text-slate-200">코레일 회의실 복도 허브 통과</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  철도 공사 대관용 중·소회의실들이 일렬로 입지한 전용 복도를 지납니다. 복도 통과 끝부분에 식당 보안용 주 출입문이 배치되어 있습니다.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-blue-400 shrink-0">
                4
              </div>
              <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex-1">
                <h5 className="font-bold text-xs text-slate-200">식당 보안 Keypad 비밀번호 입력</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  직원 전용 도어락에 금기 비밀번호 <strong className="text-amber-400 font-black font-mono">8887</strong>번을 가볍게 타건해 진입 인증을 진행합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Lock Security Keypad Simulator */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <div className="w-full max-w-[280px] bg-slate-950 rounded-2xl border-2 border-slate-800 p-5 shadow-2xl relative overflow-hidden">
            {/* Visual Header */}
            <div className="text-center pb-4 border-b border-slate-800/85 mb-4 space-y-1">
              <div className="flex items-center justify-center text-slate-400 gap-1.5">
                {unlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-500 animate-bounce" />
                ) : (
                  <Lock className="w-4 h-4 text-blue-500 animate-pulse" />
                )}
                <span className="text-[8.5px] font-black uppercase tracking-widest font-mono">SECURE KEYPAD V4.0</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold block pt-1">
                {unlocked ? '구내식당의 상세 규정이 잠금해제 되었습니다.' : '도어 패드에 비밀번호를 타건해보세요'}
              </div>
            </div>

            {unlocked ? (
              /* Success Locked-Out Layout details */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 py-2 text-center animate-fade-in"
              >
                <div className="inline-flex p-3 bg-emerald-600/15 rounded-full border border-emerald-500/20 text-emerald-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 tracking-wider">DOOR OPEN · ACCESS GRANTED</span>
                  <div className="text-xs text-slate-300 font-black bg-emerald-700/5 py-1.5 rounded-lg border border-emerald-500/10">식권발급 및 이용 규범</div>
                </div>

                <div className="text-left text-[11px] space-y-2 text-slate-300 bg-slate-900 border border-slate-800 p-3 rounded-xl">
                  <p className="font-semibold text-slate-200">🎯 식사비 및 결제법:</p>
                  <p className="text-[10.5px] text-slate-400 pl-2 leading-relaxed">
                    키오스크 결제 시 <strong className="text-white font-extrabold">[직원용 단추]</strong>를 선택해 카드 태깅 시 한 끼 5,500원 결제됩니다. 우대 우표 단추 절대 무임 태그 금지!
                  </p>
                  <p className="font-semibold text-slate-200 mt-2">🕒 식단표 보는 팁:</p>
                  <p className="text-[10.5px] text-slate-400 pl-2 leading-relaxed">
                    주간 구내식단표는 고객지원실(고지실) 내부 요원전용 게시판 전면에 세팅되어 있습니다.
                  </p>
                </div>

                <button
                  onClick={() => { setPasscode(''); setUnlocked(false); }}
                  className="w-full py-2 bg-slate-800 text-slate-400 font-black rounded-lg text-[10px] hover:bg-slate-700 hover:text-white transition-all font-mono"
                >
                  LOCK DOORS (다시 잠그기)
                </button>
              </motion.div>
            ) : (
              /* Core Numpad screen */
              <div className="space-y-4">
                {/* Screen representation */}
                <div className="h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between px-3 font-mono relative">
                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-3 h-3 rounded-full border transition-all ${
                          passcode.length > i
                            ? 'bg-blue-500 border-blue-400 scale-110 shadow-sm shadow-blue-500/20'
                            : 'bg-slate-800 border-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {passcode.length > 0 && (
                    <span className="text-[10px] text-blue-400 font-black animate-pulse">호출중...</span>
                  )}
                </div>

                {errorMessage && (
                  <p className="text-[9px] text-center text-rose-500 font-semibold leading-relaxed animate-shake">
                    {errorMessage}
                  </p>
                )}

                {/* Grid 3x4 keys */}
                <div className="grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeyPress(num)}
                      className="h-11 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 rounded-xl font-bold font-mono text-sm active:scale-95 transition-all text-white"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClear}
                    className="h-11 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 text-[10px] font-black rounded-xl font-mono active:scale-95 transition-all"
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={() => handleKeyPress('0')}
                    className="h-11 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 rounded-xl font-bold font-mono text-sm active:scale-95 transition-all"
                  >
                    0
                  </button>
                  <div className="h-11 bg-slate-900/40 border border-transparent rounded-xl flex items-center justify-center font-mono text-[9px] text-slate-600 font-bold">
                    8887
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
