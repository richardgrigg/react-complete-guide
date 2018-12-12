import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: "Max", age: 28},
      {name: "Manu", age: 29},
      {name: "Stephanie", age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }; //create safe copy

    person.name = event.target.value;

    this.setState({
      persons: [
        {id: '1', name: "Max", age: 28},
        {id: '12', name: event.target.value, age: 29},
        {id: '144', name: "Stephanie", age: 27}
      ]
    });

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( {persons: persons});

  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //create a safe copty without mutating curreny state directly
    const persons = [...this.state.persons]; // spread operator - does same as slice
    //create a copy - update that then set original state to new value
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }

  render () {
    const style = {
        backgroundColor: 'green',
        color: 'white',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer',
    }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={ () => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor = 'red';

    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); // classes = 'red']
    }

    if(this.state.persons.length <= 1) {
      classes.push('bold'); // ['red','bold']
    }


    return (
        <div className="App">
          <p className={classes.join(' ')}>This is really working</p>

          <button style={style}
          onClick={this.togglePersonHandler} >Switch Name</button>
          {persons}
        </div>

    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null, 'Does this work now ?') );
  }
}

export default App;
