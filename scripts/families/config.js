export const MAX_HOUSES=8;
export const MAX_MEMBERS=48;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function validName(name){return typeof name==="string"&&/^[\p{L}\p{N}_-]{1,24}$/u.test(name);}
