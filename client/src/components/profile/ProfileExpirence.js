import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExpirence = ({
    experience: {company, title, location, current, to, from , description}
}) => {

    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? 'По сегодня' : <Moment format="YYYY/MM/DD">{to}</Moment> }
            </p>
            <p>
                <strong>Должность: </strong>{title}
            </p>
            <p>
                <strong>Описание: </strong>{description}
            </p>
        </div>
    )
}

ProfileExpirence.propTypes = {
    //experience: PropTypes.array.isRequired,
}

export default ProfileExpirence

