const bcrypt = require("bcryptjs");

async function testHash() {
    const password = "Test@123";
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const isMatch = await bcrypt.compare("Test@123", hashedPassword);
    console.log("Password Match:", isMatch);
}

testHash();
