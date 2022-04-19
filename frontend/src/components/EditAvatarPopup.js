import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
	const avatarRef = React.useRef();
	function handleSubmit(e) {
		e.preventDefault();
	  
		props.onUpdateAvatar({
		  avatar: avatarRef.current.value
		});
	}

	return (
		<PopupWithForm
			name={'avatar'}
			title={'Обновить аватар'}
			buttonText={'Сохранить'}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			>
			<input
				name='avatar'
				placeholder='Ссылка на картинку'
				className='popup__input popup__input_type_avatar'
				type='url'
				ref={avatarRef}
				required
			/>
			<span id="avatar-error" className="popup__error"></span>
		</PopupWithForm>
		)
}

export default EditAvatarPopup;