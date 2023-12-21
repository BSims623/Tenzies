import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    rank: {
        type: Number,
        default: 0,
    },
    username: String,
    firstName: String,
    lastName: String,
    location: String,
    email: String,
    password: String,
    time: Number,
    rolls: Number,
    gamesPlayed: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/ddkgvictl/image/upload/v1703192944/lxul9tzuxsra9eoubzj1.jpg",
    },
    avatarPublicId: {
        type: String,
        default: "lxul9tzuxsra9eoubzj1",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

UserSchema.methods.toJSON = function () {
    let obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model('User', UserSchema)