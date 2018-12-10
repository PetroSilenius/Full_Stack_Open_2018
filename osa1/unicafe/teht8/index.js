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


    countAverage = () => {
        const amount = this.state.hyva + this.state.neutraali + this.state.huono
        if (amount>0) {
            const average = (this.state.hyva - this.state.huono) / amount
            return Number(average)
        }else{
            return 0
        }
    }

    positivePercentage = () => {
        const amount = this.state.hyva + this.state.neutraali + this.state.huono
        if (amount >0) {
            const posPercentage = (this.state.hyva / amount) * 100
            return Number(posPercentage) +"%"
        }else{
            return 0
        }
    }


    render(){
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button text={"hyvä"} onClick={this.clickHyva}/>
                <Button text={"neutraali"} onClick={this.clickNeutraali}/>
                <Button text={"huono"} onClick={this.clickHuono}/>
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} countAverage={this.countAverage()} positivePercentage={this.positivePercentage()}/>
            </div>
        )
    }
}

const Button = (props) => {
    return(
        <button type="submit" onClick={props.onClick}>{props.text}</button>
    )
}


const Statistic = (props) => {
    return(
        <p>{props.text} {props.value}</p>
    )
}

const Statistics = (props) => {
    return(
        <div>
            <h1>Stasistiikka</h1>
            <Statistic text={"hyvä"} value={props.hyva}/>
            <Statistic text={"neutraali"} value={props.neutraali}/>
            <Statistic text={"huono"} value={props.huono}/>
            <Statistic text={"keskiarvo"} value={props.countAverage}/>
            <Statistic text={"positiiviset"} value={props.positivePercentage}/>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)