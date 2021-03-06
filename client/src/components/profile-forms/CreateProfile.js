import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {createProfile} from '../../redux/actions/profile';

const CreateProfile = ({createProfile, history}) => {
    const [formData,setFormData] = useState({
        handle: 'test',
        company: 'InterLink',
        website: 'http://website.io',
        location: 'Moskau',
        status: 'Junior Developer',
        skills: 'REACT, ANGULAR',
        githubusername: 'http://githab.com/qwerty123',
        bio: 'I am a junior developer ',
        twitter: 'http://twitter.com/qwery12345',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [displaySocialInputs, toggleSocialsInputs] = useState(false) 

    const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube,
    instagram } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Создайте профиль
            </h1>
            
            <p className="lead">
                <i className="fas fa-user"></i> Заполните информацию о себе, ваши данные будут видны всем пользователям
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Handle" name="handle" value={handle} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Выберите профессиональный статус</option>
                    <option value="Developer">Разрабочик</option>
                    <option value="Junior Developer">Junior Разрабочик</option>
                    <option value="Senior Developer">Senior Разрабочик</option>
                    <option value="Manager">Менеджер</option>
                    <option value="Student or Learning">Обучающийся студент</option>
                    <option value="Instructor">Инструктор или Учитель</option>
                    <option value="Intern">Интерн</option>
                    <option value="Other">Другое</option>
                </select>

                </div>
                <div className="form-group">
                <input type="text" placeholder="Компания" name="company" value={company} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Веб сайт" name="website" value={website} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Адрес" name="location" value={location} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="*Умение" name="skills" value={skills} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github"
                    name="githubusername"
                    value={githubusername} onChange={e => onChange(e)}
                />
                </div>
                <div className="form-group">
                <textarea placeholder="Напишите о себе" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                </div>

                <div className="my-2">
                <button type="button" onClick={() => toggleSocialsInputs(!displaySocialInputs)} className="btn btn-light">
                    Добавить социальные сети
                </button>
                </div>

                {displaySocialInputs && <Fragment> 
                    <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                    </div>
    
                    <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                    </div>
    
                    <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
                    </div>
    
                    <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                    </div>
    
                    <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                    </div>
                </Fragment>}
 
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Назад</Link>
            </form>
                    
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}
// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// })
export default withRouter(
    connect(null, {createProfile})(CreateProfile)
)
