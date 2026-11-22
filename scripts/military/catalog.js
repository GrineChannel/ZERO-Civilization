export const UNITS=Object.freeze({
 militia:{cost:12,food:1,power:2,defense:2},
 infantry:{cost:25,food:2,power:5,defense:4},
 archers:{cost:30,food:2,power:6,defense:2},
 cavalry:{cost:55,food:3,power:10,defense:5},
 engineers:{cost:40,food:2,power:3,defense:3}
});
export const MAX_ARMIES=8;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
