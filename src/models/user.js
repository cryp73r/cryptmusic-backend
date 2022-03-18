const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password can\'t contain "password"')
            }
        }
    },
    roomid: {
        type: String,
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken=async function() {
    const user=this
    const token=jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.findByCredentials=async (email, password)=>{
    const user=await User.findOne({email})
    if (!user) {
        throw new Error('Invalid credentials')
    }
    const isMatch=await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid credentials')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user=this
    if (user.isModified('password')) {
        const fname=user.name.split(" ")[0]
        user.password=await bcrypt.hash(user.password, fname.length>8?fname.length:8)
    }
    next()
})

const User=mongoose.model('User', userSchema)

module.exports=User