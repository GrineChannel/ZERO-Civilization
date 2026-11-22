import {TREATIES,MAX_PROPOSALS,MAX_RELATIONS,clamp,pairKey} from "./config.js";
import {loadDiplomacy,saveDiplomacy} from "./storage.js";
import {getSociety} from "../society/storage.js";
function requireCiv(owner){const s=getSociety(owner);if(!s)throw Error("Civilization not found");return s;}
function relation(data,a,b){
 const key=pairKey(a,b);
 if(!data.relations[key]){
  if(Object.keys(data.relations).length>=MAX_RELATIONS)throw Error("Relation limit reached");
  data.relations[key]={trust:0,tension:0,history:[]};
 }
 return data.relations[key];
}
export function propose(from,to,type){
 if(from===to)throw Error("Cannot negotiate with yourself");
 requireCiv(from);requireCiv(to);
 if(!TREATIES[type])throw Error("Unknown treaty: "+Object.keys(TREATIES).join(", "));
 const data=loadDiplomacy();
 if(data.proposals.length>=MAX_PROPOSALS)throw Error("Proposal limit reached");
 if(data.proposals.some(p=>p.from===from&&p.to===to&&p.type===type))throw Error("Proposal already pending");
 if(data.treaties.some(t=>pairKey(t.a,t.b)===pairKey(from,to)&&t.type===type))throw Error("Treaty already active");
 const p={id:data.nextId++,from,to,type};
 data.proposals.push(p);saveDiplomacy(data);return p;
}
export function respond(owner,id,accept){
 const data=loadDiplomacy(),index=data.proposals.findIndex(p=>p.id===id&&p.to===owner);
 if(index<0)throw Error("Incoming proposal not found");
 const p=data.proposals[index];
 if(accept){
  if(data.treaties.length>=MAX_PROPOSALS)throw Error("Treaty limit reached");
  if(!getSociety(p.from)||!getSociety(p.to))throw Error("Civilization missing");
  data.treaties.push({a:p.from,b:p.to,type:p.type});
  const r=relation(data,p.from,p.to);
  r.trust=clamp(r.trust+TREATIES[p.type].trust,-100,100);
  r.tension=clamp(r.tension-10,0,100);
 }else{
  const r=relation(data,p.from,p.to);
  r.trust=clamp(r.trust-3,-100,100);
 }
 data.proposals.splice(index,1);saveDiplomacy(data);return p;
}
export function diplomacyView(owner){
 const data=loadDiplomacy();
 return {
  incoming:data.proposals.filter(p=>p.to===owner),
  outgoing:data.proposals.filter(p=>p.from===owner),
  treaties:data.treaties.filter(t=>t.a===owner||t.b===owner)
 };
}
export function relationView(a,b){
 if(a===b)throw Error("Choose another civilization");
 requireCiv(a);requireCiv(b);
 const d=loadDiplomacy();
 return d.relations[pairKey(a,b)]||{trust:0,tension:0,history:[]};
}
export function breakTreaty(owner,other,type){
 if(owner===other)throw Error("Invalid target");
 const d=loadDiplomacy();
 const index=d.treaties.findIndex(t=>pairKey(t.a,t.b)===pairKey(owner,other)&&t.type===type);
 if(index<0)throw Error("Treaty not found");
 d.treaties.splice(index,1);
 const r=relation(d,owner,other);r.trust=clamp(r.trust-15,-100,100);r.tension=clamp(r.tension+10,0,100);
 saveDiplomacy(d);
}
