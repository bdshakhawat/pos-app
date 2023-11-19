
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";
export async function GET(req, res) {
    try {
        let id = req.headers["id"];
        // console.log(`ID from headers: ${id}`);
        // console.log(`Parsed ID: ${parseInt(id)}`);

        const prisma = new PrismaClient();
        const result = await prisma.categories.findMany({ where: { user_id:id} });
        return NextResponse.json({ status: "success", data: result });
    }
    catch (e) {
        // console.error(`Error: ${e}`);
        return NextResponse.json({ status: "fail", data: e });
    }
}
export async function POST(req,res){
    try{
        let headerList=headers();
        let email=headerList.get("email");
        let id=headerList.get("id");
        return NextResponse.json({status:"success",data:email})
        // return NextResponse.json({status:"success",data:id})
        // return NextResponse.json({status:"success",data:token})



    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})

    }

}

export async function PUT(req,res){
    try{
        let headerList=headers();
        let email=headerList.get("email");
        let id=headerList.get("id");
        // let token=headerList.get("token");
        return NextResponse.json({status:"success",data:email})
        // return NextResponse.json({status:"success",data:id})
        // return NextResponse.json({status:"success",data:token})



    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})

    }

}

export async function DELETE(req,res){
    try{
        let headerList=headers();
        let email=headerList.get("email");
        let id=headerList.get("id");
        // let token=headerList.get("token");
        return NextResponse.json({status:"success",data:email})
        // return NextResponse.json({status:"success",data:id})
        // return NextResponse.json({status:"success",data:token})



    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})

    }

}

export async function PATCH(req,res){
    try{
        let headerList=headers();
        let email=headerList.get("email");
        let id=headerList.get("id");
        // let token=headerList.get("token");
        return NextResponse.json({status:"success",data:email})
        // return NextResponse.json({status:"success",data:id})
        // return NextResponse.json({status:"success",data:token})



    }
    catch(e){
        return NextResponse.json({status:"fail",data:e})

    }

}