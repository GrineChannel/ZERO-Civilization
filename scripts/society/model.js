export const MAX_CIVILIZATIONS=24;
export function createSociety(owner,name){
 return {owner,name,day:0,population:{children:3,adults:7,elders:0},food:100,housing:12,
  morale:65,health:80,loyalty:75,education:10,security:50,wealth:20,
  culture:{tradition:50,openness:50},policy:{tax:10,foodPriority:50},
  events:[],birthProgress:0,ageProgress:0};
}
export function totalPopulation(s){return s.population.children+s.population.adults+s.population.elders;}
export function advanceDay(s){
 const p=s.population;const total=totalPopulation(s);
 const production=p.adults*2;const consumption=p.adults+p.elders+Math.ceil(p.children/2);
 s.food=Math.max(0,Math.min(100000,s.food+production-consumption));
 const hungry=s.food===0;
 s.health=Math.max(0,Math.min(100,s.health+(hungry?-4:1)));
 s.morale=Math.max(0,Math.min(100,s.morale+(hungry?-5:1)-Math.floor(s.policy.tax/25)));
 s.loyalty=Math.max(0,Math.min(100,s.loyalty+(s.morale<25?-2:1)));
 s.wealth=Math.max(0,Math.min(100000,s.wealth+Math.floor(p.adults*s.policy.tax/10)));
 s.birthProgress+=(p.adults>=2 && total<s.housing && s.food>20 && s.health>40)?p.adults:0;
 if(s.birthProgress>=60){p.children++;s.birthProgress-=60;pushEvent(s,"A child was born");}
 s.ageProgress++;
 if(s.ageProgress>=20){s.ageProgress=0;if(p.children>0){p.children--;p.adults++;pushEvent(s,"A child became an adult");}
 else if(p.adults>2){p.adults--;p.elders++;pushEvent(s,"An adult became an elder");}
 else if(p.elders>0){p.elders--;pushEvent(s,"An elder passed away");}}
 if(hungry && s.health<20 && total>1){if(p.elders>0)p.elders--;else if(p.adults>1)p.adults--;else if(p.children>0)p.children--;pushEvent(s,"Famine caused a death");}
 s.day++;
 return s;
}
function pushEvent(s,event){s.events.push({day:s.day,text:event});if(s.events.length>8)s.events.shift();}
