function add(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}

// module.exports = "pratham"
// module.exports = add
// module.exports = sub // sub override add function

module.exports ={
    addFn : add,
    subFn : sub,
    "pt" : "pratham"
}

// exports.add = (a,b)=> a+b
// exports.sub= (a,b) => a-b