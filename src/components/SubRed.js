import React from 'react'
import Fila from './Fila'
import { agregar0 } from './miLibreria/miLibreria'
import '../css/style.css'
import { Table } from 'react-bootstrap'


const SubRed = ({inicio,salto,indice,octe1,octe2,octe3,mask,octetoMascaraPedida}) =>{
    const ceros="00000000"
    const unos="11111111"
    
    let dirRed=''
    let dirRedB=''

    let HostMin=''
    let HostMinB=''

    let HostMax=''
    let HostMaxB=''

    let broadcast=''
    let broadcastB=''
    
    if(octetoMascaraPedida === 1){
        dirRed=inicio+".0.0.0"
        dirRedB= agregar0(inicio.toString(2))+"."+ceros+"."+ceros+"."+ceros
        HostMin=inicio+".0.0.1"
        HostMinB= agregar0(inicio.toString(2))+"."+ceros+"."+ceros+"."+"00000001"
        HostMax=(inicio+salto-1)+".255.255.254"
        HostMaxB=agregar0((inicio+salto-1).toString(2))+"."+unos+"."+unos+"."+(254).toString(2)
        broadcast=(inicio+salto-1)+".255.255.255"
        broadcastB=agregar0((inicio+salto-1).toString(2))+"."+unos+"."+unos+"."+unos
    }else if(octetoMascaraPedida === 2){
        let octe1String = agregar0(parseInt(octe1).toString(2))
      
        dirRed=octe1+"."+inicio+".0.0"
        dirRedB= octe1String+"."+agregar0(inicio.toString(2))+"."+ceros+"."+ceros
        HostMin=octe1+"."+inicio+".0.1"
        HostMinB= octe1String+"."+agregar0(inicio.toString(2))+"."+ceros+"."+"00000001"
        HostMax=octe1+"."+(inicio+salto-1)+".255.254"
        HostMaxB=octe1String+"."+ agregar0((inicio+salto-1).toString(2))+"."+unos+"."+(254).toString(2)
        broadcast=octe1+"."+(inicio+salto-1)+".255.255"
        broadcastB=octe1String+"."+ agregar0((inicio+salto-1).toString(2))+"."+unos+"."+unos
    }else if(octetoMascaraPedida === 3){
        let octe1String = agregar0(parseInt(octe1).toString(2))
        let octe2B = agregar0(parseInt(octe2).toString(2))
        dirRed=octe1+"."+octe2+"."+inicio+".0"
        dirRedB= octe1String+"."+octe2B+"."+agregar0(inicio.toString(2))+"."+ceros
        HostMin=octe1+"."+octe2+"."+inicio+".1"
        HostMinB= octe1String+"."+octe2B+"."+agregar0(inicio.toString(2))+"."+"00000001"
        HostMax=octe1+"."+octe2+"."+(inicio+salto-1)+".254"
        HostMaxB=octe1String+"."+octe2B+"."+ agregar0((inicio+salto-1).toString(2))+"."+(254).toString(2)
        broadcast=octe1+"."+octe2+"."+(inicio+salto-1)+".255"
        broadcastB=octe1String+"."+octe2B+"."+ agregar0((inicio+salto-1).toString(2))+"."+unos
    }else if(octetoMascaraPedida === 4){
        let octe1String = agregar0(parseInt(octe1).toString(2))
        let octe2B = agregar0(parseInt(octe2).toString(2))
        let octe3B = agregar0(parseInt(octe3).toString(2))
        dirRed=octe1+"."+octe2+"."+octe3+"."+inicio
        dirRedB= octe1String+"."+octe2B+"."+octe3B+"."+ agregar0(inicio.toString(2))
        HostMin=octe1+"."+octe2+"."+octe3+"."+(inicio+1)
        HostMinB= octe1String+"."+octe2B+"."+octe3B+"."+agregar0((inicio+1).toString(2))
        HostMax=octe1+"."+octe2+"."+octe3+"."+(inicio+salto-2)
        HostMaxB=octe1String+"."+octe2B+"."+octe3B+"." +agregar0((inicio+salto-2).toString(2))
        broadcast=octe1+"."+octe2+"."+octe3+"."+(inicio+salto-1)
        broadcastB=octe1String+"."+octe2B+"."+octe3B+"."+agregar0((inicio+salto-1).toString(2))
    }
    
   // console.log(typeof(mask))
    if(mask !== "31"){
        return(
            <Table responsive="md" striped>
                <tbody>
                    <tr><td colSpan={3} className='fw-bold rosa h5'>{indice+1} </td></tr>
                    <Fila titulo="Dirección de red: " direccion={dirRed} dirBinario={dirRedB}/>
                    <Fila titulo="HostMin: " direccion={HostMin} dirBinario={HostMinB}/>
                    <Fila titulo="HostMax: " direccion={HostMax} dirBinario={HostMaxB}/>
                    <Fila titulo="Broadcast: " direccion={broadcast} dirBinario={broadcastB}/>
                </tbody>
            </Table>
        )
    }
    else if(mask === "31"){
        return(
            <Table responsive="md" striped>
                <tbody>
                    <tr><td colSpan={3} className='fw-bold rosa h5'>{indice+1}  </td></tr>
                    <Fila titulo="Dirección de red: " direccion={dirRed} dirBinario={dirRedB}/>
                    <Fila titulo="Broadcast: " direccion={broadcast} dirBinario={broadcastB}/>
                </tbody>
            </Table>
        )
    }

    
}

export default SubRed