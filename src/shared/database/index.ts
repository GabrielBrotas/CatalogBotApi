import mongoose from 'mongoose';

const uri = "mongodb://127.0.0.1:27017/catalogbot";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Sucessfully Connected");
  }
})
