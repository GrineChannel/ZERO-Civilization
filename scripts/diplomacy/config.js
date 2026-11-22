export const TREATIES=Object.freeze({
 alliance:{label:"Alliance",trust:15},
 trade:{label:"Trade pact",trust:8},
 nonaggression:{label:"Non-aggression pact",trust:10},
 federation:{label:"Federation agreement",trust:20},
 vassalage:{label:"Vassalage agreement",trust:5},
 peace:{label:"Peace treaty",trust:10}
});
export const MAX_PROPOSALS=60;
export const MAX_RELATIONS=150;
export const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
export function pairKey(a,b){return [a,b].sort().join("|");}
