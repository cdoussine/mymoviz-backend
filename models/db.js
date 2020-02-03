// Do not forget to store your new request module in a variable in order to use it
const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};

mongoose.connect(
  'mongodb+srv://cdoussine:Acmsjm9000!@cluster0-eojqi.mongodb.net/movizapp?retryWrites=true&w=majority',
  options,
  function(err) {
    if (err) {
      console.log(
        `error, failed to connect to the database because --> ${err}`
      );
    } else {
      console.info('*** Database mymovizapp connection : Success ***');
    }
  }
);

module.exports = mongoose;
