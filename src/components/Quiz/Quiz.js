import React, { Component } from "react";
import storage from "../Firestore";
import firebase from "../Firebase";
import Card from 'react-bootstrap/Card';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      progress: 0,
      title: "",
      stime: "",
      etime: "",
      duration: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      q: []
    };
  }


  handleTitleChange = e => {
    if (e.target.value) {
      const title = e.target.value;
      this.setState(() => ({ title }));
    }
  };
  handleSTimeChange = e => {
    if (e.target.value) {
      const stime = e.target.value;
      this.setState(() => ({ stime }));
    }
  };
  handleETimeChange = e => {
    if (e.target.value) {
      const etime = e.target.value;
      this.setState(() => ({ etime }));
    }
  };
  handleDurationChange = e => {
    if (e.target.value) {
      const duration = e.target.value;
      this.setState(() => ({ duration }));
    }
  };
  handleAnswerChange = e => {
    if (e.target.value) {
      const answer = e.target.value;
      this.setState(() => ({ answer }));
    }
  };
  handleQuestionChange = e => {
    if (e.target.value) {
      const question = e.target.value;
      this.setState(() => ({ question }));
    }
  };
  handleOption1Change = e => {
    if (e.target.value) {
      const option1 = e.target.value;
      this.setState(() => ({ option1 }));
    }
  };
  handleOption2Change = e => {
    if (e.target.value) {
      const option2 = e.target.value;
      this.setState(() => ({ option2 }));
    }
  };
  handleOption3Change = e => {
    if (e.target.value) {
      const option3 = e.target.value;
      this.setState(() => ({ option3 }));
    }
  };
  handleOption4Change = e => {
    if (e.target.value) {
      const option4 = e.target.value;
      this.setState(() => ({ option4 }));
    }
  };

  press = e => {
    this.setState(prevState => ({
      q: [...prevState.q, this.state.question+';'+this.state.option1+';'+this.state.option2+';'+this.state.option3+';'+this.state.option4+';'+this.state.answer]
    }))
  }

  handleUpload = e => {
    alert('Quiz Uploaded');
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("quiz")
    .doc(this.state.title)
    .set({
      Q: this.state.q,
      duration: this.state.duration,
      endTime: this.state.etime,
      quizId: "LNG002",
      startTime: this.state.stime,
    }); 
  };


  render() {
    return (
      <div className="center">
          <br/>
          <h2 className="green-text">Upload Quiz</h2>
          <br/>
        <div className="file-field input-field" >

          <div style={{backgroundColor:"#0074d9",color:"white",borderRadius:20, justifyContent: "center", alignItems: "center",marginLeft:500,marginRight:400}} >  
        <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >Title of the quiz</p>
            <input className="file-path validate" type="text" name="title" placeholder="Quiz Title" value={this.state.title} style={{height:20,padding:5,margin:10}} onChange={this.handleTitleChange} />
          </div>
          <br/>

          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >Start Time</p>
            <input className="file-path validate" type="text" name="title" placeholder="Quiz Title" value={this.state.stime} style={{height:20,padding:5,margin:10}} onChange={this.handleSTimeChange} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >End Time</p>
            <input className="file-path validate" type="text" name="title" placeholder="Quiz Title" value={this.state.etime} style={{height:20,padding:5,margin:10}} onChange={this.handleETimeChange} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >Duration</p>
            <input className="file-path validate" type="text" name="title" placeholder="Quiz Title" value={this.state.duration} style={{height:20,padding:5,margin:10}} onChange={this.handleDurationChange} />
          </div>
          </div>
          <br/>
<div style={{backgroundColor:"#0074d9",color:"white",borderRadius:20, justifyContent: "center", alignItems: "center",marginLeft:500,marginRight:400}} >
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:200}} >Question</p>
            <input className="file-path validate" type="text" name="question" placeholder="Question" value={this.state.question} style={{height:20,padding:5,margin:10,width:500}} onChange={this.handleQuestionChange} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}}>
            <input className="file-path validate" type="text" name="option1" placeholder="Option 1" value={this.state.option1} style={{height:20,padding:5,margin:10}} onChange={this.handleOption1Change} />
          </div>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <input className="file-path validate" type="text" name="option2" placeholder="Option 2" value={this.state.option2} style={{height:20,padding:5,margin:10}} onChange={this.handleOption2Change} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <input className="file-path validate" type="text" name="option3" placeholder="Option 3" value={this.state.option3} style={{height:20,padding:5,margin:10}} onChange={this.handleOption3Change} />
          </div>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <input className="file-path validate" type="text" name="option4" placeholder="Option 4" value={this.state.option4} style={{height:20,padding:5,margin:10}} onChange={this.handleOption4Change} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >Answer</p>
            <input className="file-path validate" type="text" name="answer" placeholder="Answer" value={this.state.answer} style={{height:20,padding:5,margin:10}} onChange={this.handleAnswerChange} />
          </div>
        </div>
        </div>
        <button style={{height:20,margin:10}} 
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <button style={{height:20,margin:10}} 
          onClick={this.press}
          className="waves-effect waves-light btn"
        >
          addTest
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default Contact;