import Person from "./Person";
import React from "react"


const List = ({persons, searchName}) => {
    return (
    persons
        .filter((person) => person.name.toUpperCase().indexOf(searchName.toUpperCase()) !== -1)
        .map(person => <Person key={person.name} person={person}/>)
    )
}

export default List