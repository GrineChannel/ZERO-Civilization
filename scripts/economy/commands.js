import {getSociety,saveSociety} from "../society/storage.js";
import {GOODS,INDUSTRIES} from "./catalog.js";
import {economyOf,createEnterprise,trade} from "./model.js";
export function economyCommand(player,args){
 if(!["economy","market","enterprise","trade"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first");return true;}
 const e=economyOf(s);
 if(args[1]==="economy"){
  player.sendMessage("§6Treasury "+e.treasury+" "+e.currency+" | Inflation index "+e.inflation+"% | Enterprises "+e.enterprises.length);
 }else if(args[1]==="market"){
  player.sendMessage(GOODS.map(g=>g+" "+e.stock[g]+" @"+e.prices[g]).join(" | "));
 }else if(args[1]==="enterprise"){
  if(!args[2])player.sendMessage("§eIndustries: "+Object.keys(INDUSTRIES).join(", "));
  else{const b=createEnterprise(s,args[2]);saveSociety(s);player.sendMessage("§aEnterprise #"+b.id+": "+b.type);}
 }else{
  const value=trade(s,args[3],Number(args[4]),args[2]);saveSociety(s);
  player.sendMessage("§aTrade completed: "+value+" "+e.currency);
 }
 return true;
}
