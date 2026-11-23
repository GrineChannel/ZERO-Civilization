import {getSociety,saveSociety} from "../society/storage.js";
import {PROFESSIONS} from "./catalog.js";
import {educationOf,enroll,assignMentor} from "./model.js";
export function educationCommand(player,args){
 if(!["education","specialists","train","mentor"].includes(args[1]))return false;
 const s=getSociety(player.id);
 if(!s){player.sendMessage("§eFound a civilization first");return true;}
 const ed=educationOf(s);
 if(args[1]==="train"){
  const p=enroll(s,args[2],args[3]);saveSociety(s);
  player.sendMessage("§aSpecialist #"+p.id+" "+p.name+" ("+p.profession+") enrolled");
 }else if(args[1]==="mentor"){
  const student=Number(args[2]),teacher=Number(args[3]);
  if(!Number.isInteger(student)||!Number.isInteger(teacher))throw Error("Usage: !civ mentor <studentId> <mentorId>");
  assignMentor(s,student,teacher);saveSociety(s);
  player.sendMessage("§aMentor assigned");
 }else if(args[1]==="specialists"){
  player.sendMessage(ed.people.length?ed.people.map(p=>"#"+p.id+" "+p.name+" "+p.profession+" skill "+p.skill+" mentor "+(p.mentor||"-")).join("\n"):"No specialists");
 }else{
  player.sendMessage("§6Education "+s.education+" | Knowledge legacy "+ed.legacy+" | Specialists "+ed.people.length);
  player.sendMessage("Professions: "+PROFESSIONS.join(", "));
 }
 return true;
}
