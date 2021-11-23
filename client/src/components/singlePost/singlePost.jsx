import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import {Link} from "react-router-dom"
import "./singlePost.css";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2]
    const [post, setPost] = useState([])
    const PF = "http://localhost:5000/uploads/";
    const {user} = useContext(Context)
    const [title, setTitle] = useState("") 
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState(null)
    const [audio, setAudio] = useState(null)
   
    useEffect(()=>{
      const getPost = async ()=>{
          const res = await axios.get("/posts/" + path);
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.description);
      }
      getPost()
    }, [path])

    const handleDelete = async ()=>{
        try{
       await axios.delete(`/posts/${post._id}`, {data:{username: user.username}});
       window.location.replace("/");
        }catch(err){

        }
    }
    const handleUpdate = async ()=>{
        const updatedPost =  {
            username: user.username,
            title: title,
            description: desc
        };
        try{
            if(image){
                const data = new FormData();
                const filename = Date.now() + image.name;
                data.append("name",filename);
                data.append("file", image);
                updatedPost.photo = filename;
                try{
                    await axios.post("/upload", data);
                }catch(err){
    
                }
            }
            if(file){
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name",filename);
                data.append("file", file);
                updatedPost.file = filename;
                try{
                    await axios.post("/upload", data);
                }catch(err){
    
                }
            }
            if(video){
                const data = new FormData();
                const filename = Date.now() + video.name;
                data.append("name",filename);
                data.append("file", video);
                updatedPost.video = filename;
                try{
                    await axios.post("/upload", data);
                }catch(err){
    
                }
            }       
            if(audio){
                const data = new FormData();
                const filename = Date.now() + audio.name;
                data.append("name",filename);
                data.append("file", audio);
                updatedPost.audio = filename;
                try{
                    await axios.post("/upload", data);
                }catch(err){
    
                }
            }
            await axios.put(`/posts/${post._id}`, updatedPost);
            setUpdateMode(false);
             }catch(err){
     
             }
    }

    return (
        <div className="singlePost">
           <div className="singlePostWrapper">
               {updateMode &&
           <div className="writeFormGroup">
                   <label htmlFor="imageInput">
                   <i className="writeIcon fa fa-camera"></i>
                   </label>
                   <input type="file" id="imageInput" accept="image/png,image/jpeg" style={{display:"none"}} onChange={e=>setImage(e.target.files[0])}/>
                   <label htmlFor="videoInput">
                   <i className="writeIcon fa fa-video-camera"></i>
                   </label>
                   <input type="file" id="videoInput"  accept="video/mp4" style={{display:"none"}} onChange={e=>setVideo(e.target.files[0])}/>
                   <label htmlFor="fileInput">
                   <i className="writeIcon fa fa-file-word"></i>
                   </label>
                   <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                   <label htmlFor="audioInput">
                   <i className="writeIcon fa fa-file-audio"></i>
                   </label>
                   <input type="file" id="audioInput" accept="audio/mp3" style={{display:"none"}} onChange={e=>setAudio(e.target.files[0])}/>
               </div>
}
               {post.photo  && (
               <img src={image ? URL.createObjectURL(image) :  PF + "images/" + post.photo } alt="" className="singlePostImg" /> )}
               {updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> : (
               <h1 className="singlePostTitle">
                   {title}
                   {post.username === user?.username &&(
                   <div className="singlePostEdit">
                    <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                   </div>
                   )}
               </h1>
               )}
               <div className="singlePostInfo">
                   <span className="singlePostAuthor">Author: 
                   <Link to={`/?user=${post.username}`} className="link">
                   <b>{post.username}</b>
                   </Link>
                   </span>
                   <ul className="singlePostCategories">
                   {post.categories && post.categories.map((c) => (
                    <Link to={`/?category=${c}`} className="link">
                    <li className="singlePostCategory">{c}</li>
                    </Link>
                ))}
                 </ul>
                   <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
               </div>
               {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> :
               <p className="singlePostDesc">{desc}</p>
                }
                {updateMode && (<button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
                {post.file &&
               <div className="writeFormGroup">
                    <label className="displayFile">
                    <i className="writeIcon fa fa-file-word ml-10px"></i>
                    <a href={file ? URL.createObjectURL(file) :  PF + "files/" + post.file } className="link ml-10px">{file ? file.name : post.file}</a>
                    </label>
               </div>
}
               {post.audio &&
               <div className="writeFormGroup">
                   <audio className="displayAudio" controls>
                   <source src={audio ? URL.createObjectURL(audio) :  PF + "songs/" + post.audio }/>
                  </audio>
                  </div>
                   }
                  {post.video &&
            <div className="writeFormGroup">
               <video className="displayVideo" controls >
                <source src={video ? URL.createObjectURL(video) :  PF + "videos/" + post.video }type="video/mp4"/>
                </video>
               </div>
            }

           </div>
        </div>
    )
}
