
export const clickHandler = (contentId, navigate)=>{
    if(!contentId){
        return;
    }else{
        localStorage.setItem('contentId', contentId)
        navigate('/title')
    }
}