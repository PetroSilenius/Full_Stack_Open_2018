import React from 'react'

const Kurssi = ({kurssi}) => {
    const sum = kurssi.osat.reduce((accumulator,osa) =>
        accumulator + osa.tehtavia,0)
    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi = {kurssi} />
            <p> Yhteensä {sum} tehtävää</p>
        </div>
    )
}

const Otsikko = ({kurssi}) => {
    return (
        <div>
        <h1>{kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = ({kurssi}) => {
    return (
        <ul>
            {kurssi.osat.map(osa=><li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)}
        </ul>
    )
}

export default Kurssi