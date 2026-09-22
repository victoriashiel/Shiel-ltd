export function FinanceCanvas() {
  return (
    <div className="finance-canvas" aria-hidden="true">
      <div className="canvas-orbit orbit-one" />
      <div className="canvas-orbit orbit-two" />
      <div className="metric-card metric-a"><span>Tax</span><i /></div>
      <div className="metric-card metric-b"><span>Payroll</span><i /></div>
      <div className="metric-card metric-c"><span>Advisory</span><i /></div>
      <div className="ledger-card">
        <div className="ledger-top"><span>Financial picture</span><span className="live-pill">Clear</span></div>
        <svg className="ledger-chart" viewBox="0 0 520 230" role="presentation">
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity=".28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="chart-grid">
            <path d="M0 40H520M0 95H520M0 150H520M0 205H520" />
            <path d="M65 0V230M150 0V230M235 0V230M320 0V230M405 0V230M490 0V230" />
          </g>
          <path className="chart-area" d="M0 183C50 172 76 142 121 151C172 162 190 111 236 118C287 125 302 81 355 91C402 100 429 49 520 53V230H0Z" />
          <path className="chart-line" d="M0 183C50 172 76 142 121 151C172 162 190 111 236 118C287 125 302 81 355 91C402 100 429 49 520 53" />
          <circle cx="355" cy="91" r="5" className="chart-point" />
        </svg>
        <div className="ledger-rows">
          <span><i />Compliance</span><span><i />Bookkeeping</span><span><i />International</span>
        </div>
      </div>
    </div>
  );
}
