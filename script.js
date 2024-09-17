const modal = document.querySelector(".modal");
const outlay = document.querySelector(".outlay");
const loginContainer = document.querySelector("#loginContainer");
const fileInput = document.getElementById('fileInput');
const chatBox = document.getElementById('chatBox');
const attachButton = document.getElementById('attachButton');
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');

// Function to open the modal
const openModal = () => {
    modal.classList.add("active");
    outlay.classList.add("overlayactive");
};

// Function to close the modal
const closeModal = () => {
    modal.classList.remove("active");
    outlay.classList.remove("overlayactive");
};

// Function to open the login container
const openLogin = () => {
    loginContainer.classList.add("logactive"); // Show login container
};

// Function to close the login container
const closeLogin = () => {
    loginContainer.classList.remove("logactive"); // Hide login container
};

// Function to handle bot response based on user input
const getBotResponse = (userInput) => {
    
    const responses = {
        "hi": "Happy to see you here! How can I assist you today? Whether you have questions about HR policies, IT support, or company events, feel free to ask!",
        "Can you tell me about the employee performance review process?": "Absolutely! The employee performance review process happens annually. Employees are evaluated on key performance indicators (KPIs) related to their roles, and the review is conducted by their immediate supervisor. Feedback from colleagues and self-assessments are also considered. If you need detailed steps or documents on how the process works, I can help with that too!",
        "How do I reset my email password?": "You can reset your email password through the self-service portal. Log in with your employee ID, navigate to the Account Settings, and select Password Reset. A verification link will be sent to your registered email for confirmation. If you face issues, the IT support team is available to assist!",
        "I've uploaded the latest HR manual. Can you summarize it?": "I've received the document. Here's a summary of the HR manual:\n- *Leave Entitlements:* Updated leave policies for casual, medical, and earned leave.\n- *Performance Reviews:* The manual outlines the updated criteria and timelines for performance evaluations.\n- *Employee Benefits:* Detailed information about health insurance, retirement plans, and new wellness initiatives.\nLet me know if you'd like further details or specific sections summarized!",
        "I uploaded the company's event schedule. Can you extract the key details from it?": "I've processed the document. Here are the key details:\n- *Annual Conference:* Scheduled for November 15th.\n- *Team Building Workshop:* Happening on October 5th.\n- *Monthly Townhall:* Scheduled on the first Friday of every month.\nWould you like to know more about any of these events?"
    };

    // Convert user input to lowercase and trim spaces
    const lowerCaseInput = userInput.toLowerCase().trim();

    // Search for an exact match (case-insensitive) in the response keys
    for (const [key, response] of Object.entries(responses)) {
        // Convert each key to lowercase for comparison
        if (lowerCaseInput === key.toLowerCase()) {
            return response;
        }
    }

    // Default response if no match is found
    return "I couldn't quite catch that. Could you try again?";
};



// Function to handle file input and display file name
const handleFileUpload = () => {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Show file name on one line, and the "question" part on the next line
            messageInput.value = `Uploaded file: ${file.name}\n\n`; // Double \n for extra line break
        }
    });
};


// Function to send a message
const sendMessage = () => {
    if (messageInput.value.trim() !== '') {
        // Add user message
        const newUserMessage = document.createElement('div');
        newUserMessage.classList.add('message', 'user1'); // User message

        const user = document.createElement('div');
        user.classList.add('user');
        user.textContent = 'You:';
        
        const text = document.createElement('div');
        text.classList.add('text');
        text.textContent = messageInput.value;
        
        newUserMessage.appendChild(user);
        newUserMessage.appendChild(text);
        
        chatBox.appendChild(newUserMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        
        messageInput.value = ''; // Clear the input field

        // Delay bot response by 1 second (1000 milliseconds)
        setTimeout(() => {
            const botResponse = getBotResponse(newUserMessage.querySelector('.text').textContent);
            
            const newBotMessage = document.createElement('div');
            newBotMessage.classList.add('message', 'user2'); // Bot message

            const botUser = document.createElement('div');
            botUser.classList.add('user');
            botUser.textContent = 'Bot:';
            
            const botText = document.createElement('div');
            botText.classList.add('text');
            botText.textContent = botResponse;
            
            newBotMessage.appendChild(botUser);
            newBotMessage.appendChild(botText);
            
            chatBox.appendChild(newBotMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        }, 1000); // 1000 milliseconds = 1 second
    }
};

// Event listener for send button in chat
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key press
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default newline behavior
        sendMessage();
    }
});

// Open login container when login button is clicked
// document.getElementById('loginButton').addEventListener('click', openLogin);

// Close login container if clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === loginContainer) {
        closeLogin();
    }
});

// Show file input when attach button is clicked
attachButton.addEventListener('click', () => {
    fileInput.click(); // Trigger file input dialog
});

// Initialize file handling
handleFileUpload();

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signInForm');
const signUpForm=document.getElementById('signUpForm');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})