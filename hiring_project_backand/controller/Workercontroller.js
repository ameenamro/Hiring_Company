import worker from "../models/warkerschema.js";
import user from "../models/userschema.js";
import Image from "../models/imagedata.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { isValidObjectId } from "mongoose";



export const workercreate = async (req, res, next) => {
    try {
        //* gett the data from body
        const { username, email, password, role,profession,expeience } = req.body;
        //* if the user correctly filled the fields or no field missing
        if (!(email && password && username)) {
            
            res.status(402);
            throw new Error(" Emaill & password & role are required");
        }
        //* find the user in DB
        const existingUser = await worker.findOne({ email });
        const existingUser1 = await user.findOne({ email });

        
        //* check if user exist
        if (existingUser||existingUser1) {
            res.status(402);
            throw new Error(" User exist in the DB");
        }
        //* hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        //* create the user

        const newUser = await worker.create({
            username,
            email,
            password: hashedPassword,
            role,
            expeience,
            profession,
        });

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
};
export const workerlogin = async (req, res, next) => {
    try {
        //* get the email and password from body
        const { email, password } = req.body;

        //* check if email and password are filled
        if (!(email && password)) {
            res.status(400);
            throw new Error("Email and Password must be filled");
        }
        //* find the user
        const existingUser = await worker.findOne({ email });
        const existingUser1 = await user.findOne({ email });

        //* check if user exist
        if (!existingUser||existingUser1) {
            res.status(404);
            throw new Error("no user exist with this email");
        }
        //* compare the password
        const comparePass = await bcrypt.compare(password, existingUser.password);
        //*if user exist (true) do the compare else dont run this code
        if (existingUser && comparePass) {
            //* Create access token to the user
            // jwt.sign(Payload , secret,expireIn)
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role,
                },
                process.env.SECRET,
                {
                    expiresIn: "15m",
                }
            );

            //* log the user
            res.send({token, id: existingUser._id,

            
            
            });
        } else {
            res.status(400).send("email or password incorrect");
        }
    } catch (error) {
        next(error);
    }
};
export const workerProfile = async (req, res, next) => {
    res.send("My Profile Data");
};
export const dataWorkers = async (req, res, next) => {
    try {
        const AllWorker = await worker.find();
      AllWorker.forEach((index)=>{index.password=undefined;})
        res.json(AllWorker);
    } catch (error) {
        next(error);
    }
};
export const getWorkerById= async (req, res, next) => {
    try {
        //get the id from params
        const { id } = req.params;
        console.log(id);
        if (!isValidObjectId(id)) {
          throw new Error("ID not Valid");
        }
        const findworker = await worker.findById(id);
        //check if exist
        if (!findworker) {
          res.status(404);
          throw new Error("worker not found");
        }
        findworker.password=undefined;
        return res.json(findworker);
      } catch (error) {
        next(error);
      }
};


export const SetImage= async (req, res, next) => {
    try {
      
        const { originalname, mimetype, size,imageUrl} =  req.file;

        const { id } = req.params;
        const owner=id;
        const image =await  Image.create({
            filename: req?.file?.originalname,
            originalname,
            mimetype,
            size,
            imageUrl:imageUrl,
            owner:owner,
        })
        // CALL OPEN API HERE RETURN THE IMAGE URL
        
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageId: image._id,
            imageUrl:imageUrl,
            owner:owner,
            size:size,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export const getImage= async (req, res, next) =>
 {
    try {
        // Get the id from params
        const { id } = req.params;
        // Find documents in the jobs schema where the 'receiver' field is equal to the provided 'id'
        const imageProfile = await Image.find({ owner: id });
         
        if (!imageProfile || imageProfile.length === 0) {
            return res.status(404).json({ message: 'No jobs found for the specified receiver ID' });
        }

        return res.json(imageProfile[0] );
    } catch (error) {
        next(error);
    }
     
};