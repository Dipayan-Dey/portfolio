// Contact section with EmailJS integration
// First, add this script tag to your HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize EmailJS with your actual credentials
const EMAILJS_SERVICE_ID = 'service_5r9i3rj';
const EMAILJS_TEMPLATE_ID = 'template_xsjwcbk';  // This is your welcome template
const EMAILJS_USER_ID = 'siMOCr8Qj2IoONzQ5';

// Initialize EmailJS
emailjs.init(EMAILJS_USER_ID);

// Debounce function for resize event
function debounceContactResize(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Send email function
async function sendEmail(formData) {
    try {
        // 1. Send welcome email to user using your existing template
        const welcomeParams = {
            name: formData.name,  // This matches {{name}} in your template
            email: formData.email, // This will be the "To Email"
            reply_to: 'dipayandey573@gmail.com' // Your email for replies
        };

        // Send welcome email to user
        const welcomeResponse = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, welcomeParams);
        console.log('Welcome email sent:', welcomeResponse);

        // 2. Send contact form data to your email
        // You need to create another template for this - let me show you the parameters to use
        const contactDataForYou = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'New Contact Form Submission',
            message: formData.message,
            to_email: 'dipayandey573@gmail.com', // Your email
            reply_to: formData.email
        };

        // For now, we'll send this to console since you need to create a second template
        console.log('Contact data to send to you:', contactDataForYou);
        
        // Uncomment this line when you create a second template for receiving contact data:
        // const contactResponse = await emailjs.send(EMAILJS_SERVICE_ID, 'your_contact_data_template_id', contactDataForYou);
        
        return { success: true, response: welcomeResponse };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    createContactParticles();

    // Add resize event listener with debouncing
    const debouncedResize = debounceContactResize(handleContactResize, 250);
    window.addEventListener('resize', debouncedResize);

    const contactForm = document.querySelector('.contact-form form');
    const contactButton = document.querySelector('.contact-button');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };

        // Validate required fields
        if (!formObject.name || !formObject.email || !formObject.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show loading state
        contactButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        contactButton.disabled = true;

        try {
            const result = await sendEmail(formObject);
            
            if (result.success) {
                // Success state
                contactButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactButton.style.background = 'linear-gradient(45deg, #10b981, #047857)';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); 
                         color: #10b981; padding: 12px; border-radius: 8px; margin-top: 10px; text-align: center;">
                        <i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
                    </div>
                `;
                contactForm.appendChild(successMessage);
                
                setTimeout(() => {
                    contactButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    contactButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                    contactButton.disabled = false;
                    contactForm.reset();
                    
                    // Remove success message
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 3000);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            // Error state
            contactButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            contactButton.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = `
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); 
                     color: #ef4444; padding: 12px; border-radius: 8px; margin-top: 10px; text-align: center;">
                    <i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again.
                </div>
            `;
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => {
                contactButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                contactButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                contactButton.disabled = false;
                
                // Remove error message
                if (errorMessage.parentNode) {
                    errorMessage.parentNode.removeChild(errorMessage);
                }
            }, 3000);
        }
    });

    // Add click animations to contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // Add touch support for mobile devices
    document.querySelectorAll('.contact-item, .contact-button, .contact-social-link').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Smooth scroll behavior for better UX on mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-resize textarea
    const contactTextarea = document.getElementById('contactMessage');
    if (contactTextarea) {
        contactTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.max(120, this.scrollHeight) + 'px';
        });
    }

    // Form validation with better UX
    const contactInputs = document.querySelectorAll('.contact-input, .contact-textarea');
    contactInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                this.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            this.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
        });
    });
});

// Make sure your HTML form has proper name attributes:
/*
<form>
    <input type="text" name="name" required class="contact-input" placeholder="Your Name">
    <input type="email" name="email" required class="contact-input" placeholder="Your Email">
    <input type="text" name="subject" class="contact-input" placeholder="Subject (Optional)">
    <textarea name="message" required class="contact-textarea" placeholder="Your Message"></textarea>
    <button type="submit" class="contact-button">
        <i class="fas fa-paper-plane"></i> Send Message
    </button>
</form>
*/