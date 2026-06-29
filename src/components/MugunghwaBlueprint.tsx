import { cn } from '../lib/utils';

interface MugunghwaBlueprintProps {
  isDarkMode: boolean;
  className?: string;
}

export default function MugunghwaBlueprint({ isDarkMode, className }: MugunghwaBlueprintProps) {
  // Theme-dependent colors for blueprint rendering (optimized for light mode but fully theme-compatible)
  const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.55)' : 'rgba(191, 219, 254, 0.45)';
  const strokeColor = isDarkMode ? 'rgba(96, 165, 250, 0.45)' : 'rgba(37, 99, 235, 0.35)';
  const bodyFill = isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(37, 99, 235, 0.1)';
  const windshieldFill = isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(30, 58, 138, 0.4)';
  const windowFill = isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)';
  
  // Mugunghwa signature livery colors (Red, Blue, White) with high-contrast for light mode
  const liveryRed = isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.7)';
  const liveryRedStroke = isDarkMode ? 'rgba(239, 68, 68, 0.6)' : 'rgba(220, 38, 38, 0.95)';
  const liveryBlue = isDarkMode ? 'rgba(29, 78, 216, 0.3)' : 'rgba(29, 78, 216, 0.8)';
  const liveryBlueStroke = isDarkMode ? 'rgba(29, 78, 216, 0.6)' : 'rgba(30, 58, 138, 0.95)';
  const liveryWhite = isDarkMode ? 'rgba(241, 245, 249, 0.2)' : 'rgba(255, 255, 255, 0.95)';
  const liveryWhiteStroke = isDarkMode ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.85)';

  const textColor = isDarkMode ? 'text-blue-400/75' : 'text-blue-800/80';
  const accentColor = isDarkMode ? 'rgba(96, 165, 250, 0.8)' : 'rgba(29, 78, 216, 0.75)';

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
          <pattern id="m-blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" />
          </pattern>
          <pattern id="m-blueprint-subgrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={gridColor} strokeWidth="0.4" />
          </pattern>

          {/* Yellow/Black Zebra warning stripes pattern for front pilot */}
          <pattern id="zebra-stripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="7" height="14" fill="#facc15" />
            <rect x="7" width="7" height="14" fill="#0f172a" />
          </pattern>

          {/* Glowing headlight beam linear gradient */}
          <linearGradient id="headlight-beam" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="rgba(253, 224, 71, 0.5)" />
            <stop offset="35%" stopColor="rgba(253, 224, 71, 0.2)" />
            <stop offset="100%" stopColor="rgba(253, 224, 71, 0)" />
          </linearGradient>

          {/* Shading overlay for train body depth */}
          <linearGradient id="m-train-shading" x1="0" y1="130" x2="0" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkMode ? "rgba(30, 41, 59, 0.1)" : "rgba(255, 255, 255, 0.2)"} />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor={isDarkMode ? "rgba(15, 23, 42, 0.15)" : "rgba(15, 23, 42, 0.05)"} />
          </linearGradient>
        </defs>

        {/* 1. Blueprint Grid Layer */}
        <rect width="1000" height="350" fill="url(#m-blueprint-subgrid)" />
        <rect width="1000" height="350" fill="url(#m-blueprint-grid)" />

        {/* 2. Technical Drawing Annotation Lines */}
        {/* Horizontal Center Lines */}
        <line x1="10" y1="175" x2="990" y2="175" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="10 5 2 5" />
        <line x1="280" y1="90" x2="280" y2="330" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="5 5" />
        <line x1="720" y1="90" x2="720" y2="330" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="5 5" />

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
          L_OVERALL = 20,726 mm (EMD GT26CW-2 DIESEL LOCOMOTIVE)
        </text>
        <text x="25" y="195" textAnchor="middle" transform="rotate(-90 25 195)" className={cn("font-mono text-[7px] font-semibold tracking-[0.1em]", textColor)}>
          H_MAX = 4,280 mm
        </text>

        {/* Headlight Ray Glow shooting from cab forehead (front-left) */}
        <polygon points="194,144 -40,100 -40,220 194,148" fill="url(#headlight-beam)" opacity="0.45" />

        {/* 3. LIVERY COLORS (RED, WHITE, BLUE) - Structured rendering */}
        {/* Blue Lower Deck Band (Runs entire length of nose + cab + long hood) */}
        <polygon
          points="105,252 915,252 915,234 110,234 105,239"
          fill={liveryBlue}
        />
        {/* White Middle Band */}
        {/* For Short Hood & Cab */}
        <polygon
          points="110,234 285,234 285,216 113,216"
          fill={liveryWhite}
        />
        {/* For Long Hood (Taller white paneling section for EMD locomotive side wall) */}
        <rect
          x="285"
          y="175"
          width="630"
          height="59"
          fill={liveryWhite}
        />

        {/* Red Upper Hood & Cab Sections */}
        {/* Short Hood Top (Red) */}
        <polygon
          points="113,216 205,216 205,202 117,202"
          fill={liveryRed}
        />
        {/* Driver's Cab Upper (Red) */}
        <polygon
          points="205,216 285,216 285,138 205,138"
          fill={liveryRed}
        />

        {/* Blue Long Hood Roof Section */}
        <rect
          x="285"
          y="152"
          width="630"
          height="23"
          fill={liveryBlue}
        />

        {/* 4. STRUCTURAL DRAWING OUTLINES (On top of color blocks for high-definition rendering) */}
        {/* Chassis deck plate (Heavy base beam) */}
        <rect x="70" y="252" width="860" height="12" fill={bodyFill} stroke={accentColor} strokeWidth="1.5" />
        <line x1="70" y1="258" x2="930" y2="258" stroke={accentColor} strokeWidth="0.8" />

        {/* Front Walkway Access Steps (Left Side) */}
        <path d="M 85,252 L 80,264 L 80,278 L 92,278 L 95,264 L 95,252" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <line x1="80" y1="264" x2="95" y2="264" stroke={accentColor} strokeWidth="0.8" />
        <line x1="80" y1="272" x2="92" y2="272" stroke={accentColor} strokeWidth="0.8" />

        {/* Rear Walkway Access Steps (Right Side) */}
        <path d="M 915,252 L 920,264 L 920,278 L 908,278 L 905,264 L 905,252" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <line x1="920" y1="264" x2="905" y2="264" stroke={accentColor} strokeWidth="0.8" />
        <line x1="920" y1="272" x2="908" y2="272" stroke={accentColor} strokeWidth="0.8" />

        {/* Short Hood Outer Boundary */}
        <path
          d="M 105,252 
             L 105,212 
             L 115,202 
             L 205,202 
             L 205,252"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.6"
        />

        {/* Driver's Cab Elevated Cabin Boundary */}
        <path
          d="M 205,252 
             L 205,138 
             L 285,138 
             L 285,252"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.8"
        />

        {/* Long Hood Engine Compartment Outer Boundary */}
        <path
          d="M 285,252 
             L 285,152 
             L 915,152 
             L 915,252"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.6"
        />

        {/* Rear End Cabin Cap */}
        <path d="M 915,152 L 920,158 L 920,252" fill="none" stroke={accentColor} strokeWidth="1.2" />

        {/* 5. FRONT NOSE & CAB AUTHENTIC DETAILS (From reference photo) */}
        {/* Front Warning Pilot (Zebra-striped 배장기) */}
        <polygon
          points="50,264 105,264 90,305 50,305"
          fill="url(#zebra-stripes)"
          stroke={accentColor}
          strokeWidth="1.2"
        />
        {/* Bottom edge of safety plow */}
        <line x1="50" y1="305" x2="90" y2="305" stroke={accentColor} strokeWidth="2" />

        {/* Mechanical Coupler (연결기) */}
        <path
          d="M 50,282 
             L 32,282 
             L 27,278 
             L 25,288 
             L 32,288 
             Z"
          fill={isDarkMode ? "rgba(30, 41, 59, 0.9)" : "rgba(71, 85, 105, 0.9)"}
          stroke={accentColor}
          strokeWidth="1.2"
        />
        {/* Air Brake Hoses & Connectors */}
        <path d="M 48,288 Q 38,302 34,298" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <path d="M 46,288 Q 41,304 38,300" fill="none" stroke={accentColor} strokeWidth="1" />

        {/* Red Front Visor Overhang (Number plates + Headlights brow) */}
        <polygon
          points="193,146 205,138 215,138 205,148"
          fill={isDarkMode ? "rgba(220, 38, 38, 0.7)" : "rgba(239, 68, 68, 0.95)"}
          stroke={liveryRedStroke}
          strokeWidth="1.2"
        />
        {/* Forehead Glowing Number Plate 7409 */}
        <rect x="194" y="140" width="10" height="5" rx="0.5" fill="#0f172a" stroke="#facc15" strokeWidth="0.5" />
        <text x="199" y="144" textAnchor="middle" fill="#facc15" className="font-mono text-[3.8px] font-black tracking-tighter">7409</text>

        {/* Double Air Horns on Cab Roof */}
        <path d="M 235,138 L 235,131 L 231,130 L 231,133 Z" fill="none" stroke={accentColor} strokeWidth="1" />
        <path d="M 235,133 Q 242,129 248,129 L 248,135 Q 242,135 235,133" fill={bodyFill} stroke={accentColor} strokeWidth="0.8" />
        <path d="M 235,135 Q 240,132 245,132 L 245,137 Q 240,137 235,135" fill={bodyFill} stroke={accentColor} strokeWidth="0.6" />

        {/* Cab Front Windshield Edge (Facing left, sloped look) */}
        <rect x="202" y="152" width="4" height="24" rx="0.5" fill={windshieldFill} stroke={accentColor} strokeWidth="1" />

        {/* Driver's Side Door (Center-left of cab) */}
        <rect x="212" y="158" width="22" height="94" fill="none" stroke={accentColor} strokeWidth="1.2" />
        {/* Door Window */}
        <rect x="216" y="165" width="14" height="24" rx="2" fill={windowFill} stroke={accentColor} strokeWidth="1" />
        {/* Door Handle */}
        <line x1="230" y1="210" x2="230" y2="216" stroke={accentColor} strokeWidth="1.5" />
        {/* Door vertical grab irons */}
        <line x1="210" y1="185" x2="210" y2="245" stroke={accentColor} strokeWidth="0.8" />
        <line x1="236" y1="185" x2="236" y2="245" stroke={accentColor} strokeWidth="0.8" />

        {/* Large Cab Side Sliding Window (with divided glass and metallic frame) */}
        <rect x="242" y="152" width="34" height="25" rx="1.5" fill="none" stroke={accentColor} strokeWidth="1.4" />
        <rect x="244" y="154" width="30" height="21" fill={windshieldFill} stroke={accentColor} strokeWidth="0.8" />
        {/* Sliding Window Divider */}
        <line x1="259" y1="154" x2="259" y2="275" stroke={accentColor} strokeWidth="1" opacity="0.1" /> {/* vertical alignment guide line */}
        <line x1="259" y1="154" x2="259" y2="175" stroke={accentColor} strokeWidth="1.2" />
        {/* Wind deflector on side window */}
        <path d="M 240,152 L 240,177 L 237,164 Z" fill="rgba(255, 255, 255, 0.4)" stroke={accentColor} strokeWidth="0.6" />

        {/* 6. LONG HOOD ENGINE DETAILS (Filters, Exhaust, Fan cowls) */}
        {/* Dynamic Brake Inertial Filters (Behind Cab) */}
        <g stroke={accentColor} strokeWidth="0.8" fill="rgba(15, 23, 42, 0.1)">
          <rect x="295" y="162" width="75" height="38" rx="1" />
          <path d="M 302,162 L 302,200 M 310,162 L 310,200 M 318,162 L 318,200 M 326,162 L 326,200 M 334,162 L 334,200 M 342,162 L 342,200 M 350,162 L 350,200 M 358,162 L 358,200 M 366,162 L 366,200" strokeWidth="0.5" />
        </g>

        {/* Engine room inspection doors with vertical panels */}
        <g stroke={accentColor} strokeWidth="0.5" opacity="0.75">
          <line x1="390" y1="175" x2="390" y2="234" />
          <line x1="415" y1="175" x2="415" y2="234" />
          <line x1="440" y1="175" x2="440" y2="234" />
          <line x1="465" y1="175" x2="465" y2="234" />
          <line x1="490" y1="175" x2="490" y2="234" />
          <line x1="515" y1="175" x2="515" y2="234" />
          <line x1="540" y1="175" x2="540" y2="234" />
          <line x1="565" y1="175" x2="565" y2="234" />
          <line x1="590" y1="175" x2="590" y2="234" />
          <line x1="615" y1="175" x2="615" y2="234" />
          <line x1="640" y1="175" x2="640" y2="234" />
          <line x1="665" y1="175" x2="665" y2="234" />
          <line x1="690" y1="175" x2="690" y2="234" />
          <line x1="715" y1="175" x2="715" y2="234" />
        </g>

        {/* Exhaust Stack on Long Hood Roof */}
        <rect x="520" y="140" width="24" height="12" rx="1" fill={bodyFill} stroke={accentColor} strokeWidth="1.2" />
        <rect x="526" y="132" width="12" height="8" fill="rgba(15, 23, 42, 0.3)" stroke={accentColor} strokeWidth="1" />
        <path d="M 522,140 L 542,140" stroke={accentColor} strokeWidth="0.8" />

        {/* Roof Radiator Fan Cowls (Top right rear section) */}
        <path d="M 760,152 C 760,144 790,144 790,152" fill={bodyFill} stroke={accentColor} strokeWidth="1" />
        <line x1="775" y1="144" x2="775" y2="152" stroke={accentColor} strokeWidth="0.8" />
        <path d="M 820,152 C 820,144 850,144 850,152" fill={bodyFill} stroke={accentColor} strokeWidth="1" />
        <line x1="835" y1="144" x2="835" y2="152" stroke={accentColor} strokeWidth="0.8" />

        {/* Large Radiator Fan Cooling Grills (Rear Compartment side) */}
        <g stroke={accentColor} strokeWidth="0.8" fill="rgba(15, 23, 42, 0.12)">
          <rect x="740" y="165" width="135" height="34" rx="1.5" />
          {/* Dense Cooling Fins inside Grill */}
          <path d="M 746,165 L 746,199 M 752,165 L 752,199 M 758,165 L 758,199 M 764,165 L 764,199 M 770,165 L 770,199 M 776,165 L 776,199 M 782,165 L 782,199 M 788,165 L 788,199 M 794,165 L 794,199 M 800,165 L 800,199 M 806,165 L 806,199 M 812,165 L 812,199 M 818,165 L 818,199 M 824,165 L 824,199 M 830,165 L 830,199 M 836,165 L 836,199 M 842,165 L 842,199 M 848,165 L 848,199 M 854,165 L 854,199 M 860,165 L 860,199 M 866,165 L 866,199 M 872,165 L 872,199" strokeWidth="0.4" />
        </g>

        {/* Handrails along the entire side walkway ( Waist Height Y = 222 ) */}
        <line x1="105" y1="222" x2="915" y2="222" stroke={accentColor} strokeWidth="1.2" />
        {/* Support Stanchions (Vertical posts) */}
        <path
          d="M 115,222 L 115,252 
             M 165,222 L 165,252 
             M 210,222 L 210,252 
             M 285,222 L 285,252 
             M 355,222 L 355,252 
             M 425,222 L 425,252 
             M 495,222 L 495,252 
             M 565,222 L 565,252 
             M 635,222 L 635,252 
             M 705,222 L 705,252 
             M 775,222 L 775,252 
             M 845,222 L 845,252 
             M 910,222 L 910,252"
          stroke={accentColor}
          strokeWidth="0.8"
        />

        {/* 7. KORAIL LOGO (Centered on White Band of Long Hood) */}
        {/* Midpoint of long hood is X=550 to 600, Y=205 */}
        <g transform="translate(560, 204)" className="select-none">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="rgba(29, 78, 216, 0.95)"
            className="font-sans font-black italic text-[21px] tracking-[0.1em]"
          >
            KORAIL
          </text>
          <text
            x="0"
            y="9.5"
            textAnchor="middle"
            fill="rgba(220, 38, 38, 0.85)"
            className="font-sans font-bold text-[7px] tracking-[0.25em]"
          >
            MUGUNGHWA-HO DEL-7400
          </text>
        </g>

        {/* Small front-nose KORAIL logo on short hood */}
        <g transform="translate(155, 226)" className="select-none">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="rgba(29, 78, 216, 0.9)"
            className="font-sans font-black italic text-[8.5px] tracking-tight"
          >
            KORAIL
          </text>
        </g>

        {/* Shading overlay layer for high fidelity rendering */}
        <rect width="840" height="114" x="70" y="138" fill="url(#m-train-shading)" opacity="0.4" className="mix-blend-multiply" />

        {/* 8. BOGIES, SUSPENSIONS & WHEELS (Three Axles Co-Co Bogies for DEL) */}
        {/* Rails / Ground Line */}
        <line x1="0" y1="316" x2="1000" y2="316" stroke={accentColor} strokeWidth="2" />
        <line x1="0" y1="320" x2="1000" y2="320" stroke={strokeColor} strokeWidth="0.6" />

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
          strokeWidth="1.2"
        />

        {/* FRONT 3-AXLE BOGIE ASSEMBLY (Wheelbase X=140 to X=310) */}
        <g>
          {/* Bogie Frame structure */}
          <path d="M 130,280 L 320,280 L 305,290 L 145,290 Z" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(226,232,240,0.5)"} stroke={accentColor} strokeWidth="1" />
          <line x1="130" y1="280" x2="145" y2="298" stroke={accentColor} strokeWidth="0.8" />
          <line x1="320" y1="280" x2="305" y2="298" stroke={accentColor} strokeWidth="0.8" />

          {/* Primary Suspension Springs over the 3 axles */}
          <path d="M 155,280 Q 160,268 165,280" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 220,280 Q 225,268 230,280" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 285,280 Q 290,268 295,280" fill="none" stroke={accentColor} strokeWidth="1.2" />

          {/* WHEEL 1 (Left Front Bogie) */}
          <circle cx="165" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="165" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="165" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />

          {/* WHEEL 2 (Center Front Bogie - Heavy Duty Co-Co Spec) */}
          <circle cx="230" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="230" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="230" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />

          {/* WHEEL 3 (Right Front Bogie) */}
          <circle cx="295" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="295" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="295" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* MID-BODY EQUIPMENT BELLY APPARATUS (Massive Fuel Tank & Air Reservoirs) */}
        <g>
          {/* Main Diesel Fuel Tank */}
          <rect x="360" y="272" width="280" height="26" rx="3" fill={isDarkMode ? "rgba(30,41,59,0.4)" : "rgba(226,232,240,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          {/* Horizontal reinforcing ridges */}
          <line x1="370" y1="280" x2="630" y2="280" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="370" y1="288" x2="630" y2="288" stroke={strokeColor} strokeWidth="0.8" />
          
          {/* Compressed Air Cylinder tanks stacked above */}
          <rect x="420" y="265" width="160" height="7" rx="3.5" fill={isDarkMode ? "rgba(15,23,42,0.5)" : "rgba(255,255,255,0.8)"} stroke={accentColor} strokeWidth="0.8" />
        </g>

        {/* REAR 3-AXLE BOGIE ASSEMBLY (Wheelbase X=680 to X=860) */}
        <g>
          {/* Bogie Frame structure */}
          <path d="M 670,280 L 860,280 L 845,290 L 685,290 Z" fill={isDarkMode ? "rgba(30,41,59,0.3)" : "rgba(226,232,240,0.5)"} stroke={accentColor} strokeWidth="1" />
          <line x1="670" y1="280" x2="685" y2="298" stroke={accentColor} strokeWidth="0.8" />
          <line x1="860" y1="280" x2="845" y2="298" stroke={accentColor} strokeWidth="0.8" />

          {/* Primary Suspension Springs over the 3 axles */}
          <path d="M 695,280 Q 700,268 705,280" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 760,280 Q 765,268 770,280" fill="none" stroke={accentColor} strokeWidth="1.2" />
          <path d="M 825,280 Q 830,268 835,280" fill="none" stroke={accentColor} strokeWidth="1.2" />

          {/* WHEEL 4 (Left Rear Bogie) */}
          <circle cx="705" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="705" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="705" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />

          {/* WHEEL 5 (Center Rear Bogie - Heavy Duty Co-Co Spec) */}
          <circle cx="770" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="770" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="770" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />

          {/* WHEEL 6 (Right Rear Bogie) */}
          <circle cx="835" cy="298" r="17" fill={isDarkMode ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.7)"} stroke={accentColor} strokeWidth="1.2" />
          <circle cx="835" cy="298" r="11" fill="none" stroke={strokeColor} strokeWidth="0.8" />
          <circle cx="835" cy="298" r="4" fill={isDarkMode ? "#3b82f6" : "#2563eb"} stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* 9. Floating Specification Legends (Top Left / Right Metadata) */}
        {/* Top-Left Spec Column */}
        <g transform="translate(45, 30)">
          <text x="0" y="10" fill={isDarkMode ? "rgba(96, 165, 250, 0.85)" : "rgba(29, 78, 216, 0.8)"} className="font-mono text-[9px] font-black tracking-wide">
            PROJECT: KORAIL DEL-7400 (CLASSIC GT26CW-2)
          </text>
          <text x="0" y="21" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            BUILDER: HYUNDAI ROTEM / ELECTRO-MOTIVE DIVISION (EMD)
          </text>
          <text x="0" y="30" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            MAX LOCO SPEED: 150 KM/H (PASSENGER SERVICE LIMIT)
          </text>
          <text x="0" y="39" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px]">
            TRACTIVE ENGINE: V16 turbocharged 645E3C DIESEL
          </text>
        </g>

        {/* Top-Right Blueprint Status Column */}
        <g transform="translate(815, 30)">
          <text x="0" y="10" fill={isDarkMode ? "rgba(96, 165, 250, 0.85)" : "rgba(29, 78, 216, 0.8)"} className="font-mono text-[9px] font-black tracking-wide text-right">
            DOC STATUS: RELEASED ARCHIVE
          </text>
          <text x="0" y="21" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px] text-right">
            SHEET NUMBER: MH-01-FD
          </text>
          <text x="0" y="30" fill={isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(71, 85, 105, 0.75)"} className="font-mono text-[7px] text-right">
            REVISION LEVEL: MH-03-CLASSIC
          </text>
          <text x="0" y="39" fill="rgba(220, 38, 38, 0.85)" className="font-mono text-[7px] font-bold text-right">
            ★ NATIONAL REGULAR EXPRESS SERVICE
          </text>
        </g>
      </svg>
    </div>
  );
}
