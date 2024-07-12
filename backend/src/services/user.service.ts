import { ICredentials, IUser } from "../interfaces";
import bcrypt from "bcrypt"
import { User } from "../models";
import { ApiError, ApiResponse, errorCodes, successCodes } from "../utils";
import jwt from "jsonwebtoken"
import config from "config"
import fs from "fs"

export class UserService {
    async signupUser(userdata: IUser) {
        userdata.password = await bcrypt.hash(userdata.password, 10);
        const user = await User.create(userdata);
        return new ApiResponse(successCodes.CREATED, user, "user registered successfully")
    }
    async loginUser(credential: ICredentials) {
        const user = await User.findOne({ email: credential.email })
        if (!user) {
            throw new ApiError(errorCodes.NOT_FOUND, "No such user exists!")
        }
        const match = await bcrypt.compare(credential.password, user.password);
        if (!match) {
            throw new ApiError(errorCodes.UNAUTHORIZED, "Invalid password");
        }
        const secretkey: string = config.get("SECRET_KEY");
        const token = jwt.sign({
            userid: user._id,
            role: user.role
        }, secretkey, {
            expiresIn: "24h"
        });
        return new ApiResponse(successCodes.OK, { token, user }, "Login Successfull")
    }
    async getAllUsers() {
        const data = await User.find({ role: 'user' });
        return new ApiResponse(successCodes.OK, data, "Users fetched successfully")
    }

    async deleteUser(id: string) {
        const data = await User.findByIdAndDelete(id)
        return new ApiResponse(successCodes.OK, data, "User deleted successfully")
    }

    async getUserById(id: string) {
        const data = await User.findById(id)
        if (!data) {
            throw new ApiError(errorCodes.NOT_FOUND, "No such user exists!")
        }
        return new ApiResponse(successCodes.OK, data, "User fetched successfully")
    }

    async updateuser(userid: string, name: string, file:any) {
        let data
        if (file.filename) {
            data = await User.findByIdAndUpdate(userid, {
                name:name,
                profilephoto:file.filename
            })
            const oldFileName = data!.profilephoto
            if (oldFileName !== 'blank-profile-picture-973460_960_720.webp') {
                fs.unlink(process.cwd() + '/src/public/' + oldFileName, (err) => {
                    if (err) {
                        throw new ApiError(errorCodes.INTERNAL_SERVER_ERROR, "Failed to delete file!")
                    }
                })
            }
        }else{
            data = await User.findByIdAndUpdate(userid, {
                name:name
            })
        }
        return new ApiResponse(successCodes.OK, data, "User updated successfully")
    }
}