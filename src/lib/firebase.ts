import { initializeApp, FirebaseError } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    
    if (error instanceof FirebaseError) {
      // Provide user-friendly guidance for common production deployment errors
      if (error.code === 'auth/unauthorized-domain') {
        alert("This domain is not authorized for Firebase Authentication. Please add your domain to 'Authorized domains' in the Firebase Console.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to alert usually
      } else {
        alert(`Sign in failed: ${error.message}`);
      }
    } else {
      alert(`An unexpected error occurred during sign in.`);
    }
    
    throw error;
  }
};

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
