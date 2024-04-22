import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {

    return NextResponse.json({result: "OK"}, {status: 200});
   

    } catch (err: any) {
        return NextResponse.json(
            { message: "Error", err },
            {
                status: 500,
            }
        )
    }
}
