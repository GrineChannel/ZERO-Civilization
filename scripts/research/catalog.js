export const INSTITUTIONS=Object.freeze({
 school:{cost:100,upkeep:4,staff:1,points:1,education:2},
 university:{cost:250,upkeep:10,staff:2,points:5,education:1},
 academy:{cost:300,upkeep:12,staff:2,points:6,education:1},
 institute:{cost:450,upkeep:18,staff:3,points:10,education:0}
});
export const TECHNOLOGIES=Object.freeze({
 agriculture:{cost:40,requires:[],field:"food"},
 engineering:{cost:75,requires:[],field:"industry"},
 metallurgy:{cost:110,requires:["engineering"],field:"industry"},
 tactics:{cost:100,requires:[],field:"military"},
 logistics:{cost:150,requires:["tactics"],field:"military"}
});
export const MAX_INSTITUTIONS=12;
