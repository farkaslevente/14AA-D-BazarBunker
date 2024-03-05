import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '../Components/FormInput/FormInput';

export const RegisterPage = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordagain: ""
    });
    const navigate = useNavigate()

    const inputs = [
        {
            id: 1,
            name:"username",
            type: "text",
            placeholder: "Felhasználónév",
            errorMessage: "A felhasználónév 3-16 karakter hosszúnak kell lenni, és nem tartalmazhat speciális karaktereket!",
            label: "Felhasználónév",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name:"email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "Az email nem megfelelő formátumú!",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Jelszó",
            label: "Jelszó",
            errorMessage: "A jelszónak 8-30 karakter hosszúnak kell lenni és tartalmaznia kell legalább egyet-egyet az alábbiak közül: Betű, Szám, Speciális karakter!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$`,
            required: true
        },
        {
            id: 4,
            name: "passwordagain",
            type: "password",
            placeholder: "Jelszó újra",
            label: "Jelszó újra",
            errorMessage: "A jelszó nem egyezik a másik jelszóval!",
            pattern: values.password,
            required: true
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className="registerpage">
            <div className="register-container">
                <from onSubmit={handleSubmit}>
                    <h1>Regisztráció</h1>
                    {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                    ))}
                    <button onClick={() => navigate('/adatregisztracio')}>Tovább</button>
                </from>
            </div>
        </div>


    // <div className='registerpage'>
    //   <div className="register-container">
    //     <h1>Regisztráció</h1>
    //     <div className="register-fields">
    //       <input type="text" placeholder='Felhasználónév' />
    //       <input type="email" placeholder='Email' />
    //       <input type="password" placeholder='Jelszó' />
    //       <input type="password" placeholder='Jelszó újra' />
    //     </div>
    //     <div className="">
    //       <button onClick={() => navigate('/adatregisztracio')}>Tovább</button>
    //     </div>
    //   </div>
    // </div>
  )
}
