import {getSociety,saveSociety} from "../society/storage.js";
import {INSTITUTIONS,TECHNOLOGIES} from "./catalog.js";
import {researchOf,buildInstitution,chooseResearch} from "./model.js";
export function researchCommand(player,args){
 if(!["research","institution","technologies","focus"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first");return true;}
 const r=researchOf(s);
 if(args[1]==="institution"){
  if(!args[2])player.sendMessage("§eTypes: "+Object.keys(INSTITUTIONS).join(", "));
  else{const i=buildInstitution(s,args[2]);saveSociety(s);player.sendMessage("§aInstitution #"+i.id+" "+i.type+" founded");}
 }else if(args[1]==="focus"){
  chooseResearch(s,args[2]);saveSociety(s);player.sendMessage("§aResearch focus: "+r.focus);
 }else if(args[1]==="technologies"){
  player.sendMessage(Object.keys(TECHNOLOGIES).map(k=>k+(r.unlocked.includes(k)?" [done]":"")).join(" | "));
 }else{
  player.sendMessage("§6Education "+s.education+" | Focus "+(r.focus||"none")+" | Progress "+(r.focus?(r.progress[r.focus]||0)+"/"+TECHNOLOGIES[r.focus].cost:"-"));
  player.sendMessage("Institutions: "+(r.institutions.map(i=>"#"+i.id+" "+i.type).join(", ")||"none"));
 }
 return true;
}
