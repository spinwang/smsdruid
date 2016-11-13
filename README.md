# SMSdruid

To start the server: 

```
npm install -g nodemon
./ngrok tcp --remote-addr 1.tcp.ngrok.io:20550 8080
npm install
npm start
# then the server is available in localhost:8080
```

## Design
go to /slash login

## Todo: 


* Link docker to local file
* Put ngrok in docker
* Start ngrok by default
* Track change and restart server using nodemon
* show the latest msg at top
* Test (istanbul and mocha);
* ~~Consolidate the terminology, use sms over msg?~~