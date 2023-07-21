import React from 'react';
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-btn ${isLiked && 'element__like-btn_active'}`);
  
  const handleCardClick = () => {
    onCardClick(card);
  }
  
  const handleDeleteClick = () => {
    onCardDelete(card);
  }
  
  const handleLikeClick = () => {
    onCardLike(card);
  }

  return (
    <article>
      <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
      {isOwn && <button type="button" className="element__delete-btn" onClick={handleDeleteClick} />}
      <div className="element__caption">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;