const url = 'https://flixxit-server-9v89.onrender.com'
// const url = `http://localhost:8080`

export const signup = {
    signUpUrl : `/user/signup`,
    loginUrl  :`/user/login`,
    fogotPassword : `/user/forgotPassword`
}

export const homeRequest = {
    topRatedFlixxit: `/user/toprated`,
    popularFlixxit:`/user/popular`,
    toptenFlixxit:`/user/topten`,
    documentaryFlixxit:`/user/documentary`,
    recomendedFlixxit:`/user/recomended`,
    getTitle:`/user/getTitle`
}

export const movieRequest = {
    topRatedMovies: `/user/topRatedMovies`,
    popularMovies: `/user/popularMovies`,
    thrillerMovies: `/user/thrillerMovies`,
    crimeMovies: `/user/crimeMovies`,
    dramaMovies: `/user/dramaMovies`,
    actionMovies: `/user/actionMovies`,
    adventureMovies: `/user/adventureMovies`,
    horrorMovies: `/user/horrorMovies`,
    comedyMovies: `/user/comedyMovies`,
    romanceMovies: `/user/romanceMovies`,
    documentaryMovies: `/user/documentaryMovies`
}

export const tvRequest = {
    topRatedTv: `/user/topRatedTv`,
    popularTv: `/user/popularTv`,
    crimeTv:   `/user/crimeTv`,
    dramaTv: `/user/dramaTv`,
    comedyTv: `/user/comedyTv`,
    mysteryTv: `/user/mysteryTv`,
    actionadventureTv: `/user/action&advntureTv`,
    documentaryTv: `/user/documentaryTv`
}

export const Watchlist={
    getWatchlist : `/user/getWatchlist`,
    addWatchlist : `/user/addWatchlist`,
    deleteWatchlist : `/user/deleteWatchlist`
}

export const searchBar = {
    getSearch: `/user/search`
}

export const subscribitionPlan = {
    getAllSubsPlans: `/user/getPlan`,
    checkOut:`/user/checkout`,
    paymentVerification:`${url}/user/paymentverification`,
    getkey:`/user/getKey`,
    updatePaymentStatus:`/user/updatePaymentStatus`
} 

export const getuser = {
    getUserById : `/admin/getUser`,
    getallUser : `/admin/getallusers`,
    getSubscribedUserList: `/admin/getsubscribeduserlist`,
    getSubscribedUser: `/admin/getsubscribed`,
    getAmount : `/admin/getamount`,
    favgenre : `/user/genre`
}

export const commentsRequest = {
    getComments: `/user/comments`,
    postComments: `/user/addcomment`
}

export const videoRoutes = {
    fetchVideo : `${url}/user/video`
}

export const historyRoutes = {
    addHistory :`/user/addhistory`,
    getHistory : `/user/gethistory`
}
export const likes = {
    likes:`/user/likes`,
    dislikes:`/user/dislikes`,
    getLikes: `/user/getlike`
}