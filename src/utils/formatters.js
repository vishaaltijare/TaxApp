export function formatINR(amount) {
  if (amount === null || amount === undefined || amount === '') return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount))
}

export function parseNumber(str) {
  const n = parseFloat(String(str).replace(/,/g, ''))
  return isNaN(n) ? null : n
}
