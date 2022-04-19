import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	function handleCardName(e) {
		setName(e.target.value);
	}
	function handleCardLink(e) {
		setLink(e.target.value);
	}
	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	  
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onAddPlace({name, link});
		setName('');
		setLink('');
	}

	return (
		<PopupWithForm
			name={'card'}
			title={'Новое место'}
			buttonText={'Добавить'}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			>
			<input
				name="place"
				placeholder="Название"
				className="popup__input popup__input_type_place"
				type='text'
				minLength='2'
				maxLength='30'
				value={name}
				onChange={handleCardName}
				required
			/>
			<span className="popup__error" id="place-error"></span>
			<input
				name='place-link'
				placeholder='Ссылка на картинку'
				className='popup__input popup__input_type_place-link'
				type='url'
				value={link}
				onChange={handleCardLink}
				required
			/>
			<span id="place-link-error" className="popup__error"></span>
		</PopupWithForm>
	)
}

export default AddPlacePopup;