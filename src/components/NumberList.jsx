import React from 'react'
import ListItem from './ListItem'

const NumberList = props=> {
  const numbers = props.numbers
  const listItems = numbers.map((number, index) => (
    <ListItem key={index} value={number} />
  ))

  return (
    <ul>
      {listItems}
    </ul>
  )
}

export default NumberList