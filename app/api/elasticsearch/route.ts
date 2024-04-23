import { NextResponse } from "next/server";
import { conn } from "./Connection";


export async function GET(request: Request) {
    const client = conn();
    const result = await client.search({
        index: 'wazealerts',
        "query": {
            "bool": {
              "must": [],
              "filter": [
                {
                  "range": {
                    "startTimeMillis": {
                      "format": "strict_date_optional_time",
                      "gte": "2024-04-23T19:00:50.056Z",
                      "lte": "2024-04-23T19:15:50.056Z"
                    }
                  }
                }
              ],
              "should": [],
              "must_not": []
            }
          },
    })
    const data = result.hits.hits.map((field: any) =>{
        return field
    });
    return NextResponse.json(
        {
            message: data
        }
    );

}
