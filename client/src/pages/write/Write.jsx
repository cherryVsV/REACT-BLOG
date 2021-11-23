import { useEffect, useContext, useState } from "react"
import { Context } from "../../context/Context";
import axios from "axios";
import "./write.css"
import Creatable from 'react-select/creatable';


export default function Write()  {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState(null)
    const [audio, setAudio] = useState(null)
    const [categories, setCategories] = useState([])
    const {user} = useContext(Context)

    const [cats, setCats] = useState([]);

    useEffect(() => {
      const getCats = async () => {
        const res = await axios.get("/categories");
        const data = res.data.map(opt => ({ label: opt.name, value: opt.name }));
        setCats(data);
      };
      getCats();
    }, []);
    
    const handleCategory = (opt)=>{
        try{
             opt.map((option)=>{
                 const newCategory = {
                     name: option.value
                 };
                const res = axios.post("/categories", newCategory);
                if(categories.indexOf(option.value)===-1){
                categories.push(option.value)
                }
                console.log(categories)
            })
        }catch(err){console.log(err)}
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newPost = {
            username: user.username,
            title: title,
            description: desc,
            categories: categories
        };
        if(image){
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name",filename);
            data.append("file", image);
            newPost.photo = filename;
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
            newPost.file = filename;
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
            newPost.video = filename;
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
            newPost.audio = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){

            }
        }try{
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/"+res.data._id)
        }catch(err){

        }
    }
  
    return (
        <div className="write">
            {image && 
            <img src={URL.createObjectURL(image)} alt=""
            className="writeImg" />
            }
           <form className="writeForm" onSubmit={handleSubmit}>
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
                   <input 
                   type="text" 
                   placeholder="Title" 
                   className="writeInput" 
                   autoFocus={true}
                   onChange={e=>setTitle(e.target.value)}
                   />
               </div>
               
               <div className="writeFormGroup">
                   <label className="categoriesLabel">Choose categories: </label>
               <Creatable
               options={cats}
               onChange={opt => handleCategory(opt)}
               isMulti
               />
               </div>
               <div className="writeFormGroup">
                   <textarea 
                   placeholder="Tell your story..." 
                   type="text" 
                   className="writeInput writeText"
                   onChange={e=>setDesc(e.target.value)}
                   ></textarea>
               </div>
               {file &&
               <div className="writeFormGroup">
                    <label className="displayFile">
                    <i className="writeIcon fa fa-file-word ml-10px"></i>
                    <a href={URL.createObjectURL(file)} className="link ml-10px">{file.name}</a>
                    </label>
               </div>
}
               {audio &&
               <div className="writeFormGroup">
                   <audio className="displayAudio" controls>
                   <source src={URL.createObjectURL(audio)}/>
                  </audio>
                  </div>
                   }
                  {video &&
            <div className="writeFormGroup">
               <video className="displayVideo" controls >
                <source src={URL.createObjectURL(video)} type="video/mp4"/>
                </video>
               </div>
            }
               <button className="writeSubmit" type="submit">Publish</button>
           </form>
        </div>
    )
}
