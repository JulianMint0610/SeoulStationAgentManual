import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HelperNoteVisualizer from './HelperNoteVisualizer';
import { 
  MapPin, 
  Map, 
  Navigation, 
  HelpCircle, 
  Compass, 
  Accessibility, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  Layers,
  ChevronRight,
  Info,
  PlayCircle,
  ExternalLink,
  Check,
  X,
  CheckCircle2,
  XCircle,
  Zap,
  Sparkles
} from 'lucide-react';

interface InteractiveStationMapProps {
  itemId: string;
}

export default function InteractiveStationMap({ itemId }: InteractiveStationMapProps) {
  if (itemId === 'si-1') {
    return <SeoulStationLayoutMap />;
  } else if (itemId === 'si-2' || itemId === 'pa-4') {
    return <PlatformVisualizer />;
  } else if (itemId === 'pa-0') {
    return <HelperNoteVisualizer />;
  } else if (itemId === 'cm-2') {
    return <RadioBlueprint />;
  } else if (itemId === 'etc-3') {
    return <BoardingRouteOptimizer />;
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
  const [activeSpot, setActiveSpot] = useState<string>('west_cargo');
  const [startPoint] = useState<string>('camp'); // 고정: 출도착 사무실

  const spots = [
    {
      id: 'camp',
      title: '출도착 사무실',
      coords: { x: '25%', y: '18%' },
      color: 'bg-blue-600',
      icon: '🚪',
      description: '출도착 사회복무요원의 대기 사무실 및 행정 중심 거점입니다.'
    },
    {
      id: 'west_cargo',
      title: '서부 하역장',
      coords: { x: '9%', y: '19%' },
      color: 'bg-purple-600',
      icon: '📦',
      description: '서부 출입구 우측에 수평 연계되어 휠체어 등이 계단 없이 이동할 수 있는 통로입니다.'
    },
    {
      id: 'west_taxi',
      title: '서부 택시승강장',
      coords: { x: '9%', y: '84%' },
      color: 'bg-indigo-600',
      icon: '🚕',
      description: '서부 계단 하부에 위치하며 도착한 교통약자의 차량 인계를 돕는 택시 승차소입니다.'
    },
    {
      id: 'airport_rail',
      title: '공항철도',
      coords: { x: '26%', y: '84%' },
      color: 'bg-teal-600',
      icon: '🚇',
      description: '서부 지하 공간으로 진입하여 공항철도 승강장으로 연계되는 에스컬레이터 연결부입니다.'
    },
    {
      id: 'west_parking',
      title: 'KTX 서부 주차장',
      coords: { x: '9%', y: '46%' },
      color: 'bg-sky-600',
      icon: '🅿️',
      description: '지상 서부광장에 야외 배치되어 차량과 직접 내리는 교통약자를 접선하는 장소입니다.'
    },
    {
      id: 'east_clock',
      title: '동부 시계탑',
      coords: { x: '88%', y: '40%' },
      color: 'bg-emerald-600',
      icon: '🕒',
      description: '맞이방 대합실 동부(정문) 방면 3층 에스컬레이터 옆 대형 시계탑 앞 약속 장소입니다.'
    },
    {
      id: 'subway_l1_l4',
      title: '지하철 1, 4호선',
      coords: { x: '88%', y: '20%' },
      color: 'bg-blue-500',
      icon: 'Ⓜ️',
      description: '역사 동쪽 하부 출입로를 통해 지하철 1호선 및 4호선 전철 게이트로 연계되는 루트입니다.'
    },
    {
      id: 'lotte_parking',
      title: '롯데마트 주차장',
      coords: { x: '50%', y: '8%' },
      color: 'bg-rose-600',
      icon: '🚗',
      description: '마트 전용 연결통로를 포함하여 신속한 인도가 가능한 북서부 주차 타워 입구입니다.'
    },
    {
      id: 'gyeongui_line',
      title: '경의중앙선',
      coords: { x: '26%', y: '52%' },
      color: 'bg-green-600',
      icon: '🚃',
      description: '지상 야외 서부에 위치한 경의중앙선 단독 개집표구 및 탑승장 복도입니다.'
    },
    {
      id: 'gtx_line',
      title: 'GTX-A',
      coords: { x: '48%', y: '50%' },
      color: 'bg-pink-600',
      icon: '⚡',
      description: '미래형 광역 신속철도 승하차를 지원하는 지하 대합실과의 허브 구간입니다.'
    }
  ];

  const destinationOptions = [
    { value: 'west_taxi', label: '서부 택시승강장' },
    { value: 'east_clock', label: '동부 시계탑' },
    { value: 'subway_l1_l4', label: '지하철 1, 4호선' },
    { value: 'lotte_parking', label: '롯데마트 주차장' },
    { value: 'airport_rail', label: '공항철도' },
    { value: 'west_cargo', label: '서부 하역장' },
    { value: 'west_parking', label: 'KTX 서부 주차장' },
    { value: 'gtx_line', label: 'GTX-A' },
    { value: 'gyeongui_line', label: '경의중앙선' }
  ];

  // 각 목적지에 최적화된 동영상 ID
  const ROUTE_VIDEOS: Record<string, { title: string; videoId: string }> = {
    west_cargo: {
      title: '출도착 사무실 ➔ 서부 하역장 동선 가이드',
      videoId: 'JIzNksRSkXY'
    },
    west_taxi: {
      title: '출도착 사무실 ➔ 서부 택시승강장 동선 가이드',
      videoId: 'XLOH1CI55mE'
    },
    airport_rail: {
      title: '출도착 사무실 ➔ 공항철도 연계통로 동선 가이드',
      videoId: 'wbljJvMPP_w'
    },
    west_parking: {
      title: '출도착 사무실 ➔ KTX 서부 주차장 동선 가이드',
      videoId: 'nK52Y9hPCCU'
    },
    east_clock: {
      title: '출도착 사무실 ➔ 동부 시계탑 앞 동선 가이드',
      videoId: 'tG1S47_9E_E'
    },
    subway_l1_l4: {
      title: '출도착 사무실 ➔ 지하철 1, 4호선 연계동선 가이드',
      videoId: 'PbJfCKZg_6o'
    },
    lotte_parking: {
      title: '출도착 사무실 ➔ 롯데마트 주차장 동선 가이드',
      videoId: 'oTf0EPPXeZA'
    },
    gyeongui_line: {
      title: '출도착 사무실 ➔ 경의중앙선 승강장 동선 가이드',
      videoId: 'xkYo5v3K_k0'
    },
    gtx_line: {
      title: '출도착 사무실 ➔ GTX-A 동선 가이드',
      videoId: '1uu-TVhFNCI'
    }
  };

  const selectedVideo = ROUTE_VIDEOS[activeSpot] || ROUTE_VIDEOS['west_cargo'];

  interface BackgroundBox {
    id: string;
    name: string;
    style: React.CSSProperties;
    className: string;
    interactiveId?: string;
    activeColor?: string;
    label?: React.ReactNode;
  }

  // 2D Floorplan을 구성할 Background Boxes의 레이아웃 코디네이터 (업로드 이미지 기반 복원)
  const backgroundBoxes: BackgroundBox[] = [
    {
      id: 'lotte_outlet_box',
      name: '롯데아울렛 2F',
      style: { left: '30%', width: '40%', top: '4%', height: '11%' },
      className: 'border border-slate-700/60 bg-slate-900/10 text-slate-300 font-bold flex flex-col items-center justify-center rounded-xl transition-colors',
      interactiveId: 'lotte_parking',
      activeColor: 'border-amber-500/80 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.25)] text-amber-200',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-black text-slate-300 flex items-center gap-1">🏢 롯데아울렛 2F</span>
          <span className="text-[6.5px] text-slate-500 font-medium font-mono">LOTTE OUTLET 2F</span>
          <div className="flex gap-4 text-emerald-500/60 text-[8px] font-bold mt-1">
            <span>◀ 통로</span>
            <span>통로 ▶</span>
          </div>
        </div>
      )
    },
    {
      id: 'toilet_upper_left',
      name: '화장실 (북서)',
      style: { left: '16%', width: '12%', top: '4%', height: '11%' },
      className: 'border border-slate-800/80 bg-slate-950/90 rounded-xl p-1 flex flex-col justify-center items-center select-none',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] font-black text-blue-400">🚻 화장실</span>
          <span className="text-[6.5px] text-slate-500 font-semibold font-mono">TOILET</span>
        </div>
      )
    },
    {
      id: 'toilet_upper_right',
      name: '화장실 (북동)',
      style: { left: '72%', width: '13%', top: '4%', height: '11%' },
      className: 'border border-slate-800/80 bg-slate-950/90 rounded-xl p-1 flex flex-col justify-center items-center select-none',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] font-black text-blue-400">🚻 화장실</span>
          <span className="text-[6.5px] text-slate-500 font-semibold font-mono">TOILET</span>
        </div>
      )
    },
    {
      id: 'exit_3_box',
      name: '3번 출입구',
      style: { left: '2%', width: '12%', top: '28%', height: '9%' },
      className: 'border-2 border-amber-500/80 bg-amber-500/10 text-amber-400 font-bold flex flex-col items-center justify-center rounded-xl transition-all z-10 shadow-lg shadow-amber-950/10',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9.5px] font-black tracking-tight flex items-center gap-1">🚪 3번 출입구</span>
          <span className="text-[6.2px] text-slate-400 font-bold whitespace-nowrap">서부 택시/하역장 연계</span>
        </div>
      )
    },
    {
      id: 'west_cargo_box',
      name: '하역장',
      style: { left: '2%', width: '12%', top: '14%', height: '12%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1.5 flex flex-col justify-between items-center text-center select-none cursor-pointer hover:border-purple-500/80 transition-all z-10',
      interactiveId: 'west_cargo',
      activeColor: 'border-purple-500 bg-purple-950/15 shadow-[0_0_15px_rgba(168,85,247,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9.5px] font-black text-white">📦 서부 하역장</span>
          <div className="flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500 border border-white"></span>
            </span>
            <span className="text-[6.5px] text-purple-400 font-black whitespace-nowrap">수하물 하역</span>
          </div>
          <span className="text-[6.5px] text-purple-300 font-semibold">◀ 3 출구 우측</span>
        </div>
      )
    },
    {
      id: 'west_taxi_box',
      name: '택시승강장',
      style: { left: '2%', width: '12%', top: '39%', height: '13%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1.5 flex flex-col justify-between items-center text-center cursor-pointer hover:border-indigo-500/80 transition-all z-10',
      interactiveId: 'west_taxi',
      activeColor: 'border-indigo-500 bg-indigo-950/15 shadow-[0_0_15px_rgba(99,102,241,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9.5px] font-black text-white">🚕 택시 승강장</span>
          <div className="flex flex-col items-center gap-0.5">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500 border border-white"></span>
            </div>
            <span className="text-[7px] text-violet-400 font-black whitespace-nowrap">서부 택시</span>
          </div>
        </div>
      )
    },
    {
      id: 'west_parking_box',
      name: 'KTX 서부 주차장',
      style: { left: '2%', width: '12%', top: '54%', height: '12%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1.5 flex flex-col justify-between items-center text-center cursor-pointer hover:border-sky-500/80 transition-all z-10',
      interactiveId: 'west_parking',
      activeColor: 'border-sky-500 bg-sky-950/15 shadow-[0_0_15px_rgba(14,165,233,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9px] font-black text-white">🅿️ 서부 주차장</span>
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500 border border-white"></span>
          </div>
          <span className="text-[6.5px] text-slate-400 font-bold whitespace-nowrap">지상 야외 주차장</span>
          <span className="text-[6.5px] text-sky-400 font-black">교통약자 접선</span>
        </div>
      )
    },
    {
      id: 'airport_rail_box',
      name: '공항철도',
      style: { left: '2%', width: '12%', top: '70%', height: '18%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1 flex flex-col justify-between items-center text-center cursor-pointer hover:border-teal-500/80 transition-all z-10',
      interactiveId: 'airport_rail',
      activeColor: 'border-teal-500 bg-teal-950/15 shadow-[0_0_15px_rgba(20,184,166,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center py-0.5 select-none">
          <span className="text-[9.5px] font-black text-teal-400">🚇 공항철도</span>
          <div className="flex flex-col items-center">
            <span className="text-[6px] text-slate-400 font-extrabold whitespace-nowrap">AREX 지하연계</span>
            <span className="text-[6px] text-emerald-500 font-bold whitespace-nowrap">🚃 경의중앙선</span>
            <span className="text-[6px] text-pink-500 font-bold whitespace-nowrap">⚡ GTX-A</span>
          </div>
          <span className="text-[6px] text-teal-400 font-black whitespace-nowrap font-mono">▼ ESCALATOR</span>
        </div>
      )
    },
    {
      id: 'exit_2_box',
      name: '2번 출입구',
      style: { left: '86%', width: '12%', top: '4%', height: '8%' },
      className: 'border-2 border-amber-500/80 bg-amber-500/10 text-amber-400 font-bold flex flex-col items-center justify-center rounded-xl transition-all z-10 shadow-lg shadow-amber-950/10',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9.5px] font-black tracking-tight">🚪 2번 출입구</span>
          <span className="text-[6px] text-slate-400 font-bold whitespace-nowrap">지하철 1·4호선 연계</span>
        </div>
      )
    },
    {
      id: 'exit_1_box',
      name: '1번 출입구',
      style: { left: '86%', width: '12%', top: '22%', height: '14%' },
      className: 'border border-slate-700 bg-slate-950/80 text-slate-300 font-bold flex flex-col items-center justify-center rounded-xl transition-all z-10',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] font-black tracking-tight">🚪 1번 출입구</span>
          <span className="text-[6px] text-slate-500 font-bold mt-1">동부 광장방면</span>
        </div>
      )
    },
    {
      id: 'subway_l1_l4_box',
      name: '지하철 1-4호선',
      style: { left: '86%', width: '12%', top: '13%', height: '8%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1.5 flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-500 transition-all z-10',
      interactiveId: 'subway_l1_l4',
      activeColor: 'border-blue-500 bg-blue-950/15 shadow-[0_0_15px_rgba(59,130,246,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-center items-center gap-0.5">
          <span className="text-[9px] font-black text-blue-400">Ⓜ️ 지하철 1,4호선</span>
          <span className="text-[6.5px] text-slate-400 font-bold">동부 지하 전철역</span>
          <span className="text-[6.2px] text-blue-400 font-black">2번 출구 인접 ▶</span>
        </div>
      )
    },
    {
      id: 'east_clock_box',
      name: '시계탑',
      style: { left: '86%', width: '12%', top: '38%', height: '15%' },
      className: 'border border-slate-700/60 bg-slate-950/80 rounded-xl p-1.5 flex flex-col justify-between items-center text-center cursor-pointer hover:border-emerald-500/80 transition-all z-10',
      interactiveId: 'east_clock',
      activeColor: 'border-emerald-500 bg-emerald-950/15 shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9.5px] font-black text-emerald-400">🕒 동부 시계탑</span>
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 border border-white"></span>
          </div>
          <span className="text-[6.5px] text-slate-400 font-bold leading-tight">대합실 2F 광장 / 미팅존</span>
          <span className="text-[6.5px] text-emerald-400 font-black">2번 출구 연결 ▶</span>
        </div>
      )
    },
    {
      id: 'info_desk_box',
      name: '안내센터',
      style: { left: '44%', width: '12%', top: '22%', height: '12%' },
      className: 'border border-amber-500/40 bg-amber-500/5 rounded-full p-2 flex flex-col justify-center items-center text-center cursor-pointer hover:border-amber-400 transition-all z-10 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
      interactiveId: 'info_desk',
      activeColor: 'border-amber-500 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      label: (
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex h-2 w-2 mb-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 border border-white"></span>
          </div>
          <span className="text-[10px] font-black text-amber-400">ℹ️ 안내센터</span>
          <span className="text-[6px] text-slate-400 font-bold font-mono">INFORMATION</span>
        </div>
      )
    },
    {
      id: 'arrival_departure_box',
      name: '출도착안내',
      style: { left: '16%', width: '6%', top: '41%', height: '9%' },
      className: 'border border-blue-500 bg-blue-950/80 rounded-lg flex flex-col items-center justify-center p-0.5 select-none text-center shadow-lg shadow-blue-950/20',
      label: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[11px] leading-none mb-0.5">📊</span>
          <span className="text-[7.5px] font-black text-blue-300 leading-tight">출도착</span>
          <span className="text-[7.5px] font-black text-blue-300 leading-tight">안내</span>
        </div>
      )
    },
    {
      id: 'stair_left_gate',
      name: '타는 곳 (서부)',
      style: { left: '16%', width: '25%', top: '50%', height: '9%' },
      className: 'border border-slate-700 bg-[#0e1017] rounded-xl flex flex-col items-center justify-center select-none text-center p-1',
      label: (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full bg-amber-400 text-slate-950 text-[8px] font-black py-0.5 rounded uppercase tracking-wide">타는 곳 (TRACK 9-14)</div>
          <div className="flex justify-between w-full px-2 text-[7px] text-blue-400 font-extrabold mt-1">
            <span>◀ KTX 승강장 계단</span>
            <span>에스컬레이터 ▶</span>
          </div>
        </div>
      )
    },
    {
      id: 'stair_right_gate',
      name: '타는 곳 (동부)',
      style: { left: '44%', width: '25%', top: '50%', height: '9%' },
      className: 'border border-slate-700 bg-[#0e1017] rounded-xl flex flex-col items-center justify-center select-none text-center p-1',
      label: (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full bg-amber-400 text-slate-950 text-[8px] font-black py-0.5 rounded uppercase tracking-wide">타는 곳 (TRACK 3-8)</div>
          <div className="flex justify-between w-full px-2 text-[7px] text-blue-400 font-extrabold mt-1">
            <span>◀ KTX 승강장 계단</span>
            <span>에스컬레이터 ▶</span>
          </div>
        </div>
      )
    },
    // BOTTOM RIGHT ROW OF OFFICES (매표소, 수유방, 트래블센터, 철도경찰, 화장실 - 요원실 삭제)
    {
      id: 'railway_police_box',
      name: '철도경찰',
      style: { left: '80.5%', width: '8.5%', top: '51%', height: '15%' },
      className: 'border border-red-900 bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between items-center text-center select-none',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9px] font-black text-red-500">👮 철경</span>
          <span className="text-[6px] text-slate-500 font-extrabold font-mono uppercase">POLICE</span>
          <span className="text-[6.5px] text-red-400 font-bold whitespace-nowrap bg-red-950/30 px-1 rounded">치안/안전</span>
        </div>
      )
    },
    {
      id: 'toilet_bottom_right',
      name: '화장실 (남동)',
      style: { left: '90%', width: '9%', top: '51%', height: '15%' },
      className: 'border border-slate-800 bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between items-center text-center select-none',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9px] font-black text-blue-400">🚻 화장실</span>
          <span className="text-[6px] text-slate-500 font-extrabold font-mono uppercase">TOILET</span>
          <span className="text-[6.5px] text-slate-400 font-bold whitespace-nowrap">남/여 구분</span>
        </div>
      )
    },
    {
      id: 'ticket_office_box',
      name: '매표소',
      style: { left: '71%', width: '8.5%', top: '70%', height: '16%' },
      className: 'border border-slate-700 bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between items-center text-center cursor-pointer hover:border-amber-500 transition-all z-10',
      interactiveId: 'ticket_office',
      activeColor: 'border-amber-500 bg-amber-950/15 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center select-none">
          <span className="text-[9.5px] font-black text-white">🎫 매표소</span>
          <div className="relative flex h-1 w-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 bg-amber-500 border border-white"></span>
          </div>
          <span className="text-[6px] text-slate-500 font-bold font-mono uppercase">TICKET</span>
        </div>
      )
    },
    {
      id: 'nursing_room_box',
      name: '수유방',
      style: { left: '80.5%', width: '8.5%', top: '70%', height: '16%' },
      className: 'border border-rose-900/60 bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between items-center text-center select-none shadow-sm',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9.5px] font-black text-rose-400">🍼 수유방</span>
          <span className="text-[5.8px] text-slate-500 font-extrabold whitespace-nowrap leading-none">BABY CARE</span>
          <span className="text-[6.5px] text-rose-400 font-bold whitespace-nowrap bg-rose-950/30 px-1 rounded">수유/휴식</span>
        </div>
      )
    },
    {
      id: 'travel_center_box',
      name: '트래블센터',
      style: { left: '90%', width: '9%', top: '70%', height: '16%' },
      className: 'border border-sky-900/60 bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between items-center text-center select-none shadow-sm',
      label: (
        <div className="w-full h-full flex flex-col justify-between items-center">
          <span className="text-[9.5px] font-black text-sky-400">🧳 트래블</span>
          <span className="text-[5.8px] text-slate-400 font-extrabold whitespace-nowrap leading-none font-mono">TRAVEL CTR</span>
          <span className="text-[6.5px] text-sky-400 font-bold whitespace-nowrap bg-sky-950/30 px-1 rounded">외국인안내</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 bg-slate-900 border border-slate-800 p-4 md:p-8 rounded-[1.8rem] text-white">
      {/* 1. UPPER PANEL: NAVIGATION 길찾기 & VIDEO PLOTTER */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Map className="w-5 h-5 text-blue-400 animate-pulse" />
          <h3 className="text-base md:text-lg font-black tracking-tight flex items-center flex-wrap gap-2">
            <span>주요 목적지 동선 안내</span>
            <span className="text-[10px] md:text-xs text-slate-400 font-bold tracking-normal font-sans">
              (이용 빈도가 높은 순으로 나열했습니다.)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: NAV SELECTOR (Naver Maps Style) */}
          <div className="lg:col-span-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Start Point */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-blue-400 tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 출발지
                </label>
                <div className="bg-slate-950 border border-slate-800 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-200 flex items-center gap-2">
                  <span>🚪</span>
                  <span>출도착 사무실</span>
                </div>
              </div>

              {/* Waypoint swap line decoration */}
              <div className="flex justify-center -my-2 select-none">
                <div className="w-0.5 h-4 bg-dashed bg-slate-800"></div>
              </div>

              {/* End Point */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-rose-500 tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> 도착지
                </label>
                <select
                  value={activeSpot}
                  onChange={(e) => setActiveSpot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 px-3 py-2.5 rounded-lg text-xs font-black text-white focus:outline-none cursor-pointer transition-colors"
                >
                  {destinationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Path status tag */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-mono">STATUS: PATH FOUND</span>
              <span className="text-[10px] text-blue-400 font-black">출도착 요원 최적루트</span>
            </div>
          </div>

          {/* RIGHT: ONE-TOUCH YOUTUBE STUDY LINK */}
          <motion.a
            href={selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="lg:col-span-8 bg-gradient-to-br from-red-950/20 to-slate-950/45 border-2 border-red-900/35 hover:border-red-500/50 rounded-xl p-6 flex flex-col justify-between items-stretch gap-6 transition-all group cursor-pointer shadow-lg hover:shadow-red-950/10 min-h-[220px]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                  <PlayCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    YouTube 실무 동영상
                  </span>
                  <h4 className="text-base md:text-lg font-black text-white mt-1 group-hover:text-red-400 transition-colors">
                    {selectedVideo?.title || '출도착 사무실 연계 경로 동선 가이드'}
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1 max-w-xl leading-relaxed">
                    실제 서울역 현장에서 촬영된 교통약자 동반 동선과 요원실 연계 흐름을 생생하게 유튜브 영상으로 시청합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-red-950/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-bold">인터랙티브 자동 연동</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-black text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl shadow-lg transition-colors shrink-0">
                 유튜브 원터치 시청하기 <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* 2. LOWER PANEL: 2D FLOORPLAN (배치도) */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base md:text-lg font-black tracking-tight">서울역 2D 평면 배치도</h3>
          </div>
          <p className="text-[10px] text-slate-500 font-mono hidden sm:block">INTERACTIVE BLUEPRINT VIEW</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[850px] aspect-[16/10] bg-[#0c0d14] rounded-2xl border border-slate-800 p-4 overflow-hidden shadow-inner bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center select-none">
            {/* Red and Gray Compass Labels (from uploaded image) */}
            <div className="absolute top-4 left-5 text-[#f43f5e] font-black text-[10px] tracking-wider select-none font-sans flex items-center gap-1">
              <span>▲</span> <span>N (행신/신촌)</span>
            </div>
            
            <div className="absolute bottom-4 right-5 text-slate-500 font-bold text-[10px] tracking-wider select-none font-mono">
              <span>S (용산/부산)</span>
            </div>

            {/* Immersive SVG dashed line overlays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 750" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* West Column: Connecting West Cargo, Exit 3, West Taxi, and West Parking */}
              <path d="M 80 140 L 80 500" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="2.5" strokeDasharray="6,6" />
              <path d="M 80 244 L 140 244" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="2.5" strokeDasharray="6,6" />
              {/* East Column: Connecting Exit 2, Exit 1, Subway 1-4, and Clock Tower */}
              <path d="M 920 60 L 920 390" stroke="rgba(59, 130, 246, 0.45)" strokeWidth="2.5" strokeDasharray="6,6" />
            </svg>

            {/* RENDER BOXES */}
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
                  className={`absolute rounded-xl transition-all flex flex-col items-center justify-center p-1 text-center select-none ${
                    isInteractive ? 'cursor-pointer hover:border-slate-500 z-10' : ''
                  } ${box.className} ${
                    isSelected ? box.activeColor : ''
                  }`}
                >
                  {box.label ? box.label : <span className="text-[7.5px] font-black">{box.name}</span>}
                </div>
              );
            })}
          </div>

          <p className="text-[9.5px] text-slate-500 font-mono mt-3 select-none text-center">
            ※ 배치도 평면의 파란색/보라색 핫스팟 상자나 핀을 터치하면, 상단 가이드 동선 비디오 및 탐색기 출발/도착 목적지가 연동 제어됩니다.
          </p>
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
      name: 'KTX-산천 중련 (1~18호차)',
      totalCars: 18,
      wheelchairCars: [1, 11],
      liftCars: [1, 11],
      specialCars: [3, 13],
      elevatorsNextTo: [9],
      note: 'KTX-산천 중련 편성 열차는 1호차~8호차, 11호차~18호차 구성을 가집니다. 휠체어석과 리프트 위치는 1호차와 11호차이며, 특실은 3호차와 13호차에 위치하고 있습니다.'
    },
    ktx_srt_double: {
      name: 'KTX 산천 - SRT 중련 (1~18호차)',
      totalCars: 18,
      wheelchairCars: [1, 11],
      liftCars: [1, 11],
      specialCars: [3, 13],
      elevatorsNextTo: [9],
      note: '중련 편성열차(복합열차)로 운행할 시 1~8호차 및 11~18호차 구조를 가집니다. 휠체어석 및 리프트 위치는 1호차와 11호차이며, 특실은 3호차와 13호차에 위치합니다.'
    },
    srt_single: {
      name: 'SRT 단편성 (1~8호차)',
      totalCars: 8,
      wheelchairCars: [1],
      liftCars: [1],
      specialCars: [3],
      elevatorsNextTo: [],
      note: 'SRT 단편성은 1~8호차 구조를 가집니다. 휠체어석 및 리프트 위치는 1호차이며, 특실은 3호차에 위치합니다.'
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
      totalCars: 8,
      wheelchairCars: [3],
      liftCars: [3],
      specialCars: [1],
      elevatorsNextTo: [],
      note: 'KTX-청룡은 동력분산식 신형 고속열차입니다. 단편성(1~8호차) 구조 기준 휠체어석은 3호차에 위치하고 있어 리프트 승하차 작업도 해당 호차에서 대응합니다. 우등실은 1호차에 위치해 있습니다.'
    },
    itx_maum: {
      name: 'ITX-마음 (1~6호차)',
      totalCars: 6,
      wheelchairCars: [1],
      liftCars: [1],
      specialCars: [],
      elevatorsNextTo: [],
      note: 'ITX-마음은 신형 동력분산식 일반열차로 1~6호차 편성을 이룹니다. 휠체어석과 리프트 승하차 위치는 1호차에 위치하며 엘리베이터 이동 동선은 별도로 승강장 정렬선에 구속받지 않습니다.'
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
            <Accessibility className="w-5 h-5 text-blue-400" /> 열차 종류별 특징과 구조
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

              const isEngineCar = ['ktx_sancheon', 'ktx_srt_double'].includes(selectedTrain) && (carNumber === 9 || carNumber === 10);

              return (
                <div key={carNumber} className="flex items-center shrink-0">
                  {/* Car Block Card */}
                  <div
                    className={`w-[68px] h-20 rounded-xl flex flex-col justify-between p-2.5 relative border transition-all ${
                      isEngineCar
                        ? 'bg-slate-900 text-slate-500 border-dashed border-slate-800'
                        : isWheelchair
                        ? 'bg-blue-500/20 text-blue-400 border-blue-400/80 shadow-md shadow-blue-500/10 font-bold'
                        : isSpecial
                        ? 'bg-red-500/15 text-red-400 border-red-500/40'
                        : 'bg-slate-800/40 text-slate-300 border-slate-700/40'
                    }`}
                  >
                    {/* Car Index Badge */}
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black">
                        {isEngineCar ? '연결부' : selectedTrain === 'ktx_std' && carNumber === 2 ? '2호차(특실)' : `${carNumber}호차`}
                      </span>
                      {isSpecial && !isEngineCar && (
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
                      {isEngineCar ? (
                        <span className="text-[9px] font-semibold text-slate-600">동력차</span>
                      ) : (
                        <>
                          {isWheelchair && (
                            <div className="relative group/w pointer-events-auto">
                              <Accessibility className="w-4 h-4 text-blue-400 animate-pulse" />
                            </div>
                          )}
                          {isLift && (
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute right-2 bottom-3"></div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Sub indicators inside car */}
                    <div className="text-[7.5px] text-slate-400 text-center font-mono tracking-tighter">
                      {isEngineCar ? '차량제어' : isWheelchair ? '휠체어석/리프트' : isSpecial ? (['ktx_eum', 'ktx_cheongryong'].includes(selectedTrain) ? '우등실' : '특실') : '일반석'}
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
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs">
          <div className="space-y-2">
            <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-wider">포인터 범례</h5>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-slate-300 font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500/50 block"></span>
                <span>휠체어석/리프트</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500/50 block"></span>
                <span>특실 / 우등실 (빨간색)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500 block animate-pulse"></span>
                <span>리프트 세팅 장소</span>
              </div>
              {currentTrain.elevatorsNextTo.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-600/30 border border-emerald-500/50 block"></span>
                  <span>엘리베이터 위치 (E/V)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioBlueprint() {
  const [activePart, setActivePart] = useState<'ptt' | 'channel' | 'volume'>('ptt');
  const [currentTime, setCurrentTime] = useState('05:23:19');
  const [showWorkText, setShowWorkText] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const toggleTimer = setInterval(() => {
      setShowWorkText(prev => !prev);
    }, 3000);
    return () => clearInterval(toggleTimer);
  }, []);

  const radioParts = {
    ptt: {
      name: '무전기 왼쪽면 (PTT 송신 버튼)',
      subName: 'Push-To-Talk Button',
      desc: '무전 전송의 가장 핵심 버튼으로, 좌측면에 넓게 위치하여 손가락으로 누르기 쉬운 구조입니다.',
      rules: [
        '송신 방법: 버튼을 꾹 누른 상태에서 말을 하고, 말을 마친 뒤 즉시 손을 떼어야 상대방이 무전을 수신할 수 있습니다.',
        '0.5초 대기 룰 (★필수★): PTT 버튼을 누르자마자 즉시 말하기 시작하면 첫 음절(예: "선상")이 무선 기기에 로드되지 않아 잘릴 수 있습니다. 누르고 0.5초 쉬고 호출을 시작하는 것이 정석입니다.',
        '한 명이 PTT 버튼을 누르고 방송하는 동안 해당 채널의 다른 모든 사람은 송신이 불가하므로 짧고 간결하게 무전을 마쳐야 합니다.'
      ],
      tips: '무전 마무리는 무조건 "~이상"으로 종결하여 전송이 종료되었음을 주변 근무자들에게 알려야 합니다.'
    },
    channel: {
      name: '상단 가운데 조절기 (채널/그룹선택)',
      subName: 'Channel Selector Knob',
      desc: '상단 안테나 바로 오른쪽에 솟아있는 세로 홈 형태의 회전형 다이얼 조절기입니다.',
      rules: [
        '기능: 서울역 사회복무요원 및 역무팀이 사용하는 채널 그룹(예: 운용, 종합안내, 출도착 등)을 세팅할 때 사용합니다.',
        "세팅법: 무전 채널은 '7. 작업' 채널에 고정해놓도록 합니다.",
        "주의사항: 업무 중 '1. 운전' 채널은 가급적 사용하지 않도록 합니다."
      ],
      tips: ''
    },
    volume: {
      name: '상단 우측 조절기 (전원 및 볼륨)',
      subName: 'Power & Volume Level Knob',
      desc: '상단 우측 맨 가장자리에 작고 둥글게 디자인된 회전형 다이얼 조절기입니다.',
      rules: [
        '전원 제어: 반시계 방향 끝까지 돌렸을 때 "딸깍" 소리가 나면서 무전기 전원이 완전히 꺼집니다. 시계 방향으로 돌리면 전원이 즉시 켜집니다.',
        '볼륨 크기: 시계 방향으로 더 깊게 돌릴수록 수신 볼륨 강도가 강해집니다.',
        '적정 수준 유지: 출도착 사무실에서는 볼륨을 중 수준으로 맞추어 놓고, 실외 승강장이나 소음이 심한 대합실에서는 최대치에 가깝게 볼륨을 높여서 무전 소리를 또렷하게 들어야 합니다.'
      ],
      tips: '수시로 볼륨 다이얼을 확인하고, 완전히 꺼놓아 호출에 응답하지 않는 실수를 방지하세요.'
    }
  };

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />

      <div className="relative">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              📡 표준 무전기 부위별 설명 및 도면
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
            * 각 부위를 직접 터치/클릭하거나 우측 탭을 선택하면 상세 실무 사용 노하우를 파악할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Radio Blueprint Interactive Sketch Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950/40 border border-slate-800/65 rounded-2xl p-6 relative py-16">
            <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">
              Blueprint Vector Style
            </span>

            {/* Simulated Device Housing Wrapper */}
            <div className="relative mt-20 w-[176px] h-[340px] bg-neutral-900 rounded-[32px] border-2 border-neutral-750 shadow-2xl flex flex-col items-center p-3 text-neutral-200">
              
              {/* Top Row External Hardware Controls */}
              
              {/* 1. Antenna Left */}
              <div className="absolute top-[-140px] left-[20px] w-4.5 h-[142px] bg-neutral-850 rounded-md flex flex-col justify-between border-t border-x border-neutral-755">
                <div className="h-4 w-full bg-gradient-to-b from-neutral-600 via-neutral-500 to-neutral-800 rounded-t-md" />
                <div className="h-4 w-full bg-neutral-900/80 border-y border-neutral-755 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-slate-500/60" />
                </div>
                <div className="h-5 w-full bg-amber-500 border-t border-neutral-800 animate-pulse flex items-center justify-center">
                  <span className="text-[6.5px] text-neutral-950 font-black tracking-tighter select-none leading-none">출도착</span>
                </div>
                <div className="h-[90px] w-full bg-neutral-800" />
              </div>

              {/* 2. Top-Middle Knob: Channel (상단 가운데 조절기) */}
              <button
                onClick={() => setActivePart('channel')}
                className={`absolute top-[-24px] left-[74px] w-6.5 h-7 rounded-t-md border-x border-t flex flex-col justify-between p-0.5 group active:scale-95 transition-all ${
                  activePart === 'channel'
                    ? 'bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-800 hover:bg-neutral-750 border-neutral-700'
                }`}
                title="상단 가운데 조절기 (채널/그룹선택)"
              >
                <div className="flex justify-around w-full h-full px-0.5">
                  <span className={`w-[1.5px] h-full ${activePart === 'channel' ? 'bg-amber-100' : 'bg-neutral-600'}`} />
                  <span className={`w-[1.5px] h-full ${activePart === 'channel' ? 'bg-amber-100' : 'bg-neutral-500'}`} />
                  <span className={`w-[1.5px] h-full ${activePart === 'channel' ? 'bg-amber-100' : 'bg-neutral-600'}`} />
                </div>
              </button>

              {/* 2-hotspot ripple pointer */}
              <div className="absolute top-[-36px] left-[84px]">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePart === 'channel' ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePart === 'channel' ? 'bg-amber-500' : 'bg-slate-500'}`}></span>
                </span>
              </div>

              {/* 3. Top-Right Knob: Power/Volume (상단 우측 조절기) */}
              <button
                onClick={() => setActivePart('volume')}
                className={`absolute top-[-20px] right-[24px] w-6 h-[22px] rounded-t-sm border-x border-t flex flex-col items-center justify-between p-0.5 active:scale-95 transition-all ${
                  activePart === 'volume'
                    ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-neutral-800 hover:bg-neutral-750 border-neutral-700'
                }`}
                title="상단 우측 조절기 (전원 및 볼륨)"
              >
                <div className="flex justify-between w-full h-full px-0.5 opacity-60">
                  <span className="w-0.5 h-full bg-neutral-900" />
                  <span className="w-0.5 h-full bg-neutral-900" />
                </div>
              </button>

              {/* 3-hotspot ripple pointer */}
              <div className="absolute top-[-32px] right-[30px]">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePart === 'volume' ? 'bg-blue-400' : 'bg-slate-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePart === 'volume' ? 'bg-blue-500' : 'bg-slate-500'}`}></span>
                </span>
              </div>

              {/* 4. Left Side Button PTT (무전기 왼쪽면) */}
              <button
                onClick={() => setActivePart('ptt')}
                className={`absolute top-[48px] left-[-9px] w-[10px] h-18 rounded-l-lg border-y border-l active:translate-x-0.5 transition-all ${
                  activePart === 'ptt'
                    ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/30'
                    : 'bg-neutral-700 hover:bg-neutral-600 border-neutral-800'
                }`}
                title="무전기 왼쪽면 (PTT 송신 버튼)"
              >
                {/* Texture grooves */}
                <div className="flex flex-col gap-1 items-center justify-center h-full py-2">
                  <div className="w-[3px] h-[3px] rounded-full bg-neutral-900/60" />
                  <div className="w-[3px] h-[3px] rounded-full bg-neutral-900/60" />
                  <div className="w-[3px] h-[3px] rounded-full bg-neutral-900/60" />
                </div>
              </button>

              {/* 4-hotspot ripple pointer */}
              <div className="absolute top-[70px] left-[-24px]">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePart === 'ptt' ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePart === 'ptt' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                </span>
              </div>

              {/* Front Casing Face Design */}
              
              {/* Speaker ventilation slots */}
              <div className="w-full flex flex-col gap-1.5 mt-5 px-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-1 bg-neutral-950 rounded-full w-full opacity-60 border-t border-neutral-800" />
                ))}
              </div>

              {/* LCD Display Screen Panel */}
              <div className="w-full bg-[#1e2e1e]/90 rounded-xl border-2 border-neutral-950 p-2 mt-7 flex flex-col justify-between h-[64px] font-mono select-none relative overflow-hidden">
                {/* Background retro grill overlay */}
                <div className="absolute inset-0 bg-emerald-500/5 opacity-5 pointer-events-none" />

                {/* Status bar icons line */}
                <div className="flex justify-between items-center text-[8px] text-emerald-400/90 font-black tracking-tight border-b border-emerald-900/20 pb-0.5">
                  <div className="flex gap-1">
                    <span>📶</span>
                    <span>L</span>
                    <span>25T</span>
                    <span>VOX</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>((·))</span>
                    <span>🔓</span>
                    <span className="animate-pulse">🔋</span>
                  </div>
                </div>

                {/* Main digital readout showing actual live clock! */}
                <div className="text-center text-sm md:text-base font-black text-emerald-400 tracking-wider font-mono py-1">
                  {showWorkText ? '7. 작업' : currentTime}
                </div>

                {/* Logo and model label at the bottom inside screen */}
                <div className="flex justify-between text-[7.5px] text-emerald-500/70 font-bold tracking-tighter">
                  <span>KORAIL</span>
                  <span>PZ-100RB</span>
                </div>
              </div>

              {/* Front Panel Grid buttons */}
              <div className="grid grid-cols-4 gap-1.5 w-full mt-7">
                {['F1', 'F2', 'F3', 'F4'].map((b) => (
                  <div key={b} className="h-4.5 bg-sky-900/80 border border-sky-800 text-[8.5px] font-black text-sky-300 rounded inline-flex items-center justify-center font-mono shadow-sm">
                    {b}
                  </div>
                ))}
              </div>

              {/* White holographic ID Badge sticker */}
              <div className="w-32 bg-white/95 border border-neutral-800 shadow-sm p-1 rounded mt-8 flex justify-center items-center">
                <span className="text-[10px] font-black font-mono tracking-widest text-slate-800 bg-gradient-to-r from-red-600 via-emerald-600 to-indigo-600 bg-clip-text">
                  1507852
                </span>
              </div>

            </div>

            {/* Part indicator pointers overlaying bottom */}
            <div className="mt-8 flex gap-2 justify-center w-full">
              {(['ptt', 'channel', 'volume'] as const).map((part) => (
                <button
                  key={part}
                  onClick={() => setActivePart(part)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    activePart === part
                      ? part === 'ptt'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                        : part === 'channel'
                        ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {part === 'ptt' ? '무전기 왼쪽면' : part === 'channel' ? '가운데 조절기' : '우측 조절기'}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Information Panel about active part */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Control Panel Tab-styled selector */}
            <div className="flex bg-slate-950/40 p-1.5 rounded-xl border border-slate-800">
              {(['ptt', 'channel', 'volume'] as const).map((part) => (
                <button
                  key={part}
                  onClick={() => setActivePart(part)}
                  className={`flex-1 text-center py-2.5 rounded-lg text-xs font-black transition-all ${
                    activePart === part
                      ? part === 'ptt'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md'
                        : part === 'channel'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-md'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {part === 'ptt' ? '무전기 왼쪽면' : part === 'channel' ? '가운데 조절기' : '우측 조절기'}
                </button>
              ))}
            </div>

            {/* Detail explanation content card with micro anims */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePart}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950/25 border border-slate-800/85 rounded-2xl p-6 md:p-8 space-y-6"
              >
                {/* Badge title */}
                <div className="flex justify-between items-start gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {radioParts[activePart].name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold uppercase font-mono mt-0.5 tracking-wide">
                      {radioParts[activePart].subName}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-black border tracking-wider shrink-0 ${
                    activePart === 'ptt'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : activePart === 'channel'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {activePart} mode
                  </span>
                </div>

                {/* Section desc */}
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">설명 및 역할</h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                    {radioParts[activePart].desc}
                  </p>
                </div>

                {/* Detailed checklist */}
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">행동 요령 및 수칙</h4>
                  <div className="space-y-3.5">
                    {radioParts[activePart].rules.map((rule, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${
                          activePart === 'ptt'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : activePart === 'channel'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-blue-500/15 text-blue-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                          {rule.includes("★필수★") ? (
                            <>
                              {rule.split("★필수★")[0]}
                              <span className="text-red-400 font-extrabold">★필수★</span>
                              {rule.split("★필수★")[1]}
                            </>
                          ) : rule.includes("꾹 누른 상태") || rule.includes("손을 떼어야") ? (
                            <>
                              {rule.split("꾹 누른 상태")[0]}
                              <span className="text-emerald-400 font-extrabold">"꾹 누른 상태"</span>
                              {rule.split("꾹 누른 상태")[1] ? (
                                rule.split("꾹 누른 상태")[1].includes("손을 떼어야") ? (
                                  <>
                                    {rule.split("꾹 누른 상태")[1].split("손을 떼어야")[0]}
                                    <span className="text-emerald-400 font-extrabold">"손을 떼어야"</span>
                                    {rule.split("꾹 누른 상태")[1].split("손을 떼어야")[1]}
                                  </>
                                ) : (
                                  rule.split("꾹 누른 상태")[1]
                                )
                              ) : null}
                            </>
                          ) : rule.includes("0.5초 쉬고") ? (
                            <>
                              {rule.split("0.5초 쉬고")[0]}
                              <span className="text-amber-400 font-extrabold">"0.5초 쉬고"</span>
                              {rule.split("0.5초 쉬고")[1]}
                            </>
                          ) : rule.includes("전원이 완전히 꺼집니다") || rule.includes("전원이 즉시 켜집니다") ? (
                            <>
                              {rule.split("전원이 완전히 꺼집니다")[0]}
                              <span className="text-rose-400 font-extrabold">전원이 완전히 꺼집니다</span>
                              {rule.split("전원이 완전히 꺼집니다")[1] ? (
                                rule.split("전원이 완전히 꺼집니다")[1].includes("전원이 즉시 켜집니다") ? (
                                  <>
                                    {rule.split("전원이 완전히 꺼집니다")[1].split("전원이 즉시 켜집니다")[0]}
                                    <span className="text-blue-400 font-extrabold">전원이 즉시 켜집니다</span>
                                    {rule.split("전원이 완전히 꺼집니다")[1].split("전원이 즉시 켜집니다")[1]}
                                  </>
                                ) : (
                                  rule.split("전원이 완전히 꺼집니다")[1]
                                )
                              ) : null}
                            </>
                          ) : (
                            rule
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Tip card */}
                {radioParts[activePart].tips && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3 items-start">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activePart === 'ptt'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : activePart === 'channel'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        실무 꿀팁
                      </h5>
                      <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                        {radioParts[activePart].tips}
                      </p>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   5. BOARDING ROUTE OPTIMIZER (etc-3)
   ========================================================================== */
function BoardingRouteOptimizer() {
  const [animKey] = useState(0);

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Background radial glowing gradients for immersive tech theme */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" /> 탑승 동선 최적화 시뮬레이션
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              좌석 위치에 따라 승강장에서 어떤 출입구로 탑승하는 것이 더 빠른지 직관적으로 가이드합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800/80 text-[11px] font-bold text-slate-400 self-start md:self-auto">
            <span>실무 노하우</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <span className="text-emerald-400">7호차 15C 좌석 사례</span>
          </div>
        </div>

        {/* Informational Warning / Core Concept */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3.5 items-start">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 border border-blue-500/15">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-300">💡 왜 8호차 출입구로 들어가는 것이 더 적절할까요?</h4>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              KTX-산천 7호차 15C 좌석은 객실의 가장 동쪽 끝(8호차 연결 통로 바로 앞)에 위치해 있습니다. 
              7호차 전용 출입구는 객실 서쪽 끝에 있으므로, 7호차로 승차하면 객실 복도를 따라 길게 이동해야 하는 반면, 
              <strong> 8호차 출입구로 승차하면 들어가자마자 7호차 15C 좌석이 눈앞에 위치</strong>합니다.
            </p>
          </div>
        </div>

        {/* Interactive Diagram Board */}
        <div className="bg-slate-950/80 border border-slate-800/60 rounded-2xl p-4 md:p-6 flex flex-col items-center">
          
          {/* Top Info Banner */}
          <div className="w-full flex justify-between items-center text-[10px] md:text-xs font-bold text-slate-400 mb-4 px-1">
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-400 font-bold uppercase tracking-wider">
              동선 다이어그램
            </span>
            <span className="text-blue-400 bg-blue-500/10 border border-blue-500/15 px-2.5 py-1 rounded-md">
              7호차 15C 좌석 기준
            </span>
          </div>

          {/* SVG Canvas drawing train, arrows, X and O */}
          <div className="w-full max-w-xl bg-slate-950 border border-slate-900 rounded-xl relative py-6 flex flex-col items-center justify-center overflow-hidden">
            
            <svg 
              viewBox="0 0 600 340" 
              className="w-full h-auto select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions for Gradients & Markers */}
              <defs>
                <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="glowRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
                <linearGradient id="glowGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
                {/* Glow Filters */}
                <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neonGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid backdrop for blueprint style */}
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
              <rect width="600" height="340" fill="url(#gridPattern)" rx="10" />

              {/* ==================== TRAIN DRAWING ==================== */}
              {/* Outer track line */}
              <line x1="50" y1="180" x2="550" y2="180" stroke="#475569" strokeWidth="2" strokeDasharray="5 5" />

              {/* Train Car Body (Integrated Container) */}
              {/* Left Side (Car 7) */}
              <rect 
                x="140" 
                y="65" 
                width="280" 
                height="100" 
                rx="12" 
                fill="url(#trainGrad)" 
                stroke="#475569" 
                strokeWidth="2.5" 
              />
              {/* Right Side (Car 8) */}
              <rect 
                x="440" 
                y="65" 
                width="120" 
                height="100" 
                rx="12" 
                fill="url(#trainGrad)" 
                stroke="#475569" 
                strokeWidth="2.5" 
              />

              {/* Connection Corridor (Vestibule) */}
              <rect x="415" y="75" width="28" height="80" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <line x1="415" y1="115" x2="443" y2="115" stroke="#334155" strokeWidth="2" />

              {/* Windows - Car 7 */}
              <g opacity="0.85">
                <rect x="160" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="200" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="240" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="280" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="320" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="360" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
              </g>

              {/* Windows - Car 8 */}
              <g opacity="0.85">
                <rect x="465" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
                <rect x="510" y="75" width="25" height="15" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
              </g>

              {/* ==================== SEATS INSIDE CAR 7 ==================== */}
              {/* Helper Seats (Regular) */}
              <g opacity="0.4">
                <rect x="165" y="125" width="14" height="14" rx="2.5" fill="#475569" />
                <rect x="185" y="125" width="14" height="14" rx="2.5" fill="#475569" />
                
                <rect x="215" y="125" width="14" height="14" rx="2.5" fill="#475569" />
                <rect x="235" y="125" width="14" height="14" rx="2.5" fill="#475569" />

                <rect x="265" y="125" width="14" height="14" rx="2.5" fill="#475569" />
                <rect x="285" y="125" width="14" height="14" rx="2.5" fill="#475569" />

                <rect x="315" y="125" width="14" height="14" rx="2.5" fill="#475569" />
                <rect x="335" y="125" width="14" height="14" rx="2.5" fill="#475569" />
              </g>

              {/* TARGET SEAT: 7호차 15C */}
              <rect 
                x="380" 
                y="122" 
                width="22" 
                height="22" 
                rx="5" 
                fill="#3b82f6" 
                stroke="#60a5fa" 
                strokeWidth="1.5" 
                className="animate-pulse"
              />
              <text x="391" y="136" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                15C
              </text>
              
              {/* Highlight Target Indicator Line & Text */}
              <line x1="391" y1="116" x2="391" y2="103" stroke="#60a5fa" strokeWidth="1.5" />
              <circle cx="391" cy="116" r="2" fill="#60a5fa" />
              <rect x="356" y="86" width="70" height="16" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
              <text x="391" y="97" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                고객 좌석 15C
              </text>

              {/* Labels above the train */}
              <text x="280" y="45" fill="#94a3b8" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">
                7호차 (일반실)
              </text>
              <text x="500" y="45" fill="#64748b" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">
                8호차
              </text>

              {/* ==================== ROUTE PATH ARROWS ==================== */}
              
              {/* --- ROUTE 1: 7호차 왼쪽 입구 탑승 (빨간색) --- */}
              {/* Background Path line (dimmed red) */}
              <path 
                d="M 100,280 L 100,115 L 145,115 L 375,115" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="2.5" 
                strokeOpacity="0.15" 
              />
              
              {/* Dynamic Animated Path Line */}
              <motion.path
                key={`route7-path-${animKey}`}
                d="M 100,280 L 100,115 L 145,115 L 375,115"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#neonGlowRed)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: "linear" }}
              />

              {/* Red Path Arrow Head */}
              <polygon points="144,115 137,110 137,120" fill="#ef4444" />
              
              {/* --- ROUTE 2: 8호차 오른쪽 입구 탑승 (초록색) --- */}
              {/* Background Path line (dimmed green) */}
              <path 
                d="M 500,280 L 500,115 L 430,115 L 405,115" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2.5" 
                strokeOpacity="0.15" 
              />
              
              {/* Dynamic Animated Path Line */}
              <motion.path
                key={`route8-path-${animKey}`}
                d="M 500,280 L 500,115 L 430,115 L 405,115"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#neonGlowGreen)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "linear" }}
              />

              {/* Green Path Arrow Head */}
              <polygon points="431,115 438,110 438,120" fill="#10b981" />

              {/* Passenger Animated Dot - Route 1 */}
              <motion.circle
                key={`route7-dot-${animKey}`}
                r="7"
                fill="#fca5a5"
                stroke="#ef4444"
                strokeWidth="2"
                filter="url(#neonGlowRed)"
                style={{
                  motionPath: "path('M 100,280 L 100,115 L 145,115 L 375,115')"
                }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
              />

              {/* Passenger Animated Dot - Route 2 */}
              <motion.circle
                key={`route8-dot-${animKey}`}
                r="7"
                fill="#a7f3d0"
                stroke="#10b981"
                strokeWidth="2"
                filter="url(#neonGlowGreen)"
                style={{
                  motionPath: "path('M 500,280 L 500,115 L 430,115 L 405,115')"
                }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              />

              {/* ==================== X AND O LABELS ON VERTICAL SEGMENTS ==================== */}
              {/* 7호차 쪽 빨간 X 표시 */}
              <g transform="translate(100, 205)">
                <circle cx="0" cy="0" r="18" fill="url(#glowRed)" stroke="#ef4444" strokeWidth="2.5" />
                {/* Cross 'X' drawing */}
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="8" y1="-8" x2="-8" y2="8" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
              </g>
              <rect x="50" y="230" width="100" height="16" rx="4" fill="#7f1d1d" opacity="0.8" />
              <text x="100" y="241" fill="#fca5a5" fontSize="8" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">
                7호차 동선
              </text>

              {/* 8호차 쪽 초록 O 표시 */}
              <g transform="translate(500, 205)">
                <circle cx="0" cy="0" r="18" fill="url(#glowGreen)" stroke="#10b981" strokeWidth="2.5" />
                {/* Circle 'O' drawing */}
                <circle cx="0" cy="0" r="8" fill="none" stroke="#ffffff" strokeWidth="3.5" />
              </g>
              <rect x="450" y="230" width="100" height="16" rx="4" fill="#064e3b" opacity="0.8" />
              <text x="500" y="241" fill="#a7f3d0" fontSize="8" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">
                8호차 동선
              </text>

              {/* Center Title label at the bottom of the diagram */}
              <rect x="180" y="295" width="240" height="28" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
              <text 
                x="300" 
                y="314" 
                fill="#f1f5f9" 
                fontSize="12" 
                fontWeight="bold" 
                textAnchor="middle" 
                fontFamily="sans-serif"
                letterSpacing="1"
              >
                &lt;좌석이 7호차 15C인 경우&gt;
              </text>

            </svg>

          </div>

          {/* Simultaneous Route Information */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl border bg-slate-950/40 border-slate-800/80 text-slate-300 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500 border border-red-500/20">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-sm text-red-400 flex items-center gap-1.5">
                  7호차 진입 경로
                </span>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  객실 내부의 복도를 따라 길게 통과해야 하므로 상대적으로 이동 동선이 깁니다.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-slate-950/40 border-slate-800/80 text-slate-300 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                  8호차 진입 경로 (추천)
                </span>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  진입하자마자 15C 좌석이 위치해 있어 가장 단축된 동선으로 착석 가능합니다.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
