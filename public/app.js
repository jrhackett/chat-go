new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false // True if email and username have been filled in
    },
    created: function() {
        var that = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            that.chatContent += '<div class="chip">'
                    + '<img src="' + that.gravatarURL(msg.user.email) + '">' // Avatar
                    + msg.user.name
                + '</div>'
                + emojione.toImage(msg.message) + '<br/>'; // Parse emojis

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
        });
        $.ajax({
            type: "POST",
            url: 'http://' + window.location.host + '/auth',
            success: function(d) {
                that.username = d.name;
                that.email = d.email;
                that.joined = true;
            }
        });
    },
    methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        user: {
                            name: this.username,
                            email: this.email
                        },
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }
                ));
                this.newMsg = ''; // Reset newMsg
            }
        },
        join: function () {
            var email = $('<p>').html(this.email).text();
            var username = $('<p>').html(this.username).text();

            if (!email) {
                Materialize.toast('You must enter an email', 2000);
                return
            }
            if (!username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }

            var that = this;
            $.ajax({
                type: "POST",
                url: 'http://' + window.location.host + '/register',
                data: {
                    user: username,
                    email: email
                },
                success: function(d) {
                    that.email = email;
                    that.username = username;
                    that.joined = true;
                }
            });
        },
        gravatarURL: function(email) {
            return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
        }
    }
});
