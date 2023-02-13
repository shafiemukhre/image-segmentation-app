import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

//declare database
const db = new Dexie("SegmentAppDB");
//create the database store
db.version(1).stores({
    imageData: "id, photoFile"
});
db.open().catch(err => console.log(err.stack || err));

//add a photo
export function createPhoto(photoBlob){
    let post = {
        id: uuidv4(),
        photoFile: photoBlob, 
    }
    db.imageData.add(post)
};

//read all photos
export async function readAllPhotos(){
    const allPhotos = await db.imageData.toArray();
    return allPhotos;
};

//read a photo by its primary key "id"
export async function readPhoto(photoId){
    const selectedPhoto = await db.imageData.get(photoId);
    return selectedPhoto;
}

//delete a photo
export function deletePhoto(photoId){
    db.imageData.delete(photoId);
};