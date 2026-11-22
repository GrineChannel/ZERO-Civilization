import {politicalDay} from "../politics/engine.js";
import {advanceDay} from "./model.js";
import {listSocieties,saveSociety} from "./storage.js";
let cursor=0;
export function tickSocieties(){
 // Process one civilization per invocation to spread CPU cost across ticks.
 const societies=listSocieties();
 if(!societies.length)return;
 cursor%=societies.length;
 const s=societies[cursor++];
 try{advanceDay(s);politicalDay(s);saveSociety(s);}catch(e){console.warn("[ZERO Civ society] "+e);}
}
