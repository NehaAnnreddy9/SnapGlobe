import React, {useState, useEffect} from "react";
import M from 'materialize-css';
import {useNavigate} from 'react-router-dom';


const CreatePost = () =>{
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(url){
            fetch('/createpost',{
                method:"post", 
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    picurl:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:"#c2185b pink darken-2"})
                }
                else{
                    M.toast({html: 'Post created successfully', classes:"#26a69a teal lighten-1"})
                    navigate('/');
                }
            }).catch(err=>{
                console.log(err);
            })
      }
    },[url])

    const postDetails = () =>{
        const data = new FormData();
        data.append("file",image[0]);
        data.append("upload_preset","snap-globe");
        data.append("cloud_name","nehaann");
        fetch('https://api.cloudinary.com/v1_1/nehaann/image/upload',{
            method:"post",
            body: data
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrl(data.url)
        }).catch(err=>{
            console.log(err)
        })

    }

    return (
        <div className="card input-filled" style={{margin:"30px auto", maxWidth:"500px", padding: "20px", textAlign:"center"}}>
            <input type="text" placeholder="title"
            value = {title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body"
            value = {body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
            <div className="btn waves-effect waves-light #f06292 pink lighten-2">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files)}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light #f06292 pink lighten-2" 
            onClick={()=>postDetails()}>Submit Post
            </button>
        </div>
    )

}

export default CreatePost;