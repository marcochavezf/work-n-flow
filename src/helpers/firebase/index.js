import firebase from 'firebase';
import * as _ from 'lodash';
import { firebaseConfig } from '../../config.js';

const valid = firebaseConfig  && firebaseConfig.apiKey && firebaseConfig.projectId;

function getAuthData(provider){
  return firebaseAuth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const profile = _.pick(result.additionalUserInfo.profile, ['profile_image_url', 'profile_image_url_https', 'name']);
    return { token, profile };
  });
}

firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth;
class FirebaseHelper {
  isValid = valid;
  EMAIL = 'email';
  FACEBOOK = 'facebook';
  GOOGLE = 'google';
  GITHUB = 'github';
  TWITTER = 'twitter';
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login(provider, info) {
    if (provider === this.EMAIL) {
      return firebaseAuth().signInWithEmailAndPassword(
        info.email,
        info.password
      );
    } else 
    if (provider === this.FACEBOOK) {
      const provider = new firebaseAuth.FacebookAuthProvider();
      return getAuthData(provider);
    } else 
    if (provider === this.TWITTER) {
      const provider = new firebaseAuth.TwitterAuthProvider();
      return getAuthData(provider);
    } else 
    if (provider === this.GOOGLE) {
      const provider = new firebaseAuth.GoogleAuthProvider();
      return getAuthData(provider);
    }
    /*
    switch (provider) {
      case this.EMAIL:
        return firebaseAuth().signInWithEmailAndPassword(
          info.email,
          info.password
        );
      case this.FACEBOOK:
        const provider = new firebaseAuth.FacebookAuthProvider();
        return firebaseAuth().signInWithPopup(provider).then((result) => {
          const token = result.credential.accessToken;
          const profile = result.user;
          return { token, profile };
        });
      case this.GOOGLE:
        return firebaseAuth.GoogleAuthProvider();
      case this.GITHUB:
        return firebaseAuth.GithubAuthProvider();
      case this.TWITTER:
        return firebaseAuth.TwitterAuthProvider();
      default:
        throw new Error('Provider not supported');
    }
    */
  }
  logout() {
    return firebaseAuth().signOut();
  }

  isAuthenticated() {
    firebaseAuth().onAuthStateChanged(user => {
      return user ? true : false;
    });
  }
  resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email);
  }
}

export default new FirebaseHelper();
