import React, {useState,useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import M from 'materialize-css';


const Signup = () =>{
    const navigate = useNavigate();
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () =>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","snap-globe");
        data.append("cloud_name","nehaann");
        //console.log(image);
        fetch('https://api.cloudinary.com/v1_1/nehaann/image/upload',{
            method:"post",
            body: data
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            setUrl(data.url)
        }).catch(err=>{
            console.log(err)
        })

    }

    const uploadFields = () =>{
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: 'Invalid Email', classes:"#c2185b pink darken-2"});
            return;
        }
        fetch('/signup',{
            method:"post", 
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c2185b pink darken-2"})
            }
            else{
                M.toast({html:data.message, classes:"#26a69a teal lighten-1"})
                navigate('/signin');
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()  
        }else{
            uploadFields()
        }
        
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Snapglobe</h2>
                <input
                type ="text"
                placeholder = "Full Name"
                value={name}
                onChange = {(e)=>setName(e.target.value)} 
                />
                <input
                type ="text"
                placeholder = "Email" 
                value={email}
                onChange = {(e)=>setEmail(e.target.value)} 
                />
                <input
                type ="password"
                placeholder = "Password" 
                value={password}
                onChange = {(e)=>setPassword(e.target.value)} 
                />
                <div className="file-field input-field">
                <div className="btn waves-effect waves-light #f06292 pink lighten-2">
                    <span>Upload Pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light #f06292 pink lighten-2"
                onClick = {()=>PostData()}>
                    Register
                </button>
                <h5>
                    <Link to="/signin">Have an existing account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;