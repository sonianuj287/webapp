import React, {useState} from 'react';
import {compose} from 'recompose';
import Select from 'react-select';
import firebase from 'firebase';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

function HomePage(){
  const postCourses = [];
  const optionsCourses = [];
  const postCoursesName = [];
  const optionsCoursesName = [];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teacherImage, setTeacherImage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState([]);

  async function getCourses(e) {
    const db = firebase.firestore();
    db.collection('Teacher').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postCourses.push({ ...doc.data(), id: doc.id }));
      for(let i=0;i<postCourses.length;i++){
          if(postCourses[i].email == e){
              optionsCourses.push(postCourses[i].courses);
              setTeacherImage(postCourses[i].teacherPhoto);
          }
      }
    });
    
    db.collection('Course').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => postCoursesName.push({ ...doc.data(), id: doc.id }));
      let tempArray = []
      for(let i=0;i<postCoursesName.length;i++){
        for(let j=0;j<optionsCourses[0].length;j++){
          if(optionsCourses[0][j] == postCoursesName[i].courseId){
            tempArray.push({"name":postCoursesName[i].courseName,"id":postCoursesName[i].courseId,"img":postCoursesName[i].courseImage});
          }
        }
      }
      setSelectedCourse(tempArray);
    });
  }




  const handleNameChange = e => {
    setName(e);
  }

  const handleEmailChange = e => {
    if(email === ""){
    setEmail(e);
    getCourses(e);
    // getCoursesName()
    }
  };







return(
  <div style={{padding:100}} >
    <AuthUserContext.Consumer>
          {authUser => (
            handleNameChange(authUser.username),
            handleEmailChange(authUser.email)
            // <h1 onLoad={handleNameChange(authUser.email)} >Account: {authUser.email}</h1>
      )}
    </AuthUserContext.Consumer>
    <div style={{display:"flex", flexDirection:"row"}} >
    <img src={teacherImage} alt="Profile picture" style={{height:50,width:50,borderRadius:100,marginTop:20,marginRight:20}} />
    <h1>Welcome {name}</h1>
    </div>
    <div style={{padding:50}} ></div>
    <h2>Courses you are serving</h2>

    <ol style={{display:"flex", flexDirection:"row"}} >
      {selectedCourse.map((c) => (
        <li style={{marginLeft:30}} ><h3>{c.id+' - '+c.name}</h3>
        <img src={c.img} alt="course Image" style={{height:200,width:300,borderRadius:10}} />
        </li>
      ))}
    </ol>
</div>
)

}


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);

