import React, { Component, useState } from "react";
import firebase from "../Firebase";
import Button from 'react-bootstrap/Button';

const About = () => {

const [files, setFiles] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [name,setName] = useState("");
const [standard,setStandard] = useState("");

const onFileChange = e => {
 for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
   // add an "id" property to each File object
      setFiles(prevState => [...prevState, newFile]);
    }
  };

const handleTitleChange = e => {
    if (e.target.value) {
      const title = e.target.value;
      setTitle(title);
    }
  };
const handleDescriptionChange = e => {
    if (e.target.value) {
      const description = e.target.value;
      setDescription(description);
    }
  };
const handlePriceChange = e => {
    if (e.target.value) {
      const price = e.target.value;
      if (!Number(price)) {
        alert("price must be a number");
      }
      else{
        setPrice(price);
      }
    }
  };
const handleNameChange = e => {
    if (e.target.value) {
      const name = e.target.value;
      setName(name);
    }
  };
const handleStandardChange = e => {
    if (e.target.value) {
      const standard = e.target.value;
      setStandard(standard);
    }
  };



     const onUploadSubmission = e => {
      if(title=="" || description=="" || price=="" || name=="" || standard==""){
        alert("Oops You missed some field !!!");
      }
      else{
      const uploadTask = firebase.storage().ref().child(`courses/${title}/ ${files.name}`).put(files);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(`Progress: ${progress}%`);
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
             console.log('file uploading...')
          }
        },
        error => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log(downloadURL);
        // the web storage url for our file
        });
      e.preventDefault(); // prevent page refreshing
        const promises = [];
        files.forEach(file => {
         const uploadTask = 
          firebase.storage().ref().child(`courses/${title}/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
               firebase.storage.TaskEvent.STATE_CHANGED,
               snapshot => {
                const progress = 
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                    console.log(`Progress: ${progress}%`);
                   }
                 },
                 error => console.log(error.code),
                 async () => {
                   const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    // do something with the url
                  }
                 );
               });
           Promise.all(promises)
            .then(() => alert('All files uploaded'))
            .catch(err => console.log(err.code));

            const db = firebase.firestore();
            db.settings({
              timestampsInSnapshots: true
            });
            const userRef = db.collection("courses")
            .doc(title)
            .set({
              Title: title,
              Description: description,
              Price: price,
              Tutor: name,
              Rating: 0,
              Standard: standard
            }); 
          }
     }
  const Resetter=()=>{
    setTitle("");
    setDescription("");
    setPrice("");
    setName("");
    setStandard("");
    setFiles([]);
  }


return (
<form>
  <br/>
  <br/>
          <h1 className="green-text">Upload Lectures</h1>
          <br/>
          <div style={{marginRight:100}}>
<div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex',}} >
            <p style={{width:500}} >Title of the Course Track</p>
            <input className="file-path validate" type="text" name="title" placeholder="Title" value={title} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleTitleChange} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Description of the video</p>
            {/* <input className="file-path validate" type="text" name="description" placeholder="Description" value={description} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleDescriptionChange} /> */}
            <textarea name="description" placeholder="Description" value={description} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleDescriptionChange}/>
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Price of the video</p>
            <input className="file-path validate" type="text" name="price" placeholder="Price" value={price} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handlePriceChange} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Tutor's name</p>
            <input className="file-path validate" type="text" name="name" placeholder="Tutor's Name" value={name} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleNameChange} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Standard</p>
            <input className="file-path validate" type="text" name="name" placeholder="Standard" value={standard} style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleStandardChange} />
          </div>
          <br/>
          </div>
 <label>Select Files         
   <input type="file" multiple onChange={onFileChange} />
 </label>
 <br/>
 <br/>
 <button onClick={onUploadSubmission} style={{backgroundColor:"green",width:100,height:50,borderRadius:10,color:"white"}} >Upload</button>
 <p>            </p>
 <button onClick={Resetter} style={{backgroundColor:"grey",width:100,height:50,borderRadius:10,color:"white"}} >Reset</button>
</form>
)
    };
export default About;