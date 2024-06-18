import requests
import json
from http.client import responses
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Base URL
base_url = "http://127.0.0.1:5000"

# Function to create the super admin account
def create_super_admin():
    super_admin_url = base_url + "/create-super-admin"
    return execute_request("POST", super_admin_url)

# Function to sign in and get the token
def get_token():
    login_url = base_url + "/login"
    login_payload = {"identifier": "zulan", "password": "Password"}
    return execute_request("POST", login_url, login_payload)

# Helper function to execute a request and process the response
def execute_request(method, url, payload=None, headers=None, files=None):
    try:
        if files:
            response = requests.request(method, url, data=payload, headers=headers, files=files)
        else:
            response = requests.request(method, url, json=payload, headers=headers)
        
        status_code = response.status_code
        status_message = responses[status_code]

        if status_code == 200 or status_code == 201:
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
def test_endpoints(token, selected_files):
    headers = {"Authorization": f"Bearer {token}"}
    results = {}
    created_ids = {"user": {}, "challenge": {}, "resource": {}}

    # Realistic data for users, challenges, and resources
    user_data = [
        {"username": "john_doe", "email": "john.doe@example.com", "password": "Password1", "roles": ["student"], "dummy": True},
        {"username": "jane_smith", "email": "jane.smith@example.com", "password": "Password2", "roles": ["student"], "dummy": True},
        {"username": "alice_jones", "email": "alice.jones@example.com", "password": "Password3", "roles": ["student"], "dummy": True},
        {"username": "bob_brown", "email": "bob.brown@example.com", "password": "Password4", "roles": ["student"], "dummy": True},
        {"username": "charlie_davis", "email": "charlie.davis@example.com", "password": "Password5", "roles": ["student"], "dummy": True}
    ]

    challenge_data = [
        {
            "title": "Struggling with Linear Equations: Need Help!",
            "description": "I am currently working on solving linear equations and finding it quite challenging. The equations involve variables and constants, and I am unsure about the steps to isolate the variables and find the solutions. Can anyone provide a detailed explanation or step-by-step guide on how to approach these problems? Any examples would be greatly appreciated!",
            "tags": ["math", "algebra", "linear-equations"],
            "dummy": True
        },
        {
            "title": "Physics Homework: Understanding Newton's Laws of Motion",
            "description": "I have a physics assignment on Newton's laws of motion, and I'm having trouble understanding how to apply them to different scenarios. Specifically, I'm confused about how to identify and calculate the forces acting on an object in various situations. Can someone explain each of Newton's laws in detail and provide some practical examples to help clarify these concepts?",
            "tags": ["physics", "homework", "newtons-laws"],
            "dummy": True
        },
        {
            "title": "In-Depth Explanation of Photosynthesis Process",
            "description": "I'm studying biology and need a thorough explanation of the photosynthesis process. I understand that it involves converting light energy into chemical energy, but I am unclear about the specific steps and the roles of chlorophyll, sunlight, carbon dioxide, and water. Can someone break down the stages of photosynthesis, including the light-dependent and light-independent reactions, and explain how plants use this process to produce glucose and oxygen?",
            "tags": ["biology", "photosynthesis", "science"],
            "dummy": True
        },
        {
            "title": "World War II Essay Topics: Seeking Interesting Ideas",
            "description": "I need to write an essay on World War II for my history class, but I'm struggling to choose a compelling topic. I'm looking for suggestions that go beyond the basic events and battles, focusing instead on unique aspects such as the social and economic impacts, the role of propaganda, personal stories from soldiers and civilians, or the contributions of lesser-known figures. Any topic ideas and sources for research would be very helpful!",
            "tags": ["history", "essay", "world-war-ii"],
            "dummy": True
        },
        {
            "title": "Guidance Needed for Chemistry Lab Report Writing",
            "description": "I have to write a lab report for my chemistry class, and I'm not sure how to structure it properly. The experiment involved analyzing the reaction rates of different chemical reactions. I need advice on how to present my hypothesis, methods, results, and conclusions clearly and effectively. Any tips on writing a comprehensive and well-organized lab report would be greatly appreciated!",
            "tags": ["chemistry", "lab-report", "science"],
            "dummy": True
        }
    ]

    resource_data = [
        {"file": selected_files["audio"], "resource_type": "audio", "description": "An educational audio file explaining complex algebraic equations in simple terms.", "dummy": True},
        {"file": selected_files["image"], "resource_type": "image", "description": "A high-quality image showing the detailed steps of the photosynthesis process.", "dummy": True},
        {"file": selected_files["video"], "resource_type": "video", "description": "A comprehensive video tutorial on solving quadratic equations, ideal for high school students.", "dummy": True}
    ]

    # Function to process each endpoint
    def process_endpoints(data_list, endpoint, category, is_file=False):
        for index, data in enumerate(data_list, start=1):
            url = base_url + endpoint
            if is_file:
                files = {'file': open(data['file'], 'rb')}
                payload = {'resource_type': data['resource_type'], 'description': data['description'], 'dummy': data['dummy']}
                response_data, result = execute_request("POST", url, payload, headers, files=files)
                files['file'].close()  # Close the file after uploading
            else:
                response_data, result = execute_request("POST", url, data, headers)
            
            if result["success"]:
                created_ids[category][data.get('username', data.get('title', data.get('file')))] = response_data.get('id', response_data)
            results[f"{url} [{index}]"] = result

    # Process each category of endpoints
    process_endpoints(user_data, "/users/add", "user")
    process_endpoints(challenge_data, "/challenges/create", "challenge")
    process_endpoints(resource_data, "/resources/create", "resource", is_file=True)

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

# Function to select files using Tkinter file dialog
def select_files():
    root = Tk()
    root.withdraw()  # Hide the root window

    selected_files = {}
    selected_files["audio"] = askopenfilename(title="Select an audio file", filetypes=[("Audio files", "*.mp3;*.wav")])
    selected_files["image"] = askopenfilename(title="Select an image file", filetypes=[("Image files", "*.jpg;*.png")])
    selected_files["video"] = askopenfilename(title="Select a video file", filetypes=[("Video files", "*.mp4;*.avi")])

    return selected_files

# Create the super admin account
super_admin_response, super_admin_result = create_super_admin()

# Execute the function to get the token
if super_admin_result["success"]:
    print("Super Admin Creation Response:")
    print(super_admin_result)

request_response, endpoint_results = get_token()

# Select files using Tkinter file dialog
selected_files = select_files()

# Log the result of the login attempt
if endpoint_results["success"]:
    results = test_endpoints(request_response["token"], selected_files)
else:
    results = {}

results[base_url + "/login"] = endpoint_results

# Create summary
summary = create_summary(results)

# Write summary and results to JSON file
output = {"summary": summary, "results": results}
with open("populate_db_collections_results.json", "w") as f:
    json.dump(output, f, indent=4)
