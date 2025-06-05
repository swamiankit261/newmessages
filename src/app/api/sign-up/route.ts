import dbConnect from "@/lib/dbConnect";
import userModel from '@/model/user';
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverifictionEmail";
import { randomInt } from "crypto";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        const existingUser = await userModel.findOne({ username, isVerified: true });

        if (existingUser) {

            return Response.json({

                success: false,
                message: 'UserName is already taken',
            }, { status: 400 });
        };

        const existingUserEmail = await userModel.findOne({ email });

        const verifyCode = randomInt(0, 100_000).toString().padStart(5, "0");;

        if (existingUserEmail) {
            if (existingUserEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: 'user already exist with this email'
                }, { status: 400 })
            } else {
                const hasedpassword = await bcrypt.hash(password, 10);

                existingUserEmail.password = hasedpassword;
                existingUserEmail.verifyCode = verifyCode;
                existingUserEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

                existingUserEmail.save();
            }
        } else {
            const hasedPassword = await bcrypt.hash(password, 10);

            const expiryDate = new Date();

            expiryDate.setHours(expiryDate.getHours() + 1);

            const newuser = new userModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newuser.save();
        };

        //send a verification email 
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: `${emailResponse.message}`,
            }, { status: 400 })
        };

        return Response.json({
            success: true,
            message: 'user registered successfully. please verify your email',
        }, { status: 201 })


    } catch (error) {
        console.log('Error in registering user', error);

        return Response.json(
            {
                success: false,
                message: 'Error in registering user'
            },
            {
                status: 500
            }
        )
    }
};