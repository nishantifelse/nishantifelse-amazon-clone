export function formateCurrency(priceCents){
  return ((Math.round(priceCents) / 100)* 84.88).toFixed(2);
  
}