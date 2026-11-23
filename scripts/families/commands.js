import {getSociety,saveSociety} from "../society/storage.js";
import {familiesOf,foundHouse,addRelative,setHeir,marry,transferHead,nominateRuler} from "./model.js";
function positive(v){const n=Number(v);if(!Number.isSafeInteger(n)||n<1)throw Error("Expected positive numeric ID");return n;}
export function familyCommand(player,args){
 if(!["families","house","relative","heir","marry","succession","dynasty"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first");return true;}
 const f=familiesOf(s),cmd=args[1];
 if(cmd==="families"){
  player.sendMessage(f.houses.length?f.houses.map(h=>"#"+h.id+" "+h.name+" head "+(f.members.find(m=>m.id===h.head)?.name||"none")+" heir "+(f.members.find(m=>m.id===h.heir)?.name||"none")+" wealth "+h.wealth+" prestige "+h.prestige).join("\n"):"No houses");
 }else if(cmd==="house"){
  const h=foundHouse(s,args[2],args[3]);saveSociety(s);player.sendMessage("§aHouse #"+h.id+" "+h.name+" founded");
 }else if(cmd==="relative"){
  const p=addRelative(s,positive(args[2]),args[3],args[4]?positive(args[4]):null);
  saveSociety(s);player.sendMessage("§aMember #"+p.id+" "+p.name+" added");
 }else if(cmd==="heir"){
  const h=setHeir(s,positive(args[2]),positive(args[3]));saveSociety(s);player.sendMessage("§aHeir set for "+h.name);
 }else if(cmd==="marry"){
  const pair=marry(s,positive(args[2]),positive(args[3]));saveSociety(s);player.sendMessage("§aMarriage: "+pair.map(x=>x.name).join(" + "));
 }else if(cmd==="succession"){
  const p=transferHead(s,positive(args[2]));saveSociety(s);player.sendMessage(p?"§aNew house head: "+p.name:"§eNo living successor");
 }else if(cmd==="dynasty"){
  const h=nominateRuler(s,positive(args[2]));saveSociety(s);player.sendMessage("§aDynasty designated: "+h.name);
 }
 return true;
}
