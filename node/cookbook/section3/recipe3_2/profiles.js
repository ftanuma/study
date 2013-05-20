module.exports = {
    ryan: {
        name: "Ryan Dhal",
        irc: "ryah",
        twitter: "ryah",
        github: ["ry", "joyent"],
        location: "San Francisco, USA",
        description: "Creator of node.js"
        },
    isaac: {
        name: "Isaac S",
        irc: "isaacs",
        twitter: function() { return this.irc; },
        github: function() { return this.irc; }
    }
};
