import { style } from "@vanilla-extract/css";

export const page = style({
  minHeight: "100vh",
  background: "linear-gradient(180deg, #0b1020 0%, #050714 100%)",
  color: "#e8eefc",
});

export const container = style({
  maxWidth: 1040,
  margin: "0 auto",
  padding: "32px 16px 56px",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 20,
});

export const title = style({
  fontSize: 28,
  letterSpacing: "-0.02em",
  margin: 0,
});

export const subtitle = style({
  margin: 0,
  color: "rgba(232, 238, 252, 0.72)",
  lineHeight: 1.6,
});

export const controls = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  alignItems: "center",
  marginTop: 10,
});

export const button = style({
  appearance: "none",
  border: "1px solid rgba(232, 238, 252, 0.16)",
  background: "rgba(232, 238, 252, 0.06)",
  color: "#e8eefc",
  padding: "10px 12px",
  borderRadius: 12,
  fontSize: 14,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: "rgba(232, 238, 252, 0.10)",
      borderColor: "rgba(232, 238, 252, 0.22)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const primaryButton = style([
  button,
  {
    border: "1px solid rgba(124, 92, 255, 0.35)",
    background: "linear-gradient(180deg, rgba(124, 92, 255, 0.35), rgba(124, 92, 255, 0.18))",
    selectors: {
      "&:hover": {
        background:
          "linear-gradient(180deg, rgba(124, 92, 255, 0.42), rgba(124, 92, 255, 0.22))",
      },
    },
  },
]);

export const select = style({
  border: "1px solid rgba(232, 238, 252, 0.16)",
  background: "rgba(232, 238, 252, 0.06)",
  color: "#e8eefc",
  padding: "10px 12px",
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
});

export const sliderWrap = style({
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "10px 12px",
  border: "1px solid rgba(232, 238, 252, 0.16)",
  borderRadius: 12,
  background: "rgba(232, 238, 252, 0.06)",
});

export const slider = style({
  width: 180,
});

export const stats = style({
  marginLeft: "auto",
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  fontSize: 13,
  color: "rgba(232, 238, 252, 0.72)",
});

export const panel = style({
  marginTop: 18,
  borderRadius: 18,
  border: "1px solid rgba(232, 238, 252, 0.12)",
  background: "rgba(7, 10, 24, 0.72)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
  padding: 16,
});

export const barArea = style({
  height: 360,
  display: "flex",
  alignItems: "flex-end",
  gap: 4,
  borderRadius: 14,
  padding: 12,
  background: "rgba(232, 238, 252, 0.04)",
  overflow: "hidden",
});

export const bar = style({
  flex: 1,
  borderRadius: 10,
  background: "linear-gradient(180deg, rgba(97, 232, 255, 0.9), rgba(97, 232, 255, 0.25))",
  transition: "height 120ms linear, transform 120ms linear, filter 120ms linear",
});

export const barActive = style({
  transform: "translateY(-6px)",
  filter: "drop-shadow(0 6px 12px rgba(97, 232, 255, 0.22))",
});

export const barSorted = style({
  background:
    "linear-gradient(180deg, rgba(124, 92, 255, 0.95), rgba(124, 92, 255, 0.22))",
});

export const footerHint = style({
  marginTop: 12,
  fontSize: 13,
  color: "rgba(232, 238, 252, 0.6)",
  lineHeight: 1.5,
});
