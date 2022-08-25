import "./Header.css";
import React from "react";

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3 title">
            {props.title}
        </h1>
        <p className="lead subTitle">{props.subtitle}</p>
    </header>