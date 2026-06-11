import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3030/api'
})

const errHandler = err => {
  console.error("API.js - general error with API/axios:",err)
  throw err
}

const api = {
  service,

  ////////// GAMES //////////
  getGames() {
    return service
      .get('/games')
      .then(res => res.data)
      .catch(errHandler)
  },
  getGame(gameId) {
    return service
      .get('/games/'+gameId)
      .then(res => res.data) //returns a single game as object
      .catch(errHandler)
  },
  editGame(gameId, data) {
    return service
      .put('/games/'+gameId, data)
      .then(res => res.data)
      .catch(errHandler)
  },
  deleteGame (gameId) {
    return service
    .delete('/games/'+gameId)
    .then(res => res.data)
    .catch(errHandler)
  },
  postGames(data) {
    const formData = new FormData()
    formData.append("picture", data.file)
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("keywords", data.keywords)

    return service
      .post('/user/add-game', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },

  ////////// DICTIONARY //////////
  getDictionary() {
    return service.get('/resources/dictionary')
      .then(res => res.data)
      .catch(errHandler)
  },

  ////////// FAVORITES //////////
  postNewFavorite(newFavData) {
    console.log('DEBUG - newFavData:', newFavData)
    return service
      .post('/user/add-to-fav', newFavData)
      .then(res => {
        return res.data})
      .catch(errHandler)
  },
  getMyFavs() {
    return service
      .get('/favs')
      .then(res => res.data)
      .catch(errHandler)
  },
  getFav(favId) {
    return service
      .get('/favs/' + favId)
      .then(res => res.data)
      .catch(errHandler)
  },
  addFav(title) {
    return service
      .post('/favs', { title })
      .then(res => res.data)
      .catch(errHandler)
  },
  addGameToFav(favId, gameId) {
    return service
      .post('/favs/' + favId + "/games", { gameId })
      .then(res => res.data)
      .catch(errHandler)
  },

 ////////// USER | AUTH //////////
  getProfile() {
    console.log('DEBUG - checking API profile:', )
    return service
      .get('/user/profile')
      .then(res => {
        return res.data})
      .catch(errHandler) 
  },
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler)
  },
  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res
        localStorage.setItem('user', JSON.stringify(data))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
        return data
      })
      .catch(errHandler)
  },

  logout() {
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('user')
  },

  loadUser() {
    const userData = localStorage.getItem('user')
    if (!userData) return false
    const user = JSON.parse(userData)
    if (user.token && user.name) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
      return user
    }
    return false
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  ////////// MEDIA //////////

  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/user/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}

export default api
