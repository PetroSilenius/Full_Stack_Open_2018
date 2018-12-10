import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hyva : 0,
            neutraali: 0,
            huono: 0,
        }
    }

    clickHyva = () => {
        this.setState({
            hyva: this.state.hyva +1
        })
    }

    clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali +1
        })
    }

    clickHuono = () => {
        this.setState({
            huono: this.state.huono +1
        })
    }

    render(){
        return (
            <div>
                <h1>Anna palautetta</h1>
                <button type="submit" onClick={this.clickHyva}>hyvä</button>
                <button type="submit" onClick={this.clickNeutraali}>neutraali</button>
                <button type="submit" onClick={this.clickHuono}>huono</button>
                <h1>Stasistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>neutraali {this.state.neutraali}</p>
                <p>huono {this.state.huono}</p>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)