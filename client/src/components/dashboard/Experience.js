import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import {deleteExperience} from '../../redux/actions/profile'

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {''}
                {exp.to === null ? (
                        'Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )
                 }
            </td>
            <td>
                 <button onClick={() => deleteExperience(exp._id) } className="btn btn-danger">Удалить</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="m-2">Место работы</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Компания</th>
                        <th className="hide-sm">Название</th>
                        <th className="hide-sm">Годы работы</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience} )(Experience);
