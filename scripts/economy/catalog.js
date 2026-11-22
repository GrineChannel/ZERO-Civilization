export const GOODS=Object.freeze(["food","wood","stone","ore","tools"]);
export const INDUSTRIES=Object.freeze({
 farm:{workers:2,input:{},output:{food:6}},
 lumberyard:{workers:2,input:{},output:{wood:4}},
 quarry:{workers:2,input:{},output:{stone:3}},
 mine:{workers:3,input:{tools:1},output:{ore:4}},
 workshop:{workers:2,input:{wood:2,ore:2},output:{tools:2}}
});
export const MAX_ENTERPRISES=16;
export const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
