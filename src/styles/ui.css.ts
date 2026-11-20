import { keyframes, style } from "@vanilla-extract/css";
import { symplaVars } from "./tokens.css";

const accordionDown = keyframes({
  from: { height: "0" },
  to: { height: "var(--radix-accordion-content-height)" },
});

const accordionUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: "0" },
});

export const eventCardRoot = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: symplaVars.color.white,
  borderRadius: symplaVars.radius.lg,
  border: `1px solid ${symplaVars.color.gray200}`,
  overflow: "hidden",
  boxShadow: symplaVars.shadow.card,
  transition: "transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.18s ease",
  selectors: {
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: symplaVars.shadow.cardHover,
      borderColor: symplaVars.color.brand200,
    },
  },
});

export const stickyTicketCard = style({
  backgroundColor: symplaVars.color.white,
  borderRadius: symplaVars.radius.xl,
  border: `1px solid ${symplaVars.color.gray200}`,
  boxShadow: symplaVars.shadow.stickyBox,
  overflow: "hidden",
});

export const accordionItem = style({
  borderBottom: `1px solid ${symplaVars.color.gray200}`,
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const accordionTrigger = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "20px 0",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "1rem",
  color: symplaVars.color.gray900,
  cursor: "pointer",
  transition: "color 0.15s ease",
  selectors: {
    "&:hover": {
      color: symplaVars.color.brand600,
    },
  },
});

export const accordionContent = style({
  overflow: "hidden",
  selectors: {
    '&[data-state="open"]': {
      animation: `${accordionDown} 0.22s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${accordionUp} 0.18s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  },
});

export const primaryBrandButton = style({
  backgroundColor: symplaVars.color.brand500,
  color: symplaVars.color.white,
  fontWeight: 700,
  borderRadius: symplaVars.radius.md,
  transition: "background-color 0.15s ease, transform 0.1s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: symplaVars.color.brand600,
    },
    "&:active:not(:disabled)": {
      transform: "scale(0.99)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});
