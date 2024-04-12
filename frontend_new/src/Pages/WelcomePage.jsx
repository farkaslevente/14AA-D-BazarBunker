import React, { useEffect, useState } from 'react';
import './CSS/WelcomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const WelcomePage = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (userIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubscribe = async (e) => {
        try {
            const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        await axios.get(`${process.env.REACT_APP_LOCAL}/email/subscribe`, { headers });
        alert("Sikeresen feliratkozott hírlevelünkre!");
        } catch (error) {
            //console.error(error);
        }
    };

    return (
        <div className='welcomepage'>
            <div className="container">
                <h1 className='title'>Végeztél az iskolával? <br />- <br />Vagy éppen most kezded?</h1>
                <div className="description">
                    <p>A <b><i>BAZÁRBUNKER</i>&trade;</b> azért jött létre, hogy mindenki számára megkönnyítse és olcsóbbá tegye az iskolát.</p>
                    <p>Ha nem bánod az esetleges használt cuccokat, akkor <b>ITT</b> a helyed, nézz körül, és spórolj!</p>
                    <p>Legyen szó színes ceruza készletről, kötelező olvasmányokról, tankönyvekről, akár íróasztalról is, itt könnyedén megtalálhatod!</p>
                </div>
                {isloggedIn && <div className="support-link">
                    <div>
                        <p>Ide kattintva feliratkozhat hírlevelünkre:<Link onClick={handleSubscribe} style={{ fontStyle: 'italic' }}> <b>Feliratkozás</b></Link></p>
                    </div>
                    <p><strong>Problémába ütközött? <a href='/support'>Tudjon meg többet!</a></strong></p>
                </div>}
            </div>
        </div>
    );
};
