import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const avatarList = [
      'boy',
      'girl',
      'man',
      'woman',
      'bull',
      'chick',
      'crab',
      'hedgehog',
      'tamus',
      'koala',
      'lemur',
      'pig',
      'tiger',
      'whale',
      'zebra'
    ].map(item => ({
      icon: require(`./img/${item}.png`),
      icontext: item
    }))
    const gridHeader = this.state.icontext ? (
      <div>
        <span style={{marginRight: '10px'}}>已选择头像</span>
        <img width="24" src={this.state.icon} alt={this.state.icontext}/>
      </div>
    ) : '请选择头像'

    return (
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elem => {
            this.setState(elem)
            this.props.selectAvatar(elem.icontext)
          }}
        />
      </List>        
    )
  }
}

export default AvatarSelector
