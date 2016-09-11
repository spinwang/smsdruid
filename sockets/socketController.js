/**
 * Created by spin on 8/21/16.
 */

var io;



module.exports = function(socketServer){
    io = socketServer;
};

module.exports.sendSMS = function(sms){
    io.emit('sms',sms);
};
