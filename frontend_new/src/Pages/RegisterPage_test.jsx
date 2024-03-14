import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import { useNavigate } from 'react-router-dom'
//import { FormInput } from '../Components/FormInput/FormInput'
import axios from 'axios';
//import userService from 'Services/userservice'

const instance = axios.create({
    baseURL: 'https://10.0.22.14:9000',
    headers:{
        'Content-Type' : 'application/json'
    }
});
axios.defaults.baseURL = 'http://10.0.22.14:9000';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        // confirm_password: '',
        // role: 0
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData);
            console.log('Response:', response); // Log the entire response object
            console.log('Response data:', response.data); // Log the data property of the response
            // Handle the response data as needed
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );


    // const navigate = useNavigate();

    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     confirm_password: '',
    //     role: ''
    // })

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('http://localhost:9000/register', values)
    //         .then(res => console.log(res))
    //         .then(err => console.log(err));
    // }

    // return (
    //     <div className="d-flex justify-content-center aolign-items-center bg-primary vh-100">
    //         <div className="bg-white p-3 rounded w-25">
    //             <h2>Regisztráció</h2>
    //             <form onSubmit={handleSubmit}>
    //                 <div className="mb-3">
    //                     <label htmlFor="name"><strong>Felhasználónév</strong></label>
    //                     <input type="text" placeholder='Felhasználónév' name='name' className='form-control rounded-0' />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="email"><strong>Email</strong></label>
    //                     <input type="email" placeholder='Email' name='email' className='form-control rounded-0' />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="password"><strong>Jelszó</strong></label>
    //                     <input type="password" placeholder='Jelszó' name='password' className='form-control rounded-0' />
    //                 </div>
    //                 <button type='submit' className='btn btn-success w-100 rounded-0'>Regisztráció</button>
    //             </form>
    //         </div>
    //     </div>

    //     const [values, setValues] = useState({
    //         username: "",
    //         email: "",
    //         password: "",
    //         passwordagain: ""
    //     });
    //     const navigate = useNavigate()

    //     const inputs = [
    //         {
    //             id: 1,
    //             name:"username",
    //             type: "text",
    //             placeholder: "Felhasználónév",
    //             errorMessage: "A felhasználónév 3-16 karakter hosszúnak kell lenni, és nem tartalmazhat speciális karaktereket!",
    //             label: "Felhasználónév",
    //             pattern: "^[A-Za-z0-9]{3,16}$",
    //             required: true,
    //         },
    //         {
    //             id: 2,
    //             name:"email",
    //             type: "email",
    //             placeholder: "Email",
    //             label: "Email",
    //             errorMessage: "Az email nem megfelelő formátumú!",
    //             required: true
    //         },
    //         {
    //             id: 3,
    //             name: "password",
    //             type: "password",
    //             placeholder: "Jelszó",
    //             label: "Jelszó",
    //             errorMessage: "A jelszónak 8-30 karakter hosszúnak kell lenni és tartalmaznia kell legalább egyet-egyet az alábbiak közül: Betű, Szám, Speciális karakter!",
    //             pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$`,
    //             required: true
    //         },
    //         {
    //             id: 4,
    //             name: "passwordagain",
    //             type: "password",
    //             placeholder: "Jelszó újra",
    //             label: "Jelszó újra",
    //             errorMessage: "A jelszó nem egyezik a másik jelszóval!",
    //             pattern: values.password,
    //             required: true
    //         }
    //     ];

    //     const handleSubmit = (e) => {
    //         e.preventDefault();
    //     };

    //     const onChange = (e) => {
    //         setValues({...values, [e.target.name]: e.target.value});
    //     }

    // <div className="registerpage">
    //     <div className="register-container">
    //         <from onSubmit={handleSubmit}>
    //             <h1>Regisztráció</h1>
    //             {inputs.map((input) => (
    //                 <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
    //             ))}
    //             <button onClick={() => navigate('/adatregisztracio')}>Tovább</button>
    //         </from>
    //     </div>
    // </div>


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

}
