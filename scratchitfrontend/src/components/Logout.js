import { GoogleLogin } from "react-google-login";

const clientId = "282650218440-6vb2j84rru32vf15iuli4bddqdpkq61l.apps.googleusercontent.com"

const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj)
}

const onFailure = (res) => {
    console.log("LOGIN FAILED!  res: ", res)
}

const onSuccess = () => {
    console.log("Log out successfull");
}

function Logout(){
    return (
    <div id="signOutButton">
        <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onSuccess={onSuccess}
        />
    </div>
    );
}

export default Logout;