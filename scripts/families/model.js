import {MAX_HOUSES,MAX_MEMBERS,clamp,validName} from "./config.js";
import {educationOf} from "../education/model.js";
import {politicsOf} from "../politics/engine.js";
export function familiesOf(s){
 if(!s.families)s.families={nextHouseId:1,nextMemberId:1,houses:[],members:[],history:[]};
 return s.families;
}
function member(f,id){return f.members.find(m=>m.id===id);}
function record(f,day,text){f.history.push({day,text});if(f.history.length>12)f.history.shift();}
export function foundHouse(s,name,founder){
 const f=familiesOf(s);
 if(!validName(name)||!validName(founder))throw Error("Names: 1-24 letters, digits, - or _");
 if(f.houses.length>=MAX_HOUSES||f.members.length>=MAX_MEMBERS)throw Error("Family limit reached");
 if(f.houses.some(h=>h.name.toLowerCase()===name.toLowerCase()))throw Error("House name already exists");
 if(f.members.length>=s.population.adults)throw Error("Not enough adult residents");
 const person={id:f.nextMemberId++,name:founder,houseId:f.nextHouseId,parents:[],partner:null,profession:null,alive:true};
 const house={id:f.nextHouseId++,name,head:person.id,heir:null,wealth:100,prestige:10,tradition:"general"};
 f.members.push(person);f.houses.push(house);record(f,s.day,"House "+name+" founded");return house;
}
export function addRelative(s,houseId,name,parentId){
 const f=familiesOf(s),h=f.houses.find(x=>x.id===houseId);
 if(!h)throw Error("House not found");
 if(!validName(name))throw Error("Invalid member name");
 if(f.members.length>=MAX_MEMBERS)throw Error("Member limit reached");
 if(f.members.length>=s.population.adults)throw Error("Not enough adult residents");
 const parent=parentId?member(f,parentId):null;
 if(parentId&&(!parent||!parent.alive||parent.houseId!==houseId))throw Error("Parent must be a living house member");
 const p={id:f.nextMemberId++,name,houseId,parents:parent?[parent.id]:[],partner:null,profession:null,alive:true};
 f.members.push(p);return p;
}
export function setHeir(s,houseId,heirId){
 const f=familiesOf(s),h=f.houses.find(x=>x.id===houseId),heir=member(f,heirId);
 if(!h||!heir||!heir.alive||heir.houseId!==houseId||heir.id===h.head)throw Error("Heir must be a living house member other than head");
 h.heir=heir.id;return h;
}
export function marry(s,aId,bId){
 const f=familiesOf(s),a=member(f,aId),b=member(f,bId);
 if(!a||!b||a.id===b.id||!a.alive||!b.alive||a.partner||b.partner)throw Error("Both members must be living and unmarried");
 if(a.parents.includes(b.id)||b.parents.includes(a.id))throw Error("Parent-child marriage forbidden");
 if(a.parents.some(x=>b.parents.includes(x)))throw Error("Sibling marriage forbidden");
 a.partner=b.id;b.partner=a.id;
 const ah=f.houses.find(h=>h.id===a.houseId),bh=f.houses.find(h=>h.id===b.houseId);
 if(ah&&bh&&ah.id!==bh.id){ah.prestige=clamp(ah.prestige+3,0,100);bh.prestige=clamp(bh.prestige+3,0,100);}
 record(f,s.day,"Marriage: "+a.name+" and "+b.name);return [a,b];
}
export function transferHead(s,houseId){
 const f=familiesOf(s),h=f.houses.find(x=>x.id===houseId);
 if(!h)throw Error("House not found");
 const old=member(f,h.head);
 if(old)old.alive=false;
 let next=member(f,h.heir);
 if(!next||!next.alive||next.houseId!==h.id)next=f.members.find(x=>x.houseId===h.id&&x.alive);
 h.head=next?next.id:null;h.heir=null;
 if(next){h.prestige=clamp(h.prestige+2,0,100);record(f,s.day,"House "+h.name+" inherited by "+next.name);}
 else record(f,s.day,"House "+h.name+" has no living successor");
 return next;
}
export function familyDay(s){
 const f=familiesOf(s);
 // Periodic bounded prestige/wealth evolution; does not create population or remove adults.
 if(s.day%10!==0)return;
 const specialists=educationOf(s).people;
 for(const h of f.houses){
  const active=f.members.filter(m=>m.houseId===h.id&&m.alive);
  const expertise=active.filter(m=>specialists.some(p=>p.name===m.name&&p.skill>=30)).length;
  h.wealth=clamp(h.wealth+active.length*2+expertise*3,0,100000);
  h.prestige=clamp(h.prestige+(expertise?1:0),0,100);
 }
}
export function nominateRuler(s,houseId){
 const f=familiesOf(s),h=f.houses.find(x=>x.id===houseId),p=politicsOf(s);
 if(!h||!h.head)throw Error("House has no head");
 if(!["monarchy","empire"].includes(p.government))throw Error("Dynastic ruler only available in monarchy or empire");
 p.dynastyHouseId=h.id;p.dynastyRulerMemberId=h.head;
 return h;
}
