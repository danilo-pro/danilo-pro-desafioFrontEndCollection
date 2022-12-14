import "./Header.css";
import React from "react";

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3 mx-5 title">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead mx-5 subTitle">{props.subtitle}</p>
    </header>