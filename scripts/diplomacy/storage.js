import {world} from "@minecraft/server";
const KEY="zero:civ:diplomacy:v1";
export function loadDiplomacy(){
 const raw=world.getDynamicProperty(KEY);
 if(typeof raw!=="string")return {nextId:1,relations:{},proposals:[],treaties:[]};
 try{
  const d=JSON.parse(raw);
  if(!d||typeof d!=="object"||!Array.isArray(d.proposals)||!Array.isArray(d.treaties))throw Error("Invalid diplomacy state");
  return d;
 }catch(e){throw Error("Diplomacy data unreadable: "+e);}
}
export function saveDiplomacy(data){
 const json=JSON.stringify(data);
 if(json.length>29000)throw Error("Diplomacy storage full");
 world.setDynamicProperty(KEY,json);
}
