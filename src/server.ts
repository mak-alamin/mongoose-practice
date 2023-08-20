import mongoose from "mongoose"
import app from "./app"

const port:number = 5000

bootstrap().catch(err => console.log(err));

async function bootstrap() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mongoose-practice');

  console.log('DB connection successful.');
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}