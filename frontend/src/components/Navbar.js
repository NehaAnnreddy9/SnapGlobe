import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () =>{
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const renderList = () =>{
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li>
                    <button className="btn #f06292 pink lighten-2" 
                    onClick = {()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        navigate('/signin')
                    }}>Logout
                </button>
                </li>  
            ]
        }else{
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
        <div className="nav-wrapper #f06292 pink lighten-2">
        <Link to={state?"/":"/signin"} className="brand-logo left">Snapglobe</Link>
        <ul id="nav-mobile" className="right">
            {renderList()}
        </ul>
        </div>
    </nav>
    )
}

export default NavBar;