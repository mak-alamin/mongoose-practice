import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import mongoose, { Schema, model } from "mongoose";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from Node.js Server!");
  next();
});

app.get("/create-user", (req: Request, res: Response, next: NextFunction) => {
  // Step 1. Create an interface representing a document in MongoDB.
  interface IUser {
    name: string;
    email: string;
    avatar?: string;
  }

  // Step 2. Create a Schema corresponding to the document interface.
  const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
  });

  // Step 3. Create a Model
  const User = mongoose.models.User || model<IUser>("User", userSchema);

  // Step 4. DB query
  const createUser = async () => {
    const user = new User({
      name: "Mak 3",
      email: "mak3@gmail.com",
      avatar: "https://i.imgur.com/dM7Thhn.png",
    });

   const result = await user.save();
  
    console.log(result);

    if (result.email) {
      res.send("User created successfully.");
    } else{
      res.send("Can't create user!");
    }

    next();
  };

  createUser();
});

export default app;
