import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {addEducation} from '../../redux/actions/profile'

const AddEducation = ({addEducation, history}) => {
    const [formData,setFormData] = useState({
        school: '',
        degree:'',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {school, degree, fieldofstudy, from, to, current, description} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Добавить образование
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Заполните образование
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="*Место обучение" name="school" required value={school} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="*Cертификат образования" name="degree" required value={degree} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="*Степень" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>Годы обучения:</h4>
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default withRouter(
    connect(null, {addEducation})(AddEducation)
)


