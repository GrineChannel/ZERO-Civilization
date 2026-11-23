import {familyCommand} from "./families/commands.js";
import {educationCommand} from "./education/commands.js";
import {researchCommand} from "./research/commands.js";
import {diplomacyCommand} from "./diplomacy/commands.js";
import {militaryCommand} from "./military/commands.js";
import {economyCommand} from "./economy/commands.js";
import {territoryCommand} from "./territory/commands.js";
import {politicsCommand} from "./politics/commands.js";
import {tickSocieties} from "./society/simulation.js";
import {societyCommand} from "./society/commands.js";
import {world,system} from "@minecraft/server";
import {BLUEPRINTS} from "./buildings/blueprints.js";
import {enqueue,readJobs,resources,grantStarterResources} from "./buildings/queue.js";
import {processConstruction} from "./buildings/worker.js";
import {recruit,crewStatus} from "./workers/crews.js";
system.runInterval(processConstruction,20);
system.runInterval(tickSocieties,1200);
world.beforeEvents.chatSend.subscribe(event=>{
  if(!event.message.startsWith("!civ"))return;
  event.cancel=true;
  const player=event.sender,args=event.message.trim().split(/\s+/);
  system.run(()=>{
    try{
      if(societyCommand(player,args))return;
      if(politicsCommand(player,args))return;
      if(territoryCommand(player,args))return;
      if(economyCommand(player,args))return;
      if(militaryCommand(player,args))return;
      if(diplomacyCommand(player,args))return;
      if(researchCommand(player,args))return;
      if(educationCommand(player,args))return;
      if(familyCommand(player,args))return;
      if(args[1]==="start")player.sendMessage(grantStarterResources(player)?"§aStarter stock granted":"§eAlready claimed");
      else if(args[1]==="recruit"){const c=recruit(player);player.sendMessage("§aBuilder recruited #"+c.id);}
      else if(args[1]==="crew"){
        const cs=crewStatus(player.id);
        player.sendMessage(cs.length?cs.map(c=>"#"+c.id+" skill "+c.skill+" energy "+c.energy+" task "+(c.task||"rest")).join("\n"):"No workers. Use !civ recruit");
      }else if(args[1]==="build"){
        const job=enqueue(player,args[2]||"hut");
        player.sendMessage("§aQueued "+job.blueprintId+" at "+job.x+", "+job.y+", "+job.z);
      }else if(args[1]==="jobs"){
        const jobs=readJobs().filter(j=>j.owner===player.id);
        player.sendMessage(jobs.length?jobs.map(j=>j.blueprintId+": "+j.status+" ("+j.progress+"/"+BLUEPRINTS[j.blueprintId].blocks.length+")").join("\n"):"No jobs");
      }else if(args[1]==="stock"){
        const r=resources(player.id);player.sendMessage("Wood: "+r.wood+" | Stone: "+r.stone);
      }else player.sendMessage("§6!civ found <name> | society | events | politics | government | laws | law | claim | land | economy | market | enterprise | trade | army | recruitarmy | doctrine | diplomacy | civs | propose | accept | reject | relations | breaktreaty | research | institution | technologies | focus | education | specialists | train | mentor | families | house | relative | heir | marry | succession | dynasty | start | recruit | crew | build hut | jobs | stock");
    }catch(e){player.sendMessage("§c"+String(e));}
  });
});
