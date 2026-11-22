import {GOODS,INDUSTRIES,MAX_ENTERPRISES,clamp} from "./catalog.js";
export function economyOf(s){
 if(!s.economy)s.economy={treasury:1000,currency:"CIV",prices:{food:5,wood:8,stone:10,ore:14,tools:25},stock:{food:100,wood:40,stone:30,ore:10,tools:5},enterprises:[],bank:{deposits:0,loans:0},inflation:0,history:[]};
 return s.economy;
}
export function createEnterprise(s,type){
 const e=economyOf(s);const spec=INDUSTRIES[type];
 if(!spec)throw Error("Unknown industry");
 if(e.enterprises.length>=MAX_ENTERPRISES)throw Error("Enterprise limit reached");
 const cost=100;if(e.treasury<cost)throw Error("Treasury needs 100");
 e.treasury-=cost;
 const id=e.enterprises.reduce((m,x)=>Math.max(m,x.id),0)+1;
 const entry={id,type,level:1,enabled:true,owner:"state"};
 e.enterprises.push(entry);return entry;
}
export function trade(s,good,amount,action){
 const e=economyOf(s);if(!GOODS.includes(good))throw Error("Unknown good");
 if(!Number.isInteger(amount)||amount<1||amount>1000)throw Error("Amount must be 1-1000");
 const value=e.prices[good]*amount;
 if(action==="buy"){
   if(e.treasury<value)throw Error("Not enough treasury");
   e.treasury-=value;e.stock[good]+=amount;
 }else if(action==="sell"){
   if(e.stock[good]<amount)throw Error("Not enough stock");
   e.stock[good]-=amount;e.treasury+=value;
 }else throw Error("Use buy or sell");
 return value;
}
export function economyDay(s){
 const e=economyOf(s);const adults=s.population.adults;
 let workers=adults;
 for(const business of e.enterprises){
  const spec=INDUSTRIES[business.type];
  if(!spec||!business.enabled||workers<spec.workers)continue;
  if(Object.entries(spec.input).some(([good,n])=>e.stock[good]<n))continue;
  workers-=spec.workers;
  for(const [good,n] of Object.entries(spec.input))e.stock[good]-=n;
  for(const [good,n] of Object.entries(spec.output))e.stock[good]=clamp(e.stock[good]+n,0,100000);
 }
 // State tax revenue comes from employed adults; avoids duplicating society wealth accounting.
 const tax=s.politics?.laws?.tax??s.policy.tax;
 e.treasury=clamp(e.treasury+Math.floor((adults-workers)*tax/10),0,100000000);
 // Simple price response to scarcity; bounded to avoid runaway values.
 for(const good of GOODS){
  const target=good==="food"?Math.max(20,adults*5):30;
  e.prices[good]=clamp(e.prices[good]+(e.stock[good]<target?1:e.stock[good]>target*3?-1:0),1,10000);
 }
 e.inflation=clamp(Math.round((Object.values(e.prices).reduce((a,b)=>a+b,0)-62)/62*100),-90,10000);
 if(e.stock.food<adults)e.history.push({day:s.day,text:"Food shortage"});
 if(e.history.length>10)e.history.shift();
}
