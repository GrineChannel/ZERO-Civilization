import {world,system} from "@minecraft/server";
import {BLUEPRINTS} from "./buildings/blueprints.js";
import {enqueue,readJobs,resources,grantStarterResources} from "./buildings/queue.js";
import {processConstruction} from "./buildings/worker.js";
system.runInterval(processConstruction,20);
world.beforeEvents.chatSend.subscribe(event=>{
  if(!event.message.startsWith("!civ")) return;
  event.cancel=true;
  const player=event.sender;
  const args=event.message.trim().split(/\s+/);
  system.run(()=>{
    try {
      if(args[1]==="start") {
        player.sendMessage(grantStarterResources(player)?"§aStarter stock granted: 100 wood, 50 stone":"§eAlready claimed");
      } else if(args[1]==="build") {
        const job=enqueue(player,args[2]||"hut");
        player.sendMessage("§aConstruction queued: "+job.blueprintId+" at "+job.x+", "+job.y+", "+job.z);
      } else if(args[1]==="jobs") {
        const jobs=readJobs().filter(j=>j.owner===player.id);
        player.sendMessage(jobs.length?jobs.map(j=>j.blueprintId+": "+j.status+" ("+j.progress+"/"+BLUEPRINTS[j.blueprintId].blocks.length+")").join("\n"):"No jobs");
      } else if(args[1]==="stock") {
        const r=resources(player.id);player.sendMessage("Wood: "+r.wood+" | Stone: "+r.stone);
      } else player.sendMessage("§6ZERO Civilization §7!civ start | build hut | jobs | stock");
    } catch(e){player.sendMessage("§c"+String(e));}
  });
});
