import requests
import json


nodes = [{"id": 1},{"id": 2}]

map = {
  "id": 1,
  "nickName": "new map",
  "width": 12,
  "height": 16,
  "countDown": 120,
  "nodeInfo":[
    {"pos":{"x":1, "y":1}, "prefabType": "Stone"},
    {"pos":{"x":2, "y":3}, "prefabType": "Ice"},
    {"pos":{"x":3, "y":3}, "prefabType": "Spring"}
  ]
}

data = {
  "name": "thisismap",
  "data": json.dumps(map)
}
req = requests.post(url="http://localhost:8686", data=data)
