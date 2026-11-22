import {world} from "@minecraft/server";
const KEY="zero:civ:territory:v1";
const MAX_CELLS=300;
export function loadTerritory(){
 try{const data=JSON.parse(world.getDynamicProperty(KEY)||"{}");return data&&typeof data==="object"&&!Array.isArray(data)?data:{};}catch{return {};}
}
export function saveTerritory(data){
 if(Object.keys(data).length>MAX_CELLS)throw Error("World territory limit: "+MAX_CELLS+" chunks");
 world.setDynamicProperty(KEY,JSON.stringify(data));
}
export function territoriesFor(owner){
 return Object.entries(loadTerritory()).filter(([,cell])=>cell.owner===owner);
}
