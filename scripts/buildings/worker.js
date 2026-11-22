import { world } from "@minecraft/server";
import { BLUEPRINTS } from "./blueprints.js";
import { readJobs,saveJobs } from "./queue.js";
// Prototype virtual builder: places one block each cycle.
// Physical NPC navigation and delivery are planned for a later version.
export function processConstruction() {
  const jobs=readJobs();
  let changed=false;
  for(const job of jobs) {
    if(job.status==="done"||job.status==="blocked") continue;
    const blueprint=BLUEPRINTS[job.blueprintId];
    if(!blueprint) {job.status="blocked";changed=true;continue;}
    const dimension=world.getDimension(job.dimension);
    const next=blueprint.blocks[job.progress];
    if(!next) {job.status="done";changed=true;continue;}
    const block=dimension.getBlock({x:job.x+next.x,y:job.y+next.y,z:job.z+next.z});
    if(!block) continue; // Unloaded chunk: retry later.
    if(!block.isAir && !block.isLiquid && block.typeId!==next.type) {job.status="blocked";changed=true;continue;}
    try {
      block.setType(next.type);
      job.progress++;
      job.status=job.progress>=blueprint.blocks.length?"done":"building";
      changed=true;
    } catch(e) {console.warn("[ZERO Civ] construction: "+e);}
  }
  if(changed) saveJobs(jobs);
}
