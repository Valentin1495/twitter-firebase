import { authService } from "../fbase";
import firebase from "firebase/compat/app";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
      const {
        target: {name}
      } = event;
      let provider;
      if (name === "google") {
        provider = new firebase.auth.GoogleAuthProvider()
      } else if (name === "github") {
        provider = new firebase.auth.GithubAuthProvider()
      }
      await authService.signInWithPopup(provider) 
    }

    return (
        <div className="authContainer">
          <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
          />
          <AuthForm />
          <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
              Continue with Google <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
              Continue with Github <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
        </div>
    )
}

export default Auth;