import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'
import sigmaLogo from '../imgs/sigma-logo.png'

export default function Header() {
    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <div className="imgContainer">
                    <img src={sigmaLogo} width="183"/>
                </div>
                <p className="headerTitle">Prueba de desarrollo Sigma</p>
                <p className="headerText">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
        </div>
    );
}