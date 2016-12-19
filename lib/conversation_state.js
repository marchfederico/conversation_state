var machina = require('machina');

function ConversationState()
{
       this.context={state:'',data:{}}
       this.convoState = {

          initialize: function(options) {
              console.log("Intializing")
          },

          initialState: "uninitialized",

          states: {

                uninitialized: {

                  "*": function() {
                      console.log("No begin state initialized")
                  }
                }
          },
      }
      this._conversationFSM={}

}

ConversationState.prototype.addConvoState = function (name,onEnter,handleMessage,forward,back)
{
    this.convoState['states'][name] = {
      _onEnter:onEnter,
      current: handleMessage,
      forward: function(message){
        if (forward)
          this.transition(forward,message);
      },
      back: function() {
        if (back)
          this.transition(back);
      }
    }
}

ConversationState.prototype.setInitialConvoState = function(initialState)
{
  this.convoState['initialState'] = initialState
}

ConversationState.prototype.initialize = function()
{
  this._conversationFSM = new machina.Fsm(this.convoState);
}

ConversationState.prototype.handleMessage = function(message)
{
    this._conversationFSM.handle("current",message)
}

ConversationState.prototype.moveForward = function()
{
    this._conversationFSM.handle("forward")
}

ConversationState.prototype.moveBack = function()
{
    this._conversationFSM.handle("back")
}

ConversationState.prototype.getContext = function()
{
    return {state:this._conversationFSM.state, data:this.context.data}
}

ConversationState.prototype.setContext = function(context)
{
      this.context.data = context.data;
      this._conversationFSM.transition(context.state);
}

module.exports = ConversationState;
