const bcrypt = require('bcrypt');
const knex = require('../config/dbConfig');

// register
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

// user/log here /////////////////////////

exports.loginUser = async (req, res) => {
  try {
    // destructuring
    const { email, password } = req.body;

    if (!email || !password) {
      //
      console.log('error !email || !password check ');
      return res.status(400).json({ message: ' Email and Password Require ! ' });
    }

    const user = await knex('users').where({ email }).first();
    if (!user) {
      //
      return res.status(400).json({ message: 'email or Password invalid try again ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //
      console.log(`Connexion Failed ${email}`);
      return res.status(400).json({ message: ' Email or password invalid. Please try again. ' });
    }

    res.status(200).json({ message: 'succesfully connected. ', user: { email: user.email, first_name: user.first_name } }); // check
  } catch (error) {
    //
    console.log(error);
    res.status(500).json({ error: ' Internal server error during login ' });
  }
};
