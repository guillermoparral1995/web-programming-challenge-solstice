import React from "react";
import {Link} from "react-router-dom";
import userIconSmall from '../../Assets/User Small/User Icon Small.png'
import './ContactCard.scss'

const ContactCard = ({contactInfo, linkPath}) => {
    const switchToFallbackImg = (ev) => {
        ev.target.onerror = null;
        ev.target.src = userIconSmall;
    };

    return <div className="card-container">
        <div className="img-container">
            <Link to={{pathname: linkPath, contactInfo: contactInfo}}>
                <img className='user-icon' src={contactInfo.smallImageURL} alt=""
                     onError={(ev) => switchToFallbackImg(ev)}/>
            </Link>
        </div>
        <div className="info-container">
            <div className='star-img'>{
                contactInfo.isFavorite ? <span role="img" aria-label="star-emoji">⭐</span> : null
            }
            </div>
            <div className="contact-name">
                <p>{contactInfo.name}</p>
                {contactInfo.companyName ? <p className='company-name'>{contactInfo.companyName}</p> : null}
            </div>

        </div>
    </div>
};

export default ContactCard;