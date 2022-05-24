// Dependencies
import mongoose, {ConnectOptions} from "mongoose";
import config from '../config';


// make the connection with db with the URL from config
mongoose.connect(config.DB.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: config.DB.MONGO_USERNAME,
    pass: config.DB.MONGO_PASSWORD,
    dbName: config.DB.MONGO_DB
  } as ConnectOptions,
  (err) => console.log(err)
);

const connection = mongoose.connection;

// Check if the connection was succeeded
connection.once('open', async () => {
  console.log('Mongodb connection stablished');
});

// Check if the connection was failed
connection.on('error', err => {
  console.log(err);
});
