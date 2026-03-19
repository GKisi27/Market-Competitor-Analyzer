import requests
import json

def test_api():
    base_url = "http://localhost:8000/api/v1"
    endpoints = [
        "/dashboard/kpi",
        "/dashboard/charts",
        "/analytics/price-index",
        "/analytics/gap-analysis"
    ]
    
    for endpoint in endpoints:
        print(f"Testing {endpoint}...")
        try:
            response = requests.get(base_url + endpoint)
            if response.status_code == 200:
                print(json.dumps(response.json(), indent=2))
            else:
                print(f"Error: {response.status_code}")
                print(response.text)
        except Exception as e:
            print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_api()
