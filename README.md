# SKONK WORKS U-1

For developing new properties.

## Deploying New Apps

1. Install Node.js and npm:

https://nodejs.org

2. Make a new repository for your new app:

http://github.com

3. Clone this seed kit repo:

```
$ git clone --bare https://github.com/Argo-DigitalVentures/SkonkWorksU1.git

$ cd SkonkWorksU1.git

```

4. Push the clone to your new app repo:

```
$ git push --mirror https://github.com/exampleuser/new-repository.git
```

5. Check your new repo and confirm it worked.

6. Delete the source clone.

```

$ cd ..

$ rm -rf gulp-webpack-dev-seed.git
```

7. Clone your new repo

```
$ git clone https://github.com/exampleuser/new-repository.git

$ cd new-repository
```

## Running Locally

### Install the modules:

```
$ npm install
```

### Start the BrowserSync Dev Server:

```
$ gulp serve
```

This should open your browser automatically.

The server will watch for changes, injecting SASS or causing browser reload as needed.

### Manually you can access the site here:

http://localhost:5888

### Manually build site for deployment:

```
$ gulp build
```

The site will be built in `/test`.
