import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
    education: {school, degree, fieldofstudy, current, to, from , description}
}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? 'По сегодня' : <Moment format="YYYY/MM/DD">{to}</Moment> }
            </p>
            <p>
                <strong>Место обучене: </strong>{degree}
            </p>
            <p>
                <strong>Направление: </strong>{fieldofstudy}
            </p>
            <p>
                <strong>Описание: </strong>{description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    //experience: PropTypes.array.isRequired,
}

export default ProfileEducation

