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
