import React from 'react'
import styles from './Styles/QuestionViewStyle'
import { AppRegistry, Text, View, TouchableHighlight, Image } from 'react-native'
import { Colors } from '../Themes/'
import QuestionInspectorActions from '../Redux/QuestionInspectorRedux'

export default class FeedQuestionAnswered extends React.Component {
  calculatePercentage (input) {
    const percent = Math.floor(input / (this.props.rightVotes + this.props.leftVotes) * 100)
    if (percent === Infinity) return 100
    else return (isNaN(percent) ? 0 : percent)
  }

  render () {
    console.log('FEED QUESTION PROPS', this.props)
    return (
      <View style={styles.container}>
        <View style={{marginTop: 5}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View style={styles.optionsContainer} >
          <Image source={{uri: this.props.leftImage}} style={styles.feedImageContainer}>
            <Text style={[styles.boldLabel, {backgroundColor: Colors.background}]} >{this.props.leftQ + ' : ' + this.calculatePercentage(this.props.leftVotes) + '%'}</Text>
          </Image>
          <Image source={{uri: this.props.rightImage}} style={styles.feedImageContainer}>
            <Text style={[styles.boldLabel, {backgroundColor: Colors.background}]} >{this.props.rightQ + ' : ' + this.calculatePercentage(this.props.rightVotes) + '%'}</Text>
          </Image>
        </View>
        <TouchableHighlight onPress={() => {
          this.props.goGetTheQuestion(this.props.questionId)
        }}>
          <Text>DETAILs</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

AppRegistry.registerComponent('FeedQuestionAnswered', () => FeedQuestionAnswered)

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // goGetTheQuestion: (questionId) => {
//     //   dispatch(QuestionInspectorActions.questionInspectorRequest(questionId))
//     // }
//   }
// }

// // Prop type warnings
// FeedQuestionAnswered.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// FeedQuestionAnswered.defaultProps = {
//   someSetting: false
// }
