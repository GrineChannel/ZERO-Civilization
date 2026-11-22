import { world } from "@minecraft/server";
import { BLUEPRINTS } from "./blueprints.js";
const KEY="zero:civ:build_jobs";
const RESOURCE_KEY="zero:civ:resources";
export function readJobs() {
  try { const data=JSON.parse(world.getDynamicProperty(KEY)||"[]");return Array.isArray(data)?data:[]; } catch {return [];}
}
export function saveJobs(jobs) {world.setDynamicProperty(KEY,JSON.stringify(jobs));}
export function resources(owner) {
  try {const data=JSON.parse(world.getDynamicProperty(RESOURCE_KEY)||"{}");return data[owner]||{wood:0,stone:0};} catch{return {wood:0,stone:0};}
}
export function grantStarterResources(player) {
  const all=JSON.parse(world.getDynamicProperty(RESOURCE_KEY)||"{}");
  if(all[player.id]) return false;
  all[player.id]={wood:100,stone:50};
  world.setDynamicProperty(RESOURCE_KEY,JSON.stringify(all));
  return true;
}
export function enqueue(player,blueprintId) {
  const blueprint=BLUEPRINTS[blueprintId];
  if(!blueprint) throw Error("Unknown building");
  const jobs=readJobs();
  if(jobs.length>=30) throw Error("Construction queue full");
  const all=JSON.parse(world.getDynamicProperty(RESOURCE_KEY)||"{}");
  const stock=all[player.id]||{wood:0,stone:0};
  for(const [key,cost] of Object.entries(blueprint.costs)) if((stock[key]||0)<cost) throw Error("Insufficient "+key);
  const p=player.location;
  const x=Math.floor(p.x)+3,z=Math.floor(p.z)+3,y=Math.floor(p.y)-1;
  for(const job of jobs) if(job.dimension===player.dimension.id && Math.abs(job.x-x)<8 && Math.abs(job.z-z)<8) throw Error("Another job nearby");
  const job={id:Date.now().toString(36)+Math.floor(Math.random()*10000),owner:player.id,blueprintId,dimension:player.dimension.id,x,y,z,progress:0,status:"queued"};
  // Charge only after validation.
  for(const [key,cost] of Object.entries(blueprint.costs)) stock[key]-=cost;
  all[player.id]=stock;
  world.setDynamicProperty(RESOURCE_KEY,JSON.stringify(all));
  jobs.push(job);saveJobs(jobs);
  return job;
}
