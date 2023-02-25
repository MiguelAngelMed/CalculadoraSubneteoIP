const agregar0 = (octeto) =>{
    let newOcteto=octeto
    if(octeto.length !== 8){
        let k=8-octeto.length
        for(let i=0; i<k; i++){
            newOcteto = "0"+newOcteto
        }
    }

    return newOcteto
}

module.exports = {
    agregar0
}