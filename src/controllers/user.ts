import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import { NewUserRequestBody } from "../types/types";
import { User } from "../models/user";

export const signup = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response
) => {
  try {
    const { name, email, password, contactNumber, age } = req.body;

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, contactNumber, age });

    await newUser.save();

    res.status(201).json({ message: "User Created Succesfully!" });
  } catch (error) {
    res.status(501).send(error);
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid Username or Password" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
    });
  } catch (error) {
    res.status(501).send(error);
  }
};
