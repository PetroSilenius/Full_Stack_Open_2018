import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto osat={[osa1, osa2, osa3]}/>
            <Yhteensa osat={[osa1, osa2, osa3]}/>
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osat[0]}/>
            <Osa osa={props.osat[1]}/>
            <Osa osa={props.osat[2]}/>
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.osat[0].tehtavia+props.osat[1].tehtavia+ props.osat[2].tehtavia} tehtävää</p>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)