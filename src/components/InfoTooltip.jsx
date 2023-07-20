import React, { useEffect } from 'react';
import successIcon from '../images/success.svg'
import failIcon from '../images/fail.svg'

function InfoTooltip({ name, isOpen, onClose, isSuccess}) {

  function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      onClose();
    } 
  }

  function handleCloseByEsc(event) {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {document.removeEventListener('keydown', handleCloseByEsc)};
  })

  return (
    <div onClick={closeByOverlayClick} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        {isSuccess
          ?
          <>
            <img src={successIcon} alt="Успешная регистрация" className="infotooltip__icon"/>
            <p className="infotooltip__message">Вы успешно зарегистрировались!</p>
          </>
          :
          <>
            <img src={failIcon} alt="Ошибка регистрации" className="infotooltip__icon"/>
            <p className="infotooltip__message">Что-то пошло не так! Попробуйте ещё раз.</p>
          </>
        }
        <button onClick={onClose} type="button" className="popup__button popup__close-btn"></button>
      </div>
    </div>
  )
}

export default InfoTooltip