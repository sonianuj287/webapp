
import React, { Component, useState,useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from 'react-datetime-picker';
import firebase from "firebase";
import { compose } from 'recompose';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';


const condition = authUser => !!authUser;

function QuizPage() {
    const initialValues = {
        numberOfQuestions: '',
        questions: [],
    };
    const postData = [];
    const options = [];
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [sTime, setSTime] = useState(new Date()); 
    const [eTime, setETime] = useState(new Date());
    const [courseid, setCourseid] = useState("");
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
                for(let j=0;j<postData[i].courses.length;j++){
                    options.push({"value":postData[i].courses[j],"label":postData[i].courses[j]});
                }
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



    const validationSchema = Yup.object().shape({
        numberOfQuestions: Yup.string()
            .required('Number of Questions is required'),
        questions: Yup.array().of(
            Yup.object().shape({
                question: Yup.string()
                    .required('Question is required'),
                option1: Yup.string()
                    .required('Answer is required'),
                option2: Yup.string()
                    .required('Answer is required'),
                option3: Yup.string()
                    .required('Answer is required'),
                option4: Yup.string()
                    .required('Answer is required'),
                answer: Yup.string()
                    .required('Answer is required'),
            })
        )
    });

    function onChangeQuestions(e, field, values, setValues) {
        // update dynamic form
        const questions = [...values.questions];
        const numberOfQuestions = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOfQuestions) {
            for (let i = previousNumber; i < numberOfQuestions; i++) {
                questions.push({ question: '', option1: '', option2: '', option3: '', option4: '', answer: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOfQuestions; i--) {
                questions.splice(i, 1);
            }
        }
        setValues({ ...values, questions });

        // call formik onChange method
        field.onChange(e);
    }


    const handleTitleChange = e => {
      if (e.target.value) {
        const title = e.target.value;
        setTitle(title);
      }
    };
    const handleDurationChange = e => {
      if (e.target.value) {
        const duration = e.target.value;
        setDuration(duration);
      }
    };
    const handleSTimeChange = e => {
      if (e.target.value) {
        const stime = e.target.value;
        setSTime(stime);
      }
    };
    const handleETimeChange = e => {
      if (e.target.value) {
        const etime = e.target.value;
        setETime(etime);
      }
    };


      const handleDrop = (event) => {
        setCourseid(event.value);
      }

      const handleChange = (e) => {
        console.log(e)
       setId(e.value);
       setName(e.label);
       setCourseid(e.label);
      }
    
 

    async function onSubmit(fields) {



        var a = JSON.stringify(fields,null,1)
        var obj = JSON.parse(a);
        // console.log(obj.questions);

        var keys = [];

        for(var i =0;i<obj.questions.length;i++){
            var m = {question:obj.questions[i]["question"],
            options:[obj.questions[i]["option1"],obj.questions[i]["option2"],obj.questions[i]["option3"],obj.questions[i]["option4"]],correct:obj.questions[i]['answer']
            }
            keys.push(m)
        }
        console.log("pressed")

        const db = await firebase.firestore();

        await db.collection('Quiz').get().then(snap => {
          let s = snap.size;
            s = s+1;
          var q = "QLNG" + s;
          console.log(q);
        db.collection("Quiz")
       .doc(q)
       .set({
        courseId: courseid,
        duration: parseInt(duration),
        endTime: eTime,
        questions: keys,

        quizId:"QLNG"+s,
        startTime: sTime,
        totalAttempt: 0,
        title: title,
        studentList: [],
       });

       });
       alert('Quiz successfully uploaded');
    }


  


    return (
      <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
      <div className="card m-3">
               {/* <Dropdown options={teacherCourse} value={defaultOption} placeholder="Select an option" /> */}



        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}  >
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <h1 className="card-header">Upload Quiz</h1>
                        <br/>
                        <input type="text" name="title" placeholder="Title" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleTitleChange} /><br/><br/>
                        <input type="text" name="duration" placeholder="Duration in Minutes" style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} onChange={handleDurationChange} /><br/><br/>


                        {/* <input className="file-path validate" type="text" name="courseid" placeholder="Course ID" value={courseid} style={{height:30,padding:5,margin:10,borderRadius:5}} onChange={handleCourseidChange} /> */}
                        <div style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} >
                        {/* <Dropdown options={options} onChange={handleDrop} value={defaultOption} placeholder="Select an option"  /> */}
                        <Select options={selectedOptions} onChange={handleChange}placeholder="Select Course"/>
                        
                        </div>




                        {/* <input type="checkbox" onChange={handleDurationCheckBox}  />Fixed Duration */}
                        <br/><br/>
                        {/* <input type="text" name="stime" placeholder="Start time"  onChange={handleSTimeChange} /> */}
                        {/* <input type="text" name="etime" placeholder="End time"  onChange={handleETimeChange} /> */}
                        <div style={{alignSelf:'center',marginLeft:'30%'}} >
                            <label style={{paddingRight:10}}>Start time:</label>
                        <DateTimePicker
        onChange={setSTime}
        value={sTime}
      /><br/><br/>
      <label style={{paddingRight:18}}>End time:</label>
      <DateTimePicker minTime={sTime}
        onChange={setETime}
        value={eTime}
      />
      <br/><br/>
      <label>Number of Questions</label>
      <br/>
      </div>
                        <div style={{alignSelf:'center'}}>
                            <div className="form-row">
                                <div className="form-group">
                                    
                                                               
                                    <Field name="numberOfQuestions">
                                        
                                    {({ field }) => (
                                        <select {...field} style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}} className={'form-control' + (errors.numberOfQuestions && touched.numberOfQuestions ? ' is-invalid' : '')} onChange={e => onChangeQuestions(e, field, values, setValues)}>
                                            <option value=""></option>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                   
                                    <ErrorMessage name="numberOfQuestions" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                        <FieldArray name="questions">
                        {() => (values.questions.map((question, i) => {
                            const questionErrors = errors.questions?.length && errors.questions[i] || {};
                            const questionTouched = touched.questions?.length && touched.questions[i] || {};
                            return (
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title">Question {i + 1}</h5>
                                        <div>
                                            <div >
                                                <label>Question</label>
                                                <Field name={`questions.${i}.question`} type="text" placeholder="Question" className={'form-control' + (questionErrors.question && questionTouched.question ? ' is-invalid' : '' )} style={{height:30,padding:5,margin:10,borderRadius:5,width:'97%'}}  />
                                                <ErrorMessage name={`tickets.${i}.name`} component="div" className="invalid-feedback" />
                                            </div>
                                            <br/>
                                             
                                            <div className="form-group col-6" >
                                                <Field name={`questions.${i}.option1`} type="text" placeholder="Option1" className={'form-control' + (questionErrors.option1 && questionTouched.option1 ? ' is-invalid' : '' )} style={{marginLeft:80,height:20,padding:5,margin:10,borderRadius:10}} />
                                                <ErrorMessage name={`questions.${i}.option1`} component="div" className="invalid-feedback" />
                                                
                                                <Field name={`questions.${i}.option2`} type="text" placeholder="Option2" className={'form-control' + (questionErrors.option2 && questionTouched.option2 ? ' is-invalid' : '' )} style={{marginLeft:120,height:20,padding:5,margin:10,borderRadius:10}}/>
                                                <ErrorMessage name={`questions.${i}.option2`} component="div" className="invalid-feedback" />
                                            </div>
                                            <br/>
                                            <div className="form-group col-6">
                                                <Field name={`questions.${i}.option3`} type="text" placeholder="Option3" className={'form-control' + (questionErrors.option3 && questionTouched.option3 ? ' is-invalid' : '' )} style={{marginLeft:50,height:20,padding:5,margin:10,borderRadius:10}} />
                                                <ErrorMessage name={`questions.${i}.option3`} component="div" className="invalid-feedback" />
                                            
                                                <Field name={`questions.${i}.option4`} type="text" placeholder="Option4" className={'form-control' + (questionErrors.option4 && questionTouched.option4 ? ' is-invalid' : '' )} style={{marginLeft:100,height:20,padding:5,margin:10,borderRadius:10}} />
                                                <ErrorMessage name={`questions.${i}.option4`} component="div" className="invalid-feedback" />
                                            </div>
                                            <br/>
                                            <div className="form-group col-6">
                                                <label>Answer</label>
                                                <Field name={`questions.${i}.answer`} placeholder="Answer"  type="text" className={'form-control' + (questionErrors.answer && questionTouched.answer ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`questions.${i}.answer`} component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                        </FieldArray>
                        <br/>
                        <div className="card-footer text-center border-top-0">
                            <button type="submit" className="btn btn-primary mr-1" style={{backgroundColor:"green",width:100,height:60,borderRadius:10,color:"white"}}>
                                Upload Quiz
                            </button>
                            <button className="btn btn-secondary mr-1" type="reset" style={{backgroundColor:"grey",width:100,height:60,borderRadius:10,color:"white",marginLeft:50}}>Reset</button>
                        </div>
                        
                    </div>
                </Form>
            )}
        </Formik>
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
}

export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(QuizPage);