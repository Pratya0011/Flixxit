import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav";
import "../Style/Profile.css";
import { fetchUser } from "../features/AppSlice";
import { getuser } from "./request";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {patch} from "../Custom/useApi";

function Profile() {
  const id = localStorage.getItem("userId");
  const user = useSelector((state) => state.app.user);
  const name = useSelector((state) => state.app.name);
  const email = useSelector((state) => state.app.email);

  const [selectedOption, setSelectedOption] = useState(53);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);
  if ( !user) {
    // Data is still loading or not available, show a loading indicator or return null
    return <div>Loading...</div>;
  }
  const genre = {
    Thriller : 53,
    Crime : 80,
    Drama : 18,
    Action:28,
    Comedy:35,
    Mystery:9648,
    Romance:10749,
    Adventure: 12
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    patch(`${getuser.favgenre}/${id}?value=${selectedOption}`).then(res=>{
      localStorage.setItem('genre', res.data.genre)
      toast.success('Genre added');
    }).catch(err=>{
      throw err
    })
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="profile-component">
      <Nav />
      <div className="profile-div">
        <div className="profile-heading">Profile Options</div>
        <div className="profile-weapper">
          <div className="information">
            <div className="accinfo">Account Info</div>
            <div >
              <div className="name">Name</div>
              <div className="data">{name}</div>
            </div>
            <div className="email">
              <div className="name">Email</div>
              <div className="data">{email}</div>
            </div>
            <div>
              <div>Fav Genre:</div>
              <div>
              <form id="myForm" onSubmit={handleSubmit}>
              <select id="selectOption" name="selectedOption" value={selectedOption} onChange={handleSelectChange}>
                <option value={genre.Thriller}>Thriller</option>
                <option value={genre.Crime}>Crime</option>
                <option value={genre.Drama}>Drama</option>
                <option value={genre.Action}>Action</option>
                <option value={genre.Comedy}>Comedy</option>
                <option value={genre.Mystery}>Mystery</option>
                <option value={genre.Adventure}>Adventure</option>
                <option value={genre.Romance}>Romance</option>
              </select>
             <button type="submit">Submit</button>
              </form>
              </div>
            </div>
            <div >
              <div className="name">Watchlist</div>
              <div className="data">autoplay</div>
            </div>
          </div>
          <div className="information">
            <div className="accinfo">Subcription</div>
            {user &&
            user.subscription &&
            (user.subscription.subscriptionStatus === true ? (
              <div>
                <div className="data">{user.subscription.subscriptionType}</div>
                <div className="data">Expires: {user.payment.expiredDate?.substring(0,15)}</div>
              </div>
            ) : (
              <div>
                <div className="data">{user.subscription.subscriptionType}</div>
                <div className="data">Expires: N/A</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"autoClose={3000}theme="dark" hideProgressBar />
    </div>
  );
}

export default Profile;
