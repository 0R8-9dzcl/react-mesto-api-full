import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";	
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";


function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
	const [deletingcard, setDeletingcard] = React.useState({});
	const [cards, setCards] = React.useState([]);
	// стейт логина
	const [loggedIn, setLoggedIn] = React.useState(false);

	// стейт хедера
	const [headerEmail, setHeaderEmail] = React.useState('');

	// стейт infotooltip
	const [registerSuccess, setRegisterSuccess] = React.useState(false); // open popup
	const [infoSuccess, setInfoSuccess] = React.useState(true); // упешно или нет прошла регистрация

	// хук истории 
	const history = useHistory();
	// currenUser
	const [currentUser, setCurrentUser] = React.useState({ name:'', about:''});
	// объединил одним хуком и условием
	React.useEffect(() => {
		if(loggedIn) {
			Promise.all([api.getUserInfo(), api.getCards()])
			.then(([userInfo, cardList]) => {
				setCurrentUser(userInfo);
				setCards(cardList)
			})
			.catch(err => console.log(err))
			api.getCards()
			.then((cardList) => {
				setCards(cardList)
			})
			.catch(err => console.log(err))
		}
	}, [loggedIn]); // добавил зависимость
	// Popups
	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	};
	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	};
	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	};
	const handleDeletePlaceClick = (card) => {
		setIsDeletePlacePopupOpen(true);
		setDeletingcard(card);
	};
	const handleCardClick  = (card) => {
		setSelectedCard(card);
	}
	//регистрация пользователя
	function handleRegister(password, email) {
		auth.register(password, email)
		.then((res) => {
			history.push('/sign-in');
			setInfoSuccess(true); // статус регистрации
			return res;
		})
		.catch((err) => {
			setInfoSuccess(false); // статус регистрации
			console.log(err); 
		})
		.finally(() => {
			setRegisterSuccess(true); //открываем попап
		});
	}
	
	// Авторизация пользователя
	function handleLogin(password, email) {
		auth.login(password, email)
		.then(data => {
			if(data.token) {
				localStorage.setItem('jwt', data.token);
				setLoggedIn(true);
				setHeaderEmail(email)
			}
		})
		.catch((err) => {
			setInfoSuccess(false); // статус регистрации
			setRegisterSuccess(true); //открываем попап
			console.log(err); 
		});
	};

	// провеарка токена
	const tokenCheck = () => {
		const jwt = localStorage.getItem('jwt');
		if(jwt) {
			auth.getAuthorization(jwt)
			.then(data => {
				if(data) {
					setHeaderEmail(data.data.email)
				}
				setLoggedIn(true);
			})
			.catch((err) => {
				console.log(err); 
			});
		}
	}
	
	React.useEffect(() => {
		tokenCheck();
	}, []);
	// вынес в отдельный хук
	React.useEffect(() => {
		if(loggedIn) {	
			history.push('/');
		}
	}, [loggedIn, history]);

	// выход пользователся
	function handleLogout() {
		setLoggedIn(false);
		setHeaderEmail('');
		localStorage.removeItem('jwt');
		history.push('/sign-in');
	}
	// закрытие попапов
	const closeAllPopups = () => {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsDeletePlacePopupOpen(false);
		setSelectedCard({name: '', link: ''});
		setDeletingcard({});
		setRegisterSuccess(false)
	};
	// закрытие по ESC
	React.useEffect(() => {
		const closeByEscape = (e) => {
		  if (e.key === 'Escape') {
			closeAllPopups();
		  }
		}
		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, []);
	// UserData
	function handleUpdateUser(data) {
		api.setUserInfo(data.name, data.description)
		.then(res => {
			setCurrentUser(res);
			closeAllPopups();
		})
		.catch(err => console.log(err));
	}
	function handleUpdateAvatar(data) {
		api.updAvatar(data.avatar)
		.then(res => {
			setCurrentUser(res);
			closeAllPopups();
		})
		.catch(err => console.log(err));
	}
	// Cards
	
	function handleCardLike(card) {
		// Проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		})
		.catch(err => console.log(err));
	} 
	function handleCardDelete(card) {
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.deleteCard(card._id)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== card._id));
			closeAllPopups();
		})
		.catch(err => console.log(err));
	}
	
	// add places
	function handleAddPlace(data) {
		api.postCards(data.name, data.link)
		.then(newCard => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		})
		.catch(err => console.log(err));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Header loggedIn={loggedIn} headerEmail={headerEmail} logout={handleLogout} />
			<Switch>
				<Route path="/sign-in">
					<Login setHeaderEmail={setHeaderEmail} login={handleLogin} logout={handleLogout} />
				</Route>
				<Route path="/sign-up">
					<Register setHeaderEmail={setHeaderEmail} register={handleRegister} />
				</Route>
				<ProtectedRoute
					path="/"
					loggedIn={loggedIn}
					component={Main}
					cards={cards}
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleDeletePlaceClick}
				/>
				<ProtectedRoute loggedIn={loggedIn} component={Footer} />
			</Switch>
			<EditAvatarPopup
				isOpen={isEditAvatarPopupOpen} 
				onClose={closeAllPopups}
				onUpdateAvatar={handleUpdateAvatar} 
			/>
			<EditProfilePopup
				isOpen={isEditProfilePopupOpen} 
				onClose={closeAllPopups} 
				onUpdateUser={handleUpdateUser} 
			/>
			<AddPlacePopup
				isOpen={isAddPlacePopupOpen} 
				onClose={closeAllPopups} 
				onAddPlace={handleAddPlace} 
			/>
			<DeletePlacePopup
				card={deletingcard}
				isOpen={isDeletePlacePopupOpen}
				onClose={closeAllPopups}
				onCardDelete={handleCardDelete}
			/>				
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			
			<InfoTooltip
				isOpen={registerSuccess}
				onClose={closeAllPopups}
				name="success"
				success={infoSuccess}
			/>	
		</CurrentUserContext.Provider>
	);
}

export default App;