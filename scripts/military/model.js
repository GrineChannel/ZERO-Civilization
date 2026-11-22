import {UNITS,MAX_ARMIES,clamp} from "./catalog.js";
import {economyOf} from "../economy/model.js";
export function militaryOf(s){
 if(!s.military)s.military={nextId:1,armies:[],doctrine:"balanced",technology:0,history:[]};
 return s.military;
}
export function recruitArmy(s,type,count){
 const m=militaryOf(s),e=economyOf(s),spec=UNITS[type];
 if(!spec)throw Error("Unknown unit type");
 if(!Number.isInteger(count)||count<1||count>100)throw Error("Count must be 1-100");
 if(m.armies.length>=MAX_ARMIES)throw Error("Army limit reached");
 const cost=spec.cost*count;
 if(e.treasury<cost)throw Error("Insufficient treasury");
 // Adults are an abstract population pool: troops are removed from civilian workforce.
 if(s.population.adults-count<2)throw Error("Not enough adult citizens");
 e.treasury-=cost;s.population.adults-=count;
 const army={id:m.nextId++,type,count,morale:70,experience:0,supply:100,stance:"defend",general:"local",status:"ready"};
 m.armies.push(army);return army;
}
export function setDoctrine(s,doctrine){
 if(!["balanced","defensive","aggressive"].includes(doctrine))throw Error("Unknown doctrine");
 militaryOf(s).doctrine=doctrine;
}
export function armyStrength(s,army){
 const unit=UNITS[army.type],m=militaryOf(s);
 const stance=army.stance==="defend"?unit.defense:unit.power;
 const modifier=0.5+army.morale/200+army.supply/200+army.experience/1000;
 return Math.max(0,Math.round(army.count*(stance+m.technology)*modifier));
}
export function militaryDay(s){
 const m=militaryOf(s),e=economyOf(s);
 for(const a of m.armies){
  if(a.count<=0)continue;
  const unit=UNITS[a.type];if(!unit)continue;
  const upkeep=Math.ceil(a.count*unit.cost/20);
  if(e.treasury>=upkeep){e.treasury-=upkeep;a.morale=clamp(a.morale+1,0,100);}
  else a.morale=clamp(a.morale-5,0,100);
  const food=Math.ceil(a.count*unit.food/3);
  if(e.stock.food>=food){e.stock.food-=food;a.supply=clamp(a.supply+5,0,100);}
  else{a.supply=clamp(a.supply-12,0,100);a.morale=clamp(a.morale-3,0,100);}
  if(a.supply===0 && a.count>0){a.count--;m.history.push({day:s.day,text:"Desertion in army #"+a.id});}
  a.experience=clamp(a.experience+1,0,100);
 }
 if(m.history.length>12)m.history=m.history.slice(-12);
}
