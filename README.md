# React Hook Unsplash API

## This project uses Unsplash API

API being used can be downloaded from : [Unsplash Image API | Free HD Photo API](https://unsplash.com/developers)

## Live:

**Old Version of Redux**: [Unsplash API](https://devpatel-unsplash.netlify.app)
**AWS Hosting**: [Unsplash API with Hooks](http://devpatel-unsplash-hooks.s3-website.ca-central-1.amazonaws.com/)
**Netlify Hosting**: [Unsplash API with Hooks](https://devpatel-unsplash-hooks.netlify.app/)

## How to use:

- Type the image you want to search
- Its a form so press enter or click search
- It will show you number of images searched, Pagination
- On hover, it will show you the user and info button
- on click, it will show the image with the option to download or get more info

## Current Features

- ✅ Updated the UI from the old version
- ✅ Using only Hooks removing use of Redux
- ✅ Create CI/CD Pipeline with AWS
- ✅ Host on AWS S3

## Future Features

- [ ] Add Unit testing for the components
- [ ] Add Storybook
- [ ] Introduce Docker in the project

## To run:

clone the project
Create .env file

```
REACT_APP_SECRET_KEY="YOUR SECRET KEY"
REACT_APP_API_URL= https://api.unsplash.com
```

run

```
npm install
npm start
```

## To view:

[http://localhost:3000/](http://localhost:3000/)

### PLEASE NOTE:

_Currently the CSS is messy my plan is to work on CSS to make it more interactive within next week and may be keep on introducing_
