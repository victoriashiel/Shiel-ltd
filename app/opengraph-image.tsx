import { ImageResponse } from "next/og";

export const alt = "Shiel Accountants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f5f0", color: "#0b1718", padding: 72, fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 38, fontWeight: 760, letterSpacing: "-1px" }}>SHIEL<span style={{ color: "#0f5f5c" }}>.</span><span style={{ marginLeft: 14, fontSize: 18, letterSpacing: "3px", color: "#52605e" }}>ACCOUNTANTS</span></div>
        <div style={{ fontSize: 22, color: "#52605e" }}>European based · Internationally focused</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
        <div style={{ fontSize: 78, lineHeight: 1.03, fontWeight: 620, letterSpacing: "-4px" }}>Accounting that keeps up with your business.</div>
        <div style={{ marginTop: 34, width: 180, height: 8, borderRadius: 99, background: "#0f5f5c" }} />
      </div>
    </div>,
    size,
  );
}
