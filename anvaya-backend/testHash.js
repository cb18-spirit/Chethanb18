const bcrypt = require('bcryptjs');

const enteredPassword = "newSecurePassword123"; // The one you used
const storedHashedPassword = "$2b$10$Zc5mQJmTAOmccxYeYXJ7beSP3GqMUvL59SD/34w1IpZgEKGURkBzK"; // User's password from DB

bcrypt.compare(enteredPassword, storedHashedPassword, (err, isMatch) => {
    if (err) throw err;
    console.log(isMatch ? "✅ Password Matches!" : "❌ Password Mismatch!");
});
