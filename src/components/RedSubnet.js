import React from 'react'
import Fila from './Fila'
import SubRed from './SubRed'
import { agregar0 } from './miLibreria/miLibreria'
import '../css/style.css'
import Table from 'react-bootstrap/Table';


const basesBin = [128,64,32,16,8,4,2,1]
let mascaraS = ''
let mascaraSbin = ''
let wildcard= ''
let wildcardBin =''
let numSubRedes=0
let numHost=0
let numOct=0
let salto=0
// 1: primerOcteto, 2: segundoOcteto, 3: tercerOcteto, 4:cuartoOcteto
let octetoMascaraPedida=0
const ceros="00000000"
const unos="11111111"



const RedSubnet = ({mascara,octe1,octe2,octe3,octe4})  => {
    

    numOct=0
    salto=0
    if(mascara<=8){
        for(let i=0; i<mascara; i++){
            numOct=numOct+basesBin[i]
        }
        mascaraS=numOct.toString()+".0.0.0"
        mascaraSbin=agregar0(numOct.toString(2))+"."+ceros+"."+ceros+"."+ceros
        let x=255-numOct
        wildcard=x.toString()+".255.255.255"
        wildcardBin=agregar0(x.toString(2))+"."+unos+"."+unos+"."+unos
        octetoMascaraPedida=1
    }else if(mascara>8 && mascara <=16){
        let j=mascara-8
        for(let i=0; i<j; i++){
            numOct=numOct+basesBin[i]
        }
        mascaraS="255."+numOct.toString()+".0.0"
        mascaraSbin=unos+"."+agregar0(numOct.toString(2))+"."+ceros+"."+ceros
        let x=255-numOct
        wildcard="0."+x.toString()+".255.255"
        wildcardBin=ceros+"."+agregar0(x.toString(2))+"."+unos+"."+unos
        octetoMascaraPedida=2
    }else if(mascara>16 && mascara <=24){
        let j=mascara-16
        for(let i=0; i<j; i++){
            numOct=numOct+basesBin[i]
        }
        mascaraS="255.255."+numOct.toString()+".0"
        mascaraSbin=unos+"."+unos+"."+agregar0(numOct.toString(2))+"."+ceros
        let x=255-numOct
        wildcard="0.0."+x.toString()+".255"
        wildcardBin=ceros+"."+ceros+"."+agregar0(x.toString(2))+"."+unos
        octetoMascaraPedida=3
    }else if(mascara>24){
        let j=mascara-24
        for(let i=0; i<j; i++){
            numOct=numOct+basesBin[i]
        }
        mascaraS="255.255.255."+numOct.toString()
        mascaraSbin=unos+"."+unos+"."+unos+"."+agregar0(numOct.toString(2))
        let x=255-numOct
        wildcard="0.0.0."+x.toString()
        wildcardBin=ceros+"."+ceros+"."+ceros+"."+agregar0(x.toString(2))
        octetoMascaraPedida=4
    }
    
    salto=256-numOct

    if(mascara !== "8" && mascara !== "16" && mascara !== "24"){
        let mascaraInt = parseInt(mascara)
        numHost = Math.pow(2,32-mascaraInt)-2
        if(mascaraInt<8){
            numSubRedes = Math.pow(2,mascaraInt) 
        }
        else if(mascaraInt>8 && mascaraInt <16){
            numSubRedes = Math.pow(2,mascaraInt-8)
        }
        else if(mascaraInt>16 && mascaraInt <24){
            numSubRedes = Math.pow(2,mascaraInt-16)
        }
        else if(mascaraInt>24){
            numSubRedes = Math.pow(2,mascaraInt-24)
        }


        let saltos=[0]
        let numSub=0
        for(let i=0; i<(numSubRedes-1); i++){
            numSub=numSub+salto
            saltos.push(numSub)
        }

        //console.log(saltos)
        return(
            <div>

            <Table responsive="md" striped>
              <tbody>
                <Fila titulo="Netmask: " direccion={mascaraS} dirBinario={mascaraSbin}/>
                <Fila titulo="Wildcard: " direccion={wildcard} dirBinario={wildcardBin}/>
                <tr>
                    <td className='fw-bold'>Número de subredes</td>
                    <td colSpan={2} className='azulito fw-bold'>{numSubRedes}</td>
                </tr>
                <tr>
                    <td className='fw-bold'>Número de hosts por subred:</td>
                    <td colSpan={2} className='azulito fw-bold'>{numHost.toLocaleString('en')}</td>
                </tr>
              </tbody>
            
            </Table>
            <br/>
            {saltos.map( (x,i) =>  
              <SubRed inicio={x} salto={salto} key={i} indice={i} octe1={octe1} octe2={octe2} 
              octe3={octe3} mask={mascara} octetoMascaraPedida={octetoMascaraPedida}/> )}
            
            
         
            </div>
        )
    }else{
        let nHost=0
        
        let mascaraI = parseInt(mascara)
        nHost = Math.pow(2,32-mascaraI)-2
        let cerosR="00000000"
        let dirRedR=""
        let dirRedBinR
        if( mascaraI === 8){
            dirRedR = octe1+".0.0.0"
            dirRedBinR = agregar0(parseInt(octe1).toString(2))+"."+cerosR+"."+cerosR+"."+cerosR
            
        }
        else if(mascaraI === 16){
            
            
            dirRedR = octe1+"."+octe2+".0.0"
            dirRedBinR = agregar0(parseInt(octe1).toString(2))+"."+agregar0(parseInt(octe2).toString(2))+"."+cerosR+"."+cerosR
            
        }
        else if(mascaraI === 24){
            
            dirRedR = octe1+"."+octe2+"."+octe3+".0"
            dirRedBinR = agregar0(parseInt(octe1).toString(2))+"."+agregar0(parseInt(octe2).toString(2))+"."+agregar0(parseInt(octe3).toString(2))+"."+cerosR
           
        }
        return(
            <div>
                <Table responsive="md" striped>
                  <tbody>
                    <Fila titulo="Dirección de red: " direccion={dirRedR} dirBinario={dirRedBinR}/>
                    <Fila titulo="Netmask: " direccion={mascaraS} dirBinario={mascaraSbin}/>
                    <Fila titulo="Wildcard: " direccion={wildcard} dirBinario={wildcardBin}/>
                    <tr>
                        <td className='fw-bold'>Número de hosts</td>
                        <td colSpan={2} className='azulito fw-bold'>{nHost.toLocaleString('en')}</td>
                    </tr>
                  </tbody>

                </Table>
            </div>
        )
    }
    
    
    
}

export default RedSubnet