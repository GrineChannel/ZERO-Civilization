import {foundSociety,getSociety} from "./storage.js";
import {totalPopulation} from "./model.js";
export function societyCommand(player,args){
 if(args[1]==="found"){
  const s=foundSociety(player,args.slice(2).join(" "));
  player.sendMessage("§aCivilization founded: "+s.name);
  return true;
 }
 if(args[1]==="society"){
  const s=getSociety(player.id);
  if(!s){player.sendMessage("§eUse !civ found <name>");return true;}
  player.sendMessage("§6"+s.name+" §7Day "+s.day+" | Population "+totalPopulation(s)+
   " (children "+s.population.children+", adults "+s.population.adults+", elders "+s.population.elders+
   ") | Food "+s.food+" | Housing "+s.housing+" | Morale "+s.morale+
   " | Health "+s.health+" | Loyalty "+s.loyalty+" | Wealth "+s.wealth);
  return true;
 }
 if(args[1]==="events"){
  const s=getSociety(player.id);
  player.sendMessage(s?(s.events.length?s.events.map(e=>"Day "+e.day+": "+e.text).join("\n"):"No events"):"Found a civilization first");
  return true;
 }
 return false;
}
