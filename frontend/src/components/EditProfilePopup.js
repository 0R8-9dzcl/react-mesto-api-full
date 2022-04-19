import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');

	// Подписка на контекст
	const currentUser = React.useContext(CurrentUserContext);
	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
	setName(currentUser.name);
	setDescription(currentUser.about);
	}, [currentUser, props.isOpen]); 

	function handleUpdateName(e) {
		setName(e.target.value);
	}
	function handleUpdateDescripton(e) {
		setDescription(e.target.value);
	}
	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	  
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser({name, description});
	}
	  
	return(
		<PopupWithForm
			name={'profile'}
			title={'Редактировать профиль'}
			buttonText={'Сохранить'}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			>
			<input 
				name="profile"
				placeholder="Имя пользователя"
				className='popup__input popup__input_type_profile'
				type="text"
				minLength="2"
				maxLength="40"
				onChange={handleUpdateName}
				value={name}
				required
			/>
			<span className="popup__error" id="profile-error"></span>
			<input 
				name='caption'
				placeholder='О себе'
				className='popup__input popup__input_type_caption'
				type='text'
				minLength='2'
				maxLength='200'
				onChange={handleUpdateDescripton}
				value={description}
				required
			/>
			<span className="popup__error" id="caption-error"></span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;