// Relative block coordinates. Anchor is the south-west floor corner.
export const BLUEPRINTS = Object.freeze({
  hut: {
    title: "Builder Hut", size: [5,4,5],
    costs: {wood: 36, stone: 8},
    blocks: makeHut()
  }
});
function makeHut() {
  const blocks=[];
  for(let x=0;x<5;x++) for(let z=0;z<5;z++) {
    blocks.push({x,y:0,z,type:"minecraft:oak_planks"});
    if(x===0||x===4||z===0||z===4) {
      if(!(x===2&&z===0)) for(let y=1;y<=3;y++) blocks.push({x,y,z,type:"minecraft:oak_planks"});
    }
    blocks.push({x,y:4,z,type:"minecraft:oak_planks"});
  }
  return blocks;
}
