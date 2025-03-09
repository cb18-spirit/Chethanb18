const bcrypt = require("bcryptjs");

async function testHash() {
    try {
        const password = "Test@123"; // You can test with more complex passwords
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Compare the original password with the hashed one
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log("Password Match:", isMatch); // Should print true if passwords match
    } catch (err) {
        console.error("Error:", err);
    }
}

testHash();
