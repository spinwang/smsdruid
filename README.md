# SMSdruid

To start the server: 

## With Docker
```
docker run -p 8080:8080 spin/smsdruid  
docker run -p 8080:8080 -v /Users/spin/WebstormProjects/smsdruid:/usr/src/app spin/smsdruid  
```

## Without Docker
```
npm install -g nodemon
./ngrok tcp --remote-addr 1.tcp.ngrok.io:20550 8080
npm install
npm start
# then the server is available in localhost:8080
```

## Design
go to /login, if there is no user
go to /#/numbers is there is a user

## Todo: 

* remove the serviceAccount.json from the entire git history
* make table update more efficient (currently every table is re-rendered every
time there is a child_added event)
* add support for phone call
* Put ngrok in docker
* Start ngrok by default
* Track change and restart server using nodemon
* show the latest msg at top
* Test (istanbul and mocha);
* ~~Connect docker to local file~~
* ~~Consolidate the terminology, use sms over msg?~~
