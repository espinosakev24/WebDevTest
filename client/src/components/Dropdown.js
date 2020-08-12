import React, { useState  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'
import axios from 'axios';


export default function Dropdown (props) {
    const [dropdownTitle, setDropdownTitle] = useState('');
    const [dropdownCitiesTitle, setDropdownCitiesTitle] = useState('');


    const changeDropdownValue = (event) => {
        const title = event.target.name;
        setDropdownTitle(title);
        setDropdownCitiesTitle(title);

        
        if (props.doRequest) {
            props.setDepartmentName(title);
            props.setCitiesReady(false);

            axios.get(`${props.url}/${title}`)
            .then(response => {
                props.setCitiesReady(true);
                props.onChange(response.data);
            })
        } else {
            props.setCityName(title);
        }
    }

    return (
        <div>
            {/* Default dropright button */}
            <div className="dropright">
                {props.cityDropdown ? 

                    <button type="button" 
                            className="formField form-control d-flex justify-content-between align-items-center"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {dropdownCitiesTitle.length > 0 ? dropdownCitiesTitle : props.placeholder}
                            <div>
                                <svg width="5" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L15.5 15.5L2 29" stroke="#B8B8B8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                    </button>

                    :

                    <button type="button" 
                            className="formField form-control d-flex justify-content-between align-items-center"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {dropdownTitle.length > 0 ? dropdownTitle : props.placeholder}
                            <div>
                                <svg width="5" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L15.5 15.5L2 29" stroke="#B8B8B8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                    </button>
                }
                <div className="dropdown-menu">
                    {props.options.map((place, key) => (
                        <a className="dropdown-item" 
                            key={key}
                            onClick={ changeDropdownValue }
                            name={place}
                        >
                            {place}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}