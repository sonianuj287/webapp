import React, {useState} from 'react';
import {compose} from 'recompose';
import Select from 'react-select';
import firebase from 'firebase';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

function GradingPage(){
  const postCourses = [];
  const optionsCourses = [];
  const postAssignment = [];
  const optionsAssignment = [];
  const postStudents = [];
  const optionsStudents = [];
  const gradelist = [{value:"A",label:"A"},{value:"B",label:"B"},{value:"C",label:"C"},{value:"D",label:"D"},{value:"E",label:"E"}];


  const [assignment, setAssignment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [student, setStudent] = useState("");
  const [grading, setGrading] = useState("");
  const [assURL, setAssURL] = useState("");  
  const [question, setQuestion] = useState("");

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);


  const handleNameChange = e => {
    setName(e);
  }

  const handleEmailChange = e => {
    if(email === ""){
    setEmail(e);
    getCourses(e);
    }
  };

  async function getCourses(e) {
    const db = firebase.firestore();
    db.collection('Teacher').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postCourses.push({ ...doc.data(), id: doc.id }));
      // console.log(postData);
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

  async function getAssignment(e) {
    const db = firebase.firestore();
    db.collection('Assignment').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postAssignment.push({ ...doc.data(), id: doc.id }));
      // console.log(postAssignment);
      for(let i=0;i<postAssignment.length;i++){
        // console.log(postAssignment[i].courseId)
          if(postAssignment[i].courseId == e){
              optionsAssignment.push({"value":postAssignment[i].assignmentId,"label":postAssignment[i].assignmentId});
          }
      }

    });
    setSelectedAssignment(optionsAssignment);
  }

  async function getStudents(e) {
    const db = firebase.firestore();
    db.collection('Assignment').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postStudents.push({ ...doc.data(), id: doc.id }));
      for(let i=0;i<postStudents.length;i++){
        // console.log(postStudents[i].answerFile);
          if(postStudents[i].assignmentId == e){  
            for(let j=0;j<postStudents[i].answerFile.length;j++){
              let stud = postStudents[i].answerFile[j].split("~")[0];
              let url = postStudents[i].answerFile[j].split("~")[1];
              optionsStudents.push({"value":url, "label":stud})
            }
          }
      }
    });
    setSelectedStudent(optionsStudents);
  }

  async function onUploadSubmission(e) {
    if(courseId=="" || assignment=="" || student=="" || grading==""){
        alert("Oops You missed some field !!!");
    }
    else{
    let userDocument = await firebase.firestore().collection("Assignment").doc(assignment).get()
    let dataObj = userDocument.data();
    let grade = dataObj.grading;
    let flag = 0;
    for(let i=0;i<grade.length;i++){
      if(grade[i].split("~")[0] == student.toString()){
        flag = 1;
      }
    }
    if(flag == 1){
      alert("Student is already graded");
    }
    else{
      let s = student.toString() + "~" + grading.toString();
      firebase.firestore().collection("Assignment").doc(assignment).update({
        grading: firebase.firestore.FieldValue.arrayUnion(s) 
        
      })
      alert("student graded");
    }

    }
  }

  const handleCourseChange = (e) => {
    if(courseId === ""){
      setCourseId(e.label);
      getAssignment(e.label);
    }
  }

  async function handleAssignmentChange(e) {
    if(assignment=== ""){
      setAssignment(e.label);
      getStudents(e.label);
      console.log(e.label);

      let userDocument = await firebase.firestore().collection("Assignment").doc(e.label).get()
      let dataObj = userDocument.data();
      let qfile = dataObj.questionFile;
      setQuestion(qfile);
    }
  }

  const handleStudentChange = (e) => {
    if(student=== ""){
      setStudent(e.label);
      setAssURL(e.value);
    }
  }

  const handleGradeChange = e => {
    setGrading(e.label);
  };


return(
    <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
    <div className="card m-3">
    <h1 className="card-header">Assignment Grading</h1>
    <div style={{height:'2%'}} ></div>
    <AuthUserContext.Consumer>
          {authUser => (
            handleNameChange(authUser.username),
            handleEmailChange(authUser.email)
            // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>
      )}
    </AuthUserContext.Consumer>
      <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
          <Select options={selectedCourse} onChange={handleCourseChange} placeholder="Select Course"/>
      </div>
      {/* <p>{courseId}</p> */}
      <div style={{opacity:0}} ></div>

      <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
          <Select options={selectedAssignment} onChange={handleAssignmentChange} placeholder="Select Assignment"/>
      </div>
      {/* <p>{assignment}</p> */}

    <div style={{opacity: assignment==''?0:100,alignSelf:'center',marginLeft:'43%'}} >
      <a target='_blank' href={question} class="active" >Question File</a>
    </div>

      <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
          <Select options={selectedStudent} onChange={handleStudentChange} placeholder="Select Student" />
      </div>
      {/* <p>{student}</p> */}

    <div style={{opacity: student==''?0:100,alignSelf:'center',marginLeft:'40%'}} >
      <a target='_blank' href={assURL} class="active">Student Submission</a>
    </div>

      <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
      <Select options={gradelist} onChange={handleGradeChange} placeholder="Grades"/>
    </div>
    {/* <p>{grading}</p> */}
    <div style={{height:'5%'}} ></div>
    <div className="card-footer text-center border-top-0">
    <button onClick={onUploadSubmission} style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}}>Submit Grading</button>
    </div>
  </div>
  </div>
)

}


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GradingPage);