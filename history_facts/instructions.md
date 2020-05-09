# Tasks
Customizing a skill consists of two parts:

1. Expand history fact skills set
2. Add a feature by creating a new intent with built-in slot

## Part 1: Expand history facts skills
**Tasks:**

1. Choose a history category you wish to use for your skill. We're going to use Alexa sample skill template from [History Facts](https://github.com/alexa/skill-sample-nodejs-fact) GitHub repo.
2. Expand the sample utterances in the starter code `src/models/en-US.json` file to include at least 15 appropriate samples/utterances for `GetNewFactIntent`. Examples can be found [here](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/models/en-US.json).
3. Expand the facts list at the top of the `src/lambda/index.js` file such that there are at least 10 distinct facts, where each includes a 4-digit year in its text. These will be spoken by the Amazon Text-To-Speech algorithm (TTS), so keep in mind where you wish pauses to occur. To hear how it sounds, enter your sentence in the developer portal under the “Test” section.
4. Test it! All “Part 1” local unit tests should pass. In the next lesson, you'll try the skill out by uploading your changes to the Interactive model in the Developer Portal and AWS Lambda.

## Part 2: Add a feature by creating a new intent with built-in slot
In addition to the `GetNewFactIntent` intent already included in Part 1, add a new [intent](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html#intents-and-slots) including a built-in slot that will provide the user with a fact matching the year requested. You can name this new intent `GetNewYearFactIntent` and build-in slot named `FACT_YEAR`.

*Built-in Amazon slots can be used for the fact year. Consider using AMAZON.FOUR_DIGIT_NUMBER for this purpose. This is not required, however, if you prefer to try a different slot definition.*

**Tasks:**

1. Provide at least 15 utterances for the new GetNewYearFactIntent intent.
2. Complete the TODO’s in `src/lambda/index.js` file to implement a Lambda function handler for `GetNewYearFactIntent` that will provide a fact for the specific year requested and provide a random fact if the year is not found in the fact list. You can use GetNewFactHandler as a template.
3. Test it! All “Part 2” local unit tests should pass.

From the terminal, run `npm test` inside the `src` directory to check your passing tests.

![](npm-test-ok.png)

# Deploying your Skill
The Fact Skill [tutorial](https://github.com/alexa/skill-sample-nodejs-fact) steps you through setting up an Alexa Skill. The starter code can be deployed in the same way. The following step-by-step instructions assume you already have completed the steps in the Getting Started concept, and are ready to deploy your starter code. Open both [Alexa Developer](https://developer.amazon.com/alexa/) portal and the [Amazon AWS](https://aws.amazon.com/) console to complete the tasks.

**Tasks inside Alexa Developer portal:**

1. On Alexa Developer portal, click `Create Skill`, enter `Skill name`, and choose `Custom` model and `Fact Skill` template.
2. Navigate to the `Build` tab inside the skill `Interaction Model`.
3. From the `Interaction Model` menu on the left, select `JSON Editor`.
4. Paste or drag-and-drop the contents of your `src/model/en-US.json` file in the text box on that page.
5. Click `Save Model` at the top of the page.

**Tasks inside AWS console:**

1. Navigate to AWS console and choose the [AWS Lambda](https://aws.amazon.com/lambda/) service.
2. Create and set up the Lambda function using `Serverless Application Repository` and `NodeJS` template by following [step 2](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/instructions/2-lambda-function.md) of Alexa sample skills set instructions.
3. Time to connect AWS Lambda service and Alexa Developer VUI console! Copy `AWS Lambda ARN` into VUI `Endpoint`. See [step 3](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/instructions/3-connect-vui-to-code.md) detail instructions.
4. Copy the contents of your `src/lambda/index.js` into the `index.js` file in the editor under the Function Code header.

**Connect AWS Lambda to VUI**

1. *Copy AWS Lambda ARN into VUI Endpoint to connect Lambda service and VUI console:*
2. *Copy `index.js` script into AWS Lambda Function Code:*

**Test your Alexa skill deployment**

Once your Lambda function is deployed and ready, and you have successfully built the skill in the Alexa Developer Console, you can proceed to the Test tab in the Alexa Developer Console to test your skill.

Notes on testing:

- You might have to enable testing your skill by toggling the button on the top left
- You can use the Alexa simulator to utterances by voice or by typing text into the text box.
- With more advanced utterances (especially those including slots), you might have to run more explicit tests from the Manual JSON tab.
- You can monitor the logs in [AWS Cloudwatch](https://console.aws.amazon.com/cloudwatch) to check any error messages logged by the Lambda function. You can also see the output of any log messages your code creates (using `console.log('')`).
- More at [Test Your Skill](https://developer.amazon.com/docs/devconsole/test-your-skill.html)