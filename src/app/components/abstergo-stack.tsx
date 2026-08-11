export function AbstergoStack() {
  return (
    <figure className="stack-figure">
      <figcaption className="stack-figure__head">
        <span>ABSTERGO STACK / 03 LAYERS</span>
        <span>PRODUCT SYSTEM / PJ-26</span>
      </figcaption>

      <svg
        className="stack-figure__visual"
        viewBox="0 0 560 520"
        role="img"
        aria-labelledby="stack-title stack-description"
      >
        <title id="stack-title">Abstergo product stack</title>
        <desc id="stack-description">
          Three connected isometric layers show an interface, application services, and infrastructure working as one product system.
        </desc>
        <defs>
          <linearGradient id="stack-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#171d19" />
            <stop offset="1" stopColor="#0d120f" />
          </linearGradient>
          <linearGradient id="stack-signal" x1="0" x2="1">
            <stop offset="0" stopColor="#b6ff4a" />
            <stop offset="1" stopColor="#e36f45" />
          </linearGradient>
          <filter id="stack-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="stack-layer stack-layer--infra">
          <polygon points="280,303 494,410 330,492 116,385" className="stack-plane" />
          <polygon points="116,385 330,492 330,516 116,409" className="stack-face stack-face--left" />
          <polygon points="330,492 494,410 494,434 330,516" className="stack-face stack-face--right" />
          <g transform="matrix(1 .5 -1 .5 280 303)" className="stack-glyph">
            <rect x="22" y="24" width="62" height="70" rx="3" />
            <ellipse cx="53" cy="24" rx="31" ry="10" />
            <path d="M22 47c0 6 14 10 31 10s31-4 31-10M22 70c0 6 14 10 31 10s31-4 31-10" />
            <rect x="114" y="27" width="74" height="22" rx="3" />
            <rect x="114" y="60" width="74" height="22" rx="3" />
            <circle cx="128" cy="38" r="4" className="stack-glyph__signal" />
            <circle cx="128" cy="71" r="4" />
          </g>
        </g>

        <g className="stack-layer stack-layer--service">
          <polygon points="280,183 494,290 330,372 116,265" className="stack-plane" />
          <polygon points="116,265 330,372 330,396 116,289" className="stack-face stack-face--left" />
          <polygon points="330,372 494,290 494,314 330,396" className="stack-face stack-face--right" />
          <g transform="matrix(1 .5 -1 .5 280 183)" className="stack-glyph stack-glyph--nodes">
            <rect x="20" y="28" width="52" height="42" rx="4" />
            <rect x="91" y="15" width="52" height="42" rx="4" />
            <rect x="157" y="49" width="42" height="35" rx="4" />
            <path d="M72 49h19M143 40l14 16M117 57l-16 20M72 63l29 14" />
          </g>
          <g className="stack-core">
            <path d="m280 242 42 21-42 21-42-21z" />
            <image href="/brand/pj-hinge-mark.svg" x="258" y="241" width="44" height="44" />
          </g>
        </g>

        <g className="stack-layer stack-layer--interface">
          <polygon points="280,63 494,170 330,252 116,145" className="stack-plane stack-plane--active" />
          <polygon points="116,145 330,252 330,276 116,169" className="stack-face stack-face--left" />
          <polygon points="330,252 494,170 494,194 330,276" className="stack-face stack-face--right" />
          <g transform="matrix(1 .5 -1 .5 280 63)" className="stack-window">
            <rect x="19" y="18" width="182" height="100" rx="5" />
            <path d="M19 40h182" />
            <circle cx="32" cy="29" r="3" /><circle cx="43" cy="29" r="3" /><circle cx="54" cy="29" r="3" />
            <rect x="33" y="55" width="45" height="48" rx="2" />
            <rect x="91" y="55" width="94" height="13" rx="2" />
            <rect x="91" y="78" width="62" height="8" rx="2" />
            <rect x="91" y="95" width="81" height="8" rx="2" />
          </g>
        </g>

        <path className="stack-route" d="M455 147c48 27 48 85 0 112-33 18-32 75 0 94 47 27 47 78 0 104" />
        <circle className="stack-route__node" cx="455" cy="147" r="5" />
        <circle className="stack-route__pulse" cx="455" cy="147" r="6" filter="url(#stack-glow)" />

        <g className="stack-label stack-label--interface">
          <text x="18" y="78">01 / INTERFACE</text>
          <text x="18" y="97" className="stack-label__detail">Product made legible</text>
        </g>
        <g className="stack-label stack-label--service">
          <text x="18" y="220">02 / APPLICATION</text>
          <text x="18" y="239" className="stack-label__detail">Logic made useful</text>
        </g>
        <g className="stack-label stack-label--infra">
          <text x="18" y="362">03 / INFRASTRUCTURE</text>
          <text x="18" y="381" className="stack-label__detail">Products made durable</text>
        </g>
      </svg>

      <div className="stack-figure__foot" aria-hidden="true">
        <span><i /> SIGNAL / ACTIVE</span>
        <span>INTERFACE → SERVICE → DATA</span>
      </div>
    </figure>
  );
}
