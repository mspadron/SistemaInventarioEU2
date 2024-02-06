import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseconfig/credenciales'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//IMPORTACIONES PARA FORMUALARIO POP UP
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MySwal = withReactContent(Swal)
import appFirebase from '../firebaseconfig/credenciales'
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);
const Show = () => {
  //Configuración de los hooks
  const [products, SetProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(0);

  //Referencia base de datos firestore

  const productsCollection = collection(db, "products")

  //Creación función para mostrar los docs

const getProducts = async () => {
  const data = await getDocs(productsCollection);
  SetProducts(
    data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      stockActual: parseInt(doc.data().stockActual)
    }))
  );
  console.log(products);
};

  //Creación función para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //Función para usar Sweet Alert

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Estas Seguro?",
      text: "No podras revertir el cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire({
          title: "Eliminado!",
          text: "Producto eliminado.",
          icon: "success"
        });
      }
    });
  }
  //Función para incrementar la cantidad de stockActual
  const incrementStock = async () => {
    if (quantity > 0 && selectedProduct) {
      const updatedStock = selectedProduct.stockActual + parseInt(quantity);
      const productDoc = doc(db, "products", selectedProduct.id);
      await updateDoc(productDoc, { stockActual: updatedStock });
      handleCloseModal();
      getProducts();
    }
  }
  

  //Función para decrementar la cantidad de stockActual
  const decrementStock = async () => {
    if (quantity > 0 && selectedProduct) {
      const updatedStock = selectedProduct.stockActual - parseInt(quantity);
      if (updatedStock >= 0) {
        const productDoc = doc(db, "products", selectedProduct.id);
        await updateDoc(productDoc, { stockActual: updatedStock });
        handleCloseModal();
        getProducts();
      } else {
        // Handle negative stock
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El stock no puede ser negativo',
        });
      }
    }
  }



  //Uso de useEffect
  useEffect(() => {
    getProducts();
  }, [])

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(0);
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  //Tabla mostrar docs y acciones



  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Sistema de Inventario</h1>
        <div className="row">
          <div className="col">
            <div className="d-grid gap-3">
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <div className="table-responsive">
              <table className='table table-dark table-hover'>
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Stock inicial</th>
                    <th>Stock actual</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>{product.stockActual}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-square-pen"></i></Link>
                        <button onClick={() => { confirmDelete(product.id) }} className='btn btn-danger' ><i className="fa-solid fa-trash"></i></button>
                        <button onClick={() => handleShowModal(product)} className='btn btn-success'><i className="fa-solid fa-cart-flatbed"></i></button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className='btn btn-primary' onClick={() => signOut(auth)}>Logout</button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Movimiento de inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="quantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" placeholder="Ingrese la cantidad" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={incrementStock} variant="success">Entrada</Button>
          <Button onClick={decrementStock} variant="danger">Salida</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Show
