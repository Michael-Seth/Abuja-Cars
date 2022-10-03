import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  //Initialise the getAuth function from firebase
  const auth = getAuth();

  //Create a new state and set the state(changeDetails) to false
  const [changeDetails, setChangeDetails] = useState(false);

  //Create a new state and set the default state to an object that sets the data to the current authenticated firebase user's informations[in this case, it's the name and email]
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  //Destructure the data from the initial state into a new object [in this case it is the name and email from a]
  const { name, email } = formData;

  //Initialise the useNavigate function from react-router-dom
  const navigate = useNavigate();

  //Logout Function from firebase
  const onLogout = () => {
    //The signOut function signs out the current user from the system then we redirected the user to the sign-in page
    auth.signOut();
    navigate("/sign-in");
  };
  // Onsubmit function handles a promise where it checks from firebase if the current user name is not the same as the name the name inputed, if it's not then we call the updateProfile function that takes in two properties (the current auth user and an object to change the user's data to a new one) *Note: await
  // Then we update the user in the database using doc function from firebase that takes in the db collection, then name of the collection and lastly the current user uid. We then use the updateDoc function to update the new data.
  //NOTE: these function returns promises hence we are to use async await to handle then. Also, try and catch was used to process and handle the errors. Toast is just a react library that helps display errors in a nice way on the frontend
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //Update user in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  //The onchange function takes in an event that helps update the formData state using setFormData, setFormData runs an arrow function that takes the initial state of the formData as a parameter, spreads it in the new object then returns the new event id of the current data as the event value
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">{name}</p>
        <button className="logOut" onClick={onLogout} type="button">
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
