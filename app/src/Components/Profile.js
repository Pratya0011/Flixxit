import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav";
import "../Style/Profile.css";
import { fetchUser } from "../features/AppSlice";

function Profile() {
  const id = localStorage.getItem("userId");
  const user = useSelector((state) => state.app.user);
  const name = useSelector((state) => state.app.name);
  const email = useSelector((state) => state.app.email);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);
  if ( !user) {
    // Data is still loading or not available, show a loading indicator or return null
    return <div>Loading...</div>;
  }

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
    </div>
  );
}

export default Profile;
