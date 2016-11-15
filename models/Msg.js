var db = require('../db/init').firebase.database();
var _ = require('lodash');


var msgRef = db.ref('/msgs');

function logMsg() {
    var msg = this.msg;
    msg.time = new Date().getTime();
    // todo: time stamp to the msg obj
    return msgRef.push(msg).key; // this is equivalent to .push(msg).set()
}


function getMsg(opts) {
    if (!_.isObject(opts)) {
        opts = {};
    }
    opts.limit = opts.limit || 10; // default to 10 msg

    var query = msgRef.limitToLast(opts.limit);
    return query.once('value').then(function (msgs) {
        return msgs.val();
    })
}

function getLatestMsg() {
    var query = msgRef.limitToLast(1);
    return query.once('value').then(function (msg) {
        return msg.val();
    })
}

/**
 * Construct an Msg object
 * @param {obj} msg - An object with detailed information about the msg received
 * @returns {obj} Msg - An object that represents the received msg
 * @constructor
 */
function Msg(msg) {
    return {
        msg: msg,
        logMsg: logMsg,
        getMsg: getMsg,
        getLatestMsg: getLatestMsg
    };
}


module.exports = Msg;