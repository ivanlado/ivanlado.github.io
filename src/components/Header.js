import React from "react";
import "../styles/Header.css";
import "../App.css";

function Header({data}) {
    const dataProfile = data.profile;
    const imagePath = "../assets/" + dataProfile.image;
    
    return <header className="header-header">
        <figure className="header-is-128x128">
            <img src={imagePath} className="header-image header-is-rounded"/>
        </figure>
        <div>
            <div className="header-texts">
                <h1>{dataProfile.name}</h1>
                <h3>{dataProfile.title} </h3>
                <h3>{dataProfile.subtitle} </h3>
            </div>
        </div>
    </header>;
}

export default Header;
