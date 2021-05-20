import React, { Component, useState, useEffect } from "react";
import firebase from "firebase";
import DateTimePicker from 'react-datetime-picker';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select'

const AssignmentPage = () => {

  const postData = [];
  const options = [];
  const defaultOption = options[0];
const [files, setFiles] = useState([]);
const [title, setTitle] = useState("");
const [courseid,setCourseid] = useState("");
const [downloadURL, setDownloadURL] = useState("");
const [deadline, setDeadline] = useState(new Date());
const [progress, setProgress] = useState(0);
const [selectedOptions, setSelectedOptions] = useState([]);
const [id, setId] =  useState("");
const [name, setName] = useState("");
const [email,setEmail] = useState("");


async function getOptions(e) {
  const db = firebase.firestore();
  db.collection('Teacher').onSnapshot((snapshot) => {
    snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
    console.log(postData);
    for(let i=0;i<postData.length;i++){
      if(postData[i].email == e){
        options.push({"value":postData[i].courses,"label":postData[i].courses});
      }
    }
    console.log(options);
  });
  setSelectedOptions(options);
}

const handleNameChange = e => {
  setName(e);
};
const handleEmailChange = e => {
  if(email === ""){
  setEmail(e);
  getOptions(e);
  }
};

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

const handleCourseidChange = e => {
    if (e.target.value) {
      const courseid = e.target.value;
      setCourseid(courseid);
    }
  };

  const handleDrop = (event) => {
    setCourseid(event.value);
  }

  const Resetter=()=>{
    setTitle("");
    setCourseid("");
    setFiles([]);
    setProgress(0);
  }



     const onUploadSubmission = e => {
      if(title=="" ||  courseid==""){
        alert("Oops You missed some field !!!");
      }
      else{
      e.preventDefault(); // prevent page refreshing
        const promises = [];
        files.forEach(file => {
         const uploadTask = 
          firebase.storage().ref().child(`Assignment/${title}/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
               firebase.storage.TaskEvent.STATE_CHANGED,
               snapshot => {
                const progress = 
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                    console.log(`Progress: ${progress}%`);
                    setProgress(progress);
                    if(parseInt(progress) === 100){
                      alert('Assignment uploded successfully');
                      Resetter();
                    }
                   }
                 },
                 error => console.log(error.code),
                 async () => {
                   const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    
                  }
                 );

                 
               

              

               uploadTask.then(() => {
                console.log('Assignment Uploaded');
                firebase.storage().ref(`Assignment/${title}/${file.name}`)
                    .getDownloadURL()
                    .then((url) => {
    
                        console.log(url);
            const userRef = firebase.firestore().collection("Assignment")
            .get()
            .then(snap => {
              let s = snap.size;
              s = s+1;
              var q = "ALNG" + s;
              firebase.firestore().collection("Assignment")
              .doc(q)
              .set({
                answerFile:{},
                assignmentId:"ALNG"+s,
                courseId: courseid[0],
                creationDate: new Date(),
                deadline: deadline,
                grading:{},
                questionFile:url,
                title: title,
                totalSubmission: 0
              });
            })

            
          });
    
    
            }).catch((e) => {
          
                console.log('uploading image error => ', e);
    
            });
          });


      
          }
     }

     const handleChange = (e) => {
      console.log(e)
     setId(e.value);
     setName(e.label);
     setCourseid(e.label);
    }



return (
  <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
  <div className="card m-3">
<form>
  <h1 className="card-header">Upload Assignment</h1>
          
          <br/>
            <input type="text" name="title" placeholder="Title" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleTitleChange} /><br/><br/>
          <br/>

          
            {/* <input className="file-path validate" type="text" name="courseid" placeholder="Course ID" value={courseid} style={{height:30,padding:5,margin:10,borderRadius:5,width:'97%'}} onChange={handleCourseidChange} /> */}
          
            <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
                        {/* <Dropdown options={options} onChange={handleDrop} value={defaultOption} placeholder="Select an option"  /> */}
                        <Select options={selectedOptions} onChange={handleChange}/>
                        
                        </div>
          
          
          <br/>
          <br/>
      <br/>
          <div style={{alignSelf:'center',marginLeft:'30%'}} >
          <label style={{paddingRight:18}}>Deadline:</label>
          <DateTimePicker minTime= {new Date()}
        onChange={setDeadline}
        value={deadline}
      />
      </div>
      <br/>
      <br/>
      <br/>
      <div style={{alignSelf:'center',marginLeft:'40%'}} >
 <label >Select Files         
   <input type="file" multiple onChange={onFileChange} />
 </label>
 <br/>
 <br/>
 <br/>
 <progress value={progress} max="100" style={{height:25, transition:'ease-in-out'}} />
 <span>  {parseInt(progress)}%</span>
 </div>
 <br/>

 <br/>
 <div className="card-footer text-center border-top-0">
 <button onClick={onUploadSubmission} style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}} >Upload</button>
 <button onClick={Resetter} style={{backgroundColor:"grey",width:100,height:60,borderRadius:10,color:"white",marginLeft:50}} >Reset</button>
 </div>
  <br/>

</form>
<AuthUserContext.Consumer>
            {authUser => (
              handleNameChange(authUser.username),
              handleEmailChange(authUser.email)
              // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>
    )}
  </AuthUserContext.Consumer>
</div>
</div>
)
    };

const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AssignmentPage);


