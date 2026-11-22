import {INSTITUTIONS,TECHNOLOGIES,MAX_INSTITUTIONS} from "./catalog.js";
import {economyOf} from "../economy/model.js";
export function researchOf(s){
 if(!s.research)s.research={institutions:[],nextId:1,focus:"agriculture",progress:{},unlocked:[],history:[]};
 return s.research;
}
export function buildInstitution(s,type){
 const spec=INSTITUTIONS[type];if(!spec)throw Error("Unknown institution");
 const r=researchOf(s),e=economyOf(s);
 if(r.institutions.length>=MAX_INSTITUTIONS)throw Error("Institution limit reached");
 if(e.treasury<spec.cost)throw Error("Insufficient treasury");
 e.treasury-=spec.cost;
 const item={id:r.nextId++,type,active:true};
 r.institutions.push(item);return item;
}
export function chooseResearch(s,tech){
 const r=researchOf(s),t=TECHNOLOGIES[tech];
 if(!t)throw Error("Unknown technology");
 if(r.unlocked.includes(tech))throw Error("Already researched");
 if(t.requires.some(x=>!r.unlocked.includes(x)))throw Error("Prerequisites: "+t.requires.join(", "));
 r.focus=tech;return tech;
}
export function researchDay(s){
 const r=researchOf(s),e=economyOf(s);
 // Bounded abstract workforce; researchers do not spawn entities.
 let workers=Math.max(0,s.population.adults);
 let points=0,education=0;
 for(const item of r.institutions){
  const spec=INSTITUTIONS[item.type];
  if(!spec||!item.active||workers<spec.staff||e.treasury<spec.upkeep)continue;
  workers-=spec.staff;e.treasury-=spec.upkeep;
  points+=spec.points;education+=spec.education;
 }
 s.education=Math.min(100,s.education+education);
 const tech=TECHNOLOGIES[r.focus];
 if(!tech||r.unlocked.includes(r.focus)||tech.requires.some(x=>!r.unlocked.includes(x)))return;
 points=Math.floor(points*(1+Math.min(100,s.education)/100));
 if(points<1)return;
 r.progress[r.focus]=(r.progress[r.focus]||0)+points;
 if(r.progress[r.focus]>=tech.cost){
  r.unlocked.push(r.focus);
  r.history.push({day:s.day,text:"Research completed: "+r.focus});
  if(r.history.length>8)r.history.shift();
  r.focus=null;
 }
}
