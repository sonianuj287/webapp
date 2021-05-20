import React, { Component, useState, useEffect } from "react";
import firebase from "firebase";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';

const condition = authUser => !!authUser;


const LecturesPage = () => {
  const [files, setFiles] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [standard,setStandard] = useState("");
  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState([]);
  const [id, setId] = useState('');
  const postData = [];
  const options = [];

  if(id == ''){
    firebase.firestore().collection('Teacher').onSnapshot((snapshot) => {
      
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      for(let i=0;i<postData.length;i++){
        // console.log(postData[i]);

        if(postData[i].email == email){

            setId(postData[i].teacherId);
            // setCourse(postData[i].courses);
            
        }
      }
      console.log(postData);
    });
    
  }
  // console.log(id);



const onFileChange = (e) => {
    const image = e.target.files[0]
    setFiles(image);
}


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
    setName(e);
  };
  const handleEmailChange = e => {
    setEmail(e);
  };
const handleStandardChange = e => {
    if (e.target.value) {
      const standard = e.target.value;
      setStandard(standard);
    }
  };


  const Resetter=()=>{
    setTitle("");
    setDescription("");
    setPrice("");
    setName("");
    setStandard("");
    setFiles([]);
    setProgress(0);
  }


  async function onUploadSubmission(e) {
    e.preventDefault();



      if(title=="" || description=="" || price==""  || standard==""){
        alert("Oops You missed some field !!!");
      }
      else{
      e.preventDefault(); // prevent page refreshing
        const promises = [];


        // const db = firebase.firestore();

        // db.settings({
        //     timestampsInSnapshots: true
        // });
         const uploadTask = 
          firebase.storage().ref().child(`Course/Course Image/${files.name}`).put(files);

            uploadTask.on(
               firebase.storage.TaskEvent.STATE_CHANGED,
               snapshot => {
                const progress = 
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                    console.log(`Progress: ${progress}%`);
                    setProgress(progress);
                    if(parseInt(progress) === 100){
                      alert('Course created successfully');
                      Resetter();
                    }
                   }
                 },
                 error => console.log(error.code),
                 async () => {
                   const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                  }
                 );

                 uploadTask.then(()=>{
                    console.log('Course Track Uploaded');

                    firebase.storage().ref(`Course/Course Image/${files.name}`)
                    .getDownloadURL()
                    .then((url)=>{
                        console.log(url);
                        const userRef = firebase.firestore().collection("Course")
                        .get()
                        .then(snap => {
                            let s = snap.size;
                            s = s+1;
                            var q = "CLNG" + s;

                            // course.push(q);
                            
                            // console.log(course);
                            // console.log(id);

                            firebase.firestore().collection("Teacher").doc(id).update({
                              courses: firebase.firestore.FieldValue.arrayUnion(q) 
                            })



                            firebase.firestore().collection("Course")
                            .doc(q)
                            .set({
                                comments:[],
                                courseDescription: description,
                                courseImage:url,
                                courseName: title,
                                coursePrice: price,
                                courseRating:{"five":0,"four":0,"three":0,"two":0,"one":0,"rating":0,"total":0},
                                courseTutor: name,
                                ratedBy:[],
                                courseVideos: [],
                                dislikes:[],
                                likes:[],
                                courseId: q,
                                standard: standard,
                                studentList:[],
                            })
                        })
                    })
                }).catch((e) => {
                    console.log('uploading image error => ', e);
                });
        //    Promise.all(promises)
        //     .then(() => alert('All files uploaded'))
        //     .catch(err => console.log(err.code));
        
          }
          
     }



return (
  <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
  <div className="card m-3">
<form>
  <h1 className="card-header">Create Course</h1>
          <br/>
            <input className="file-path validate" type="text" name="title" placeholder="Title" value={title} style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleTitleChange} />
          <br/><br/><br/>
            <textarea name="description" placeholder="Description" value={description} style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleDescriptionChange}/>
          <br/><br/><br/>
            <input className="file-path validate" type="text" name="price" placeholder="Price" value={price} style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handlePriceChange} />


            {/* <input className="file-path validate" type="text" name="name" placeholder="Tutor's Name" value={name} style={{height:30,padding:5,margin:10,borderRadius:5,width:'97%'}} onChange={handleNameChange} /> */}
            <AuthUserContext.Consumer>
            {authUser => (
              handleNameChange(authUser.username),
              handleEmailChange(authUser.email)
              // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>

    )}
  </AuthUserContext.Consumer>
          
          <br/><br/><br/>
            <input className="file-path validate" type="text" name="name" placeholder="Standard" value={standard} style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleStandardChange} />
          <br/>
<br/>


          <div style={{alignSelf:'center',marginLeft:'40%'}} >
 <label>Select course Image        
   <input type="file" onChange={onFileChange} />
 </label>
 <br/>
 <br/>
 <br/>
 <progress value={progress} max="100" style={{height:25, transition:'ease-in-out'}} />
 <span>  {parseInt(progress)}%</span>
 </div>

 <br/>
 <div className="card-footer text-center border-top-0">
 <button onClick={onUploadSubmission} style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}} >Upload</button>
 <button onClick={Resetter} style={{backgroundColor:"grey",width:100,height:60,borderRadius:10,color:"white",marginLeft:50}} >Reset</button>
 </div>
</form>
</div>
</div>
)
    };

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(LecturesPage);

