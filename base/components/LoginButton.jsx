import React from 'react'
import {Button} from 'antd-mobile'

export default function LoginButton(props) {
  return (
    <Button onClick={props.onClick}>
      Login
    </Button>
  )
}