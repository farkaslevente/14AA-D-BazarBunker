import React, { useState } from 'react'
import './CSS/DataRegisterPage.css'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '../Components/FormInput/FormInput';

export const DataRegisterPage = () => {
    const [values, setValues] = useState({
        phonenumber: "",
        county: "",
        settlement: ""
    });
    
    const navigate = useNavigate()

    const inputs = [
        {
            id: 1,
            name:"phonenumber",
            type: "text",
            placeholder: "Telefonszám - pl: +36703411003",
            errorMessage: "Nem megfelelő a formátum",
            label: "Telefonszám",
            pattern: '/^\+?[0-9]{6,14}$/',
            required: true,
        },
        {
            // TODO: dropdown list megcsinál és feltölt get-tel
            id: 2,
            name:"county",
            type: "list",
            placeholder: "Vármegye -> dropdown list ",
            label: "Vármegye",
            errorMessage: "Válasszon egy vármegyét",
            pattern: "",
            required: true
        },
        {
            id: 3,
            name: "settlement",
            type: "text",
            placeholder: "Település",
            label: "Település",
            errorMessage: "Meg kell adnia a települést",
            pattern: "",
            required: true
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };
    

    return (
        <div className="dataregisterpage">
            <div className="dataregister-container">
                <from onSubmit={handleSubmit}>
                    <h1>Adat rögzítés</h1>
                    {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                    ))}
                    <button onClick={() => navigate('/bejelentkezes')}>Regisztráció</button>
                </from>
            </div>
        </div>

        // <div className='dataregisterpage'>
        //     <div className="dataregister-container">
        //         <h1>Adat rögzítés</h1>
        //         <div className="dataregister-fields">
        //             <input type="tel" placeholder='Telefonszám - (pl: 06309876543)'/>
        //             <input type="text" placeholder='Tartózkodási hely'/>
        //             <input type="text" placeholder='Vármegye'/>
        //         </div>
        //         <div className="">
        //             <button onClick={() => navigate('/bejelentkezes')}>Regisztráció</button>
        //         </div>
        //     </div>
        // </div>
    )
}
