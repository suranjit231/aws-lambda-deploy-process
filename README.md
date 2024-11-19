## Steps for aws lambda srverless deployments:

### steps1. 
1. Go to the aws console and login as a root user first

### steps2. After login as a root user create a IAM user and provide him adminstratorAccess

- for this type in search bar Iam
- then click in the IAM 
- click in the user in left-side of aws dashboard
- Then click in [Create User ] in the right side.
- Then provide a username to the IAM user.
- tick Provide user to access to the aws managemnt console.
- tick I wants to create an i am user.
- Create a password for the I am user.
                            [Next ->]


### steps3. Attached a policy for the IAM users.
- Select the [ ADministratorAccess ]

- Add a new tag which is optional.

### steps4.make sure that after this you get the following credential related to the IAM user.

1. Get_Access_Key
2. Password_User_For_Iam
3. user_name
4. I am users loginId
5. I am user aws access_secret_key


### steps5. Logout from the root user and login as a Iam user with his credential.

### steps6. Now work on your local system first.

1. Install serverless CLI globally in your application.

2. Open CMD and run the folowing commmond
```
npm install -g serverless
```

3. Download the AWS_CLI for windows:(If you are a new for the aws lambda users )

4. Configure Your aws accounts in your system ( run commond )
```
aws configure
```

5. Provide the folloing credential to the aws configure to your system.
```
AWS_ACCESS_KEY
AWS_ACCESS_SECRET
AWS_DEFAULT_REGION = ap-south-1
```

### steps8. Now Create  a project folder for aws serverless.
```
mkdir new-aws-lambda-project
cd new-aws-lambda-project
```

### steps9. setup files and folder for your aws lambda function.

1. create a file inside your project named as ( serverless.yml )
- Add the following code in this file
```
service: aws-nodejs

provider:
  name: aws
  runtime: nodejs18.x

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get

```

2. Create another file named as ( handler.js ) in your projeect.
- Add the following code in this project folder.

```
module.exports.hello = async (event) => {
    // Extract name and age from the query string parameters
    const { name, age } = event.queryStringParameters;

    // Create a response message based on the extracted parameters
    const responseMessage = name && age 
        ? `Hello, ${name}! You are ${age} years old.` 
        : "Hello, Serverless!";

    // Build the response object
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow CORS
        },
        body: JSON.stringify({
            message: responseMessage,
            input: event, // Include the full event for debugging purposes
        }),
    };

    return response;
};
```
3. Install a packages for serverless.
```
npm i serverless
```

4. Now for testing in locally in your local aws type the commond
```
serverless invoke local --function hello
```
5. If you are not loggedIn with your aws dashboard it will ask you to login/register to your dashboard.

6. If you are a new user login or register and create a new project if new user.

7. Again you login by write commond in your code editor 
```
serverless login
```

8. It will ask you your credential for login in dashboard and then you will see your login success in you terminel

9. Again test in your system locally.
```
serverless invoke local --function hello
```
10. When you get the output correctly in your console now

11. Its time to deploy your aws serverless lambda function .

- Run the commond
```
serverless deploy
```
12. If sucessfully deployed your aws server you will get the following respnse in your console

```
✔ Service deployed to stack aws-nodejs-dev (52s)

endpoint: GET - https://45ibi2iufk.execute-api.us-east-1.amazonaws.com/dev/hello
```

13. Now you can used this api in your fronted as well as test by postmen like this
```
https://45ibi2iufk.execute-api.us-east-1.amazonaws.com/dev/hello?name=John&age=30
```
14. This is a postmen get request and passing some data in query params.

15. That Now end You can explore more complex task leter.



### Additional content:

### Test Locally:

1. Use serverless-offline to test your Lambda functions locally:

- Install the plugin:
```
npm install serverless-offline
```

2. Add the plugin to serverless.yml

```
plugins:
  - serverless-offline
```

3. Run locally:
```
serverless offline
```


### local testing api end points 

```
 POST   | http://localhost:3000/dev/addContentCalendarWeeklyDocument                                      │
   │   POST   | http://localhost:3000/2015-03-31/functions/addContentCalendarWeeklyDocument/invocations         │
   │   PUT    | http://localhost:3000/dev/editContentCalendarWeeklyDocument                                     │
   │   POST   | http://localhost:3000/2015-03-31/functions/editContentCalendarWeeklyDocument/invocations        │
   │   DELETE | http://localhost:3000/dev/deleteContentCalendarWeeklyDocument                                   │
   │   POST   | http://localhost:3000/2015-03-31/functions/deleteContentCalendarWeeklyDocument/invocations      │
   │   GET    | http://localhost:3000/dev/fetchContentCalendarWeeklyDocument                                    │
   │   POST   | http://localhost:3000/2015-03-31/functions/fetchContentCalendarWeeklyDocument/invocations       │
   │   GET    | http://localhost:3000/dev/fetchAllContentCalendarWeeklyDocuments                                │
   │   POST   | http://localhost:3000/2015-03-31/functions/fetchAllContentCalendarWeeklyDocuments/invocations   │
   │                                                                                                            │
   └────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀

```

## Steps To Connect mongodb database.

1. Install mongodb packages.
```
npm i mongoose
```

2. Define a mongoose database schema as a we normally do in express baded application.

- This is a schema i create for storing  some data ( you can create multiple schema and model like this)
```
import mongoose from "mongoose";

const contentCalendarWeeklySchema = new mongoose.Schema({
    theme: { type: String, required: true },
    primary_archetype: { type: String, required: true },
    secondary_archetype: { type: String, required: true },
    week_number: { type: Number, required: true },
    category: String,
    subcategory: String,
    week: [
        {
            _id: false,
            day: String,
            theme: String,
            post: {
                _id: false,
                idea: String,
                canva_instructions: [String],
                prompts: [
                    {
                        _id: false,
                        type: { type: String },
                        prompt: String,
                    },
                ],
            },
        },
    ], // Direct array of objects
});

const ContentCalendarWeekly = mongoose.model(
    "ContentCalendarWeekly",
    contentCalendarWeeklySchema
);

export default ContentCalendarWeekly;
```

### Connect mongodb database.

1. Create function for connecting to database you can create in any javascript file inside your project directory.

2. Or you can create this inside your ( handler.js file ) .

- function for connecting to database.
```
import mongoose from "mongoose";

const uri = "Your Mongodb atlas url";

let isConnected = false;

// Connect to MongoDB Atlas
async function connectToDatabase() {
    if (isConnected) return;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
}

```

3. Now for each of the functions (or event) that we create we must call this connectToDatabase()
which will connect to db.
```

export const addContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const data = JSON.parse(event.body);
        const document = new ContentCalendarWeekly(data);
        await document.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document added successfully", data: document }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

```

5. For other function also we clll like that and perform the operation.
```
export const editContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const { _id, ...updateData } = JSON.parse(event.body);
        const updatedDocument = await ContentCalendarWeekly.findByIdAndUpdate(_id, updateData, { new: true });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document updated successfully", data: updatedDocument }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
```


## Configuration is needed in serverless.yml file for conecting to database.
```
service: aws-nodejs

plugins: 
  - serverless-offline

provider:
  name: aws
  runtime: nodejs18.x
  environment:
    MONGO_URI: "Enter your mongodb database"

functions:
  addContentCalendarWeeklyDocument:
    handler: handler.addContentCalendarWeeklyDocument
    events:
      - http:
          path: addContentCalendarWeeklyDocument
          method: post

  editContentCalendarWeeklyDocument:
    handler: handler.editContentCalendarWeeklyDocument
    events:
      - http:
          path: editContentCalendarWeeklyDocument
          method: put

  functions:
  deleteContentCalendarWeeklyDocument:
    handler: handler.deleteContentCalendarWeeklyDocument
    events:
      - http:
          path: deleteContentCalendarWeeklyDocument/{id}
          method: delete

```