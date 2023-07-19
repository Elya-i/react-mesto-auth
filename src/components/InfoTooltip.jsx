// import React from "react";
// import successIcon from '../images/success.svg'
// import failIcon from '../images/fail.svg'

// function InfoTooltip({isOpen, onClose, isSuccess}) {
//   // function handleOverlayClick(e) {
//   //   onOverlayClick(e, onClose);
//   }

//   return (
//     <div onClick={closeByOverlayClick} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
//       <div className="popup__container">
//         {isSuccess
//           ?
//           <>
//             <img src={successIcon} alt="Изображение Успех" className="info-tooltip__img"/>
//             <p className="info-tooltip__text">Вы успешно<br/>зарегистрировались!</p>
//           </>
//           :
//           <>
//             <img src={failIcon} alt="Изображение Неудача" className="info-tooltip__img"/>
//             <p className="info-tooltip__text">Что-то пошло не так!<br/>Попробуйте ещё раз.</p>
//           </>
//         }
//         <button onClick={onClose} type="button" className="popup__button popup__close-btn"></button>
//       </div>
//       {isOpen && <close onClose={onClose}/>}
//     </div>
//   )
// }

// export default InfoTooltip