
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateToken } from "@/utility/JWTTokenHelper";



export async function POST(req,res){
    try{
        let reqBody = await req.json();
        let prisma = new PrismaClient();
        let result = await prisma.users.findUnique({where:reqBody});

        if(result.length===0){
            return NextResponse.json({status:"fail", data:"result"})
        }else{
            let token = await CreateToken(result["email",["id"]]);
            // 24 hours = 24 * 60 * 60 * 1000 = 86400000 milliseconds
            const expirationDate = new Date(Date.now() + 24 * 60 *60 *1000 );
            const cookieString = `token=${token};expires=${expirationDate.toUTCString()}; path=/`;
            return  NextResponse.json({status:"success",data:token}, {status:200,headers:{'set-cookie':cookieString}})
        }

    }
        
    catch(err){
        return NextResponse.json({status:"fail", data:err})
    }

}