export const CHUNK_SIZE=16;
export function chunkAt(location){return {x:Math.floor(location.x/CHUNK_SIZE),z:Math.floor(location.z/CHUNK_SIZE)};}
export function cellKey(dimension,x,z){return dimension+"|"+x+"|"+z;}
export function neighbors(x,z){return [[x+1,z],[x-1,z],[x,z+1],[x,z-1]];}
