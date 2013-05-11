var profiles = require('./profiles');

// sample to serialize JSON object.
profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');

// Convert serialized JSON object to object again.
profiles = JSON.parse(profiles);
profiles.ryan.fullname = "Felix G";
console.log(profiles.ryan);
