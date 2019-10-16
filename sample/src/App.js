/* Student Queue - React version (part 1). */
import React from 'react';
import './App.css';
import {uid} from 'react-uid';

const log = console.log;

/* Our main App component */ 
class App extends React.Component {

  ///  React 'state'.  
  // Allows us to keep track of chagning data in this component.
  state = {
    studentName: "",
    studentCourse: "",
    students: [
      {name: "James", course: "CSC108"},
      {name: "Kate", course: "CSC309"}
    ]
  }

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    // log(name)

    // 'this' is bound to the component in this arrow function.
    this.setState({
      [name]: value  // [name] sets the object property name to the value of the 'name' variable.
    })

  }

  // Function to add a student.  
  // Does not need parameters since it only uses and changes the state.
  addStudent = () => {
    log('adding student')

    const studentList = this.state.students

    const student = {
      name: this.state.studentName,
      course: this.state.studentCourse
    }

    studentList.push(student)

    this.setState({
      students: studentList
    })

  }

  // Function to remove student.
  // Requires the student object we want to remove, 
  //  which is bound to the list element's remove button click handler in the JSX.
  removeStudent = (student) => {
    //log(student)

    // filters out the student we don't want.
    const filteredStudents = this.state.students.filter((s) => {
      return s !== student 
    })

    //log(filteredStudents)

    this.setState({
      students: filteredStudents
    })

  }

  // Function to render elements onto the page.
  render() {
    // This function returns a block of JSX, a syntax extension to JavaScript
    // that lets you write HTML for use with React.  Any JavaScript should be
    // in curly brackets { }.
    return (
      <div>
       
       { /* Header component with text props. */ }
        <Header title="Student Help Queue"
                subtitle="Below are the next students in line for help."
        />

       { /* Inputs to add student */ }
        <input type="text"
               value={ this.state.studentName }
               onChange={ this.handleInputChange }
               name="studentName" 
               placeholder="Student" />
        <input type="text" 
               value={ this.state.studentCourse }
               onChange={ this.handleInputChange }
               name="studentCourse" 
               placeholder="Course" />
        <button onClick={ this.addStudent }>Add Student</button>


        { /* Our student list.  We use the state to iterate through the 
              student list and make an <li> for each one. */}
        <ul>
          { this.state.students.map((student) => {
            return(
                <li key={ uid(student) /* unique id required to help React render more efficiently when we delete students. */ }>
                  { student.name} - 
                  { student.course}
                  <button
                  onClick={  /* Remove button onClick binds the student as the parameter to the remove function. */
                     this.removeStudent.bind(this, student)
                     //() => this.removeStudent(student) // this also works
                  }
                  >remove</button>
                </li>
              )
          })}          
        </ul>
      </div>
      )
  }
}

/* The Header Component */
class Header extends React.Component {
  render() {
    // log(this.props)
    const { title, subtitle } = this.props

    return(
      <div>
        <h1>{ title }</h1>
        <h3>{ subtitle }</h3>
      </div>
    )
  }
}

export default App;  // export the App component from this module.
