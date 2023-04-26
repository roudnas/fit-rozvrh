import React from 'react';

type Props = {
    mainColor: string;
    secondaryColor: string;
}

export function Logo () {
    return (
        <>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="125" viewBox="0 0 736.000000 200.000000"
                preserveAspectRatio="xMidYMid meet">
                // FITZvrh letters
                <g className='logo-secondary-fill' transform="translate(0.000000,301.000000) scale(0.100000,-0.100000)"
                    stroke="none">
                    <path d="M6375 2988 c-3 -7 -4 -348 -3 -758 l3 -745 137 -3 138 -3 2 418 3
                    418 165 3 c158 3 166 2 183 -19 16 -19 17 -55 17 -420 l0 -399 140 0 141 0 -3
                    438 -3 437 -28 57 c-16 32 -45 71 -65 88 -67 55 -107 63 -337 69 l-210 6 -3
                    213 -2 212 -136 0 c-98 0 -136 -3 -139 -12z"/>
                    <path d="M75 2888 c-3 -7 -4 -326 -3 -708 l3 -695 145 0 145 0 3 263 2 262
                    305 0 305 0 0 135 0 135 -305 0 -305 0 0 175 0 175 333 2 332 3 0 130 0 130
                    -478 3 c-377 2 -479 0 -482 -10z"/>
                    <path d="M1277 2894 c-10 -10 -8 -1386 1 -1402 7 -9 43 -12 148 -10 l139 3 0
                    705 0 705 -141 3 c-77 1 -143 -1 -147 -4z"/>
                    <path d="M1794 2887 c-2 -7 -3 -67 -2 -133 l3 -119 212 -3 213 -2 2 -573 3
                    -572 145 0 145 0 3 572 2 573 213 2 212 3 0 130 0 130 -573 3 c-466 2 -574 0
                    -578 -11z"/>
                    <path d="M3110 2765 l0 -135 325 -2 325 -3 -306 -415 c-169 -228 -320 -433
                    -335 -454 -28 -38 -29 -43 -29 -158 l0 -118 533 2 532 3 0 130 0 130 -342 3
                    c-189 1 -343 5 -343 8 0 7 98 142 454 623 l217 293 -3 112 -3 111 -512 3 -513
                    2 0 -135z"/>
                    <path d="M4299 2546 c-10 -21 5 -77 96 -368 127 -404 156 -497 186 -598 12
                    -41 27 -81 32 -87 7 -10 61 -13 208 -13 179 0 199 2 207 18 5 9 80 245 167
                    525 188 605 188 549 2 545 l-120 -3 -17 -60 c-19 -64 -164 -553 -206 -693 -25
                    -84 -41 -98 -55 -51 -4 13 -56 186 -114 384 -58 198 -111 375 -116 393 l-11
                    32 -124 0 c-122 0 -125 -1 -135 -24z"/>
                    <path d="M5700 2554 c-68 -18 -125 -55 -150 -97 -19 -31 -20 -50 -18 -502 l3
                    -470 140 0 140 0 3 405 c1 262 6 408 13 415 5 5 80 12 172 15 l162 5 3 70 c1
                    39 -1 75 -5 81 -5 6 -34 29 -65 52 l-57 42 -143 -1 c-92 0 -162 -6 -198 -15z"/>
                </g>
                // with friends letters
                {/* <g className='logo-main-fill' transform="translate(0.000000,301.000000) scale(0.100000,-0.100000)"
                stroke="none">
                    <path d="M316 1259 c-108 -25 -226 -122 -272 -223 -40 -87 -46 -149 -42 -430
                    3 -238 5 -266 25 -319 43 -116 134 -206 250 -250 l58 -22 3300 -3 c2376 -2
                    3318 0 3365 8 132 23 263 127 312 247 22 57 23 66 23 378 l0 320 -28 59 c-54
                    117 -137 190 -258 227 -59 18 -149 19 -3377 18 -1958 -1 -3333 -5 -3356 -10z
                    m1216 -256 c42 -38 4 -113 -59 -113 -23 0 -42 8 -58 25 -29 28 -31 51 -9 83
                    19 28 97 31 126 5z m2960 0 c42 -38 4 -113 -59 -113 -23 0 -42 8 -58 25 -29
                    28 -31 51 -9 83 19 28 97 31 126 5z m-2112 -123 l0 -91 29 22 c25 18 39 21 90
                    17 69 -5 94 -22 122 -83 16 -34 19 -66 19 -208 l0 -168 -67 3 -68 3 -3 155
                    c-3 168 -10 190 -61 190 -54 0 -56 -7 -61 -182 l-5 -163 -67 -3 -68 -3 0 301
                    0 300 70 0 70 0 0 -90z m1250 35 l0 -55 -74 0 c-80 0 -86 -4 -86 -61 l0 -29
                    80 0 80 0 0 -60 0 -60 -80 0 -80 0 0 -140 0 -140 -65 0 -65 0 0 140 0 140 -60
                    0 -60 0 0 60 0 59 58 3 57 3 5 55 c11 112 50 140 193 140 l97 0 0 -55z m2460
                    -245 l0 -300 -65 0 c-58 0 -65 2 -65 20 0 18 -2 18 -36 -5 -84 -57 -194 -13
                    -224 91 -18 60 -9 239 13 282 25 46 72 72 130 72 51 0 84 -12 104 -39 10 -13
                    12 3 13 82 l0 97 65 0 65 0 0 -300z m-4110 215 l0 -65 86 0 85 0 -3 -52 -3
                    -53 -82 -3 -83 -3 0 -104 c0 -122 2 -125 99 -125 l61 0 0 -55 0 -55 -99 0
                    c-86 0 -102 3 -132 23 -52 35 -63 67 -67 199 l-4 117 -57 3 -56 3 -3 52 -3 52
                    58 3 58 3 3 63 3 62 69 0 70 0 0 -65z m2097 -75 c42 -25 63 -68 66 -133 l2
                    -52 -70 0 -70 0 -6 39 c-7 44 -21 56 -66 56 -56 0 -63 -23 -63 -198 l0 -153
                    -67 3 -68 3 -3 223 -2 222 65 0 c62 0 65 -1 65 -24 l0 -24 29 29 c26 26 36 29
                    93 29 45 0 72 -6 95 -20z m943 -3 c63 -33 92 -91 88 -177 l-3 -65 -137 -3
                    c-84 -1 -138 -7 -138 -13 0 -26 30 -78 49 -84 28 -8 76 2 92 21 7 9 31 14 70
                    14 52 0 59 -2 59 -20 0 -29 -73 -97 -117 -109 -92 -26 -185 -3 -236 58 -36 43
                    -39 61 -35 188 3 123 19 157 86 193 55 29 165 27 222 -3z m521 -2 c49 -44 59
                    -87 59 -268 l0 -168 -67 3 -68 3 -3 155 c-3 168 -10 190 -61 190 -54 0 -56 -7
                    -61 -182 l-5 -163 -67 -3 -68 -3 0 226 0 225 65 0 c59 0 65 -2 65 -21 0 -20 1
                    -20 32 6 29 24 38 27 94 23 44 -3 69 -10 85 -23z m974 5 c45 -22 83 -76 72
                    -104 -5 -12 -20 -16 -64 -16 -48 0 -60 4 -71 21 -11 17 -21 20 -64 17 -35 -2
                    -54 -8 -62 -20 -18 -29 11 -46 102 -62 103 -18 148 -44 163 -96 24 -81 -20
                    -158 -104 -181 -59 -16 -184 -7 -231 16 -41 20 -76 66 -76 103 0 20 4 22 60
                    22 50 0 63 -4 84 -25 27 -27 66 -32 111 -15 68 26 31 73 -67 84 -35 4 -82 16
                    -106 26 -94 42 -96 181 -3 230 53 28 199 28 256 0z m-5682 -12 c3 -13 11 -71
                    18 -130 7 -60 16 -108 19 -108 3 0 15 59 25 130 l18 131 51 -3 51 -3 19 -138
                    c10 -75 21 -136 23 -134 2 2 10 55 18 118 23 172 17 159 78 159 l53 0 -33
                    -217 c-17 -120 -32 -222 -33 -226 0 -4 -30 -7 -67 -5 l-68 3 -21 155 c-12 85
                    -22 148 -23 140 -1 -8 -10 -78 -21 -155 -11 -77 -20 -141 -20 -143 0 -1 -30
                    -2 -67 0 l-68 3 -27 185 c-15 102 -29 202 -32 223 l-6 37 54 0 c48 0 54 -3 59
                    -22z m707 -143 l0 -165 65 0 65 0 0 -60 0 -60 -205 0 -205 0 0 60 0 60 80 0
                    80 0 0 110 0 110 -70 0 -70 0 0 55 0 55 130 0 130 0 0 -165z m2960 0 l0 -165
                    65 0 65 0 0 -60 0 -60 -205 0 -205 0 0 60 0 60 80 0 80 0 0 110 0 110 -70 0
                    -70 0 0 55 0 55 130 0 130 0 0 -165z"/>
                    <path d="M5846 705 c-21 -21 -30 -76 -23 -143 7 -64 24 -85 67 -85 47 0 63 23
                    68 98 5 74 -1 107 -24 129 -20 20 -68 21 -88 1z"/>
                    <path d="M4862 722 c-7 -5 -17 -23 -22 -41 -11 -39 -4 -43 76 -39 53 3 59 5
                    62 26 5 35 -25 62 -67 62 -20 0 -42 -4 -49 -8z"/>
                </g>*/}
            </svg>
        </>
    );
}