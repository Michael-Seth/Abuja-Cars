import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibiltyIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with your registration");
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Create an Account</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
            className="emailInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
            className="emailInput"
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibiltyIcon}
              alt="show password"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
              className="showPassword"
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
