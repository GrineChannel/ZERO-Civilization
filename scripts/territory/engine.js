import {chunkAt,cellKey,neighbors} from "./grid.js";
import {loadTerritory,saveTerritory,territoriesFor} from "./storage.js";
import {getSociety} from "../society/storage.js";
export function claim(player){
 const society=getSociety(player.id);
 if(!society)throw Error("Found a civilization first");
 const pos=chunkAt(player.location),dimension=player.dimension.id;
 const key=cellKey(dimension,pos.x,pos.z),map=loadTerritory();
 if(map[key])throw Error("This chunk is already claimed");
 const own=territoriesFor(player.id);
 if(own.length>=64)throw Error("Civilization territory limit: 64 chunks");
 if(own.length){
   const connected=neighbors(pos.x,pos.z).some(([x,z])=>map[cellKey(dimension,x,z)]?.owner===player.id);
   if(!connected)throw Error("Claim must border your existing territory in this dimension");
 }
 const cell={owner:player.id,province:"capital",kind:own.length?"frontier":"capital",x:pos.x,z:pos.z,dimension};
 map[key]=cell;saveTerritory(map);return cell;
}
export function inspect(player){
 const p=chunkAt(player.location);const map=loadTerritory();
 return {x:p.x,z:p.z,cell:map[cellKey(player.dimension.id,p.x,p.z)]||null};
}
export function ownedCount(owner){return territoriesFor(owner).length;}
