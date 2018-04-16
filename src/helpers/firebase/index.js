import firebase from 'firebase';
import { firebaseConfig } from '../../config.js';

const valid = firebaseConfig  && firebaseConfig.apiKey && firebaseConfig.projectId;

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
  login(providerType, info) {
    if (providerType === this.EMAIL) {
      return firebaseAuth().signInWithEmailAndPassword(
        info.email,
        info.password
      );
    } else 
    if (providerType === this.FACEBOOK) {
      const provider = new firebaseAuth.FacebookAuthProvider();
      return this.getAuthData(provider, providerType);
    } else 
    if (providerType === this.TWITTER) {
      const provider = new firebaseAuth.TwitterAuthProvider();
      return this.getAuthData(provider, providerType);
    } else 
    if (providerType === this.GOOGLE) {
      const provider = new firebaseAuth.GoogleAuthProvider();
      return this.getAuthData(provider, providerType);
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

  async getAuthData(provider, providerType){
    const result = await firebaseAuth().signInWithPopup(provider);
    console.log('result', result);
    let profile = null;
    const token = result.credential.accessToken;
    switch (providerType) {
      case this.FACEBOOK:
        profile = {
          profileImage: result.additionalUserInfo.profile.picture.data.url,
          name: result.additionalUserInfo.profile.name
        };
        break;

      case this.TWITTER:
        profile = {
          profileImage: result.additionalUserInfo.profile.profile_image_url_https,
          name: result.additionalUserInfo.profile.name
        }
        break;

      case this.GOOGLE:
        profile = {
          profileImage: result.additionalUserInfo.profile.picture,
          name: result.additionalUserInfo.profile.name
        }
        break;

      default:
        break;
    }
    return { token, profile };
  }

  getInstance(){
    return firebase;
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
