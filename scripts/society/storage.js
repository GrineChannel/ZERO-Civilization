import {world} from "@minecraft/server";
import {createSociety,MAX_CIVILIZATIONS} from "./model.js";
const PREFIX="zero:civ:society:";
const INDEX="zero:civ:society:index";
function owners(){try{const a=JSON.parse(world.getDynamicProperty(INDEX)||"[]");return Array.isArray(a)?a:[];}catch{return [];}}
export function getSociety(owner){
 const raw=world.getDynamicProperty(PREFIX+owner);
 if(typeof raw!=="string")return null;
 try{return JSON.parse(raw);}catch{return null;}
}
export function foundSociety(player,name){
 if(getSociety(player.id))throw Error("You already founded a civilization");
 const ids=owners();if(ids.length>=MAX_CIVILIZATIONS)throw Error("Civilization limit reached");
 if(!name || name.length>32)throw Error("Name must be 1-32 characters");
 const society=createSociety(player.id,name);
 world.setDynamicProperty(PREFIX+player.id,JSON.stringify(society));
 ids.push(player.id);world.setDynamicProperty(INDEX,JSON.stringify(ids));
 return society;
}
export function saveSociety(s){world.setDynamicProperty(PREFIX+s.owner,JSON.stringify(s));}
export function listSocieties(){return owners().map(getSociety).filter(Boolean);}
