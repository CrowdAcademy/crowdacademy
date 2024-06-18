import requests
import json
from http.client import responses

# Base URL
base_url = "http://127.0.0.1:5000"

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

# Function to get all records of a specific type
def get_all_records(endpoint, token):
    url = base_url + endpoint
    headers = {"Authorization": f"Bearer {token}"}
    response_data, result = execute_request("GET", url, headers=headers)
    if result["success"]:
        return response_data
    else:
        print(f"Failed to get records from {endpoint}: {result['error']}")
        return []

# Function to delete a specific record by ID
def delete_record(endpoint, record_id, token):
    url = base_url + endpoint.format(record_id)
    headers = {"Authorization": f"Bearer {token}"}
    response_data, result = execute_request("DELETE", url, headers=headers)
    return result

# Main function to delete all records
def delete_all_records(token):
    results = {}
    summary = {"deleted_users": 0, "deleted_challenges": 0, "deleted_resources": 0}

    # Get and delete all users
    users = get_all_records("/users", token)
    if users:
        for user in users:
            user_id = user["_id"].get("$oid", user["_id"]) if isinstance(user["_id"], dict) else user["_id"]
            result = delete_record("/users/delete/{}", user_id, token)
            results[f"delete_user_{user_id}"] = result
            if result["success"]:
                summary["deleted_users"] += 1

    # Get and delete all challenges
    challenges = get_all_records("/challenges", token)
    if challenges:
        for challenge in challenges:
            challenge_id = challenge["_id"].get("$oid", challenge["_id"]) if isinstance(challenge["_id"], dict) else challenge["_id"]
            result = delete_record("/challenges/delete/{}", challenge_id, token)
            results[f"delete_challenge_{challenge_id}"] = result
            if result["success"]:
                summary["deleted_challenges"] += 1

    # Get and delete all resources
    resources = get_all_records("/resources", token)
    if resources:
        for resource in resources:
            print("Resource:", resource)
            if isinstance(resource, dict):
                resource_id = resource["_id"].get("$oid", resource["_id"]) if isinstance(resource["_id"], dict) else resource["_id"]
                result = delete_record("/resources/delete/{}", resource_id, token)
                results[f"delete_resource_{resource_id}"] = result
                if result["success"]:
                    summary["deleted_resources"] += 1
            else:
                print("Unexpected resource format:", resource)

    return results, summary

# Execute the function to get the token
request_response, endpoint_results = get_token()

# Log the result of the login attempt
if endpoint_results["success"]:
    token = request_response["token"]
    results, summary = delete_all_records(token)
else:
    results = {"login": endpoint_results}
    summary = {}

# Write results to JSON file
output = {
    "summary": summary,
    "results": results
}

with open("drop_db_collections_results.json", "w") as f:
    json.dump(output, f, indent=4)
