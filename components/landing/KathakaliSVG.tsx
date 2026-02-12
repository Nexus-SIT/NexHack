import React from 'react';

/* ====================================================================
   INLINE SVG — KATHAKALI DANCER
   Woodcut / linocut-style, high-contrast black & white vector.
   ==================================================================== */
const KathakaliSVG = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 400 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Crown / Kireedam */}
        <path
            d="M200 20 L160 80 L140 60 L120 90 L100 70 L90 100 L70 95 L80 130 L60 140 L85 160 L200 140 L315 160 L340 140 L320 130 L330 95 L310 100 L300 70 L280 90 L260 60 L240 80 L200 20Z"
            fill="#080808"
            stroke="white"
            strokeWidth="3"
        />
        {/* Crown details — radiating lines */}
        <line x1="200" y1="30" x2="200" y2="80" stroke="white" strokeWidth="2" />
        <line x1="170" y1="50" x2="165" y2="85" stroke="white" strokeWidth="1.5" />
        <line x1="230" y1="50" x2="235" y2="85" stroke="white" strokeWidth="1.5" />
        <line x1="140" y1="65" x2="130" y2="95" stroke="white" strokeWidth="1.5" />
        <line x1="260" y1="65" x2="270" y2="95" stroke="white" strokeWidth="1.5" />
        {/* Crown ornamental circles */}
        <circle cx="200" cy="45" r="8" fill="white" />
        <circle cx="200" cy="45" r="4" fill="#080808" />
        <circle cx="160" cy="70" r="5" fill="white" />
        <circle cx="240" cy="70" r="5" fill="white" />
        <circle cx="130" cy="82" r="4" fill="white" />
        <circle cx="270" cy="82" r="4" fill="white" />

        {/* Face — oval */}
        <ellipse cx="200" cy="210" rx="75" ry="90" fill="white" stroke="#080808" strokeWidth="4" />
        {/* Face contour lines (woodcut cross-hatching) */}
        <path d="M145 180 Q155 175 165 180" stroke="#080808" strokeWidth="1.5" fill="none" />
        <path d="M235 180 Q245 175 255 180" stroke="#080808" strokeWidth="1.5" fill="none" />

        {/* Eyes — dramatic Kathakali style */}
        <ellipse cx="170" cy="200" rx="22" ry="12" fill="#080808" />
        <ellipse cx="170" cy="200" rx="14" ry="8" fill="white" />
        <circle cx="170" cy="200" r="5" fill="#080808" />
        <ellipse cx="230" cy="200" rx="22" ry="12" fill="#080808" />
        <ellipse cx="230" cy="200" rx="14" ry="8" fill="white" />
        <circle cx="230" cy="200" r="5" fill="#080808" />
        {/* Eye extensions — traditional makeup lines */}
        <path d="M145 195 L130 185" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M255 195 L270 185" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M145 205 L128 215" stroke="#080808" strokeWidth="3" strokeLinecap="round" />
        <path d="M255 205 L272 215" stroke="#080808" strokeWidth="3" strokeLinecap="round" />

        {/* Dramatic eyebrows */}
        <path d="M148 182 Q170 165 192 182" stroke="#080808" strokeWidth="4" fill="none" />
        <path d="M208 182 Q230 165 252 182" stroke="#080808" strokeWidth="4" fill="none" />

        {/* Nose */}
        <path d="M200 210 L195 240 L200 245 L205 240 L200 210" fill="#080808" />

        {/* Mouth — curved, stylized */}
        <path d="M175 260 Q188 275 200 270 Q212 275 225 260" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M180 262 Q200 280 220 262" stroke="#080808" strokeWidth="1.5" fill="none" />

        {/* Cheek patterns — traditional chutti */}
        <path d="M140 230 Q135 250 145 270" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M135 235 Q128 255 140 275" stroke="#080808" strokeWidth="2" fill="none" />
        <path d="M260 230 Q265 250 255 270" stroke="#080808" strokeWidth="3" fill="none" />
        <path d="M265 235 Q272 255 260 275" stroke="#080808" strokeWidth="2" fill="none" />

        {/* Chin ornament / Chutti beard */}
        <path
            d="M160 290 Q170 310 200 320 Q230 310 240 290"
            fill="#080808"
            stroke="white"
            strokeWidth="2"
        />
        <path d="M170 295 Q200 315 230 295" stroke="white" strokeWidth="1.5" fill="none" />

        {/* Ear ornaments */}
        <ellipse cx="115" cy="220" rx="15" ry="25" fill="#080808" stroke="white" strokeWidth="2" />
        <ellipse cx="115" cy="220" rx="8" ry="15" fill="white" />
        <ellipse cx="285" cy="220" rx="15" ry="25" fill="#080808" stroke="white" strokeWidth="2" />
        <ellipse cx="285" cy="220" rx="8" ry="15" fill="white" />

        {/* Neck / collar ornament */}
        <rect x="160" y="300" width="80" height="20" fill="#080808" stroke="white" strokeWidth="2" />
        <line x1="175" y1="300" x2="175" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="190" y1="300" x2="190" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="210" y1="300" x2="210" y2="320" stroke="white" strokeWidth="1.5" />
        <line x1="225" y1="300" x2="225" y2="320" stroke="white" strokeWidth="1.5" />

        {/* Shoulders / upper body — woodcut style */}
        <path
            d="M160 320 L100 380 L80 500 L150 500 L160 420 L200 440 L240 420 L250 500 L320 500 L300 380 L240 320Z"
            fill="#080808"
            stroke="white"
            strokeWidth="3"
        />
        {/* Body cross-hatching details */}
        <line x1="120" y1="400" x2="150" y2="480" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="130" y1="390" x2="155" y2="470" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="280" y1="400" x2="250" y2="480" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="270" y1="390" x2="245" y2="470" stroke="white" strokeWidth="1" opacity="0.5" />

        {/* Chest ornament — necklace */}
        <path d="M160 340 Q180 370 200 360 Q220 370 240 340" stroke="white" strokeWidth="2.5" fill="none" />
        <circle cx="200" cy="365" r="8" fill="white" />
        <circle cx="200" cy="365" r="4" fill="#080808" />
        <circle cx="178" cy="358" r="5" fill="white" />
        <circle cx="222" cy="358" r="5" fill="white" />

        {/* Mudra hands — right hand raised */}
        <path
            d="M310 370 L340 340 L350 345 L335 365 L355 350 L360 358 L340 375 L360 365 L362 374 L335 385 L310 390Z"
            fill="white"
            stroke="#080808"
            strokeWidth="2.5"
        />

        {/* Mudra hands — left hand extended */}
        <path
            d="M90 370 L60 340 L50 345 L65 365 L45 350 L40 358 L60 375 L40 365 L38 374 L65 385 L90 390Z"
            fill="white"
            stroke="#080808"
            strokeWidth="2.5"
        />
    </svg>
);

export default KathakaliSVG;
