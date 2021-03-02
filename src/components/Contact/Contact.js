// import React, { Component } from "react";
// import storage from "../Firestore";
// import firebase from "../Firebase";

// class Contact extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       url: "",
//       progress: 0,
//       title: "",
//       description: "",
//       price: "",
//       name: "",
//       standard: "",

//     };
//   }

//   handleChange = e => {
//     if (e.target.files[0]) {
//       const image = e.target.files[0];
//       this.setState(() => ({ image }));
//     }
//   };



//   handleTitleChange = e => {
//     if (e.target.value) {
//       const title = e.target.value;
//       this.setState(() => ({ title }));
//     }
//   };
//   handleDescriptionChange = e => {
//     if (e.target.value) {
//       const description = e.target.value;
//       this.setState(() => ({ description }));
//     }
//   };
//   handlePriceChange = e => {
//     if (e.target.value) {
//       const price = e.target.value;
//       this.setState(() => ({ price }));
//     }
//   };
//   handleNameChange = e => {
//     if (e.target.value) {
//       const name = e.target.value;
//       this.setState(() => ({ name }));
//     }
//   };
//   handleStandardChange = e => {
//     if (e.target.value) {
//       const standard = e.target.value;
//       this.setState(() => ({ standard }));
//     }
//   };

//   handleUpload = e => {
//     const { image } = this.state;
//     const { title } = this.state;
//     const { description } = this.state;
//     const { price } = this.state;
//     const { name } = this.state;
//     const { standard } = this.state;
//     const uploadTask = 
//     storage.ref(`courses/${title}/ ${image.name}`).put(image);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         // progress function ...
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         this.setState({ progress });
//       },
//       error => {
//         // Error function ...
//         console.log(error);
//       },
//       () => {
//         // complete function ...
//         storage
//           .ref(`courses/${title}/`)
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             this.setState({ url });
//           });
//       }
//     );
//     e.preventDefault();

//     const db = firebase.firestore();
//     db.settings({
//       timestampsInSnapshots: true
//     });
//     const userRef = db.collection("courses")
//     .doc(this.state.title)
//     .set({
//       Title: this.state.title,
//       Description: this.state.description,
//       Price: this.state.price,
//       Tutor: this.state.name,
//       Rating: 0,
//       Standard: this.state.standard
//     }); 
//     this.setState({
//       Title: "",
//       Description: "",
//       Price: 0,
//       Tutor: "",
//       Standard: ""
//     });
//   };


//   render() {
//     return (
//       <div className="center">
//           <br/>
//           <h2 className="green-text">Upload Lectures</h2>
//           <br/>
//         <div className="file-field input-field">

//           <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
//             <p style={{width:500}} >Title of the Course Track</p>
//             <input className="file-path validate" type="text" name="title" placeholder="Title" value={this.state.title} style={{height:20,padding:5,margin:10}} onChange={this.handleTitleChange} />
//           </div>
//           <br/>
//           <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}}>
//             <p style={{width:500}}>Description of the video</p>
//             <input className="file-path validate" type="text" name="description" placeholder="Description" value={this.state.description} style={{height:20,padding:5,margin:10}} onChange={this.handleDescriptionChange} />
//           </div>
//           <br/>
//           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
//             <p style={{width:500}}>Price of the video</p>
//             <input className="file-path validate" type="text" name="price" placeholder="Price" value={this.state.price} style={{height:20,padding:5,margin:10}} onChange={this.handlePriceChange} />
//           </div>
//           <br/>
//           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
//             <p style={{width:500}}>Tutor's name</p>
//             <input className="file-path validate" type="text" name="name" placeholder="Tutor's Name" value={this.state.name} style={{height:20,padding:5,margin:10}} onChange={this.handleNameChange} />
//           </div>
//           <br/>
//           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
//             <p style={{width:500}}>Standard</p>
//             <input className="file-path validate" type="text" name="name" placeholder="Standard" value={this.state.standard} style={{height:20,padding:5,margin:10}} onChange={this.handleStandardChange} />
//           </div>
//           <br/>
//           <div className="btn" style={{flexDirection:'row', display:'inline-flex',marginLeft:150}} >
//           <p style={{height:20,padding:5,margin:10}} >File</p>

//             <input type="file" multiple onChange={this.handleChange}style={{height:20,padding:5,margin:10}} />

//             <progress value={this.state.progress} max="100" className="progress" style={{height:20,padding:5,margin:10}} />
//           </div>
//           <br/>

          
//         </div>
//         <button style={{height:20,margin:10}} 
//           onClick={this.handleUpload}
//           className="waves-effect waves-light btn"
//         >
//           Upload
//         </button>
//         <br />
//         <br />
//       </div>
//     );
//   }
// }

// export default Contact;


// import React, { Component } from "react";
// import storage from "../Firestore";
// import firebase from "../Firebase";

// class Contact extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { values: [] };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   createUI(){
//      return this.state.values.map((el, i) => 
//          <div key={i}>
//     	    <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} placeholder="Question" />
//           <br/>
//           <input type="text" placeholder="option1" onChange={this.handleChange.bind(this, i)} value={el||''}/>
//           <input type="text" placeholder="option2" onChange={this.handleChange.bind(this, i)} value={el||''}/>
//           <br/>
//           <input type="text" placeholder="option3" onChange={this.handleChange.bind(this, i)} value={el||''}/>
//           <input type="text" placeholder="option4" onChange={this.handleChange.bind(this, i)} value={el||''}/>
//           <br/>
//           <input type="text" placeholder="answer" onChange={this.handleChange.bind(this, i)} value={el||''}/>
//     	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
//          </div>          
//      )
//   }

//   handleChange(i, event) {
//      let values = [...this.state.values];
//      values[i] = event.target.value;
//      this.setState({ values });
//   }
  
//   addClick(){
//     this.setState(prevState => ({ values: [...prevState.values, '']}))
//   }
  
//   removeClick(i){
//      let values = [...this.state.values];
//      values.splice(i,1);
//      this.setState({ values });
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.values.join(', '));
//     event.preventDefault();
//     const db = firebase.firestore();
//     db.settings({
//       timestampsInSnapshots: true
//     });
//     const userRef = db.collection("quiz")
//     .doc("title")
//     .set({
//       q:this.state.values
//     }); 
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} style={{padding:200}} >
//           {this.createUI()}        
//           <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
//           <input type="submit" value="Submit"/>
//       </form>
//     );
//   }
// }

// export default Contact;

import React, { Component, useState } from "react";
import storage from "../Firestore";
import firebase from "../Firebase";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropdown from 'react-bootstrap/Dropdown';
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';

function Contact() {
    const initialValues = {
        numberOfQuestions: '',
        questions: [],
    };
    const [dbsize,setdbsize] = useState("");
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [sTime, setSTime] = useState(new Date()); 
    const [eTime, setETime] = useState(new Date());
    // const [flexibility, setFlexibility] = useState(false);
    // const [value, onChange] = useState('10:00');
    

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


    // const dab = firebase.firestore();
    //         dab.collection('quiz').get().then(snap => {
    //       setdbsize(snap.size);
    //     });

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

    // const handleDurationCheckBox = e => {
    //   flexibility == true? setFlexibility(false):setFlexibility(true);
    // }
    
 

    async function onSubmit(fields) {
      // var diff =(sTime.getTime() - eTime.getTime()) / 1000;
      // diff /= 60;
      // setDuration( Math.abs(Math.round(diff)));
      // const calcdur = Math.abs(Math.round(((sTime.getTime() - eTime.getTime()) / 1000)/60 ))
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 1));

        const db = await firebase.firestore();

        db.settings({
          timestampsInSnapshots: true
        });

        await db.collection('quiz').get().then(snap => {
          let s = snap.size;
          setdbsize(s);
          var q = "" + s;
        db.collection("quiz")
       .doc(q)
       .set({
         q:JSON.stringify(fields, null, 1),
         Title: title,
         StartTime: sTime,
         EndTime: eTime,
         Duration: duration
       });

       });
    }

  


    return (
      <div style={{padding:50}} >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}  >
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <h1 className="card-header">Upload Quiz</h1>
                        <input type="text" name="title" placeholder="Title" style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleTitleChange} /><br/><br/>
                        <input type="text" name="duration" placeholder="Duration in Minutes" style={{height:20,padding:5,margin:10,borderRadius:10}} onChange={handleDurationChange} />

                        {/* <input type="checkbox" onChange={handleDurationCheckBox}  />Fixed Duration */}
                        <br/><br/>
                        {/* <input type="text" name="stime" placeholder="Start time"  onChange={handleSTimeChange} /> */}
                        {/* <input type="text" name="etime" placeholder="End time"  onChange={handleETimeChange} /> */}
                        <DateTimePicker
        onChange={setSTime}
        value={sTime}
      /><br/><br/>
      <DateTimePicker minTime={sTime}
        onChange={setETime}
        value={eTime}
      /><br/><br/>
                        <div className="card-body border-bottom">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Questions</label>
                                    <Field name="numberOfQuestions">
                                    {({ field }) => (
                                        <select {...field} className={'form-control' + (errors.numberOfQuestions && touched.numberOfQuestions ? ' is-invalid' : '')} onChange={e => onChangeQuestions(e, field, values, setValues)}>
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
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label>Question</label>
                                                <Field name={`questions.${i}.question`} type="text" placeholder="Question" className={'form-control' + (questionErrors.question && questionTouched.question ? ' is-invalid' : '' )} style={{width:500,height:20,padding:5,margin:10,borderRadius:10}} />
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
                            <button type="submit" className="btn btn-primary mr-1" style={{backgroundColor:"green",width:100,height:50,borderRadius:10,color:"white"}}>
                                Upload Quiz
                            </button>
                            <button className="btn btn-secondary mr-1" type="reset" style={{backgroundColor:"grey",width:100,height:50,borderRadius:10,color:"white",marginLeft:50}}>Reset</button>
                        </div>
                        
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default Contact;