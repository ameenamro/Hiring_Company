export const createUser = async (req, res, next) => {
    try {
      //* gett the data from body
      const { username, email, password, role } = req.body;
      //* if the user correctly filled the fields or no field missing
      if (!(email && password && role)) {
        res.status(402);
        throw new Error(" Emaill & password & role are required");
      }
      //* find the user in DB
      const existingUser = await User.findOne({ email });
      //* check if user exist
      if (existingUser) {
        res.status(402);
        throw new Error(" User exist in the DB");
      }
      //* hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      //* create the user
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  };
  export const loginUser = async (req, res, next) => {
    try {
      //* get the email and password from body
      const { email, password } = req.body;
      //* check if email and password are filled
      if (!(email && password)) {
        res.status(400);
        throw new Error("Email and Password must be filled");
      }
      //* find the user
      const existingUser = await User.findOne({ email });
      //* check if user exist
      if (!existingUser) {
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
        res.send(token);
      } else {
        res.status(400).send("email or password incorrect");
      }
    } catch (error) {
      next(error);
    }
  };
  export const userProfile = async (req, res, next) => {
    res.send("My Profile Data");
  };
  