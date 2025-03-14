const bcrypt = require("bcryptjs");

async function generateHash() {
    const newPassword = "NewPassword123"; // Replace with your actual password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log("New Hashed Password:", hashedPassword);
}

generateHash();
