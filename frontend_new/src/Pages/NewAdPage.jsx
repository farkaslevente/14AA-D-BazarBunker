import React from 'react'
import './CSS/NewAdPage.css'
// import { useNavigate } from 'react-router-dom';

export const NewAdPage = () => {
    // const [values, setValues] = useState({
    //     title: "",
    //     email: "",
    //     password: "",
    //     passwordagain: ""
    // });
    // const navigate = useNavigate()

    // const inputs = [
    //     {
    //         id: 1,
    //         name:"username",
    //         type: "text",
    //         placeholder: "Felhasználónév",
    //         errorMessage: "A felhasználónév 3-16 karakter hosszúnak kell lenni, és nem tartalmazhat speciális karaktereket!",
    //         label: "Felhasználónév",
    //         pattern: "^[A-Za-z0-9]{3,16}$",
    //         required: true,
    //     },
    //     {
    //         id: 2,
    //         name:"email",
    //         type: "email",
    //         placeholder: "Email",
    //         label: "Email",
    //         errorMessage: "Az email nem megfelelő formátumú!",
    //         required: true
    //     },
    //     {
    //         id: 3,
    //         name: "password",
    //         type: "password",
    //         placeholder: "Jelszó",
    //         label: "Jelszó",
    //         errorMessage: "A jelszónak 8-30 karakter hosszúnak kell lenni és tartalmaznia kell legalább egyet-egyet az alábbiak közül: Betű, Szám, Speciális karakter!",
    //         pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$`,
    //         required: true
    //     },
    //     {
    //         id: 4,
    //         name: "passwordagain",
    //         type: "password",
    //         placeholder: "Jelszó újra",
    //         label: "Jelszó újra",
    //         errorMessage: "A jelszó nem egyezik a másik jelszóval!",
    //         pattern: values.password,
    //         required: true
    //     }
    // ];

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // };

    // const onChange = (e) => {
    //     setValues({...values, [e.target.name]: e.target.value});
    // }

    return (
        <div className='newadpage'>
            <div className="newadpage-title">
                <h1>Új hirdetés</h1>
            </div>
            <div className="newadpage-content">
                <div className="data1">
                    <label htmlFor="title">Hirdetés megnevezése:</label>
                    <input type="text" name='title' placeholder='pl: Asztal' />

                    <label htmlFor="county">Hirdetés megye:</label>
                    <input type="text" name='county' placeholder='pl: Győr-Moson-Sopron' />

                    <label htmlFor="settlement">Hirdetés pontos helye:</label>
                    <input type="text" name='settlement' placeholder='pl: Győr' />

                    <label htmlFor="category">Kategória:</label>
                    <select name="category" id="category">
                        <option value="default">...</option>
                        <option value="uni">Egyetem</option>
                        <option value="mid">Középiskola</option>
                        <option value="pri">Aáltalános iskola</option>
                        <option value="book">Könyv</option>
                        <option value="wri">Írószer</option>
                        <option value="furn">Bútor</option>
                    </select>

                    <label htmlFor="price">{'Ár (Ft):'}</label>
                    <input type="text" name='price' placeholder='pl: 2000' />

                    <label htmlFor="image">{'Töltsön fel képeket! (legalább 1)'}</label>
                    <input type="file" />
                </div>
                <div className="data2">
                </div>
            </div>
        </div>
    )
}
