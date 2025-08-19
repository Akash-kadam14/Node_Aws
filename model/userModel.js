const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserRole = require('../enumeration/UserRole');

const userSchema = mongoose.Schema(
    {
        _id: Number,
        role: {
            type: Number,
            enum: UserRole.getList(),
            required: true,
        },
        name: String,
        email : { type: String, required: true },
        password: { type: String },
    },
    {
        _id: false,
        timestamps: true
    }
);

userSchema.plugin(AutoIncrement, {
    id: "users",
    inc_field: "_id",
    start_seq: 0,
});

module.exports = mongoose.model('Users', userSchema);