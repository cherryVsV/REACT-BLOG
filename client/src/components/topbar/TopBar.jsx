import "./topbar.css"
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
export default function TopBar() {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/uploads/images/"
    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"});
    }
    return (
        <div className="top">
            <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-github-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                    <Link className="link" to="/">HOME</Link>
                </li>
                {user &&
                <li className="topListItem">
                <Link className="link" to="/write">WRITE</Link>
                </li>
}
                <li className="topListItem" onClick={handleLogout}>
                   {user && "LOGOUT"}
                </li>
            </ul>
            </div>
            <div className="topRight">
                {user ? (
                      <Link to="/settings">
                    <img className="topImage" 
                    src={PF+user.profilePic} 
                    alt="" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                        <Link className="link" to="/login">LOGIN</Link>
                        </li>
                        <li className="topListItem">
                        <Link className="link" to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
