import React, {useState, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {createProfile, getCurrentProfile} from '../../redux/actions/profile';

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
    const [formData,setFormData] = useState({
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [displaySocialInputs, toggleSocialsInputs] = useState(false) 

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            handle: loading || !profile.handle ? '' : profile.handle,
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
            linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
        })
    }, [loading, getCurrentProfile])

    const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube,
    instagram } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Редактировать профиль
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
                <input type="text" placeholder="*Умения" name="skills" value={skills} onChange={e => onChange(e)}/>
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default withRouter(
    connect(mapStateToProps, {createProfile, getCurrentProfile})(EditProfile)
)
