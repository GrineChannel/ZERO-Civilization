import {claim,inspect,ownedCount} from "./engine.js";
export function territoryCommand(player,args){
 if(args[1]==="claim"){
   const cell=claim(player);player.sendMessage("§aClaimed chunk "+cell.x+", "+cell.z);return true;
 }
 if(args[1]==="land"){
   const {x,z,cell}=inspect(player);
   player.sendMessage("§6Chunk "+x+", "+z+" §7"+(cell?"Owner "+cell.owner+" | "+cell.kind:"Unclaimed")+
   " | Your chunks "+ownedCount(player.id));return true;
 }
 return false;
}
