import RES from "../models/Respageschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { isValidObjectId } from "mongoose";

export const sendjob = async (req, res, next) => {
    try {
        //* gett the data from body
        const { username, email, number, location, description, receiver } = req.body;
        //* if the user correctly filled the fields or no field missing
        if (!(username && email && number && description && location)) {

            res.status(402);
            throw new Error(" Emaill & password & role are required");
        }

          console.log(receiver);
        const newjob = await RES.create({
            username, email, number, location, description,receiver
        });
      
        res.status(201).send(newjob);
    } catch (error) {
        next(error);
    }
};

export const getJob = async (req, res, next) => {
    try {
        // Get the id from params
        const { id } = req.params;
        

        // Find documents in the jobs schema where the 'receiver' field is equal to the provided 'id'
        const jobs = await RES.find({ receiver: id });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found for the specified receiver ID' });
        }

        return res.json(jobs);
    } catch (error) {
        next(error);
    }
};

export const deleteJob = async (req, res, next) => {
    try {
        //get the id
        const { id } = req.params;
        // check the id if valid
        if (!isValidObjectId(id)) {
          throw new Error("ID not Valid");
        }
        //find the book
        const job = await RES.findById(id);
        //if book exist
        if (!job) {
          return res.status(404).json({ message: "Book Not Found" });
        } else {
          //detele the book
          await RES.deleteOne(job);
        }
        res.send("Book deleted successfuly");
      } catch (error) {
        next(error);
      }
};