import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const handleCardClick = () => {
        onCardClick(card);
    };
    const handleCardLike = () => {
        onCardLike(card);
    };
    const handleCardDelete = () => {
        onCardDelete(card);
    };
	const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `card__delete ${isOwn && 'card__delete_style_active'}`;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`; 
	return (
		<li className="card">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
            <img className="card__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="card__caption">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike} ></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
	)
}
export default Card;