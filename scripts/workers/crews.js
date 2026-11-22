import {world} from "@minecraft/server";
const KEY="zero:civ:crews";
export function getCrews() {
  try {const v=JSON.parse(world.getDynamicProperty(KEY)||"[]");return Array.isArray(v)?v:[];} catch{return [];}
}
function save(crews){world.setDynamicProperty(KEY,JSON.stringify(crews));}
export function recruit(player) {
  const crews=getCrews();
  const own=crews.filter(c=>c.owner===player.id);
  if(own.length>=8) throw Error("Crew limit: 8");
  const id=crews.reduce((n,c)=>Math.max(n,c.id),0)+1;
  const crew={id,owner:player.id,role:"builder",skill:1,xp:0,energy:100,task:null};
  crews.push(crew);save(crews);return crew;
}
export function crewStatus(owner){
  return getCrews().filter(c=>c.owner===owner);
}
// Autonomous job assignment and rest: virtual workforce only.
export function assignCrews(jobs) {
  const crews=getCrews();let changed=false;
  for(const c of crews) {
    if(c.energy<25){c.energy=Math.min(100,c.energy+15);c.task=null;changed=true;continue;}
    const candidates=jobs.filter(j=>j.owner===c.owner && j.status!=="done" && j.status!=="blocked");
    const target=candidates[0];
    const task=target?target.id:null;
    if(c.task!==task){c.task=task;changed=true;}
    if(!target){c.energy=Math.min(100,c.energy+10);changed=true;}
  }
  if(changed) save(crews);
  return crews;
}
export function finishWork(crews,crewId) {
  const c=crews.find(c=>c.id===crewId);
  if(!c)return;
  c.energy=Math.max(0,c.energy-4);
  c.xp++;
  if(c.xp>=c.skill*30 && c.skill<10){c.xp=0;c.skill++;}
  save(crews);
}
