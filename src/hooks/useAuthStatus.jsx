import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  //Set the user logged in state to false, then check the status if the user is logged in, if logged in the status is changed to false while the loggedin is set to true

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkStatus };
};

// UseRef is to solve the componentDidMount problem when dealing with APIs

//==========================
// OnAuthStateChanged
//==========================
// Get the currently signed-in user
// The recommended way to get the current user is by setting an observer on the Auth object:

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//      User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
// By using an observer, you ensure that the Auth object isn't in an intermediate state—such as initialization—when you get the current user. When you use signInWithRedirect, the onAuthStateChanged observer waits until getRedirectResult resolves before triggering.
