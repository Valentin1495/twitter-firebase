import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService} from "../fbase";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory()
    const onSignOutClick = () => {
        authService.signOut()
        history.push("/")
    }

    const [newName, setNewName] = useState(userObj.displayName)

    const onChange = (event) => {
        const {
            target: {value}
        } = event
        setNewName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (userObj.displayName !== newName) {
            await userObj.updateProfile({
                displayName: newName
            })
            refreshUser()
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text"
                    placeholder="Display Name"
                    value={newName}
                    onChange={onChange}
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10
                    }}
                />
            </form>
            <span onClick={onSignOutClick}>Sign Out</span>
        </div>
    )
}

export default Profile;