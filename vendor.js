
let currentStep = 1;
const totalSteps = 5;

function nextStep() {
    if (currentStep < totalSteps) {
        if (validateCurrentStep()) {
            // Save profile info if moving from step 2 to 3
            if (currentStep === 2) {
                const profile = {
                    name: document.getElementById('vendorName').value,
                    businessName: document.getElementById('businessName').value,
                    phone: document.getElementById('phone').value,
                    whatsapp: document.getElementById('whatsapp').value,
                    location: document.getElementById('location').value
                };
                localStorage.setItem('vendoraProfile', JSON.stringify(profile));
            }
            // Hide current step
            document.getElementById(`step${currentStep}`).classList.remove('active');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
            // Show next step
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
            // Update progress bar
            const progress = (currentStep / totalSteps) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
        
        // Update progress bar
        const progress = (currentStep / totalSteps) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            return true;
        case 2:
            const name = document.getElementById('vendorName').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            
            if (!name || !phone || !location) {
                alert('Please fill in all required fields (Name, Phone, Location)');
                return false;
            }
            return true;
        case 3:
            const selectedProducts = document.querySelectorAll('input[name="products"]:checked');
            if (selectedProducts.length === 0) {
                alert('Please select at least one product category');
                return false;
            }
            return true;
        case 4:
            return true;
        default:
            return true;
    }
}

function toggleProduct(element) {
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    
    if (checkbox.checked) {
        element.classList.add('selected');
    } else {
        element.classList.remove('selected');
    }
}

function goBack() {
    if (confirm('Are you sure you want to go back to the home page? Your progress will be lost.')) {
        window.history.back();
    }
}

function goToApp() {
    window.location.href = 'vendora_buy.html';
}

// File upload handlers
document.getElementById('license').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        e.target.parentElement.querySelector('h3').textContent = `Selected: ${fileName}`;
    }
});

document.getElementById('photos').addEventListener('change', function(e) {
    const fileCount = e.target.files.length;
    if (fileCount > 0) {
        e.target.parentElement.querySelector('h3').textContent = `Selected: ${fileCount} photo(s)`;
    }
});

// Auto-save form data to prevent loss
function saveFormData() {
    const formData = {};
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = formData[input.name] || [];
            if (input.checked) {
                formData[input.name].push(input.value);
            }
        } else {
            formData[input.id] = input.value;
        }
    });
    localStorage.setItem('vendorRegistrationData', JSON.stringify(formData));
}

// Save data on every input change
document.addEventListener('input', saveFormData);
document.addEventListener('change', saveFormData);

// Load saved data on page load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('vendorRegistrationData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = formData[key];
            }
        });
    }
});
   