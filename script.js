// ==================================
// CHACHA LESLEY PORTFOLIO - MAIN JS
// ==================================

// Flip Card Interaction
const flipCard = document.getElementById('flipCard');
if (flipCard) {
    flipCard.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}

// ==================================
// NAVBAR SCROLL EFFECT
// ==================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================================
// ANIMATED PROGRESS BARS
// ==================================
const observerOptions = {
    threshold: 0.5
};

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// ==================================
// EXPERIENCE TIMELINE ANIMATION
// ==================================
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ==================================
// PORTFOLIO TAB SWITCHING
// ==================================
function switchTab(tabName) {
    // Hide all content
    document.querySelectorAll('.portfolio-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// ==================================
// STORY MODE FUNCTIONS
// ==================================
function showStoryResult(category) {
    document.getElementById('storyQuestion').style.display = 'none';
    document.querySelectorAll('.story-result').forEach(r => r.classList.remove('active'));
    document.getElementById(category + 'Result').classList.add('active');
}

function resetStory() {
    document.getElementById('storyQuestion').style.display = 'block';
    document.querySelectorAll('.story-result').forEach(r => r.classList.remove('active'));
}

// ==================================
// DAY IN LIFE TIMELINE ANIMATION
// ==================================
const dayTimeline = document.getElementById('dayTimeline');
const timelineProgress = document.getElementById('timelineProgress');
const dayEvents = document.querySelectorAll('.day-event');

const dayObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.3 });

dayEvents.forEach(event => dayObserver.observe(event));

// Timeline progress bar
window.addEventListener('scroll', () => {
    if (!dayTimeline) return;
    const rect = dayTimeline.getBoundingClientRect();
    const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    if (timelineProgress) {
        timelineProgress.style.height = (scrollPercent * 100) + '%';
    }
});

// ==================================
// TESTIMONIAL CAROUSEL
// ==================================
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonials = document.querySelectorAll('.testimonial-card');

function goToTestimonial(index) {
    currentTestimonial = index;
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    }
    
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-rotate testimonials every 8 seconds
if (testimonials.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(currentTestimonial);
    }, 8000);
}

// ==================================
// CHATBOT FUNCTIONS
// ==================================
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.classList.toggle('active');
}

function handleChatOption(option) {
    const responses = {
        experience: "Chacha is a Research Manager at Reactionpower with a unique blend of skills: creative writing (working on a novel with StoryMoja), digital marketing expertise, financial analysis background, and coding abilities. She's published, mentors young writers, and teaches financial literacy!",
        projects: "Recent projects include: A marketing analytics dashboard (React/Node.js), content sentiment analyzer (Python), Q1 2026 market research report, executive branding content, and a novel in final edits. She's also mentored 200+ students and supported 50+ women entrepreneurs!",
        book: "Chacha is working on a novel with StoryMoja that explores the intersection of technology, ambition, and human connection in modern Kenya. The manuscript was submitted 3 days ahead of deadline - showing her discipline meets creativity!",
        contact: "You can reach out through the contact form on this page, connect on LinkedIn, or email directly. Chacha is open to collaborations in marketing strategy, content creation, research projects, proofreading, and mentorship opportunities!"
    };

    addChatMessage(responses[option], 'bot');
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = "Thanks for your message! For specific inquiries, please use the contact form below or choose from the quick options above. I'm here to help you learn more about Chacha's work!";
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// ==================================
// EASTER EGG FUNCTION
// ==================================
function showEasterEgg(element) {
    // Tooltip is shown on hover via CSS
    // Add a fun animation
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// ==================================
// CURSOR TRAIL EFFECT
// ==================================
const trails = [];
const maxTrails = 20;

for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trails.push(trail);
}

let currentTrail = 0;

document.addEventListener('mousemove', function(e) {
    const trail = trails[currentTrail];
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.opacity = '0.6';
    
    setTimeout(() => {
        trail.style.opacity = '0';
    }, 100);

    currentTrail = (currentTrail + 1) % maxTrails;
});

// ==================================
// FORM SUBMISSION
// ==================================
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    e.target.reset();
}

// ==================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================================
// PERFORMANCE OPTIMIZATION
// ==================================
// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Console Easter Egg
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #00D9A3; font-weight: bold;');
console.log('%cI see you\'re checking out the code. I like that! 🔍', 'font-size: 14px; color: #34D399;');
console.log('%cWant to collaborate? Reach out through the contact form!', 'font-size: 14px; color: #94A3B8;');