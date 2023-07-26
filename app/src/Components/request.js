export const signup = {
    signUpUrl : 'http://localhost:8080/user/signup',
    loginUrl  :'http://localhost:8080/user/login',
}

export const homeRequest = {
    topRatedFlixxit: `http://localhost:8080/user/toprated`,
    popularFlixxit:`http://localhost:8080/user/popular`,
    toptenFlixxit:`http://localhost:8080/user/topten`,
    documentaryFlixxit:`http://localhost:8080/user/documentary`,
    recomendedFlixxit:`http://localhost:8080/user/recomended`,
    getTitle:`http://localhost:8080/user/getTitle`
}

export const movieRequest = {
    topRatedMovies: `http://localhost:8080/user/topRatedMovies`,
    popularMovies: `http://localhost:8080/user/popularMovies`,
    thrillerMovies: `http://localhost:8080/user/thrillerMovies`,
    crimeMovies: `http://localhost:8080/user/crimeMovies`,
    dramaMovies: `http://localhost:8080/user/dramaMovies`,
    actionMovies: `http://localhost:8080/user/actionMovies`,
    adventureMovies: `http://localhost:8080/user/adventureMovies`,
    horrorMovies: `http://localhost:8080/user/horrorMovies`,
    comedyMovies: `http://localhost:8080/user/comedyMovies`,
    romanceMovies: `http://localhost:8080/user/romanceMovies`,
    documentaryMovies: `http://localhost:8080/user/documentaryMovies`
}

export const tvRequest = {
    topRatedTv: `http://localhost:8080/user/topRatedTv`,
    popularTv: `http://localhost:8080/user/popularTv`,
    crimeTv:   `http://localhost:8080/user/crimeTv`,
    dramaTv: `http://localhost:8080/user/dramaTv`,
    comedyTv: `http://localhost:8080/user/comedyTv`,
    mysteryTv: `http://localhost:8080/user/mysteryTv`,
    actionadventureTv: `http://localhost:8080/user/action&advntureTv`,
    documentaryTv: `http://localhost:8080/user/documentaryTv`
}

export const Watchlist={
    getWatchlist : `http://localhost:8080/user/getWatchlist`,
    addWatchlist : `http://localhost:8080/user/addWatchlist`,
    deleteWatchlist : `http://localhost:8080/user/deleteWatchlist`
}

export const searchBar = {
    getSearch: `http://localhost:8080/user/search`
}

export const subscribitionPlan = {
    getAllSubsPlans: "http://localhost:8080/user/getPlan",
    checkOut:"http://localhost:8080/user/checkout",
    paymentVerification:"http://localhost:8080/user/paymentverification",
    getkey:"http://localhost:8080/user/getKey",
    updatePaymentStatus:"http://localhost:8080/user/updatePaymentStatus"
} 