import './css/style.css'
import { useState } from 'react'
import { Formik} from 'formik'
import RedNormal from './components/RedNormal'




function App() {
  const [mostrar, setMostrar] = useState(1)
  const [entrada, setEntrada] = useState({
    ip: '',
    mascara: ''
  })

  


  return (
    <div className="container-fluid">
      <h1 className='mt-3 titulo'>Calculadora IP</h1>
      
      <div className='w-50 border border-3 caja rounded-3 mt-5 shadow'>
        <p className='fw-bold'>Hola :), con esta calculadora podras obtener las subredes de un Subneto IP. </p>

        <h5 className='rosa fw-bold '>Subneto IP</h5>
        <p>
          La función del Subneteo o Subnetting es dividir una red IP en subredes lógicas (redes más
          pequeñas) para que cada una de estas trabaje a nivel envío y recepción de paquetes como una red
          individual, aunque todas pertenezcan a la misma red física y al mismo dominio.
          <br/>
          El Subneteo permite una mejor administración, control del tráfico y seguridad al segmentar la red por función. 
          También, mejora la performance de la red al reducir el tráfico de broadcast de nuestra red. Como desventaja, su 
          implementación desperdicia muchas direcciones.
        </p>
        <h5 className='rosa fw-bold '>Instrucciones</h5>
        <ol>
          <li>Introduce la dirección de Red o Host para subnetear.</li>
          <li>Introduce la mascara con la que se hara el suneteo.</li>
          <li>Da click en el boton calcular.</li>
          <li>Observarás la información de la IP dada y 
          recibiras cada una de las subredes obtenidas.</li>
          <li>Puedes probar con otras direcciones y mascaras 
          volviendo a introducir la información.</li>
        </ol>
       
      </div>
      <div className="w-50 border border-3 caja rounded-3 mt-5 shadow">
      <Formik
        initialValues={{
          ip: '',
          mascara: ''
        }}
        validate={
          //Validaciones
          (valores) => {
            let errores = {}
            
            //ip
            if(!valores.ip){
              errores.ip = 'Por favor ingresa una dirección IP'
            }
            else if(!/^(([0-9])|([1-9][0-9])|(1[0-9][0-9])|(2[0-1][0-9])|(22[0-3]))[.](([0-9])|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))[.](([0-9])|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))[.](([0-9])|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))$/.test(valores.ip)){
              errores.ip = 'Ingrese una dirección ip valida'

            }

            //mascara
            if(!valores.mascara){
              errores.mascara = 'Por favor ingresa la mascara para subnetear'
            }
            else if(!/^(([1-9])|([1-2][0-9])|(3[0-1]))$/.test(valores.mascara)){
              errores.mascara = 'Ingrese una mascara valida'

            }

            return errores
          }
        }
        onSubmit={(valores)=>{
          console.log(valores)
          setMostrar(2)
          const newEntrada = {
            ip: valores.ip,
            mascara: valores.mascara
          }
          setEntrada(newEntrada)
        }}
        onReset={(values) =>{
          setMostrar(1)
          const newEntrada = {
            ip:'',
            mascara: ''
          }
          setEntrada(newEntrada)
         }
        }
      >
        {
          ({values,errors,touched,handleSubmit, handleChange,handleBlur,handleReset}) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-group mb-2">
              <label htmlFor="ip" className="form-label fw-bold">IP Address (Host/Red):</label>
              <input 
                type="text" 
                name="ip" 
                id="ip"
                placeholder="Ej: 128.0.0.0" 
                className="form-control" 
                value={values.ip}
                onChange={handleChange}
                onBlur={handleBlur}
              />            
              {
                touched.ip && errors.ip && <div className='error'>{errors.ip}</div>
              }
            </div>
            <div className="form-group mb-2">
              <label htmlFor="mascara" className="form-label fw-bold">Máscara para subneteo:</label>
              <input 
                type="text" 
                name="mascara"
                id="mascara"
                placeholder="Ej: 25" 
                className="form-control" 
                value={values.mascara}
                onChange={handleChange}  
                onBlur={handleBlur}
              />            
              {
                touched.mascara && errors.mascara && <div className='error'>{errors.mascara}</div>
              }
            </div> 
            <div className="container-fluid">
              <div className='row'>
                <div className='col'>
                  <input
                    className="w-100 btn btn-azul fw-bold" 
                    type="submit"
                    value="Calcular" />
                </div>
                <div className='col'>
                  <input
                    className="w-100 btn btn-rojo fw-bold" 
                    type='reset'
                    value="Limpiar"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
        
        </Formik>  
      </div>
      <div className='mt-5'>
        <RedNormal valor={mostrar} entrada={entrada}/>
      </div>

      <footer className="text-center text-white mt-4 rounded-3">
  
        <div className="text-center p-3 fw-bold">
          2023, Made by Miguel Angel Medina De Jesus
        </div>
  
      </footer>
    </div>
  );
}

export default App;
