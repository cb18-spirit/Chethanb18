const bcrypt = require("bcryptjs");

async function testPassword() {
    const enteredPassword = "Test@123"; // The password you are entering
    const storedHashedPassword = "$2b$10$9OiWr2GDXBDBPpQSX.pgsuA8aWPc3yfWb4WYGGzgny3X2dofjFpOO"; // Your stored hash

    console.log("Entered Password:", enteredPassword);
    console.log("Stored Hashed Password:", storedHashedPassword);

    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    console.log("Password Match:", isMatch);
}

testPassword();
