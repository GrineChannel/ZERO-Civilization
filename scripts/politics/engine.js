import {GOVERNMENTS,LAW_LIMITS,initialPolitics} from "./config.js";
export function politicsOf(s){if(!s.politics)s.politics=initialPolitics(s.owner);return s.politics;}
export function changeGovernment(s,type){
 if(!GOVERNMENTS[type])throw Error("Unknown government. Available: "+Object.keys(GOVERNMENTS).join(", "));
 const p=politicsOf(s);if(p.government===type)return p;
 p.government=type;p.termStarted=s.day;p.stability=Math.max(0,p.stability-10);
 record(s,"Government changed to "+GOVERNMENTS[type].label);return p;
}
export function setLaw(s,key,value){
 const limits=LAW_LIMITS[key];if(!limits)throw Error("Unknown law");
 if(!Number.isInteger(value)||value<limits[0]||value>limits[1])throw Error("Law range "+limits.join("-"));
 const p=politicsOf(s);p.laws[key]=value;
 if(key==="tax")s.policy.tax=value;
 p.stability=Math.max(0,p.stability-2);record(s,"Law "+key+" changed to "+value);return p;
}
export function politicalDay(s){
 const p=politicsOf(s);const g=GOVERNMENTS[p.government];
 const dissatisfaction=(s.morale<35?2:0)+(p.laws.tax>25?1:0);
 p.stability=Math.max(0,Math.min(100,p.stability+(s.morale>=60?1:0)-dissatisfaction));
 p.legitimacy=Math.max(0,Math.min(100,p.legitimacy+(s.loyalty>=60?1:-1)));
 if(g.elections && s.day-p.termStarted>=g.term){
   p.termStarted=s.day;p.electionCount++;
   // Elections affect legitimacy, not player ownership; individual candidates are future work.
   p.legitimacy=Math.min(100,p.legitimacy+8);
   record(s,"Election cycle completed (#"+p.electionCount+")");
 }
 if(p.stability<15 && s.day%5===0)record(s,"Political unrest is rising");
}
function record(s,text){const p=politicsOf(s);p.history.push({day:s.day,text});if(p.history.length>12)p.history.shift();}
