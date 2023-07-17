function ImagePopup({ card, onClose }) {
  return (
   <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
    <div className="popup__image-container">
      <button onClick={onClose} type="button" className="popup__button popup__close-btn"></button>
      <img src={card && card.link} alt={card && card.name} className="popup__image-photo" />
      <p className="popup__image-caption">{card && card.name}</p>
    </div>
  </div>
  )
}

export default ImagePopup;

 