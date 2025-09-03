import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
const config  = {
      apiKey: "AIzaSyBXuGFspFi2r8wkOX38G1rsW3aagOTR9Nw",
      authDomain: "ibk-movie-app.firebaseapp.com",
      projectId: "ibk-movie-app",
      storageBucket: "ibk-movie-app.firebasestorage.app",
      messagingSenderId: "659552736083",
      appId: "1:659552736083:web:343ebf1c1d4ff82e0c87a6",
      measurementId: "G-DK7MLMPDYY"
    };
export const app = initializeApp(config)
export const auth = getAuth(app); 
export const db = getFirestore(app)