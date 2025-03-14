const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: { type: String, required: true },
        usn: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        course: { type: String, required: true },
        branch: { type: String, required: true },
        year: { type: String, required: true },

        // 🔹 Add email verification fields
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String }, 

        resetPasswordToken: String,
        resetPasswordExpires: Date,
        refreshToken: String,
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    if (process.env.NODE_ENV !== "production") {
        console.log("Entered Password:", enteredPassword);
        console.log("Stored Hashed Password:", this.password);
    }

    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
