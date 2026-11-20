export function formatCurrencyBRL(value: number): string {
  if (value <= 0) return "Grátis";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatShortCode(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `SYM-${hash.toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}
