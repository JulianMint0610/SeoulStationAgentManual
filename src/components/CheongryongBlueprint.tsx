import { cn } from '../lib/utils';

interface CheongryongBlueprintProps {
  isDarkMode: boolean;
  className?: string;
}

export default function CheongryongBlueprint({ isDarkMode, className }: CheongryongBlueprintProps) {
  // Theme-dependent colors for blueprint rendering
  const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.55)' : 'rgba(191, 219, 254, 0.45)';
  const strokeColor = isDarkMode ? 'rgba(96, 165, 250, 0.45)' : 'rgba(37, 99, 235, 0.35)';
  const bodyFill = isDarkMode ? 'rgba(30, 58, 138, 0.28)' : 'rgba(37, 99, 235, 0.16)';
  const windshieldFill = isDarkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(30, 58, 138, 0.5)';
  const windowRibbonFill = isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.75)';
  const windowFill = isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)';
  const stripeColor1 = isDarkMode ? 'rgba(245, 158, 11, 0.95)' : 'rgba(245, 158, 11, 0.95)';
  const stripeColor2 = isDarkMode ? 'rgba(245, 158, 11, 0.75)' : 'rgba(245, 158, 11, 0.75)';
  const textColor = isDarkMode ? 'text-blue-400/75' : 'text-blue-700/75';
  const labelColor = isDarkMode ? 'text-blue-300/60' : 'text-blue-800/60';
  const accentColor = isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(29, 78, 216, 0.6)';

  return (
    <div className={cn("relative w-full overflow-hidden select-none pointer-events-none", className)}>
      <svg
        viewBox="0 0 1000 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* Blueprint Grid Pattern definitions */}
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" />
          </pattern>
          <pattern id="blueprint-subgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.4" />
          </pattern>

          {/* Gradients for authentic schematic styling */}
          <linearGradient id="train-shading" x1="0" y1="90" x2="0" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkMode ? "rgba(30, 41, 59, 0.1)" : "rgba(255, 255, 255, 0.3)"} />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor={isDarkMode ? "rgba(15, 23, 42, 0.2)" : "rgba(241, 245, 249, 0.2)"} />
          </linearGradient>
        </defs>

        {/* 1. Blueprint Grid Layer */}
        <rect width="1000" height="350" fill="url(#blueprint-subgrid)" />
        <rect width="1000" height="350" fill="url(#blueprint-grid)" />

        {/* 2. Technical Drawing Annotation Lines */}
        {/* Horizontal Center Lines */}
        <line x1="10" y1="175" x2="990" y2="175" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="10 5 2 5" />
        <line x1="300" y1="90" x2="300" y2="330" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="5 5" />
        <line x1="680" y1="90" x2="680" y2="330" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="5 5" />

        {/* Projection and Angle markings */}
        <path d="M 30,290 L 5,290 M 30,90 L 5,90" stroke={strokeColor} strokeWidth="0.8" />
        {/* Front dimension vertical line */}
        <line x1="15" y1="90" x2="15" y2="290" stroke={strokeColor} strokeWidth="0.8" />
        <path d="M 11,95 L 15,90 L 19,95 M 11,285 L 15,290 L 19,285" stroke={strokeColor} strokeWidth="0.8" />

        {/* Longitudinal dimension horizontal line */}
        <line x1="30" y1="335" x2="970" y2="335" stroke={strokeColor} strokeWidth="0.8" />
        <path d="M 35,331 L 30,335 L 35,339 M 965,331 L 970,335 L 965,339" stroke={strokeColor} strokeWidth="0.8" />
        <line x1="30" y1="290" x2="30" y2="340" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="970" y1="290" x2="970" y2="340" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Technical Text Labels */}
        <text x="500" y="330" textAnchor="middle" className={cn("font-mono text-[7.5px] font-semibold tracking-[0.15em]", textColor)}>
          L_OVERALL = 20,100 mm (1-CAR LEADING SECTION)
        </text>
        <text x="25" y="195" textAnchor="middle" transform="rotate(-90 25 195)" className={cn("font-mono text-[7px] font-semibold tracking-[0.1em]", textColor)}>
          H_MAX = 3,700 mm
        </text>

        {/* 3. Train Main Outer Shell Body */}
        {/* Aerodynamic profile and windshield curve */}
        <path
          d="M 30,290 
             C 31,270 38,252 50,238 
             C 75,210 135,185 195,160 
             C 255,135 320,110 410,98 
             C 470,90 550,90 680,90 
             L 1000,90 
             L 1000,290 
             L 170,290 
             L 155,298 
             C 142,305 125,305 110,305 
             L 60,305 
             L 30,290 Z"
          fill={bodyFill}
          stroke={accentColor}
          strokeWidth="1.6"
        />
        {/* Inner shadow/specular fill */}
        <path
          d="M 30,290 
             C 31,270 38,252 50,238 
             C 75,210 135,185 195,160 
             C 255,135 320,110 410,98 
             C 470,90 550,90 680,90 
             L 1000,90 
             L 1000,290 Z"
          fill="url(#train-shading)"
        />

        {/* 4. Streamlined Driver Windshield (Cab Glass) */}
        <path
          d="M 145,178 
             C 165,160 215,145 240,140 
             L 282,140 
             L 245,178 Z"
          fill={windshieldFill}
          stroke={accentColor}
          strokeWidth="1.2"
        />

        {/* Side Driver's Window */}
        <path
          d="M 292,140 
             L 345,140 
             L 332,162 
             C 315,165 300,165 292,165 Z"
          fill={windshieldFill}
          stroke={accentColor}
          strokeWidth="0.8"
        />

        {/* 5. Window Ribbon (The famous continuous black side-band) */}
        <path
          d="M 360,140 
             L 1000,140 
             L 1000,185 
             L 540,185 
             C 490,185 435,180 370,172 
             C 362,171 358,168 358,162 
             Z"
          fill={windowRibbonFill}
          stroke={accentColor}
          strokeWidth="0.8"
        />

        {/* Rounded Passenger Windows */}
        {/* Window 1 */}
        <rect x="580" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="604" y1="146" x2="604" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 2 */}
        <rect x="645" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="669" y1="146" x2="669" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 3 */}
        <rect x="710" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="734" y1="146" x2="734" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 4 */}
        <rect x="775" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="799" y1="146" x2="799" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 5 */}
        <rect x="840" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="864" y1="146" x2="864" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 6 */}
        <rect x="905" y="146" width="48" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />
        <line x1="929" y1="146" x2="929" y2="172" stroke={strokeColor} strokeWidth="0.5" />
        {/* Window 7 */}
        <rect x="970" y="146" width="30" height="26" rx="4" fill={windowFill} stroke={accentColor} strokeWidth="0.8" />

        {/* 6. Iconic Double Sweeping Yellow/Orange Stripes (KTX-Cheongryong Signature) */}
        {/* Lower Sweeping Thick Stripe */}
        <path
          d="M 105,232 
             C 165,214 265,198 360,188 
             C 415,182 455,166 510,166 
             L 1000,166"
          fill="none"
          stroke={stripeColor1}
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        {/* Secondary Upper Thin Stripe */}
        <path
          d="M 180,240 
             C 245,225 325,212 400,201 
             C 455,193 490,176 545,176 
             L 1000,176"
          fill="none"
          stroke={stripeColor2}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Passenger/Cab Access Door Details */}
        <path d="M 458,140 L 458,268 L 498,268 L 498,185" stroke={accentColor} strokeWidth="0.8" />
        <rect x="474" y="152" width="10" height="22" rx="1.5" fill={windowFill} stroke={accentColor} strokeWidth="0.6" />
        {/* Door handle indicator */}
        <line x1="462" y1="210" x2="462" y2="218" stroke={accentColor} strokeWidth="1" />

        {/* Nose Hatch Seams & Aerodynamic Details */}
        <path d="M 50,250 C 58,255 70,268 75,282" fill="none" stroke={strokeColor} strokeWidth="0.8" />
        <path d="M 115,220 C 130,230 142,245 145,260" fill="none" stroke={strokeColor} strokeWidth="0.6" />
        {/* Front light housing contour */}
        <polygon points="62,274 78,268 85,278 72,284" fill="none" stroke={accentColor} strokeWidth="0.8" />
        <circle cx="70" cy="275" r="2" fill={isDarkMode ? "#60a5fa" : "#2563eb"} opacity="0.6" />
        <circle cx="77" cy="277" r="2" fill={isDarkMode ? "#60a5fa" : "#2563eb"} opacity="0.6" />

        {/* 7. KTX-Cheongryong Logo Text Assembly */}
        <g transform="translate(325, 230)" className="select-none">
          {/* Main bold italic logo */}
          <text
            x="0"
            y="0"
            fill={isDarkMode ? "rgba(96, 165, 250, 0.95)" : "rgba(29, 78, 216, 0.95)"}
            className="font-sans font-black italic text-[16px] tracking-tight"
          >
            KTX
          </text>
          {/* Subtitle brand name '청룡' */}
          <text
            x="32"
            y="-1"
            fill="rgba(245, 158, 11, 0.95)"
            className="font-sans font-extrabold text-[12.5px] tracking-tight"
          >
            청룡
          </text>
          {/* Small English text logo */}
          <text
            x="0.5"
            y="9"
            fill={isDarkMode ? "rgba(226, 232, 240, 0.85)" : "rgba(15, 23, 42, 0.8)"}
            className="font-mono font-black text-[5.8px] tracking-[0.25em]"
          >
            CHEONG-RYONG
          </text>
        </g>

        {/* 8. Bogies, Suspensions & Wheels (Front and Rear Under-Assembly) */}
        {/* Rails / Ground Line */}
        <line x1="0" y1="316" x2="1000" y2="316" stroke={accentColor} strokeWidth="2.2" />
        <line x1="0" y1="319" x2="1000" y2="319" stroke={strokeColor} strokeWidth="0.8" />

        {/* Track Ties / Sleepers */}
        <path
          d="M 10,320 L 10,326 M 40,320 L 40,326 M 70,320 L 70,326 M 100,320 L 100,326 
             M 130,320 L 130,326 M 160,320 L 160,326 M 190,320 L 190,326 M 220,320 L 220,326 
             M 250,320 L 250,326 M 280,320 L 280,326 M 310,320 L 310,326 M 340,320 L 340,326 
             M 370,320 L 370,326 M 400,320 L 400,326 M 430,320 L 430,326 M 460,320 L 460,326 
             M 490,320 L 490,326 M 520,320 L 520,326 M 550,320 L 550,326 M 580,320 L 580,326 
             M 610,320 L 610,326 M 640,320 L 640,326 M 670,320 L 670,326 M 700,320 L 700,326 
             M 730,320 L 730,326 M 760,320 L 760,326 M 790,320 L 790,326 M 820,320 L 820,326 
             M 850,320 L 850,326 M 880,320 L 880,326 M 910,320 L 910,326 M 940,320 L 940,326 
             M 970,320 L 970,326 M 1000,320 L 1000,326"
          stroke={strokeColor}
          strokeWidth="1.5"
        />

        {/* FRONT BOGIE ASSEMBLY (Wheelbase X=240 to X=350) */}
        <g>
          {/* Bogie Frame structure */}
          <path d="M 220,282 L 370,282 L 350,290 L 240,290 Z" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(226,232,240,0.5)"} stroke={accentColor} strokeWidth="1" />
          <line x1="220" y1="282" x2="235" y2="298" stroke={accentColor} strokeWidth="0.8" />
          <line x1="370" y1="282" x2="355" y2="298" stroke={accentColor} strokeWidth="0.8" />

          {/* Primary Suspension Springs */}
          <path d="M 245,282 Q 250,268 255,282" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 251,282 Q 256,268 261,282" fill="none" stroke={accentColor} strokeWidth="1.2" />
          
          <path d="M 335,282 Q 340,268 345,282" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 341,282 Q 346,268 351,282" fill="none" stroke={accentColor} strokeWidth="1.2" />

          {/* Secondary Pneumatic Air Spring in center */}
          <ellipse cx="295" cy="275" rx="14" ry="7" fill={isDarkMode ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.8)"} stroke={accentColor} strokeWidth="1" />
          <line x1="295" y1="268" x2="295" y2="282" stroke={accentColor} strokeWidth="0.8" />

          {/* WHEEL 1 (Left Front) */}
          <circle cx="255" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="255" cy="298" r="12" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="255" cy="298" r="4.5" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          {/* Wheel ribs/bolts */}
          <circle cx="251" cy="294" r="1" fill={accentColor} />
          <circle cx="259" cy="294" r="1" fill={accentColor} />
          <circle cx="251" cy="302" r="1" fill={accentColor} />
          <circle cx="259" cy="302" r="1" fill={accentColor} />

          {/* WHEEL 2 (Right Front) */}
          <circle cx="335" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="335" cy="298" r="12" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="335" cy="298" r="4.5" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          {/* Wheel ribs/bolts */}
          <circle cx="331" cy="294" r="1" fill={accentColor} />
          <circle cx="339" cy="294" r="1" fill={accentColor} />
          <circle cx="331" cy="302" r="1" fill={accentColor} />
          <circle cx="339" cy="302" r="1" fill={accentColor} />

          {/* Magnetic Track Brake device sketched below axles */}
          <rect x="275" y="304" width="40" height="4" fill={isDarkMode ? "rgba(30,41,59,0.8)" : "rgba(100,116,139,0.7)"} stroke={accentColor} strokeWidth="0.6" />
        </g>

        {/* MID-BODY EQUIPMENT BELLY APPARATUS (Traction Box, Cooling units) */}
        <g>
          {/* Technical grids under body frame */}
          <rect x="420" y="291" width="90" height="13" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(241,245,249,0.7)"} stroke={accentColor} strokeWidth="0.8" />
          <path d="M 430,291 L 430,304 M 440,291 L 440,304 M 450,291 L 450,304 M 460,291 L 460,304 M 470,291 L 470,304 M 480,291 L 480,304 M 490,291 L 490,304 M 500,291 L 500,304" stroke={strokeColor} strokeWidth="0.6" />
          
          <rect x="525" y="291" width="115" height="15" rx="2" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(241,245,249,0.7)"} stroke={accentColor} strokeWidth="0.8" />
          {/* Fan circular detail */}
          <circle cx="550" cy="298" r="5" fill="none" stroke={strokeColor} strokeWidth="0.6" />
          <circle cx="615" cy="298" r="5" fill="none" stroke={strokeColor} strokeWidth="0.6" />

          <rect x="655" y="291" width="85" height="12" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(241,245,249,0.7)"} stroke={accentColor} strokeWidth="0.8" />
          <line x1="655" y1="297" x2="740" y2="297" stroke={strokeColor} strokeWidth="0.6" />
        </g>

        {/* REAR BOGIE ASSEMBLY (Wheelbase X=810 to X=920) */}
        <g>
          {/* Bogie Frame structure */}
          <path d="M 790,282 L 940,282 L 920,290 L 810,290 Z" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(226,232,240,0.5)"} stroke={accentColor} strokeWidth="1" />
          <line x1="790" y1="282" x2="805" y2="298" stroke={accentColor} strokeWidth="0.8" />
          <line x1="940" y1="282" x2="925" y2="298" stroke={accentColor} strokeWidth="0.8" />

          {/* Primary Suspension Springs */}
          <path d="M 815,282 Q 820,268 825,282" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 821,282 Q 826,268 831,282" fill="none" stroke={accentColor} strokeWidth="1.2" />

          <path d="M 905,282 Q 910,268 915,282" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 911,282 Q 916,268 921,282" fill="none" stroke={accentColor} strokeWidth="1.2" />

          {/* Secondary Pneumatic Air Spring in center */}
          <ellipse cx="865" cy="275" rx="14" ry="7" fill={isDarkMode ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.8)"} stroke={accentColor} strokeWidth="1" />
          <line x1="865" y1="268" x2="865" y2="282" stroke={accentColor} strokeWidth="0.8" />

          {/* WHEEL 3 (Left Rear) */}
          <circle cx="825" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="825" cy="298" r="12" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="825" cy="298" r="4.5" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          {/* Wheel ribs/bolts */}
          <circle cx="821" cy="294" r="1" fill={accentColor} />
          <circle cx="829" cy="294" r="1" fill={accentColor} />
          <circle cx="821" cy="302" r="1" fill={accentColor} />
          <circle cx="829" cy="302" r="1" fill={accentColor} />

          {/* WHEEL 4 (Right Rear) */}
          <circle cx="905" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="905" cy="298" r="12" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="905" cy="298" r="4.5" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          {/* Wheel ribs/bolts */}
          <circle cx="901" cy="294" r="1" fill={accentColor} />
          <circle cx="909" cy="294" r="1" fill={accentColor} />
          <circle cx="901" cy="302" r="1" fill={accentColor} />
          <circle cx="909" cy="302" r="1" fill={accentColor} />
        </g>

        {/* 9. Floating Specification Legends (Top Left / Right Metadata) */}
        {/* Top-Left Spec Column */}
        <g transform="translate(45, 30)">
          <text x="0" y="10" fill={isDarkMode ? "rgba(96, 165, 250, 0.85)" : "rgba(29, 78, 216, 0.8)"} className="font-mono text-[9px] font-black tracking-wide">
            PROJECT: KTX-CHEONG-RYONG (EMU-320)
          </text>
          <text x="0" y="21" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            BUILDER: HYUNDAI ROTEM DEVELOPMENT CORP
          </text>
          <text x="0" y="30" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            MAX TRAIN SPEED: 352 KM/H (DESIGN LIMIT)
          </text>
          <text x="0" y="39" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            TRACTIVE POWER: DISTRIBUTED TRACTION MOTORS
          </text>
        </g>

        {/* Top-Right Blueprint Status Column */}
        <g transform="translate(815, 30)">
          <text x="0" y="10" fill={isDarkMode ? "rgba(96, 165, 250, 0.85)" : "rgba(29, 78, 216, 0.8)"} className="font-mono text-[9px] font-black tracking-wide text-right">
            DOC STATUS: RELEASED ARCHIVE
          </text>
          <text x="0" y="21" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px] text-right">
            SHEET NUMBER: CR-01-FD
          </text>
          <text x="0" y="30" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px] text-right">
            REVISION LEVEL: REV-4.2B (2024)
          </text>
          <text x="0" y="39" fill="rgba(245, 158, 11, 0.85)" className="font-mono text-[7px] font-bold text-right">
            ★ PREMIUM HIGH-SPEED INFRASTRUCTURE
          </text>
        </g>
      </svg>
    </div>
  );
}
