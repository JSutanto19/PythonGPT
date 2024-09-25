Here's a clearer version of your README instructions for running the code:

---

How to Run the Code

To get the code up and running, follow these step-by-step instructions. Open four terminal windows to execute the processes simultaneously.

Backend Setup

1. Open the first terminal:
   - Navigate to the backend directory:
     ```
     cd tapgt2/backend/
     ```
   - Run the first task:
     ```
     python3 task1.py
     ```
   
2. In the second terminal:
   - Run the upload script:
     ```
     python3 upload.py
     ```

3. In the third terminal:
   - Change to the timestamp model directory and run the main script:
     ```
     cd timestamp-model
     python3 main.py
     ```
   - Return to the backend root directory:
     ```
     cd ..
     ```

Frontend Setup

4. In the fourth terminal:
   - Navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Clean up any existing Node modules and package lock files:
     ```
     rm -rf node_modules
     rm -rf package-lock.json
     ```
   - Install dependencies and start the application:
     ```
     npm install
     npm start
     ```

This will start the backend and frontend components required for the application to function.

--- 

These instructions are laid out in a more structured format to improve clarity and ease of following. Make sure to replace any placeholder paths or commands as per your actual project setup if they differ.