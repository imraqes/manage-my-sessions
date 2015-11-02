var sessions = [
    {id:0 , title:"Native-Like PhoneGap Apps with Ionic", speaker:"Sandeep Mishra", pic: "sandeep.jpg", time:"3:00PM",
        description: "In this workshop we’ll build a full-blown mobile application from scratch for a real world scenario using PhoneGap and the Ionic+AngularJS framework stack.",
        latitude: 28.613939, longitude: 77.209021, location: "New Delhi"
    },
    
    {id:1 , title:"Choosing a UI Framework", speaker:"Rob Tuft", pic: "rob.jpg", time:"2:00PM",
        description: "In this workshop we’ll talk about the UI frameworks and which framework we should use for better and easy UI design.",
        latitude: 12.971599, longitude: 77.594563, location: "Bangalore"
    },

    {id:2 , title:"Code Complete", speaker:"Rakesh Kumar Sawan", pic: "rksawan.jpeg", time:"11:00am",
        description: "Discussion and book reading ",
        latitude: 26.912434, longitude: 75.787271, location: "Jaipur"
    },

    {id:3 , title:"Learn and Grow", speaker:"Jeet Kumar", pic: "jeet.jpg", time:"10:30Am",
        description: "The Ultimate Learn & Grow needs no introduction.",
        latitude: 43.618710, longitude: -116.214607, location: "Boise US"
    }
];

exports.findAll = function (req, res, next) {
    res.send(sessions);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(sessions[id]);
};
