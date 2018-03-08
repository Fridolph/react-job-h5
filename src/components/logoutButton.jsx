import React from 'react'
import {Button} from 'antd-mobile'

export default function LogoutButton(props) {
  return (
    <Button onClick={props.onClick}>
      Logout
    </Button>
  )
}