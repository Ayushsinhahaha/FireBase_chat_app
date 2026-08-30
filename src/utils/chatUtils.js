export const getChatId=(userId1,userId2)=>{
    return [userId1,userId2].sort().join('_');
}