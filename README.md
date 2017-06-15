# cal-UI-Backend
calendar with UI and Backend

To setup your own calendar project, follow the steps below:

### Prerequisites:

Python 2.6 or greater.<br />
The pip package management tool.<br />
Access to the internet and a web browser.<br />
A Google account with Google Calendar enabled.<br />


#### Step 1: Turn on the Google Calendar API

- Use [this wizard](https://console.developers.google.com/flows/enableapi?apiid=calendar) to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
- On the Add credentials to your project page, click the Cancel button.
- At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
- Select the Credentials tab, click the Create credentials button and select OAuth client ID.
- Select the application type Other, enter the name "Google Calendar", and click the Create button.
- Click OK to dismiss the resulting dialog.
- Copy the Client ID and Client Secret from Credentials -> Google Calendar and paste it in authorize.py

#### Step 2: Setup the project 

- Run the below command in terminal<br />
`https://github.com/VatsalyaSN/cal-UI-Backend.git`
- Navigate to cal-UI-Backend > static folder and run the command<br />
`npm install`
- In cal-UI-Backend folder, open authorize.py file and add client id and client secret generated in the previous step
- Also add the url to "redirect_url_path" you want to open the project on in the authorize.py file 

#### Step 3: Domain verification

- Go to [this link](https://console.developers.google.com/apis/credentials/domainverification?project=bionic-path-161611) and add the 
url you want to open your project on.
- Click on "Take me there" button and click "Add a property" button and add the url 
- Now click on the url in the 3rd option of the instruction of HTML file verification method(the google verification file is already in the template folder)
- Once the domain is verified, the project will open in the url specified. 
