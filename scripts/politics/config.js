export const GOVERNMENTS=Object.freeze({
 monarchy:{label:"Monarchy",elections:false,term:0,centralization:85},
 republic:{label:"Republic",elections:true,term:12,centralization:55},
 democracy:{label:"Democracy",elections:true,term:8,centralization:35},
 empire:{label:"Empire",elections:false,term:0,centralization:95},
 council:{label:"Council",elections:true,term:10,centralization:25},
 tribal:{label:"Tribal Confederation",elections:false,term:0,centralization:20}
});
export const LAW_LIMITS=Object.freeze({tax:[0,40],freedom:[0,100],military:[0,100],welfare:[0,100]});
export function initialPolitics(owner){return {government:"monarchy",ruler:owner,termStarted:0,laws:{tax:10,freedom:60,military:30,welfare:30},stability:70,legitimacy:70,electionCount:0,history:[]};}
