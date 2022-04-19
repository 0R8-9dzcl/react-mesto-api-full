import React from "react";
import { Link } from "react-router-dom";

export default function AuthForm(props) {
	return(
		<div className="auth__container">
			<form className={`auth__form auth__form_${props.name}" name="${props.name}`} onSubmit={props.onSubmit}>
				<h2 className="auth__title">{props.title}</h2>
				{props.children}
				<button className="auth__submit" type="submit" name="submit">{props.buttonText}</button>
			</form>
			{props.register && <Link className="auth__ask" to="sign-in">Уже зарегистрированы? Войти</Link>}
		</div>
	)
}