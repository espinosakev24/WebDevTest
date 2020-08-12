import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'
import sigmaImg from '../imgs/sigma-image.png'
import Dropdown from './Dropdown';
import axios from 'axios';

const COL_PLACES_URL = 'http://localhost:4000/colombia/departments';
const nameMaxAllowedStringLength = 50;
const emailMaxAllowedStringLength = 30;
export default function Body() {
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [departmentsReady, setDepartmentsReady] = useState(false);
    const [citiesReady, setCitiesReady] = useState(true);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        state: '',
        city: '',
    });
    const [errors, setErrors] = useState({
        type: false,
        typeMessage: 'Dirección email invalida',
        nameLen: false,
        nameEmpty: false,
        nameMessage: 'Debes escribir tu numbre!',
        emailLen: false,
        emailEmpty: false,
        emailEmptyMessage: 'Ops!... Parece que olvidaste poner tu correo',
        lenMessage: 'Ops!... superaste la cantidad de caracteres permitida',
        stateEmpty: 'Debes selecionar un departamento',
        isState: false,
        cityEmpty: 'Debes selecionar una ciudad',
        isCity: false

    })

    // const showPlaceState = () => {
    //     console.log(currPlace);
    // }

    useEffect(() => {
        axios.get(COL_PLACES_URL).then(response => {
            setDepartments(response.data);
            setDepartmentsReady(true);
        })
    });

    const setCityStateReady = (bool) => {
        setCitiesReady(bool);
    }

    const handleInputChange = (event) => {
        const input = event.target.value;
        const name = event.target.name;

        // On real time validations...
        if (name === "name") {
            console.log("here")
            input.length > nameMaxAllowedStringLength ? 
                setErrors({
                    ...errors,
                    'nameLen': true
                }) :
                setErrors({
                    ...errors,
                    'nameLen': false,
                    'nameEmpty': false
                })
        }
        if (name === "email") {
            const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            input.length > emailMaxAllowedStringLength ? 
            setErrors({
                ...errors,
                'emailLen': true
            }) :
            setErrors({
                ...errors,
                'emailLen': false,
                'emailEmpty': false
            })

             if (emailValidation.test(input) || !input) {
                setErrors({
                    ...errors,
                    'type': false
                })
             } else {
                setErrors({
                    ...errors,
                    'type': true
                })
             }
        }

        setUserInfo({
            ...userInfo,
            [event.target.name]: input
        })
    }
    const setDepartmentName = (state) => {
        setUserInfo({
            ...userInfo,
            'state': state
        })
        setErrors({
            ...errors,
            'isState': false
        })
    }
    const setCityName = (city) => {
        setUserInfo({
            ...userInfo,
            'city': city
        })
        setErrors({
            ...errors,
            'isCity': false
        })
    }

    const submitForm = (event) => {
        event.preventDefault();

        const userData = {
            name: userInfo.name,
            email: userInfo.email,
            state: userInfo.state,
            city: userInfo.city
        }
        let validations = {
            nameError: false,
            emailError: false,
            stateError: false,
            cityError: false
        }
        // More validations!!
        if (!userData.name) {
            validations.nameError = true
        }
        if (!userData.email) {
            validations.emailError = true
        }
        if (!userData.state) {
            validations.stateError = true
        }
        if (!userData.city) {
            validations.cityError = true
        }


        setErrors({
            ...errors,
            'nameEmpty' : validations.nameError,
            'emailEmpty': validations.emailError,
            'isState': validations.stateError,
            'isCity': validations.cityError
        })

    }

    return (
        <div>
            <div className="row justify-content-around align-items-center">
                {/* <div className="col-md-6 col-sm-12"> */}
                    <img  className="col-md-6 col-sm-12" src={sigmaImg} />
                {/* </div> */}

                <div className="col-md-6 col-sm-12">
                    <form >
                        <div className="form">


                            <p className="formText">Departamento*</p>
                            <Dropdown options={ departments }
                                    onChange={ value => setCities(value) } 
                                    placeholder={'Departamento'}
                                    url={COL_PLACES_URL}
                                    doRequest={true}
                                    setCitiesReady={setCityStateReady}
                                    setDepartmentName={setDepartmentName}
                                />
                                {!departmentsReady ? <small>Cargando departamentos...</small> : ''}
                                {errors.isState ? <small className="errors"> {errors.stateEmpty} </small>: ''}
                            <div className="formFieldLineHeight"></div>


                            <p className="formText">Ciudad*</p>
                            <Dropdown options={ cities }
                                    onChange={ value => setCity(value) }
                                    placeholder={'Ciudad'}
                                    setCitiesReady={setCityStateReady}
                                    setCityName={setCityName}
                                />
                            {citiesReady ? '' : <small>Cargando ciudades...</small>}
                            {errors.isCity ? <small className="errors"> {errors.cityEmpty} </small>: ''}
                            <div className="formFieldLineHeight"></div>


                            <p className="formText">Nombre*</p>
                            <input className="formField form-control"
                                    placeholder="Enter name"
                                    name="name"
                                    onChange={handleInputChange}
                                />
                                {errors.nameLen ? <small className="errors">{errors.lenMessage}</small> : ''}
                                {errors.nameEmpty ? <small className="errors">{errors.nameMessage}</small> : ''}
                            <div className="formFieldLineHeight"></div>


                            <p className="formText">Correo* </p>
                            <input className="formField form-control"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={handleInputChange}
                                />
                                {errors.emailEmpty ? <small className="errors">{errors.emailEmptyMessage}</small> : ''}
                                {errors.emailLen ? <small className="errors">{errors.lenMessage}</small> : ''}
                                {errors.type ? <small className="errors">{errors.typeMessage}</small> : ''}
                                <br/>
                            {/* <span className="formFieldLineHeight">&nbsp;</span> */}


                            <div className="d-flex justify-content-center w-100">
                                <button type="submit"
                                        className="sendButton d-flex align-items-center justify-content-center"
                                        onClick={submitForm}
                                    >
                                    ENVIAR
                                </button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}