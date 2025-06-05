import { resendEmail } from '@/lib/resend';
import verifictionEmail from '../../emails/SendVerifictionCode';
import { ApiResponse } from '@/types/apiResponse';

export async function sendVerifictionEmail(
    email: string, username: string, verifyCode: string
): Promise<ApiResponse> {
    try {
        await resendEmail.emails.send({
            from: "",
            to: email,
            subject: "Verifiction code",
            react: verifictionEmail({ username,otp:verifyCode })
        })
        return { success: true, message: "Verification email sand successfully" }
    } catch (emailError) {
        console.error("Error sanding verification email", emailError);
        return { success: false, message: "Faild to sand verifiction email" }
    }
}
