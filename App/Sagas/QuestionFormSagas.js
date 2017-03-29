/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import QuestionFormActions from '../Redux/QuestionFormRedux'
import { RNS3 } from 'react-native-aws3'
import options from '../../secret.js'

let file = {
  // `uri` can also be a file system path (i.e. file://)
  uri: 'https://lh6.googleusercontent.com/-E716YeMDc6c/VpvZ_Xth3iI/AAAAAAAAFqQ/x7F2-AwS0jA/w580-h315-no/URL-Normalization.jpg',
  name: 'image.jpg',
  type: 'image/jpg'
}

export function * imageBucket () {
  const response = yield call(RNS3.put, file, options)
  if (response.status !== 201) {
    throw new Error('Failed to upload image to S3')
  }
  return response
}

export function * postQuestion (api, action) {
  const { questionText, leftText, rightText, respondents, leftImage, rightImage, userId } = action
console.log('action log--- ', action)
  // make the call to the api
  let imageResponse
  let location
  try {
    imageResponse = yield imageBucket()
  } catch (e) {
    console.log(e)
  }

  location = imageResponse.headers.Location

  const response = yield call(api.postQuestion, questionText, leftText, rightText, respondents, leftImage, location, userId)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(QuestionFormActions.questionSuccess(response.data))
  } else {
    yield put(QuestionFormActions.questionFailure())
  }
}

