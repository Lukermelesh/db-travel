var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const users = [
  {
    id: '1',
    name: 'Juozas Juozaitis',
    type: 'regular',
    availability: [{from: Math.floor(new Date('2019-04-21T00:00:00').getTime() / 1000), to: Math.floor(new Date('2019-04-01T00:00:00').getTime() / 1000)}],
    trips: ['1', '2', '3', '4', '5']
  },
  {
    id: '2',
    name: 'Andrius Butkevicius',
    type: 'regular',
    availability: [{from: Math.floor(new Date('2019-04-21T00:00:00').getTime() / 1000), to: Math.floor(new Date('2019-04-01T00:00:00').getTime() / 1000)}],
    trips: ['6']
  },
  {
    id: '3',
    name: 'Tomas Brezinskas',
    type: 'regular',
    availability: [{from: Math.floor(new Date('2019-04-21T00:00:00').getTime() / 1000), to: Math.floor(new Date('2019-04-01T00:00:00').getTime() / 1000)}],
    trips: ['7']
  }
];

const trips = [
  {
    id: '1',
    from: Math.floor(new Date('2019-05-11T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-18T00:00:00').getTime() / 1000),
    destination: 'Kaunas',
    origin: 'Vilnius',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'Lietuvos Gelezinkeliai', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation: {
    location: 'Narutis Hotel',
    files: [
      {title: 'NARUTIS_SUPER_ULTRA_HOTEL_5_STARS_SUPER_TURBO_GET_IT_NOW_MEOW', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'},
    ]
  },
      status: 'approved'
    }]
  },
  {
    id: '2',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'DB Apartment 1',
  },
      status: 'rejected'
    }]
  },
  {
    id: '3',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'DB Apartment 1',
  },
      status: 'completed'
    }]
  },
  {
    id: '4',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'DB Apartment 1',
  },
      status: 'pending'
    }]
  },
  {
    id: '5',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'DB Apartment 1',
  },
      status: 'pending'
    }]
  },
  {
    id: '6',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'DB Apartment 1',
  },
      status: 'pending'
    },
    {
      userId: '3',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    location: 'Hotel 69',
    files: [
      {title: 'Confirmation123', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'},
    ]

  },
      status: 'pending'
    }]
  },
  {
    id: '7',
    from: Math.floor(new Date('2019-05-19T00:00:00').getTime() / 1000),
    to: Math.floor(new Date('2019-05-22T00:00:00').getTime() / 1000),
    origin: 'Vilnius',
    destination: 'Riga',
    details: {
      status: 0
    },
    travelDetails: [{
      userId: '1',
      department: 'R&D',
      tickets: [{title: 'AIRBALTIC123321', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}, {title: 'AIRBALTIC144420', url: 'http://www.w3schools.com/images/myw3schoolsimage.jpg'}],
      accommodation:
  {
    apartment: '3',
  },
      status: 'pending'
    }]
  }
];

const locations = [
  {id: '1', name: 'Vilnius'},
  {id: '2', name: 'Kaunas'},
  {id: '3', name: 'Riga'},
  {id: '4', name: 'Berlin'}
]

const apartments = [{
  id: '1', name: 'DB super apartment', location: '2', free: 3
},{
  id: '2', name: 'DB turbo apartment', location: '1', free: 2
},{
  id: '3', name: 'DB omega apts', location: '3', free: 1
}]

app.get('/user/:userId', function (req, res) {
  res.send(users.find(user => user.id === req.params.userId))
});

app.get('/trip/allUserTrips', function (req, res) {
  // const user = users.find(user => user.id === req.params.userId);
  // if (!user) {
  //   res.send(createError())
  // }
  // res.send(trips.filter(trip => user.trips.includes(trip.id)))
  res.send(trips)
});


app.get('/trips', function (req, res) {
  res.send(trips)
});

app.post('/trip/create', function (req, res) {
  res.send(trips)
});

//update trip
app.post('/trip/:tripId', function (req, res) {
  res.send(200)
});

app.get('/users', function (req, res) {
  res.send(users.map(u => ({id: u.id, name: u.name})));
});

app.get('/location/all', function (req, res) {
  res.send(locations);
});

app.get('/apartments/:locationId', function (req, res) {
  res.send(apartments.filter(a => a.location === req.params.locationId ));
})

app.post('/auth/login', (req, res) => {
  res.send({token: '123token123', type: 2, userId: '1'})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
