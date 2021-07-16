import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

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
