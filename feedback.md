1. We can all agree that there's still a lot to work on, but I would advise you to focus more on the core aspects of your project in the future, particularly the main features. You'll need to plan your time better and identify what is crucial and what is not.

2. It's great that you comment on every step in your code. It really helps people like me, who need to read your code from scratch, to understand it better and faster.

3. You've used the connection code for your database twice — once in knexfile.js and again in dbConfig.js. This duplication could be avoided.

4. You didn’t use your models.js file. Although it works fine the way you combined the models and controllers, I would recommend separating them. Instead of doing it this way:

exports.registerUser = async (req, res) => {
  try {
    const { email, last_name, first_name, password } = req.body;

    if (!email || !last_name || !first_name || !password) {
      return res.status(400).json({
        message: ' All fields are important, please try again with field require',
      });
    }

    const ifUserExist = await knex('users').where({ email }).first();
    if (ifUserExist) {
      //
      return res.status(400).json({ Error: ' Email already in use, please log in.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await knex('users')
      .insert({
        email,
        last_name,
        first_name,
        password: hashedPassword,
      })
      .returning('id');

    const userId = user[0].id; // check here
    console.log(`user Registered with id : ${userId}`);
    res.status(201).json({ message: ' User Registerd Succesfully ', id: userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
};


Separate the function as so:

function1 will be in the models file:
const _userRegister = async (email, first_name, last_name, password) => {
  try {
    // Check if the user already exists in the database
    const ifUserExist = await knex('users').where({ email }).first();
    if (ifUserExist) {
      throw new Error('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database and return the user ID
    const user = await knex('users')
      .insert({
        email,
        first_name,
        last_name,
        password: hashedPassword,
      })
      .returning('id');

    return user[0].id; // Return the user ID
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};


function2 will be in the controllers:
const registerUser = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  // Check if all required fields are provided
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json({
      message: 'All fields are required, please fill in the missing fields.',
    });
  }

  try {
    // Call the internal _userRegister function to register the user
    const userId = await _userRegister(email, first_name, last_name, password);

    // Respond with success message and user ID
    res.status(201).json({
      message: 'User registered successfully',
      id: userId,
    });
  } catch (error) {
    if (error.message === 'Email already in use') {
      return res.status(400).json({ message: 'Email already in use, please log in.' });
    }
    // Handle general server errors
    res.status(500).json({ message: 'Failed to register user.' });
  }
};

