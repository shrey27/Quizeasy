import './modal.css';
import { FC, useEffect, useState } from 'react';
import { ProfileModalProps } from '../../utility';

export const ProfileModal: FC<ProfileModalProps> = ({ setProfileModal, handleDispatch, modalObject }) => {

    const [form, setForm] = useState({ email: '', username: '', password: '', newpassword: '' })
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setForm((object: any) => ({ ...object, ...modalObject }))
    }, [modalObject])

    const handleSubmit = () => {
        if (form.username !== '' && form.email !== '' && form.password !== '') {
            handleDispatch(form);
        }
        else {
            setError(true);
        }
    };

    return (
        <div className='modal modal__open flex-ct-ct'>
            <div
                className='modal__background'
                onClick={() => setProfileModal(false)}
            ></div>
            <div className='modal__content modal__content__signout'>
                <h1 className="text lg cen sb xs-s">PROFILE</h1>
                <hr />
                {error && (
                    <h1 className='alert text cen md sb'>Enter name, email and password in proper format</h1>
                )}
                <form className='sm-s' action='#'>
                    <div className='authentication__input'>
                        <label htmlFor='username' className='label'>
                            Username*
                        </label>
                        <input
                            className='input'
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Enter name'
                            autoComplete='off'
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            onFocus={() => setError(false)}
                        />
                    </div>
                    <div className='authentication__input'>
                        <label htmlFor='email' className='label'>
                            Email ID*
                        </label>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={() => setError(false)}
                        />
                    </div>
                    <div className='authentication__input'>
                        <label htmlFor='old__password' className='label'>
                            Old Password*
                        </label>
                        <div className='input__container'>
                            <input
                                className='input input__password'
                                type={showPassword ? 'text' : 'password'}
                                name='old__password'
                                id='old__password'
                                autoComplete='off'
                                placeholder='Password'
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                onFocus={() => setError(false)}
                            />
                            <i
                                className='fa-solid fa-eye sm'
                                onClick={() => setShowPassword((e) => !e)}
                            ></i>
                        </div>
                    </div>
                    <div className='authentication__input'>
                        <label htmlFor='new__password' className='label'>
                            New Password (Optional)
                        </label>
                        <div className='input__container'>
                            <input
                                className='input input__password'
                                type={showPassword ? 'text' : 'password'}
                                name='new__password'
                                id='new__password'
                                autoComplete='off'
                                placeholder='Password'
                                value={form.newpassword}
                                onChange={(e) => setForm({ ...form, newpassword: e.target.value })}
                                onFocus={() => setError(false)}
                            />
                            <i
                                className='fa-solid fa-eye sm'
                                onClick={() => setShowPassword((e) => !e)}
                            ></i>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='btn btn--wide btn--auth--solid sb'
                        onClick={handleSubmit}
                    >
                        UPDATE
                    </button>
                </form>
            </div>
            <span className='modal__close' onClick={() => setProfileModal(false)}>
                <i className='fas fa-times-circle'></i>
            </span>
        </div>
    );
}
