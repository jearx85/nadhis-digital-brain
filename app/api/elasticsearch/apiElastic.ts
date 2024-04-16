import { conn } from "./Connection";

const client = conn();

export function getDocuments() {
    const result = client.search({
        index: 'wazealerts',
        "query": {
            "bool": {
                "must": [],
                "filter": [
                    {
                        "bool": {
                            "should": [
                                {
                                    "term": {
                                        "calle": {
                                            "value": "Av. El Poblado >(N)"
                                        }
                                    }
                                }
                            ],
                            "minimum_should_match": 1
                        }
                    },
                    {
                        "range": {
                            "startTimeMillis": {
                                "format": "strict_date_optional_time",
                                "gte": "2024-04-11T14:53:35.875Z",
                                "lte": "2024-04-11T15:08:35.875Z"
                            }
                        }
                    }
                ],
                "should": [],
                "must_not": []
            }
        },
    })

    return result;

}
