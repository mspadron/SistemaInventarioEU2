import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseconfig/credenciales'

const Create = () => {
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [stockActual, setStockActual] = useState(0)

    const navigate = useNavigate()
    const productsCollection = collection(db, "products")
    useEffect(() => {
        setStockActual(stock);
    }, [stock]);

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, { description: description, stock: stock, stockActual: stockActual })
        navigate('/')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Crear Producto</h1>
                    <form onSubmit={store}>

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                type="number"
                                className='form-control'
                            />
                        </div>


                        <button type='submit' className="btn btn-primary">Almacenar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create
