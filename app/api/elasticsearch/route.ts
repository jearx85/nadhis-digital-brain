import { NextResponse } from "next/server";
import { conn } from "./Connection";


export async function GET(request: Request) {
  const client = conn();
  const { searchParams } = new URL(request.url);
  const startDateTime = String(searchParams.get("startDateTime"));
  const endDateTime = String(searchParams.get("endDateTime"));

  console.log(startDateTime)
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
                "gte": startDateTime,
                "lte": endDateTime
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    },
  })
  const data = result.hits.hits.map((field: any) => {
    return field
  });
  return NextResponse.json(
    {
      message: data
    }
  );

}
