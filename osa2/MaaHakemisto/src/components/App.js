import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            searchCountry: ''
        }
    }

    render() {

        const foundCountries = this.state.countries
            .filter(country => country.name.toUpperCase().includes(this.state.searchCountry.toUpperCase()))

        return (
            <div>
                <h2>Find info on a country</h2>
                Enter name of the country: <input value={this.state.searchCountry} onChange={this.handleSearchChange}/>
                <Country foundCountries={foundCountries} handleClick={this.handleClick}/>
            </div>
        )
    }


    componentDidMount() {
        console.log('did mount')
        axios
            .get('https://restcountries.eu/rest/v2/all' + '?fields=name;nativeName;capital;population;flag')
            .then(response => this.setState({countries: response.data}))
        console.log('promise fulfilled')
    }

    handleSearchChange = (event) => {
        console.log(event.target.value)
        this.setState({
            searchCountry: event.target.value
        })
    }

    handleClick = (event) => {
        this.setState({
            searchCountry: event.target.textContent
        })
    }

}
    const Country = ({foundCountries, handleClick}) => {
        if (foundCountries.length == 0) {
            return <div>no matches</div>
        } else if (foundCountries.length == 1) {
            return (
                <div>
                    <h1>{foundCountries[0].name} {foundCountries[0].nativeName}</h1>
                    <div>capital: {foundCountries[0].capital}</div>
                    <div>population: {foundCountries[0].population}</div>
                    <img src={foundCountries[0].flag} width="200"/>
                </div>
            )
        } else if (foundCountries.length < 10) {
            return (
                <div>
                    {foundCountries.map(country =>
                        <div key={country.name} onClick={handleClick}>{country.name}</div>)}
                </div>
            )
        } else {
            return <div>too many matches, specify another filter</div>
        }
    }

export default App