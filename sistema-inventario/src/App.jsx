import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import appFirebase from './firebaseconfig/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
//Importar componentes
import Show from './components/Show'
import Edit from './components/Edit'
import Create from './components/Create'
import Login from './components/Login'
//Importacion del enrutador
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const [usuario, setUsuario] = useState(null);
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    // Limpiar el efecto al desmontar el componente
    return () => unsubscribe();
  }, [auth]);
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={usuario ? <Show correoUsuario={usuario.email} /> : <Login />}
          ></Route>
          
          <Route path='/create' element={<Create />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
