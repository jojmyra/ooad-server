const mongoose = require('mongoose');

const config = require('../config/config')


mongoose.Promise = global.Promise;
mongoose.connect(global.gConfig.database,  
    { useNewUrlParser: true,
      useCreateIndex: true, }); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.building.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});