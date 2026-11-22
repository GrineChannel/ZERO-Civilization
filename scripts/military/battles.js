import {militaryOf,armyStrength} from "./model.js";
import {clamp} from "./catalog.js";
export function simulateSkirmish(attacker,defender,attackerId,defenderId){
 if(attacker.owner===defender.owner)throw Error("Cannot attack own civilization");
 const a=militaryOf(attacker).armies.find(x=>x.id===attackerId);
 const d=militaryOf(defender).armies.find(x=>x.id===defenderId);
 if(!a||!d||a.count<1||d.count<1)throw Error("Both armies must exist and have soldiers");
 if(a.status!=="ready"||d.status!=="ready")throw Error("Army unavailable");
 const ap=armyStrength(attacker,{...a,stance:"attack"});
 const dp=armyStrength(defender,{...d,stance:"defend"});
 const attackWins=ap>dp;
 const aloss=Math.min(a.count,Math.max(1,Math.ceil(a.count*(attackWins?0.15:0.35))));
 const dloss=Math.min(d.count,Math.max(1,Math.ceil(d.count*(attackWins?0.35:0.15))));
 a.count-=aloss;d.count-=dloss;
 a.morale=clamp(a.morale+(attackWins?5:-12),0,100);
 d.morale=clamp(d.morale+(attackWins?-12:5),0,100);
 a.experience=clamp(a.experience+10,0,100);d.experience=clamp(d.experience+10,0,100);
 return {winner:attackWins?attacker.name:defender.name,aloss,dloss,ap,dp};
}
