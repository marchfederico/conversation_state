var ConversationState = require('./lib/conversation_state');

var conversation= new ConversationState()

conversation.addConvoState("Welcome", // State Name
    function(){ // First function that gets excuted when entering the State
      console.log("Welcome to this demo!")
      this.handle('forward') // Automatically move to the next State
    },
    function(message){  // Funtion to handle messages

    },
    "Ask_0", null    // Next state,  and Previous State
)

conversation.addConvoState("Ask_0", //State Name
    function(){      //  Function that gets excuted when entering the State
      console.log("Hello how are you?")
    },
    function(message){  // Funtion to new message
      if (message == "good")
      {
         console.log("Great!")
         conversation.context.data['health'] = "good"
         this.handle("forward")
      }
      else
      {
        console.log("Sorry I didn't get that...")
      }
    },
    "Ask_1", "Welcome" // Next state,  and Previous State
)

conversation.addConvoState("Ask_1",
   function() {
      console.log("How tall are you?")
   },
   function(message){
      if (message == "tall")
      {
         conversation.context.data['height'] = "tall"
        console.log("Great!")
        this.handle("forward")
      }
      else
      {
        console.log("Sorry I didn't get that...")
      }
    }, "Ask_2", "Hello"
 )

conversation.addConvoState("Ask_2",
    function() {
        console.log("What is your favorite color?")
    },
    function(message){
        if (message == "red")
        {
           conversation.context.data['color'] = "red"
          console.log("Perfect!")
          this.handle("forward")
        }
        else
        {
          console.log("Sorry I didn't get that...")
        }
    },"Thanks","Ask_1"
  )

conversation.addConvoState("Thanks",
      function() {
        console.log("Thanks for answering my questions!")
        console.log(JSON.stringify(conversation.getContext(),null,2))
      },
      function(message){
              this.handle("forward")
      },"Welcome","Ask_2"
)

conversation.setInitialConvoState("Welcome")
conversation.initialize()

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  conversation.handleMessage(line)
});
