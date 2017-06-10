# Owner's Edge
A broker Facing quoting tool

## Running Locally

#### Install the modules:

```
$ npm install
```

#### Start the Webpack Dev Server

```
$ gulp serve:dev
```

The server will watch for changes, injecting SASS  and JavaScript changes as you save.

You can access the site here:

http://localhost:7777

#### Run the Production Server:

```
$ gulp serve:prod
```

The site will build and you can access it here:

http://localhost:8888

You can manually build the site in another terminal window as this server is running.

#### Manually build site:

```
$ gulp build
```

The site will be built in `/dist`.
p
use gulp:transform:[dev/prod/local] to change config variables

#### Linter Rules:
We are using airbnb linter. All the rules can be found in package.json under 'eslintConfig'

To set up proper linting in VScode, all you need to do is install the ESLint plugin and restart the editor. If you are using VScode, make sure you tab settings are configured to 2 spaces. You can see what your space/tab config is at the bottom right of the editor

Some notable configs we did, is underlinining semicolons as errors and making sure tabs are two spaces. If you find any rule unneccessary, talk with the team and if everyone agrees, feel free to add it to the rules in package.json

Every files that are going to be changed in future PRs, should follow the linting rules before being merged.

#### To Add attributes to Users:
Since users cannot sign themsesleves up, you are going to add them in the Cognito dashboard.

In order to add attributes to users, get proper permissions for your AWS CLI, and execute the following command:
```
aws cognito-idp admin-update-user-attributes --user-pool-id _user_pool_id_ --username _username_ --user-attributes Name=custom:broker_id,Value=_broker_ID_value_
```

