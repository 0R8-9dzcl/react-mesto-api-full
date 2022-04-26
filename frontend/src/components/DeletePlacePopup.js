import React from "react";
import PopupWithForm from "./PopupWithForm";


function DeletePlacePopup(props) {
	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	  
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onCardDelete(props.card);
	}
	return (
		<PopupWithForm
			name={'confirm'}
			title={'Вы уверены?'}
			buttonText={'Да'}
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			onClose={props.onClose}
		/>
	)
}

export default DeletePlacePopup;