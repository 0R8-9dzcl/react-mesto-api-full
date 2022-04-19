import React from "react";
import AuthForm from "./AuthForm";

export default function Register(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	function handleUpdateEmail(e) {
		setEmail(e.target.value);
	}function handleUpdatePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();	// Запрещаем браузеру переходить по адресу формы
		props.register(password, email);
	}
	return(
		<section className="auth">
			<AuthForm
			name={'login'}
			title={'Регистрация'}
			buttonText={'Зарегистрироваться'}
			onSubmit={handleSubmit}
			register
			>
				<input 
					name="email"
					placeholder="Email"
					className='auth__input auth__input_type_email'
					type="email"
					minLength="2"
					maxLength="40"
					onChange={handleUpdateEmail}
					value={email}
					required
				/>
				<span className="popup__error" id="username-error"></span>
				<input 
					name='password'
					placeholder='Пароль'
					className='auth__input auth__input_type_password'
					type='password'
					minLength='6'
					maxLength='200'
					onChange={handleUpdatePassword}
					value={password}
					required
				/>
				<span className="popup__error" id="password-error"></span>
			</AuthForm>
		</section>
	)
};