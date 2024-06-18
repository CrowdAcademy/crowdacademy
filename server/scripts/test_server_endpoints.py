import requests
import json
from http.client import responses

# Base URL
base_url = "http://127.0.0.1:5000"

# Function to create the super admin account
def create_super_admin():
    super_admin_url = base_url + "/create-super-admin"
    super_admin_payload = {}  # Add any payload data if necessary
    return execute_request("POST", super_admin_url, super_admin_payload)

# Function to sign in and get the token
def get_token():
    login_url = base_url + "/login"
    login_payload = {"identifier": "zulan", "password": "Password"}
    return execute_request("POST", login_url, login_payload)

# Helper function to execute a request and process the response
def execute_request(method, url, payload=None, headers=None):
    try:
        response = requests.request(method, url, json=payload, headers=headers)
        status_code = response.status_code
        status_message = responses[status_code]

        if status_code == 200:
            response_data = response.json()
            return response_data, {
                "success": True,
                "response": response_data,
                "status_code": status_code,
                "status_message": status_message
            }
        else:
            try:
                error_message = response.json()
            except json.JSONDecodeError:
                error_message = response.text
            return None, {
                "success": False,
                "error": error_message,
                "status_code": status_code,
                "status_message": status_message
            }
    except Exception as e:
        return None, {"success": False, "error": str(e)}

# Function to test endpoints
def test_endpoints(token):
    headers = {"Authorization": f"Bearer {token}"}
    results = {}
    created_ids = {"user": {}, "challenge": {}, "resource": {}}

    # Add user routes
    add_user_routes = [
        ("POST", "/user/add", {"username": "cameron", "email": "cameron@crowdacademy.com", "password": "Password", "roles": ["student"]}),
        ("POST", "/user/add", {"username": "zulan", "email": "zulan@crowdacademy.com", "password": "Password", "roles": ["super_admin"]}),
        ("POST", "/user/add", {"username": "muumba", "email": "muumba@crowdacademy.com", "password": "Password", "roles": ["student"]}),
        ("POST", "/user/add", {"username": "muumba_mwanafunzi", "email": "muumba_m@crowdacademy.com", "password": "Password", "roles": ["student"]}),
        ("POST", "/user/add", {"username": "muumba.mwanafunzi", "email": "muumba_m2@crowdacademy.com", "password": "Password", "roles": ["student"]}),
        ("POST", "/user/add", {"username": "god23mayham", "email": "cameron@visor.llc", "password": "Password", "roles": ["student"]}),
        ("POST", "/user/add", {"username": "amadou", "email": "amadou@crowdacademy.com", "password": "Password", "roles": ["student"]})
    ]

    # List of endpoints to test
    endpoints = {
        "account": [
            ("POST", "/login", {"identifier": "zulan", "password": "Password"}),
            ("GET", "/account", {}),
            ("POST", "/account/create", {"username": "cameron", "email": "cameron@crowdacademy.com", "password": "Password", "roles": ["student"]}),
            ("PUT", "/account/update", {"permissions": ["create_lesson"]}),
            ("DELETE", "/account/delete", {}),
        ],
        "user": [
            *add_user_routes,
            ("GET", "/users", {}),
            ("GET", "/users/id/{}", {}),
            ("GET", "/users/email/{}", {}),
            ("GET", "/users/username/{}", {}),
            ("PUT", "/users/update/{}", {"password": "Malakai"}),
            ("DELETE", "/users/delete/{}", {})
        ],
        "challenge": [
            ("GET", "/challenges", {}),
            ("GET", "/challenges/{}", {}),
            ("POST", "/challenges/create", {"title": "Help! I'm Stuck on Quadratic Equations", "description": "Hey everyone, I'm having trouble with quadratic equations! Can anyone help me solve this one: ax^2 + bx + c = 0?", "tags": ["math", "algebra", "quadratic-equations"]}),
            ("PUT", "/challenges/update/{}", {"title": "Updated Challenge Title", "description": "Updated Challenge Description", "status": "active", "resource_ids": [], "tags": ["tag1", "tag2"]}),
            ("DELETE", "/challenges/delete/{}", {})
        ],
        "resource": [
            ("GET", "/resources", {}),
            ("GET", "/resources/{}", {}),
            ("POST", "/resources/create", {"file": r"\uploads\example-audio-mp3.mp3", "resource_type": "audio", "description": "An upbeat and energetic audio track with catchy melodies and rhythmic beats"}),
            ("POST", "/resources/create", {"file": r"\uploads\test-image-img.jpg", "resource_type": "image", "description": "A tutorial on machine learning algorithms"}),
            ("POST", "/resources/create", {"file": r"\uploads\test-video-mp4.mp4", "resource_type": "video", "description": "An introduction clip for a hypothetical YouTube channel"}),
            ("PUT", "/resources/update/{}", {"description": "A brand new description for the resource"}),
            ("DELETE", "/resources/delete/{}", {})
        ],
        "logout": [
            ("POST", "/logout", {})
        ]
    }

    # Function to process each endpoint
    def process_endpoints(endpoints, category):
        for method, endpoint, payload in endpoints:
            if "{}" in endpoint:
                for key in created_ids[category]:
                    url = base_url + endpoint.format(created_ids[category][key])
                    response_data, result = execute_request(method, url, payload, headers)
                    if method == "POST" and "create" in endpoint and result["success"]:
                        created_ids[category][key] = response_data.get('id', response_data.get('email', response_data.get('username')))
                    results[url] = result
            else:
                url = base_url + endpoint
                response_data, result = execute_request(method, url, payload, headers)
                if method == "POST" and "create" in endpoint and result["success"]:
                    created_ids[category][endpoint.split("/")[-1]] = response_data.get('id', response_data.get('email', response_data.get('username')))
                results[url] = result

    # Process each category of endpoints
    for category, endpoint_list in endpoints.items():
        process_endpoints(endpoint_list, category)

    return results

# Function to create summary
def create_summary(results):
    total_requests = len(results)
    success_count = sum(1 for result in results.values() if result["success"])
    failure_count = total_requests - success_count
    summary = {
        "total_requests": total_requests,
        "successful_requests": success_count,
        "failed_requests": failure_count
    }
    return summary

# Create the super admin account
super_admin_response, super_admin_result = create_super_admin()

# Execute the function to get the token
if super_admin_result["success"]:
    print("Super Admin Creation Response:")
    print(super_admin_result)

request_response, endpoint_results = get_token()

# Log the result of the login attempt
if endpoint_results["success"]:
    results = test_endpoints(request_response["token"])
else:
    results = {}

results[base_url + "/login"] = endpoint_results

# Create summary
summary = create_summary(results)

# Write summary and results to JSON file
output = {"summary": summary, "results": results}
with open("test_server_endpoints.json", "w") as f:
    json.dump(output, f, indent=4)