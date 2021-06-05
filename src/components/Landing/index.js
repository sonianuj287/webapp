import React,{ useEffect, useState } from 'react';
import logo from './logo.png';
import img1 from './img1.jpeg';
import img2 from './img2.png';
import background from "./img6.jpeg";
import sample from './Render.mp4';
import data from './data.json';
import emailjs from 'emailjs-com';
import firebase from 'firebase';

const initialState = {
  name: '',
  email: '',
  message: '',
}

const Landing = () => {
  const [{ name, email, message }, setState] = useState(initialState);


  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs
      .sendForm(
        'service_2krr5p8', 'template_zsog8up', e.target, 'user_yNUT6j1wQLTwY3f7ircGp'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
      alert("Message sent");
  }

  return(
  <div>




  <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  Learn And Grow
                  <span></span>
                </h1>
                <p>Powered by Infiknightians</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>





    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>Features</h2>
        </div>
        <div className='row'>

                <div className='col-xs-6 col-md-3'>
                  {' '}
                  <i className="fa fa-question-circle"></i>
                  <h3>On demand doubt classes</h3>
                  <p>Student can request for doubt classes via app</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  <i className="fa fa-line-chart"></i>
                  <h3>Ranking</h3>
                  <p>State level ranking and Regional ranking</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  <i className="fa fa-graduation-cap"></i>
                  <h3>Contribute</h3>
                  <p>Apply for teacher role</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  <i className="fa fa-language"></i>
                  <h3>Language freedom</h3>
                  <p>Courses available in many regional languages</p>
                </div>
        </div>
      </div>
    </div>






    <div id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            {' '}
            {/* <img src={logo} className='img-responsive' alt='' />{' '} */}
            <video style={{opacity:0.7}} className='videoTag' autoPlay loop muted height='300' > 
             <source src={sample} type='video/mp4' />
            </video>
          </div>
          <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>About Us</h2>
              <p>Learn and grow is a project initiated by two visionary 
                friends Anuj soni and Yogesh adhikari. Our fundamental motive is to  fill the gap 
                between students and teachers
                by providing a common platform to let them grow with learning.</p>
              <h3>Why Choose Us?</h3>
              <div className='list-style'>
                <div className='col-lg-6 col-sm-6 col-xs-12'>
                  <ul>
                    <li>Affordable courses with occasional discounts</li>
                    
                    <li>Live classes on personal requests</li>

                  </ul>
                </div>
                <div className='col-lg-6 col-sm-6 col-xs-12'>
                  <ul>
                  <li>Regular assignments to grab the attention of students</li>
                    <li>Weekly quizzes to test skills</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Our Services</h2>
          <p>
            Offered services are as per students requirement by keeping convenience, reliability and availability in mind.
          </p>
        </div>
        <div className='row'>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-money"></i>
                  <div className='service-desc'>
                    <h3>Affordable price</h3>
                    <p>cost for courses were kept less</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-book"></i>
                  <div className='service-desc'>
                    <h3>Self paced v/s Individual </h3>
                    <p>Providing freedom to students to choose course as there requirement</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-thumb-tack"></i>
                  <div className='service-desc'>
                    <h3>Tasks</h3>
                    <p>Assignments and quizzes available to make students more attentive</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-trophy"></i>
                  <div className='service-desc'>
                    <h3>Healthy competition</h3>
                    <p>Ranking system to create a Healthy competition environment among students</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-users"></i>
                  <div className='service-desc'>
                    <h3>Teach with us</h3>
                    <p>Open for everyone to join and teach along with our faculties</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  <i className="fa fa-desktop"></i>
                  <div className='service-desc'>
                    <h3>Isolation</h3>
                    <p>Separate platform for teachers to manage students and their stuff</p>
                  </div>
                </div>
        </div>
      </div>
    </div>





    <div id='testimonials'>
      <div className='container'>
        <div className='section-title text-center'>
          <h2>What our clients say</h2>
        </div>
        <div className='row'>
                <div className='col-md-4'>
                  <div className='testimonial'>
                    <div className='testimonial-image'>
                      {' '}
                      <img src={img1} alt='' />{' '}
                    </div>
                    <div className='testimonial-content'>
                      <p>"I love using learn and grow, really need such application"</p>
                      <div className='testimonial-meta'> - Anonymous </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>





    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Meet the Team</h2>
          <p>
            We are not just a team, we are friends who think together, act together 
            and everything work like charm.
          </p>
        </div>

        <div>
                <div className='col-md-3 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={img1} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>Anuj Soni</h4>
                      <p>Developer</p>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={img2} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>Yogesh Adhikari</h4>
                      <p>Developer</p>
                    </div>
                  </div>
                </div>
                



        </div>


      </div>
    </div>





    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                Lingding, Gangtok, Sikkim
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                8118802983
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                2021.learnanggrow@gmail.com
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href="www.facebook.com">
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href="www.twitter.com">
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href="www.youtube.com">
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2021 Learn and grow community{' '}
            <a href='https://www.infiknightians.com/' rel='nofollow'>
              Infiknightians
            </a>
          </p>
        </div>
      </div>
    </div>


    </div>
  );
}

export default Landing;

