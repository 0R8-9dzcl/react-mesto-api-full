import React from "react";
// import avatar from '../images/image.jpg';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
	
	const currentUser = React.useContext(CurrentUserContext);
	

	return (
		<>
			<main>
				<section className="profile">
					<div className="profile__container">
						<button className="profile__avatar-edit" onClick={onEditAvatar}>
							<img className="profile__avatar" src={currentUser.avatar} alt="аватарка пользлвателя" />
						</button>
						<div className="profile__info">
							<div className="profile__user">
								<h1 className="profile__name">{currentUser.name}</h1>
								<button  className="profile__edit-button" type="button" onClick={onEditProfile}></button>
							</div>
							<p className="profile__caption">{currentUser.about}</p>
						</div>
					</div>
					<button className="profile__add-button" onClick={onAddPlace} type="button"></button>
				</section>
				<section className="cards">
					<ul className="cards__list">
					{
						cards.map((card) => (
							<Card card={card}
							key={card._id}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete} />
						))
					}
					</ul>
				</section>
			</main>
		</>
	)
}

export default Main;