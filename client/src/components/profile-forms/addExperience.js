import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {addExperience} from '../../redux/actions/profile'

const AddExperience = ({addExperience, history}) => {
    const [formData,setFormData] = useState({
        title: '',
        company:'',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {title,company, location, from, to, current, description} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Добавить место работы
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Добавить ваше место работы / позицию на которой вы работали
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="*Название работы" name="title" required value={title} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="*Компания" name="company" required value={company} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Адрес" name="location" value={location} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>Годы работы:</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <p><input 
                    type="checkbox" 
                    name="current"  
                    value={current} 
                    checked={current}
                    onChange={e => {
                        setFormData({...formData, current: !current});
                        toggleDisabled(!toDateDisabled) 
                    }}
                    /> {' '}По текущие время</p>
                </div>
                <div className="form-group">
                <h4>До:</h4>
                <input 
                    type="date" 
                    name="to" 
                    value={to} 
                    onChange={e => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}
                />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    value={description} 
                    onChange={e => onChange(e)}
                    cols="30"
                    rows="5"
                    placeholder="Описание"
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Назад</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default withRouter(
    connect(null, {addExperience})(AddExperience)
)
