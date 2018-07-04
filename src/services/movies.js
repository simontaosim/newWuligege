import {db } from './initRemoteDb';
db.setMaxListeners(20); 
export async function getRemoteMoviesByTags(tags){
    console.log(tags);
    
    return await db.find({
            "selector": {
              "tags": {$all: tags}
            }
          });
}

export function getRemoteMovieById(id){
    return db.get(id);
}
