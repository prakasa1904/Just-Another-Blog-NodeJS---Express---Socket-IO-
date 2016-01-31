window.onload = function() {
    var members = [], messages = [];
    var socket = io.connect('http://localhost:7000');
    var user = document.getElementById("member");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
 
    socket.on('message', function (data) {
        if(data.message) {
            members.push(data.member);
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += members[i] + ' : ' + messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        var member = user.value, text = field.value;
        socket.emit('send', { member: member ,message: text });
        return false;
    };
}