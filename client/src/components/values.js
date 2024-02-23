import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default function Values(props) {
    const value = props.value;
    const icon = props.icon;
    const className = props.className
    const iconClassName = props.iconClassName

    return(
        <div className = {`value ${className}`}>
            <p>{value}.</p>
            <FontAwesomeIcon icon = {icon} className = {`${iconClassName}`}/>
        </div>
    )
}