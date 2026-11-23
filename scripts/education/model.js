import {PROFESSIONS,MAX_PEOPLE,MAX_SKILL,clamp} from "./catalog.js";
import {researchOf} from "../research/model.js";
export function educationOf(s){
 if(!s.educationSystem)s.educationSystem={nextId:1,people:[],legacy:0,history:[]};
 return s.educationSystem;
}
export function enroll(s,name,profession){
 if(!PROFESSIONS.includes(profession))throw Error("Unknown profession");
 if(typeof name!=="string"||!/^[-\p{L}\p{N}_]{1,20}$/u.test(name))throw Error("Name: 1-20 letters/numbers");
 const ed=educationOf(s);
 if(ed.people.length>=MAX_PEOPLE)throw Error("Specialist limit reached");
 // Abstract specialists represent existing adults, not newly created citizens.
 if(ed.people.length>=s.population.adults)throw Error("Not enough adult residents");
 const person={id:ed.nextId++,name,profession,skill:clamp(Math.floor(s.education/5)+Math.floor(ed.legacy/20),1,40),xp:0,mentor:null};
 ed.people.push(person);return person;
}
export function assignMentor(s,studentId,mentorId){
 const people=educationOf(s).people;
 const student=people.find(p=>p.id===studentId),mentor=people.find(p=>p.id===mentorId);
 if(!student||!mentor||student.id===mentor.id)throw Error("Choose two distinct specialists");
 if(student.profession!==mentor.profession)throw Error("Mentor must share profession");
 if(mentor.skill<30||mentor.skill<=student.skill)throw Error("Mentor needs skill 30+ and higher than student");
 student.mentor=mentor.id;return student;
}
export function educationDay(s){
 const ed=educationOf(s),institutions=researchOf(s).institutions;
 const schools=institutions.filter(i=>i.active&&(i.type==="school"||i.type==="university")).length;
 const academy=institutions.some(i=>i.active&&i.type==="academy");
 const count=Math.min(ed.people.length,Math.max(0,s.population.adults));
 for(let i=0;i<count;i++){
  const p=ed.people[i],mentor=ed.people.find(x=>x.id===p.mentor&&x.profession===p.profession&&x.skill>p.skill);
  const bonus=mentor?2:0;
  const training=schools?1:0;
  const specialized=academy&&(p.profession==="soldier"||p.profession==="scholar")?1:0;
  p.xp+=1+bonus+training+specialized;
  while(p.xp>=10&&p.skill<MAX_SKILL){p.xp-=10;p.skill++;}
  if(p.skill>=MAX_SKILL)p.xp=0;
 }
 // Cultural knowledge slowly accumulates; bounded and inherited by future specialists.
 if(s.day%10===0&&count>0)ed.legacy=clamp(ed.legacy+Math.floor(ed.people.slice(0,count).reduce((a,p)=>a+p.skill,0)/count/20),0,100);
 if(ed.history.length>8)ed.history=ed.history.slice(-8);
}
