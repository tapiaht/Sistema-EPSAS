import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditCustomer = () => {
    const {id} = useParams()
    console.log(id)
    const [customer, setCustomer] = useState({
      nombres: '',
      apellidos: '',
      carnet: '',
      celular: '',
      direccion: ''
      });
      const navigate = useNavigate()

      useEffect(()=> {
        
        axios.get(`http://localhost:3000/auth/customer/${id}`)
        .then(result => {
          console.log(result.data.Result);  // Añade esta línea
          setCustomer(prevCustomer => ({
            ...prevCustomer,
                nombres: result.data.Result[0].nombres,
                apellidos: result.data.Result[0].apellidos,
                carnet: result.data.Result[0].carnet,
                celular: result.data.Result[0].celular,
                direccion: result.data.Result[0].direccion,
            }))
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_customer/'+id, customer)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/Customer')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Customer</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="nombres" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="nombres"
              placeholder="Escriba nombre(s)"
              value={customer.nombres}
              onChange={(e) =>
                setCustomer({ ...customer, nombres: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="apellidos"
              placeholder="Escriba apellido(s)"
              autoComplete="off"
              value={customer.apellidos}
              onChange={(e) =>
                setCustomer({ ...customer, apellidos: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="carnet" className="form-label">
              Carnet
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="carnet"
              placeholder="Digite el Carnet"
              autoComplete="off"
              value={customer.carnet}
              onChange={(e) =>
                setCustomer({ ...customer, carnet: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="celular" className="form-label">
              Celular
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="celular"
              placeholder="Nro de celular"
              autoComplete="off"
              value={customer.celular}
              onChange={(e) =>
                setCustomer({ ...customer, celular: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="direccion" className="form-label">
              Direccion
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="direccion"
              placeholder="Escriba la Dirección"
              autoComplete="off"
              value={customer.direccion}
              onChange={(e) =>
                setCustomer({ ...customer, direccion: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Clientes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCustomer