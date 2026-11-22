import {listSocieties,getSociety} from "../society/storage.js";
import {TREATIES} from "./config.js";
import {propose,respond,diplomacyView,relationView,breakTreaty} from "./engine.js";
function findTarget(text,owner){
 const matches=listSocieties().filter(s=>s.owner!==owner&&s.name.toLowerCase()===text.toLowerCase());
 if(matches.length!==1)throw Error("Civilization name not found or ambiguous");
 return matches[0];
}
export function diplomacyCommand(player,args){
 if(!["diplomacy","civs","propose","accept","reject","relations","breaktreaty"].includes(args[1]))return false;
 const own=getSociety(player.id);
 if(!own){player.sendMessage("§eFound a civilization first");return true;}
 if(args[1]==="civs"){
  player.sendMessage(listSocieties().map(s=>s.name+(s.owner===player.id?" (you)":"")).join(" | ")||"No civilizations");
 }else if(args[1]==="diplomacy"){
  const d=diplomacyView(player.id);
  player.sendMessage("§6Incoming: "+(d.incoming.map(p=>"#"+p.id+" "+getSociety(p.from)?.name+" "+p.type).join(", ")||"none"));
  player.sendMessage("§6Outgoing: "+(d.outgoing.map(p=>"#"+p.id+" "+getSociety(p.to)?.name+" "+p.type).join(", ")||"none"));
  player.sendMessage("§6Treaties: "+(d.treaties.map(t=>(getSociety(t.a===player.id?t.b:t.a)?.name||"Unknown")+" "+t.type).join(", ")||"none"));
 }else if(args[1]==="accept"||args[1]==="reject"){
  const id=Number(args[2]);if(!Number.isInteger(id)||id<1)throw Error("Provide proposal ID");
  const p=respond(player.id,id,args[1]==="accept");
  player.sendMessage("§aProposal #"+p.id+" "+(args[1]==="accept"?"accepted":"rejected"));
 }else{
  const type=args[1]==="propose"||args[1]==="breaktreaty"?args[2]:null;
  if(type&&!TREATIES[type])throw Error("Treaties: "+Object.keys(TREATIES).join(", "));
  const name=args.slice(type?3:2).join(" ").trim();
  if(!name)throw Error("Specify civilization name");
  const target=findTarget(name,player.id);
  if(args[1]==="propose"){
   const p=propose(player.id,target.owner,type);player.sendMessage("§aProposal #"+p.id+" sent to "+target.name);
  }else if(args[1]==="breaktreaty"){
   breakTreaty(player.id,target.owner,type);player.sendMessage("§eTreaty ended");
  }else{
   const r=relationView(player.id,target.owner);
   player.sendMessage("§6"+target.name+" | Trust "+r.trust+" | Tension "+r.tension);
  }
 }
 return true;
}
