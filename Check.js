
// // class question {

// //     constructor(question, answers, correct, type)
// //     {
// //         this.question = question;
// //         this.answers = answers;
// //         this.correct = correct;
// //         this.type = type;
// //     }

// // }

// // class Q {


// //     constructor(question, duration, startTime, endTime, quizId)
// //     {
// //         this.question = question;
// //         this.duration = duration;
// //         this.startTime = startTime;
// //         this.endTime = endTime;
// //         this.quizId = quizId;
// //     }
// //   }


// //   myQuestion1 = new question ("Who is handsome", ["Naresh", "Ujal", "Sunny", "Deepak"], "Deepak", "mcq")
// //   myQuestion2 = new question ("Who is beautiful", ["Bhattu", "Rajani", "Arati", "Disha"], "Disha", "mcq")

// //   myQ = new Q([myQuestion1, myQuestion2], 50, "12:12:2021", "12:12:2021", "LNG005");
// //   console.log(myQ)
// // import React, { Component } from "react";
// // import storage from "../Firestore";
// // import firebase from "../Firebase";

// // class Contact extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       image: null,
// //       url: "",
// //       progress: 0,
// //       title: "",
// //       description: "",
// //       price: "",
// //       name: "",
// //       standard: "",

// //     };
// //   }

// //   handleChange = e => {
// //     if (e.target.files[0]) {
// //       const image = e.target.files[0];
// //       this.setState(() => ({ image }));
// //     }
// //   };



// //   handleTitleChange = e => {
// //     if (e.target.value) {
// //       const title = e.target.value;
// //       this.setState(() => ({ title }));
// //     }
// //   };
// //   handleDescriptionChange = e => {
// //     if (e.target.value) {
// //       const description = e.target.value;
// //       this.setState(() => ({ description }));
// //     }
// //   };
// //   handlePriceChange = e => {
// //     if (e.target.value) {
// //       const price = e.target.value;
// //       this.setState(() => ({ price }));
// //     }
// //   };
// //   handleNameChange = e => {
// //     if (e.target.value) {
// //       const name = e.target.value;
// //       this.setState(() => ({ name }));
// //     }
// //   };
// //   handleStandardChange = e => {
// //     if (e.target.value) {
// //       const standard = e.target.value;
// //       this.setState(() => ({ standard }));
// //     }
// //   };

// //   handleUpload = e => {
// //     const { image } = this.state;
// //     const { title } = this.state;
// //     const { description } = this.state;
// //     const { price } = this.state;
// //     const { name } = this.state;
// //     const { standard } = this.state;
// //     const uploadTask = 
// //     storage.ref(`courses/${title}/ ${image.name}`).put(image);
// //     uploadTask.on(
// //       "state_changed",
// //       snapshot => {
// //         // progress function ...
// //         const progress = Math.round(
// //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
// //         );
// //         this.setState({ progress });
// //       },
// //       error => {
// //         // Error function ...
// //         console.log(error);
// //       },
// //       () => {
// //         // complete function ...
// //         storage
// //           .ref(`courses/${title}/`)
// //           .child(image.name)
// //           .getDownloadURL()
// //           .then(url => {
// //             this.setState({ url });
// //           });
// //       }
// //     );
// //     e.preventDefault();

// //     const db = firebase.firestore();
// //     db.settings({
// //       timestampsInSnapshots: true
// //     });
// //     const userRef = db.collection("courses")
// //     .doc(this.state.title)
// //     .set({
// //       Title: this.state.title,
// //       Description: this.state.description,
// //       Price: this.state.price,
// //       Tutor: this.state.name,
// //       Rating: 0,
// //       Standard: this.state.standard
// //     }); 
// //     this.setState({
// //       Title: "",
// //       Description: "",
// //       Price: 0,
// //       Tutor: "",
// //       Standard: ""
// //     });
// //   };


// //   render() {
// //     return (
// //       <div className="center">
// //           <br/>
// //           <h2 className="green-text">Upload Lectures</h2>
// //           <br/>
// //         <div className="file-field input-field">

// //           <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
// //             <p style={{width:500}} >Title of the Course Track</p>
// //             <input className="file-path validate" type="text" name="title" placeholder="Title" value={this.state.title} style={{height:20,padding:5,margin:10}} onChange={this.handleTitleChange} />
// //           </div>
// //           <br/>
// //           <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}}>
// //             <p style={{width:500}}>Description of the video</p>
// //             <input className="file-path validate" type="text" name="description" placeholder="Description" value={this.state.description} style={{height:20,padding:5,margin:10}} onChange={this.handleDescriptionChange} />
// //           </div>
// //           <br/>
// //           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
// //             <p style={{width:500}}>Price of the video</p>
// //             <input className="file-path validate" type="text" name="price" placeholder="Price" value={this.state.price} style={{height:20,padding:5,margin:10}} onChange={this.handlePriceChange} />
// //           </div>
// //           <br/>
// //           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
// //             <p style={{width:500}}>Tutor's name</p>
// //             <input className="file-path validate" type="text" name="name" placeholder="Tutor's Name" value={this.state.name} style={{height:20,padding:5,margin:10}} onChange={this.handleNameChange} />
// //           </div>
// //           <br/>
// //           <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
// //             <p style={{width:500}}>Standard</p>
// //             <input className="file-path validate" type="text" name="name" placeholder="Standard" value={this.state.standard} style={{height:20,padding:5,margin:10}} onChange={this.handleStandardChange} />
// //           </div>
// //           <br/>
// //           <div className="btn" style={{flexDirection:'row', display:'inline-flex',marginLeft:150}} >
// //           <p style={{height:20,padding:5,margin:10}} >File</p>

// //             <input type="file" multiple onChange={this.handleChange}style={{height:20,padding:5,margin:10}} />

// //             <progress value={this.state.progress} max="100" className="progress" style={{height:20,padding:5,margin:10}} />
// //           </div>
// //           <br/>

          
// //         </div>
// //         <button style={{height:20,margin:10}} 
// //           onClick={this.handleUpload}
// //           className="waves-effect waves-light btn"
// //         >
// //           Upload
// //         </button>
// //         <br />
// //         <br />
// //       </div>
// //     );
// //   }
// // }

// // export default Contact;


// // import React, { Component } from "react";
// // import storage from "../Firestore";
// // import firebase from "../Firebase";

// // class Contact extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { values: [] };
// //     this.handleSubmit = this.handleSubmit.bind(this);
// //   }

// //   createUI(){
// //      return this.state.values.map((el, i) => 
// //          <div key={i}>
// //     	    <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} placeholder="Question" />
// //           <br/>
// //           <input type="text" placeholder="option1" onChange={this.handleChange.bind(this, i)} value={el||''}/>
// //           <input type="text" placeholder="option2" onChange={this.handleChange.bind(this, i)} value={el||''}/>
// //           <br/>
// //           <input type="text" placeholder="option3" onChange={this.handleChange.bind(this, i)} value={el||''}/>
// //           <input type="text" placeholder="option4" onChange={this.handleChange.bind(this, i)} value={el||''}/>
// //           <br/>
// //           <input type="text" placeholder="answer" onChange={this.handleChange.bind(this, i)} value={el||''}/>
// //     	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
// //          </div>          
// //      )
// //   }

// //   handleChange(i, event) {
// //      let values = [...this.state.values];
// //      values[i] = event.target.value;
// //      this.setState({ values });
// //   }
  
// //   addClick(){
// //     this.setState(prevState => ({ values: [...prevState.values, '']}))
// //   }
  
// //   removeClick(i){
// //      let values = [...this.state.values];
// //      values.splice(i,1);
// //      this.setState({ values });
// //   }

// //   handleSubmit(event) {
// //     alert('A name was submitted: ' + this.state.values.join(', '));
// //     event.preventDefault();
// //     const db = firebase.firestore();
// //     db.settings({
// //       timestampsInSnapshots: true
// //     });
// //     const userRef = db.collection("quiz")
// //     .doc("title")
// //     .set({
// //       q:this.state.values
// //     }); 
// //   }

// //   render() {
// //     return (
// //       <form onSubmit={this.handleSubmit} style={{padding:200}} >
// //           {this.createUI()}        
// //           <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
// //           <input type="submit" value="Submit"/>
// //       </form>
// //     );
// //   }
// // }

// // export default Contact;

// import React, { Component, useState } from "react";
// import storage from "../Firestore";
// import firebase from "../Firebase";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
// import * as Yup from 'yup';


// function Contact() {
//     const initialValues = {
//         numberOfQuestions: '',
//         questions: []
//     };
//     const [size, setSize] = useState(0);
//     const [title, setTitle] = useState("");
//     const [duration, setDuration] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [startTime, setStartTime] = useState("");

//     const validationSchema = Yup.object().shape({
//         numberOfQuestions: Yup.string()
//             .required('Number of Questions is required'),
//         questions: Yup.array().of(
//             Yup.object().shape({
//                 question: Yup.string()
//                     .required('Question is required'),
//                 option1: Yup.string()
//                     .required('Answer is required'),
//                 option2: Yup.string()
//                     .required('Answer is required'),
//                 option3: Yup.string()
//                     .required('Answer is required'),
//                 option4: Yup.string()
//                     .required('Answer is required'),
//                 answer: Yup.string()
//                     .required('Answer is required'),
//             })
//         )
//     });

//     function onChangeQuestions(e, field, values, setValues) {
//         // update dynamic form
//         const questions = [...values.questions];
//         const numberOfQuestions = e.target.value || 0;
//         const previousNumber = parseInt(field.value || '0');
//         if (previousNumber < numberOfQuestions) {
//             for (let i = previousNumber; i < numberOfQuestions; i++) {
//                 questions.push({ question: '', option1: '', option2: '', option3: '', option4: '', answer: '' });
//             }
//         } else {
//             for (let i = previousNumber; i >= numberOfQuestions; i--) {
//                 questions.splice(i, 1);
//             }
//         }
//         setValues({ ...values, questions });

//         // call formik onChange method
//         field.onChange(e);
//     }

//     function getSize(){
//       const db = firebase.firestore();
//       db.collection('quiz').get().then(snap => {
//         setSize(snap.size);
//      });
//     }

//     getSize();

//     function onSubmit(fields) {
//         // display form field values on success
//         alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 1));
//         const db = firebase.firestore();
//         db.settings({
//           timestampsInSnapshots: true
//         });


//         const userRef = db.collection("quiz")
//         .doc(size+1)
//         .set({
//           q:JSON.stringify(fields, null, 1),
//           Title: title,
//           Duration: duration,
//           EndTime: endTime,
//           StartTime: startTime,
//         });

//     }

//     return (
//       <div style={{padding:200}} >
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}  >
//             {({ errors, values, touched, setValues }) => (
//                 <Form>
//                     <div className="card m-3">
//                         <h5 className="card-header">Upload Quiz</h5>



//                         <div>
//                         <input type="text" name="title" placeholder="Title of the quiz" onChange={text=>setTitle(text)} />
//                         <input type="text" name="duration" placeholder="Duration of the quiz" onChange={text=>setDuration(text)} />
//                         <input type="text" name="eTime" placeholder="End Time" onChange={text=>setEndTime(text)} />
//                         <input type="text" name="sTime" placeholder="Start Time" onChange={text=>setStartTime(text)} />
//                         </div>





//                         <div className="card-body border-bottom">
//                             <div className="form-row">
//                                 <div className="form-group">
//                                     <label>Number of Questions</label>
//                                     <Field name="numberOfQuestions">
//                                     {({ field }) => (
//                                         <select {...field} className={'form-control' + (errors.numberOfQuestions && touched.numberOfQuestions ? ' is-invalid' : '')} onChange={e => onChangeQuestions(e, field, values, setValues)}>
//                                             <option value=""></option>
//                                             {[1,2,3,4,5,6,7,8,9,10].map(i => 
//                                                 <option key={i} value={i}>{i}</option>
//                                             )}
//                                         </select>
//                                     )}
//                                     </Field>
//                                     <ErrorMessage name="numberOfQuestions" component="div" className="invalid-feedback" />
//                                 </div>
//                             </div>
//                         </div>
//                         <FieldArray name="questions">
//                         {() => (values.questions.map((question, i) => {
//                             const questionErrors = errors.questions?.length && errors.questions[i] || {};
//                             const questionTouched = touched.questions?.length && touched.questions[i] || {};
//                             return (
//                                 <div key={i} className="list-group list-group-flush">
//                                     <div className="list-group-item">
//                                         <h5 className="card-title">Question {i + 1}</h5>
//                                         <div className="form-row">
//                                             <div className="form-group col-6">
//                                                 <label>Question</label>
//                                                 <Field name={`questions.${i}.question`} type="text" className={'form-control' + (questionErrors.question && questionTouched.question ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`tickets.${i}.name`} component="div" className="invalid-feedback" />
//                                             </div>
//                                             <div className="form-group col-6">
//                                                 <label>Option 1</label>
//                                                 <Field name={`questions.${i}.option1`} type="text" className={'form-control' + (questionErrors.option1 && questionTouched.option1 ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`questions.${i}.option1`} component="div" className="invalid-feedback" />
//                                             </div>
//                                             <div className="form-group col-6">
//                                                 <label>Option 2</label>
//                                                 <Field name={`questions.${i}.option2`} type="text" className={'form-control' + (questionErrors.option2 && questionTouched.option2 ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`questions.${i}.option1`} component="div" className="invalid-feedback" />
//                                             </div>
//                                             <div className="form-group col-6">
//                                                 <label>Option 3</label>
//                                                 <Field name={`questions.${i}.option3`} type="text" className={'form-control' + (questionErrors.option3 && questionTouched.option3 ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`questions.${i}.option3`} component="div" className="invalid-feedback" />
//                                             </div>
//                                             <div className="form-group col-6">
//                                                 <label>Option 4</label>
//                                                 <Field name={`questions.${i}.option4`} type="text" className={'form-control' + (questionErrors.option4 && questionTouched.option4 ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`questions.${i}.option1`} component="div" className="invalid-feedback" />
//                                             </div>
//                                             <div className="form-group col-6">
//                                                 <label>Answer</label>
//                                                 <Field name={`questions.${i}.answer`} type="text" className={'form-control' + (questionErrors.answer && questionTouched.answer ? ' is-invalid' : '' )} />
//                                                 <ErrorMessage name={`questions.${i}.answer`} component="div" className="invalid-feedback" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         }))}
//                         </FieldArray>
//                         <div className="card-footer text-center border-top-0">
//                             <button type="submit" className="btn btn-primary mr-1">
//                                 Upload Quiz
//                             </button>
//                             <button className="btn btn-secondary mr-1" type="reset">Reset</button>
//                         </div>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//         </div>
//     )
// }

// export default Contact;