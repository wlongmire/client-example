# SKONK WORKS U-1

For developing new properties.

## Deploying New Apps

###### Install Node.js and npm:

https://nodejs.org

###### Make a new repository for your new app:

http://github.com

###### Clone this seed kit repo:

```
$ git clone --bare https://github.com/Argo-DigitalVentures/SkonkWorksU1.git

$ cd SkonkWorksU1.git
```

###### Push the clone to your new app repo:

```
$ git push --mirror https://github.com/exampleuser/new-repository.git
```

###### Check your new repo and confirm it worked. If so, go ahead and delete the source clone:

```
$ cd ..

$ rm -rf gulp-webpack-dev-seed.git
```

###### Finally, clone your new repo and start using it:

```
$ git clone https://github.com/exampleuser/new-repository.git

$ cd new-repository
```

## Running Locally

###### Install the modules:

```
$ npm install
```

###### Start the Webpack Dev Server

```
$ gulp serve:dev
```

The server will watch for changes, injecting SASS  and JavaScript changes as you save.

You can access the site here:

http://localhost:7777

###### Run the Production Server:

```
$ gulp serve:dev
```

The site will build and you can access it here:

http://localhost:8999

You can manually build the site in another terminal window as this server is running.

###### Manually build site:

```
$ gulp build
```

The site will be built in `/dist`.
