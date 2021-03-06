import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { QuestionFormTypes } from '../Redux/QuestionFormRedux'
import { MyQuestionsTypes } from '../Redux/MyQuestionsRedux'
import { QuestionInspectorTypes } from '../Redux/QuestionInspectorRedux'
import { FeedTypes } from '../Redux/FeedRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'

import { openScreen } from './OpenScreenSagas'
import { postQuestion } from './QuestionFormSagas'
import { getMyQuestions } from './MyQuestionsSagas'
import { inspectQuestion } from './QuestionInspectorSagas'
import { grabFeed, grabRandomFeed } from './FeedSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(QuestionFormTypes.QUESTION_SUBMIT, postQuestion, api),
    // takeLatest(QuestionFormTypes.QUESTION_IMAGE_SUCCESS, postQuestion, api),
    takeLatest(MyQuestionsTypes.MY_QUESTIONS_REQUEST, getMyQuestions, api),
    takeLatest(QuestionInspectorTypes.QUESTION_INSPECTOR_REQUEST, inspectQuestion, api),
    takeLatest(FeedTypes.FEED_REQUEST, grabFeed, api),
    takeLatest(FeedTypes.RANDOM_FEED_REQUEST, grabRandomFeed, api)
  ]
}
