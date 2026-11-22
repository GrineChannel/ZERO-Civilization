import {world} from "@minecraft/server";
import {BLUEPRINTS} from "./blueprints.js";
import {readJobs,saveJobs} from "./queue.js";
import {assignCrews,finishWork} from "../workers/crews.js";
// Virtual crews assign themselves to player-owned jobs and rest when exhausted.
// Physical NPCs, logistics and navigation are not implemented yet.
export function processConstruction(){
  const jobs=readJobs();
  const crews=assignCrews(jobs);
  let changed=false;
  for(const job of jobs){
    if(job.status==="done"||job.status==="blocked")continue;
    const blueprint=BLUEPRINTS[job.blueprintId];
    if(!blueprint){job.status="blocked";changed=true;continue;}
    const workers=crews.filter(c=>c.task===job.id && c.energy>=25);
    if(!workers.length){if(job.status!=="waiting_workers"){job.status="waiting_workers";changed=true;}continue;}
    const next=blueprint.blocks[job.progress];
    if(!next){job.status="done";changed=true;continue;}
    const dimension=world.getDimension(job.dimension);
    let block;
    try{block=dimension.getBlock({x:job.x+next.x,y:job.y+next.y,z:job.z+next.z});}catch{continue;}
    if(!block)continue;
    if(!block.isAir && !block.isLiquid && block.typeId!==next.type){job.status="blocked";changed=true;continue;}
    try{
      block.setType(next.type);
      job.progress++;
      job.status=job.progress>=blueprint.blocks.length?"done":"building";
      finishWork(crews,workers[0].id);
      changed=true;
    }catch(e){console.warn("[ZERO Civ] construction: "+e);}
  }
  if(changed)saveJobs(jobs);
}
