import React,{useState} from 'react';
import emailjs from 'emailjs-com';
import Select from 'react-select';
import firebase from 'firebase';
import {compose} from 'recompose';
import DateTimePicker from 'react-datetime-picker';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

// const initialState = {
//   name: '',
//   email: '',
//   message: '',
// }

const SERVICE_ID = 'service_2krr5p8';
const TEMPLATE_ID = 'template_sd1udth';
const USER_ID = 'user_yNUT6j1wQLTwY3f7ircGp';

function LiveClassPage() {
const postCourses = [];
const optionsCourses = [];


const [selectedCourse, setSelectedCourse] = useState([]);
const [request, setRequest] = useState([]);
const [courseId, setCourseId] = useState("");
const [teacherEmail, setTeacherEmail] = useState("");
const [deadline, setDeadline] = useState(new Date());
const [topic, setTopic] = useState("");
// const [{ name, email, message }, setState] = useState(initialState);


const [message, setMessage] = useState("Hello Students, This mail is an acknowledgment for the registration of the next doubt clearance session. You will receive the meeting link shortly. The session will be held on: ");



function handleClick() {
    let tempArray = [];

    let top = "For the following topics: ";
    top = top + topic;


    for(let i=0;i<request.length;i++){
        let r = {"email":request[i].email, "message":message+deadline+top, "topic":request[i].topic};
        tempArray.push(r);
    }

    let uniqueTempArray = [];
    for(let i=0;i<tempArray.length;i++){
        if(!uniqueTempArray.includes(tempArray[i].email)){
            uniqueTempArray.push(tempArray[i].email);
        }
    }

    let resArray = []
    for(let i=0;i<uniqueTempArray.length;i++){
        let r = {"email":uniqueTempArray[i], "message":message+deadline+top};
        resArray.push(r);
    }




  for(let i=0;i<resArray.length;i++){
      emailjs.send(SERVICE_ID, TEMPLATE_ID, resArray[i], USER_ID).then(
          function (response) {
            console.log(response.status, response.text);
          },
          function (err) {
            console.log(err);
          }
        );
  }

  let t = "";
  for(let i=0;i<request.length;i++){
      t = t+(request[i].topic).toString();
      t = t+",";
  }
  let s = {"classLink":"","classSchedule":deadline,"includedTopics":t,"studentList":[]}
  
  firebase.firestore().collection("Live Class").doc(courseId).update({
    liveSession: firebase.firestore.FieldValue.arrayUnion(s) 
    
  })

  firebase.firestore().collection("Live Class").doc(courseId).update({
   requestedSessions: []
  })

  alert("Message Sent");
//   window.location.reload();
}



  const handleEmailChange = e => {
    if(teacherEmail === ""){
    setTeacherEmail(e);
    getCourses(e);
    }
  };

  async function getCourses(e) {
    const db = firebase.firestore();
    db.collection('Teacher').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postCourses.push({ ...doc.data(), id: doc.id }));
      for(let i=0;i<postCourses.length;i++){
          if(postCourses[i].email == e){
              for(let j=0;j<postCourses[i].courses.length;j++){
                optionsCourses.push({"value":postCourses[i].courses[j],"label":postCourses[i].courses[j]});
              }
          }
      }
    });
    setSelectedCourse(optionsCourses);
  }

  const [postLive, setPostLive] = useState([]);

  async function getRequests(e) {
    setPostLive([]);
      const db = await firebase.firestore();
      db.collection('Live Class').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => postLive.push({ ...doc.data(), id: doc.id}));
        
        let tempArray = [];
        for(let i=0;i<postLive.length;i++){
            if(postLive[i].id == e){
                for(let j=0;j<postLive[i].requestedSessions.length;j++){
                    tempArray.push({"topic":postLive[i].requestedSessions[j].requestedTopics,"email":postLive[i].requestedSessions[j].userId,"message":""});
                }
            }
        }
        setRequest(tempArray);
    })
  }

  const handleCourseChange = (e) => {
    if(courseId === ""){
      setCourseId(e.label);
      getRequests(e.label);
    }
  }

  const handleTopicChange = e => {
      setTopic(e.target.value);
  };

  return (
    <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
    <div className="card m-3">
    <h1 className="card-header">Live Class Requests</h1>
    <AuthUserContext.Consumer>
          {authUser => (
            handleEmailChange(authUser.email)
            // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>
      )}
    </AuthUserContext.Consumer>
    <br/>

      <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
          <Select options={selectedCourse} onChange={handleCourseChange} placeholder="Select Course"/>
          <ol>
      {request.map((c) => (
        <li><h4>{c.topic+' - '+c.email}</h4></li>
      ))}
    </ol>
      </div>


<br/>
<br/>


          
            <input type="text" name="topics" placeholder="Topics to be covered" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleTopicChange} /><br/><br/>
          


                <div className='form-group'>
                  <p className='help-block text-danger'></p>
                </div>
                <div style={{alignSelf:'center',marginLeft:'25%'}} >
          <label style={{paddingRight:18}}>Live Class Date:</label>
                <DateTimePicker minTime= {new Date()}
        onChange={setDeadline}
        value={deadline}
      /><br/><br/>
      </div>
      <div className="card-footer text-center border-top-0">
                <button type="submit" onClick={handleClick} style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}} >
                    
            Send mail
          </button>
          </div>
    </div>
    </div>
  );
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(LiveClassPage);