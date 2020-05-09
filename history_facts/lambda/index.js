/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

// TODO: Add 10 facts each containing a four-digit year
const facts = [
    "The field of AI is considered to have its origin in 1950, with publication of British mathematician Alan Turing's paper, Computing Machinery and Intelligence.",
    "The term, Artificial Intelligence, was coined in 1956 by mathematician and computer scientist John McCarthy, at Dartmouth College, in New Hampshire.",
    "Several academic disciplines have contributed to Reinforcement Learning. Most notably there are two: Optimal control and Animal learning by trial and error. This is from Scholarpedia 2020",
    "Tom M. Mitchell, back in 1997, provided a widely quoted, more formal definition of the algorithms studied in the machine learning field: 'A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P if its performance at tasks in T, as measured by P, improves with experience E.'",
    "Machine learning and data mining often employ the same methods and overlap significantly, but while machine learning focuses on prediction, based on known properties learned from the training data, data mining focuses on the discovery of (previously) unknown properties in the data,  This from Wikipedia 2020",
    "Machine learning also has intimate ties to optimization: many learning problems are formulated as minimization of some loss function on a training set of examples. This from Wikipedia 2020",
    "The history of natural language processing (NLP) generally started in the 1950s, although work can be found from earlier periods. In 1950, Alan Turing published an article titled 'Computing Machinery and Intelligence' which proposed what is now called the Turing test as a criterion of intelligence",
    "The Georgetown experiment in 1954 involved fully automatic translation of more than sixty Russian sentences into English. The authors claimed that within three or five years, machine translation would be a solved problem",
    "Up to the 1980s, most natural language processing systems were based on complex sets of hand-written rules",
    "In the 2010s, representation learning and deep neural network-style machine learning methods became widespread in natural language processing",
    "The first published work by an artificial intelligence was published in 2018, 1 the Road, marketed as a novel, contains sixty million words", 
    "Since the so-called 'statistical revolution' in the late 1980s and mid-1990s, much natural language processing research has relied heavily on machine learning."
];

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent';
  },
  handle(handlerInput) {
    const factArr = facts;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};


// TODO: Create a handler for the GetNewYearFactHandler intent
// Use the handler above as a template
// ============================================================
const GetNewYearFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'GetNewYearFactIntent';
  },
  handle(handlerInput) {
    const factArr = facts;

    var year = handlerInput.requestEnvelope.request.intent.slots.FACT_YEAR.value;

    var i;
    var foundFacts = [];

    for (i=0; i<factArr.length; i++){
      var foundFlag = factArr.includes(year);
      if (foundFlag) {
        foundFacts.push(factArr[i]);
      }
    }

    if (foundFacts.length == 0) {
      foundFacts = facts;
    }
    
    var foundIndex = Math.floor(Math.random() * foundFacts.length);
    
    const foundFact = factArr[foundIndex];
    const speechOutput = GET_FACT_MESSAGE + foundFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, foundFact)
      .getResponse();
  },
};



const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'History Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a history fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    // TODO: Add the handler you create above to this list of handlers
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

exports.facts = facts
