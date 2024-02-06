import React, { useCallback, useState } from 'react'
import imgLogin from '../assets/login.png'
import imgPeril from '../assets/perfil.jpg'
import appFirebase from '../firebaseconfig/credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(appFirebase)


const Login = () => {

    const [registrando, setRegistrando] = useState(false);

    const functAutenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("Verifique que la contraseña tenga más de 8 caracteres")
            }

        } else {
            try {
                await signInWithEmailAndPassword(auth, correo, contraseña)
            } catch (error) {
                alert("El correo o la contraseña son incorrectos")
            }


        }
    }
    return (
        <div>
            <div className="container">
                <div className="row">

                    <div className="col-md-4">
                        <div className="padre">
                            <div className="card card-body shadow-lg">
                                <img src={imgPeril} alt="" className='estilo-perfil' />
                                <form onSubmit={functAutenticacion}>
                                    <input type='text' placeholder='Correo' className='caja-texto' id='email' />
                                    <input type='password' placeholder='Contraseña' className='caja-texto' id='password' />
                                    <button className='btn-form'>{registrando ? "Registrate" : "Inicia Sesion"}</button>
                                </form>
                                <div className="bot-login">
                                <h4 className='texto'>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}</h4>
                                <button className='btnswitch' onClick={() => setRegistrando(!registrando)}>{registrando ? "Inicia Sesion" : "Registrate"}</button>
                                </div>
                                

                            </div>
                        </div>

                    </div>

                    <div className="col-md-8">
                        <img src={imgLogin} alt="" className='tamaño-imagen' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
