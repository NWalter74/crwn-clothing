import {initializeApp} from "firebase/app";     //creates an app instance
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFs397QItYOrta00CvlN8Ml8R4xxbq1Fs",
    authDomain: "crwn-clothing-db-76bca.firebaseapp.com",
    projectId: "crwn-clothing-db-76bca",
    storageBucket: "crwn-clothing-db-76bca.appspot.com",
    messagingSenderId: "653133800855",
    appId: "1:653133800855:web:a50bcc1ddf64627bff10d2"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  //gives us back the provider instance
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  // export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    //Protection of code: If we don't get a userAuth return
    if(!userAuth) return;
    const userDocRef = doc(db,"user", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,                        //this is empty if it is empty in here const {displayName, email} = userAuth;
          email,
          createdAt,
          ...additionalInformation,           //if displayName is empty this line overrides it with value of this line additionalInformation = {}
        });
      }
        catch(error){
          console.log("error creating the user", error.message);
        }
      }

      return userDocRef;
    };

    export const createAuthUserWithEmailAndPassword = async (email, password) => {
      //if I don't get an email value or a password the function will not be called
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);
    };