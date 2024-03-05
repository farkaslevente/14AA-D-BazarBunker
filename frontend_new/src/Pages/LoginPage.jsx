import React, { useState } from 'react'
import './CSS/LoginPage.css'
import { FormInput } from '../Components/FormInput/FormInput'

export const LoginPage = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const inputs = [
        {
            id: 1,
            name:"email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "Hibás email cím vagy jelszó"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Jelszó",
            label: "Jelszó",
            errorMessage: "Hibás email cím vagy jelszó"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className="loginpage">
            <from onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button>Submit</button>
            </from>
        </div>

        // <div className='loginpage'>
        //     <div className="login-container">
        //         <h1>Bejelentkezés</h1>
        //         <div className="login-fields">
        //             <input type="email" placeholder='Az Ön email címe'/>
        //             <input type="password" placeholder='Jelszó'/>
        //         </div>
        //         <div>
        //             <button>Bejelentkezés</button>
        //             <p className="login-signup">Még nincs fiókja? <a style={{ textDecoration: 'none'}} href='/regisztracio'>Hozzon létre egyet!</a></p>
        //         </div>
        //     </div>
        // </div>
    )
}
