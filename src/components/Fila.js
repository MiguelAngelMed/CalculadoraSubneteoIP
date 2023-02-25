import React from 'react'
import '../css/style.css'

const Fila = ({titulo,direccion, dirBinario})  => {
    return(
        <tr>
          <td className='fw-bold'>{titulo}</td>
          <td className='azulito fw-bold'> {direccion} </td>
          <td className='gris fw-bold'> {dirBinario}</td>
        </tr>
    )
}


export default Fila