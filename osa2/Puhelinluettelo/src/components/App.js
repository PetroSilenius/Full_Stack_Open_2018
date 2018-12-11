import React from 'react';
import List from './List'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            searchName: ''
        }
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                Rajaa näytettäviä: <input value = {this.state.searchName} onChange={this.handleSearchChange}/>
                <h4> Lisää uusi </h4>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        numero : <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <List persons={this.state.persons} searchName={this.state.searchName}/>
            </div>
        )
    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({newName: event.target.value})
    }

    handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({newNumber: event.target.value})
    }

    handleSearchChange = (event) => {
        console.log(event.target.value)
        this.setState({searchName: event.target.value})
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if(this.state.persons.find(p => p.name === this.state.newName )){
            alert("On jo luettolossa")
            return
        }
        const persons = this.state.persons.concat(personObject)


        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })
    }
}

export default App