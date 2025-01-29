const sessionIdToUseMap = new Map();

async function setUser(id,user){
    sessionIdToUseMap.set(id,user);
}

async function getUser(id){
    return sessionIdToUseMap.get(id);
}

module.exports = {
    setUser,
    getUser
}