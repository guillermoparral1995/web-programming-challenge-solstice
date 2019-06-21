import React from "react";
import {Link} from "react-router-dom";
import './ContactDetail.scss';
import favoriteStarTrueImg from '../Assets/Favorite Star (True)/Favorite — True.png';
import favoriteStarFalseImg from '../Assets/Favorite Star (False)/Favorite — False.png';
import userIconLarge from "../Assets/User Large/User — Large@3x.png";

const DetailField = ({title, info, subtitle}) => {
    return <div className='detail-field'>
        <div className='field-main-info-container'>
            <p className="field-title">{title}</p>
            <p className="field-info">{info}</p>
        </div>
        {subtitle ? <div className='field-subtitle'><p>{subtitle}</p></div> : null}
    </div>
};

const ContactDetail = ({location: {contactInfo}, handleFavorite}) => {
    const switchToFallbackImg = (ev) => {
        ev.target.onerror = null;
        ev.target.src = userIconLarge;
    };
    const {street, city, state, country, zipCode} = contactInfo.address;
    const {work, home, mobile} = contactInfo.phone;
    let phoneFields = {};
    if (work) {
        phoneFields['phoneWork'] = {title: 'Phone:', info: work, subtitle: 'Work'}
    }
    if (home) {
        phoneFields['phoneHome'] = {title: 'Phone:', info: home, subtitle: 'Home'}
    }
    if (mobile) {
        phoneFields['phoneMobile'] = {title: 'Phone:', info: mobile, subtitle: 'Mobile'}
    }
    let detailFields = {
        ...phoneFields,
        address: {
            title: 'Address:',
            info: `${street} ${city}, ${state} ${zipCode}, ${country}`
        },
        birthdate: {
            title: 'Birthdate:',
            info: contactInfo.birthdate
        },
        email: {
            title: 'Email:',
            info: contactInfo.emailAddress
        }
    };
    const favoriteStarImg = contactInfo.isFavorite ? favoriteStarTrueImg : favoriteStarFalseImg;

    return <div className='contact-detail'>
        <div className='contact-detail-header'>
            <Link className='return-to-list' to='/'>&#x003c; Contacts</Link>
            <div className='star-img-container' onClick={() => handleFavorite(contactInfo)}>
                <img src={favoriteStarImg} alt=''/>
            </div>
        </div>
        <div className='detail-info-container'>
            <div className='detail-img-container'>
                <img className='contact-img' src={contactInfo.largeImageURL} alt='' onError={(ev) => switchToFallbackImg(ev)}/>
            </div>
            <div className='contact-name-detail-container'>
                <p className='contact-name-detail'>{contactInfo.name}</p>
                {contactInfo.companyName ? <p className='company-name-detail'>{contactInfo.companyName}</p> : null}
            </div>
            {Object.values(detailFields).map((field, idx) =>
                <DetailField key={idx} title={field.title} info={field.info} subtitle={field.subtitle}/>)}
        </div>
    </div>
};

export default ContactDetail;