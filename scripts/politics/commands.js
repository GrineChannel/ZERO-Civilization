import {getSociety,saveSociety} from "../society/storage.js";
import {GOVERNMENTS,LAW_LIMITS} from "./config.js";
import {politicsOf,changeGovernment,setLaw} from "./engine.js";
export function politicsCommand(player,args){
 if(!["government","law","politics","laws"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first: !civ found <name>");return true;}
 const p=politicsOf(s);
 if(args[1]==="government"){
   if(!args[2])player.sendMessage("§eTypes: "+Object.keys(GOVERNMENTS).join(", "));
   else {changeGovernment(s,args[2]);saveSociety(s);player.sendMessage("§aGovernment: "+GOVERNMENTS[p.government].label);}
 }else if(args[1]==="law"){
   if(!args[2])player.sendMessage("§eLaws: "+Object.keys(LAW_LIMITS).join(", "));
   else {setLaw(s,args[2],Number(args[3]));saveSociety(s);player.sendMessage("§aLaw updated");}
 }else if(args[1]==="laws"){
   player.sendMessage(Object.entries(p.laws).map(([k,v])=>k+": "+v).join(" | "));
 }else{
   player.sendMessage("§6"+GOVERNMENTS[p.government].label+" | Stability "+p.stability+
   " | Legitimacy "+p.legitimacy+" | Elections "+p.electionCount);
 }
 return true;
}
