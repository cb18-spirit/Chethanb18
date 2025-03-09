const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    refreshToken: String
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
