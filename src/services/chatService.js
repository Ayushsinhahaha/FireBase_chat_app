import { getFirestore } from "@react-native-firebase/firestore";

const db=getFirestore();

//generate a chat id between two users
export const getChatId=(uid1,uid2)=>{
    return [uid1,uid2].sort().join('_');
};
