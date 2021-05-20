import firebase from "firebase";
import React,{useState,useEffect} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { compose } from 'recompose';
import Select from 'react-select'

const condition = authUser => !!authUser;

function VideoUploadPage() {
  const postData = [];
  const options = [];
  const [cd, setCd] = useState('');
  const [cn, setCn] = useState('');
  const [cp, setCp] = useState('');
  const [ct, setCt] = useState('');
  const [files, setFiles] = useState([]);
  const [desc, setDesc] = useState("");
  const [len, setLen] = useState("");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [email,setEmail] = useState("");
  const [courseImage, setCourseImage] = useState(null);


async function getOptions(e) {
  const db = firebase.firestore();
  db.collection('Teacher').onSnapshot((snapshot) => {
    snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
    for(let i=0;i<postData.length;i++){
      if(postData[i].email == e){
        
        // console.log(postData[i].courses)
        options.push({"value":postData[i].courses,"label":postData[i].courses});
      }
    }
    console.log(options);
  });
  setSelectedOptions(options);
}



  const Resetter=()=>{
    setCd('');
    setCn('');
    setCp('');
    setCt('');
    setFiles([]);
    setDesc("");
    setLen("");
    setName("");
    setProgress(0);
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
  

  async function onUploadSubmission(e) {
    e.preventDefault();
// console.log(typeof cd[0]);

    const userRef = await firebase.firestore().collection("Course").doc(cd[0]).get();
    const db = await firebase.firestore().collection("Course").doc(cd[0]);
    // setCourseImage(userRef.data().courseImage);

    // console.log(userRef.data())


    files.forEach(file => {
      const uploadTask = 
        firebase.storage().ref().child(`Course/${cd}/${file.name}`).put(file);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if(snapshot.state === firebase.storage.TaskState.RUNNING){
                console.log(`Progress:${progress}%`);
                setProgress(progress);
                if(parseInt(progress) === 100){
                  alert('Lecture Video uploaded successfully');
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
          firebase.storage().ref(`Course/${cd}/${file.name}`)
            .getDownloadURL()
            .then((url) =>{
              console.log(url);

              let mp = {"videoDescription":desc,"videoLength":len,"videoName":name,"videoUrl":url,"videoPoster":userRef.data().courseImage};


              
            let d = userRef.data()
            let cv = d.courseVideos
            // console.log(d);
            // cv.push(mp)
            // console.log(cv);


            db.update({
              courseVideos: firebase.firestore.FieldValue.arrayUnion(mp)
            })
        })

      })
    })
  }







  const onFileChange = e => {
    for (let i = 0; i < e.target.files.length; i++) {
         const newFile = e.target.files[i];
         newFile["id"] = Math.random();
      // add an "id" property to each File object
         setFiles(prevState => [...prevState, newFile]);
       }
     };

     const onDescChange = e => {
      if (e.target.value) {
        const desc = e.target.value;
        setDesc(desc);
      }
    };

    const onLenChange = e => {
      if (e.target.value) {
        const len = e.target.value;
        setLen(len);
      }
    };

    const onNameChange = e => {
      if (e.target.value) {
        const name = e.target.value;
        setName(name);
      }
    };


  // const handleDrop = (event) => {
  //   setCd(event.value);
  //   for(let i=0;i<postData.length;i++){
  //     if(postData[i].id == event.value){
  //       setCn(postData[i].courseName);
  //       setCp(postData[i].coursePrice);
  //       setCt(postData[i].courseTutor);
  //     }
  //   }
  // }

  const handleChange = (e) => {
    console.log(e)
  //  setId(e.value);
  //  setName(e.label);
   setCd(e.label);
   for(let i=0;i<postData.length;i++){
     if(postData[i].id == e.label){
       setCn(postData[i].courseName);
       setCp(postData[i].coursePrice);
       setCt(postData[i].courseTutor);
     }
   }
  }

 

  

  // console.log(posts);
  return (
    <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
    <div className="card m-3">
    <h1 className="card-header">Upload Lecture Videos</h1>
    <br/>
    {/* <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
      <Dropdown options={options} onChange={handleDrop} value={defaultOption} placeholder="Select an option"  />
      </div> */}
                  <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
                        {/* <Dropdown options={options} onChange={handleDrop} value={defaultOption} placeholder="Select an option"  /> */}
                        <Select options={selectedOptions} onChange={handleChange}/>
                        
                        </div>
      <br/>
      <div style={{marginLeft:'30%'}} >
      {/* <label>Course Description - {cd}</label>
      <br/><br/>
      <label>Course Name - {cn}</label>
      <br/><br/>
      <label>Course Price - {cp}</label>
      <br/><br/>
      <label>Course Tutor - {ct}</label> */}
      <br/>
      </div>
      <form >
  <textarea type='text' placeholder="desciption" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={onDescChange} />
  <br/>
  <br/>
  <input type='text' placeholder="length" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={onLenChange}/>
  <br/>
  <br/>
  <input type='text' placeholder="name" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={onNameChange}/>
  <br/>
  <br/>

  <div style={{alignSelf:'center',marginLeft:'40%'}} >
 <label>Select Video       
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
  <button onClick={onUploadSubmission} style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}}>Upload</button>
  <button onClick={Resetter} style={{backgroundColor:"grey",width:100,height:60,borderRadius:10,color:"white",marginLeft:50}} >Reset</button>
  </div>

  <AuthUserContext.Consumer>
            {authUser => (
              handleNameChange(authUser.username),
              handleEmailChange(authUser.email)
              // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>
    )}
  </AuthUserContext.Consumer>

</form>
    </div>
    </div>
  );
}


export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(VideoUploadPage);