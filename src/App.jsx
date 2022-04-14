import { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [registerForm, setRegisterForm] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("User Signed in");
        setUser(userCredential.user.email);
        setStatus(true);
        // ...
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const registerUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account Created");
        console.log(userCredential);
        setUser(userCredential.user.email);
        setStatus(true);
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  function toggleForm() {
    console.log(registerForm);
    setRegisterForm(true);
    console.log(registerForm);
  }

  async function logout() {
    console.log("successfully logged out!");

    try {
      await signOut(auth);
      setUser("");
      setEmail("");
      setPassword("");
      setStatus(false);
      console.log("successfully logged out!");
    } catch {
      console.log("Failed to log out!");
    }
  }

  const login = (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={toggleForm}>Create Account</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );

  const createAccount = (
    <form onSubmit={registerUser}>
      <h1>Create Account</h1>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      <button onClick={toggleForm}>Sign In</button>
      {user}
    </form>
  );

  // console.log(registerForm);

  return (
    <div className="App">
      <header className="App-header">
        {registerForm ? createAccount : login}
        {user}
        Status: {status ? "logged In" : "logged Out"}
      </header>
    </div>
  );
}

export default App;
