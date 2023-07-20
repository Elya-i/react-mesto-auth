import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfimationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen ] = useState(false);
  
  const [ isLoading, setIsLoading ] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({_id: '', name: '', avatar: '', about: '' });
  const [cards, setCards] = useState([]);

  const [removalCard, setRemovalCard] = useState({});

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getCardList()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch(console.error)
    }
  }, [loggedIn])

  function handleRegister(email, password) {
    auth.register(email, password)
    .then(({ data }) => {
      setIsSignUpSuccessful(true);
      openInfoTooltip() 
      handleLogin(data.email, password);
    })
    .catch(err => {
      setIsSignUpSuccessful(false)
      openInfoTooltip() 
    })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then(() => {
      setEmail(email)
      setLoggedIn(true);
      navigate('/');
    })
    .catch(() => {
      setLoggedIn(false);
      setIsSignUpSuccessful(false);
      openInfoTooltip() 
    });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in');
  }

  function checkToken() {
    auth.checkToken(localStorage.getItem('jwt'))
      .then(({ data }) => {
        setLoggedIn(true);
        setEmail(data.email);
        navigate('/');
      })
      .catch(() => {
        setLoggedIn(false);
        setEmail('');
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmationClick(card) {
    setConfirmationPopupOpen(true);
    setRemovalCard(card);
  }

  function openInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setRemovalCard({});
    setInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Проверка наличия лайка на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправка запроса в API и получение обновлённых данных карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setRemovalCard({});
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true)
    api.sendUserData(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.updateUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmationClick}
          />} />
          <Route path="/sign-up" element={<Register submitText="Зарегистрироваться" onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login submitText="Войти" onLogin={handleLogin}/>} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          isLoading={isLoading} 
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isLoading} 
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
          isLoading={isLoading} 
        />

        <ConfirmationPopup 
          isOpen={isConfimationPopupOpen} 
          onClose={closeAllPopups} 
          onDeleteCard={handleCardDelete} 
          card={removalCard} 
          isLoading={isLoading} 
        />
        
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSignUpSuccessful}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;