import React from 'react'
import RedSubnet from './RedSubnet'
import Fila from './Fila'
import { agregar0 } from './miLibreria/miLibreria'
import '../css/style.css'
import Table from 'react-bootstrap/Table';

let dirIPbin=''
let dirRed=''
let dirRedBin=''
let hostMin=''
let hostMinBin=''
let hostMax=''
let hostMaxBin=''
let broadcast=''
let broadcastBin=''
let hosts=0
let mascara=''
let mascaraBin=''
let wildcard=''
let wildcardBin=''

const RedNormal = ({valor,entrada})  => {
    const octetos = entrada.ip.split('.')
    let primerOcteto = parseInt(octetos[0])
    let segundoOcteto = parseInt(octetos[1])
    let tercerOcteto = parseInt(octetos[2])
    let cuartoOcteto = parseInt(octetos[3])

    let primOctBin = agregar0( primerOcteto.toString(2) )
    let segOctBin = agregar0(  segundoOcteto.toString(2) )
    let terOctBin = agregar0(  tercerOcteto.toString(2) )
    let cuarOctBin = agregar0( cuartoOcteto.toString(2) )

        //console.log(primOctBin)
    
    
    dirIPbin = primOctBin+"."+segOctBin+"."+terOctBin+"."+cuarOctBin
    
    let ceros="00000000"
    let unos="11111111"
   
    if( primerOcteto >= 0 && primerOcteto <= 127){
        
        
        dirRed = primerOcteto+".0.0.0"
        dirRedBin = primOctBin+"."+ceros+"."+ceros+"."+ceros
        mascara="255.0.0.0/8"
        mascaraBin=unos+"."+ceros+"."+ceros+"."+ceros
        hostMin=primerOcteto+"."+"0.0.1"
        hostMinBin=primOctBin+"."+ceros+"."+ceros+".00000001"
        wildcard="0.0.0.255"
        wildcardBin=ceros+"."+unos+"."+unos+"."+unos
        hostMax=primerOcteto+".255.255.254"
        hostMaxBin=primOctBin+"."+unos+"."+unos+"."+"11111110"
        broadcast=primerOcteto+".255.255.255"
        broadcastBin=primOctBin+"."+unos+"."+unos+"."+unos
        hosts= Math.pow(2,24)-2
    }
    else if(primerOcteto >= 128 && primerOcteto <= 191){
        
        
        dirRed = primerOcteto+"."+segundoOcteto+".0.0"
        dirRedBin = primOctBin+"."+segOctBin+"."+ceros+"."+ceros
        mascara="255.255.0.0/16"
        mascaraBin=unos+"."+unos+"."+ceros+"."+ceros
        hostMin=primerOcteto+"."+segundoOcteto+".0.1"
        hostMinBin=primOctBin+"."+segOctBin+"."+ceros+".00000001"
        wildcard="0.0.255.255"
        wildcardBin=ceros+"."+ceros+"."+unos+"."+unos
        hostMax=primerOcteto+"."+segundoOcteto+".255.254"
        hostMaxBin=primOctBin+"."+segOctBin+"."+unos+"."+"11111110"
        broadcast=primerOcteto+"."+segundoOcteto+".255.255"
        broadcastBin=primOctBin+"."+segOctBin+"."+unos+"."+unos
        hosts= Math.pow(2,16)-2
    }
    else if(primerOcteto >= 192 && primerOcteto <= 223){
       
        
        dirRed = primerOcteto+"."+segundoOcteto+"."+tercerOcteto+".0"
        dirRedBin = primOctBin+"."+segOctBin+"."+terOctBin+"."+ceros
        mascara="255.255.255.0/24"
        mascaraBin=unos+"."+unos+"."+unos+"."+ceros
        hostMin=primerOcteto+"."+segundoOcteto+"."+tercerOcteto+".1"
        hostMinBin=primOctBin+"."+segOctBin+"."+terOctBin+".00000001"
        wildcard="0.0.0.255"
        wildcardBin=ceros+"."+ceros+"."+ceros+"."+unos
        hostMax=primerOcteto+"."+segundoOcteto+"."+tercerOcteto+".254"
        hostMaxBin=primOctBin+"."+segOctBin+"."+terOctBin+"."+"11111110"
        broadcast=primerOcteto+"."+segundoOcteto+"."+tercerOcteto+".255"
        broadcastBin=primOctBin+"."+segOctBin+"."+terOctBin+"."+unos
        hosts= Math.pow(2,8)-2
    }

    //console.log("clase: "+clase)

    if(valor === 2){
      return(
        <div className='container-fluid border border-3 caja rounded-3 mt-5 shadow'>
            <Table responsive="md" striped>
              <tbody>
                  <Fila titulo="Dirección IP dada: " direccion={entrada.ip} dirBinario={dirIPbin}/>
                  <Fila titulo="Netmask " direccion={mascara} dirBinario={mascaraBin}/>
                  <Fila titulo="Wilcard: " direccion={wildcard} dirBinario={wildcardBin}/>
              </tbody>
            </Table>     

            <br/>

            <Table responsive="md" striped>
              <tbody>
                  <Fila titulo="Dirección de red: " direccion={dirRed} dirBinario={dirRedBin}/>
                  <Fila titulo="HostMin: " direccion={hostMin} dirBinario={hostMinBin}/>
                  <Fila titulo="HostMax: " direccion={hostMax} dirBinario={hostMaxBin}/>
                  <Fila titulo="Broadcast: " direccion={broadcast} dirBinario={broadcastBin}/>
                  <tr>
                    <td className='fw-bold'>Hosts:</td>
                    <td colSpan={2} className='azulito fw-bold'>{hosts.toLocaleString('en')}</td>
                  </tr>
              </tbody>
            </Table>        
           
            <br/>
            <p className='fw-bold verdea h4'>
                Subredes con mascara de /{entrada.mascara}
            </p>
            <div>
                <RedSubnet mascara={entrada.mascara} octe1={primerOcteto} octe2={segundoOcteto} octe3={tercerOcteto} octe4={cuartoOcteto} />
            </div>
        </div>
        
      )
    }
    else if(valor === 1){
      return(<p></p>)
    }
  }

export default RedNormal