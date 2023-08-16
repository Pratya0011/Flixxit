const url = 'https://flixxit-server-9v89.onrender.com'
// https://flixxit-server-9v89.onrender.com
// http://localhost:8080

export const signup = {
    signUpUrl : `${url}/user/signup`,
    loginUrl  :`${url}/user/login`,
    fogotPassword : `${url}/user/forgotPassword`
}

export const homeRequest = {
    topRatedFlixxit: `${url}/user/toprated`,
    popularFlixxit:`${url}/user/popular`,
    toptenFlixxit:`${url}/user/topten`,
    documentaryFlixxit:`${url}/user/documentary`,
    recomendedFlixxit:`${url}/user/recomended`,
    getTitle:`${url}/user/getTitle`
}

export const movieRequest = {
    topRatedMovies: `${url}/user/topRatedMovies`,
    popularMovies: `${url}/user/popularMovies`,
    thrillerMovies: `${url}/user/thrillerMovies`,
    crimeMovies: `${url}/user/crimeMovies`,
    dramaMovies: `${url}/user/dramaMovies`,
    actionMovies: `${url}/user/actionMovies`,
    adventureMovies: `${url}/user/adventureMovies`,
    horrorMovies: `${url}/user/horrorMovies`,
    comedyMovies: `${url}/user/comedyMovies`,
    romanceMovies: `${url}/user/romanceMovies`,
    documentaryMovies: `${url}/user/documentaryMovies`
}

export const tvRequest = {
    topRatedTv: `${url}/user/topRatedTv`,
    popularTv: `${url}/user/popularTv`,
    crimeTv:   `${url}/user/crimeTv`,
    dramaTv: `${url}/user/dramaTv`,
    comedyTv: `${url}/user/comedyTv`,
    mysteryTv: `${url}/user/mysteryTv`,
    actionadventureTv: `${url}/user/action&advntureTv`,
    documentaryTv: `${url}/user/documentaryTv`
}

export const Watchlist={
    getWatchlist : `${url}/user/getWatchlist`,
    addWatchlist : `${url}/user/addWatchlist`,
    deleteWatchlist : `${url}/user/deleteWatchlist`
}

export const searchBar = {
    getSearch: `${url}/user/search`
}

export const subscribitionPlan = {
    getAllSubsPlans: `${url}/user/getPlan`,
    checkOut:`${url}/user/checkout`,
    paymentVerification:`${url}/user/paymentverification`,
    getkey:`${url}/user/getKey`,
    updatePaymentStatus:`${url}/user/updatePaymentStatus`
} 

export const getuser = {
    getUserById : `${url}/admin/getUser`,
    getallUser : `${url}/admin/getallusers`,
    getSubscribedUser: `${url}/admin/getsubscribed`,
    getAmount : `${url}/admin/getamount`,
    favgenre : `${url}/user/genre`
}

export const commentsRequest = {
    getComments: `${url}/user/comments`,
    postComments: `${url}/user/addcomment`
}

export const videoRoutes = {
    fetchVideo : `${url}/user/video`
}

export const historyRoutes = {
    addHistory :`${url}/user/addhistory`,
    getHistory : `${url}/user/gethistory`
}
export const likes = {
    likes:`${url}/user/likes`,
    dislikes:`${url}/user/dislikes`,
    getLikes: `${url}/user/getlike`
}