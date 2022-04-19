import React from "react";
import success from "../images/success.svg";
import denied from "../images/denied.svg";

export default function InfoTooltip(props) {
	const img = props.success ? success : denied;
	const title = props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
	return(
		<div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened `: ``}` }>
			<div className="popup__container">
				<button className="popup__close-button popup__close-button_type_auth" type="button" onClick={props.onClose}></button>
				<div className="popup__auth-result">
					<img className="popup__auth-img" src={img} alt={title} />
					<p className="popup__auth-title">{title}</p>
				</div>
			</div>
		</div>
	)
}