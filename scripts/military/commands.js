import {getSociety,saveSociety} from "../society/storage.js";
import {UNITS} from "./catalog.js";
import {militaryOf,recruitArmy,setDoctrine,armyStrength} from "./model.js";
export function militaryCommand(player,args){
 if(!["army","recruitarmy","doctrine","forces"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first");return true;}
 if(args[1]==="recruitarmy"){
  const a=recruitArmy(s,args[2],Number(args[3]));
  saveSociety(s);player.sendMessage("§aArmy #"+a.id+" recruited: "+a.count+" "+a.type);
 }else if(args[1]==="doctrine"){
  if(!args[2])player.sendMessage("§eDoctrine: balanced, defensive, aggressive");
  else{setDoctrine(s,args[2]);saveSociety(s);player.sendMessage("§aDoctrine: "+args[2]);}
 }else if(args[1]==="forces"||args[1]==="army"){
  const m=militaryOf(s);
  player.sendMessage("§6Doctrine "+m.doctrine+" | Technology "+m.technology+
   " | Units: "+Object.keys(UNITS).join(", "));
  player.sendMessage(m.armies.length?m.armies.map(a=>"#"+a.id+" "+a.type+" x"+a.count+
   " morale "+a.morale+" supply "+a.supply+" strength "+armyStrength(s,a)).join("\n"):"No armies");
 }
 return true;
}
