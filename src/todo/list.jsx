import React, {PureComponent} from 'react'

export default class List extends PureComponent {  
  render() {
    const list = this.props.list

    return (
      <ul>
        {
          list.map((item,index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    )
  }
}