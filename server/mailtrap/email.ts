import { generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './emilUi.ts';
import {client , sender } from './mailtrap.ts'

export const sendVerificationEmail = async (email : string ,verificationToken:string)=>{
    const recipient =[{email}];
    try{
        client
            .send({
                from: sender,
                to: recipient,
                subject: "Verify your email",
                text: "Verify your email here",
                html:htmlContent.replace("{verificationToken}" , verificationToken),
                category: "Email verification",
            })
    }catch (error){
        console.log(error)
        throw new Error("Failed to sand email verification")
    }
}

export const sendWelcomeEmail = async (email:string , name:string)=>{
    const recipient =[{email}];
    const htmlContent = generateWelcomeEmailHtml(name) ;
    try{
        client
            .send({
                from: sender,
                to: recipient,
                subject: "Welcome to foodapp",
                html:htmlContent,
                template_variables:{
                    company_info_name:"FOOD  APP"
                }
            })
    }catch (error){
        console.log(error)
        throw new Error("Failed to sand welcome email")
    }
}

export const sendPasswordResetEmail = async (email :string )=>{
    const recipient = [{email}]
    const htmlContent=generateResetSuccessEmailHtml()
    try{
        client
            .send({
                from: sender,
                to: recipient,
                subject: "password reset",
                html:htmlContent,  
                category : "reset password"
            })
    }catch (error){
        console.log(error)
        throw new Error("Failed to send reset password ")
    }
}


export const sendResetSuccessEmail = async (email :string )=>{
    const recipient = [{email}]
    const htmlContent=""
    try{
        client
            .send({
                from: sender,
                to: recipient,
                subject: "Password reset successfully",
                html:htmlContent,  
                category : "reset password successful"
            })
    }catch (error){
        console.log(error)
        throw new Error("Failed to reset password")
    }
}
