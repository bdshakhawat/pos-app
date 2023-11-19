
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {SendEmail} from "@/utility/EmailUtility";


// OTP send to email Start
export async function GET(req,res){
    try{
        let{searchParams}=new URL(req.url);
        let email=searchParams.get("email");

        // user count
        const prisma = new PrismaClient();
        const count = await prisma.users.count({
            where: {
                email: email,
            },
        });

        if(count===1){
            let code=Math.floor(100000 + Math.random() * 900000);
            const result= await prisma.users.update({
                where: {
                    email: email,
                },
                data: {
                    otp:code.toString()
                },
            });
            // send email
            let EmailText=`Your OTP is ${code}`;
            let EmailSubject="Password Recovery OTP";
            await SendEmail(email,EmailText,EmailSubject);
            return NextResponse.json({status:"success",data:"OTP sent successfully"})

        }else{
            return NextResponse.json({status:"failed",data:"User not found"})
        }
        // return NextResponse.json({status:"success",data:email}) [for email checking purpose]
        // return NextResponse.json({status:"success",data:"OTP sent successfully"})


    }
    catch (e) {
        return NextResponse.json({status:"failed",data:e})
        }


}
// OTP send to email End

// OTP verify Start

export async function POST(req,res) {
    try {
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const count=await prisma.users.count({where:reqBody});

        // UpdateAt-Now=2min/3min

        if(count===1){
            return  NextResponse.json({status:"success",data:"Valid Code"})
        }
        else{
            return  NextResponse.json({status:"fail",data:"Invalid Code"})
        }
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}


// OTP verify End

// Reset Pass Start
export async function PUT(req,res) {
    try {
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const count=await prisma.users.count({where: {email:reqBody['email'],otp:reqBody['otp']}});
        if(count===1){
            await prisma.users.update(
                {
                    where:{email:reqBody['email']},
                    data:{otp:'0',password:reqBody['password']}
                }
            );
            return  NextResponse.json({status:"success",data:"Password Reset Success"})
        }
        else{
            return  NextResponse.json({status:"fail",data:"Invalid Code"})
        }
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}
// Reset Pass End



