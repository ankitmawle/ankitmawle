// Load data from JSON file
let portfolioData;

async function loadData() {
    try {
        const response = await fetch('data.json');
        portfolioData = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Populate content from JSON data
function populateContent() {
    // Hero section
    document.getElementById('hero-subtitle').textContent = portfolioData.about.title;
    document.getElementById('hero-description').textContent = portfolioData.about.description;
    
    // Tech stack items
    const techStackContainer = document.getElementById('tech-stack');
    const techItems = ['Python', 'AI/ML', 'Web3', 'IoT', 'Cloud', 'VLSI'];
    techStackContainer.innerHTML = techItems.map(tech => 
        `<div class="tech-item">${tech}</div>`
    ).join('');
    
    // About section
    const aboutBio = document.getElementById('about-bio');
    aboutBio.innerHTML = portfolioData.about.bio.map(paragraph => 
        `<p class="about-description">${paragraph}</p>`
    ).join('');
    
    // Social links
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = portfolioData.about.social.map(social => {
        let iconPath = '';
        if (social.icon === 'github') {
            iconPath = '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>';
        } else if (social.icon === 'linkedin') {
            iconPath = '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>';
        }
        
        return `
            <a href="${social.url}" target="_blank" class="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    ${iconPath}
                </svg>
            </a>
        `;
    }).join('');
    
    // Stats
    const aboutStats = document.getElementById('about-stats');
    aboutStats.innerHTML = portfolioData.about.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-number">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
    
    // Skills
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = portfolioData.skills.map(category => `
        <div class="skill-category">
            <h3 class="category-title">${category.category}</h3>
            <div class="skill-items">
                ${category.items.map(skill => `
                    <div class="skill-item">
                        <span class="skill-name" data-level="${skill.level}">${skill.name}</span>
                        <div class="skill-level">
                            <div class="skill-progress" style="--progress: ${skill.level}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = portfolioData.projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <a href="${project.url}" target="_blank" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Experience
    const experienceTimeline = document.getElementById('experience-timeline');
    experienceTimeline.innerHTML = portfolioData.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3 class="timeline-title">${exp.title}</h3>
                <p class="timeline-company">${exp.company}</p>
                <p class="timeline-period">${exp.period}</p>
                <p class="timeline-description">${exp.description}</p>
                <div class="timeline-skills">
                    ${exp.skills.map(skill => `<span>${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Contact methods
    const contactMethods = document.getElementById('contact-methods');
    contactMethods.innerHTML = `
        <div class="contact-method">
            <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            </div>
            <div class="method-info">
                <h4>Email</h4>
                <p>${portfolioData.contact.email}</p>
            </div>
        </div>
        
        <div class="contact-method">
            <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            </div>
            <div class="method-info">
                <h4>LinkedIn</h4>
                <p>${portfolioData.contact.linkedin}</p>
            </div>
        </div>
        
        <div class="contact-method">
            <div class="method-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
            </div>
            <div class="method-info">
                <h4>GitHub</h4>
                <p>${portfolioData.contact.github}</p>
            </div>
        </div>
    `;
    
    // Initialize animations after content is loaded
    initAnimations();
}

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .stat-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.border = '1px solid rgba(6, 182, 212, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.border = '1px solid rgba(6, 182, 212, 0.5)';
        });
    });
});

// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    document.addEventListener('DOMContentLoaded', () => {
        // Animate skill progress bars
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('slide-in-left');
            } else {
                item.classList.add('slide-in-right');
            }
            item.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(item);
        });

        // Animate about stats
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate contact methods
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach((method, index) => {
            method.classList.add('slide-in-left');
            method.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(method);
        });

        // Animate contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
            observer.observe(contactForm);
        }
    });
}

// Skill progress animation
const animateSkillBars = () => {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress;
        }, 500);
    });
};

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Floating shapes animation
const animateFloatingShapes = () => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomRotate = Math.random() * 360;
        const randomScale = 0.8 + Math.random() * 0.4;
        
        shape.style.left = randomX + '%';
        shape.style.top = randomY + '%';
        shape.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
        
        // Add continuous floating animation
        setInterval(() => {
            const newX = (parseFloat(shape.style.left) + (Math.random() - 0.5) * 2) % 100;
            const newY = (parseFloat(shape.style.top) + (Math.random() - 0.5) * 2) % 100;
            const newRotate = (randomRotate + Math.random() * 10) % 360;
            
            shape.style.transform = `rotate(${newRotate}deg) scale(${randomScale})`;
            shape.style.left = Math.max(0, Math.min(100, newX)) + '%';
            shape.style.top = Math.max(0, Math.min(100, newY)) + '%';
        }, 3000 + index * 1000);
    });
};

// Initialize floating shapes animation
document.addEventListener('DOMContentLoaded', animateFloatingShapes);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes, .gradient-orbs');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submission with Tawk.to integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        try {
            // Send message via Tawk.to API
            if (typeof Tawk_API !== 'undefined') {
                const message = `
New Contact Form Submission:
Name: ${formObject.name}
Email: ${formObject.email}
Subject: ${formObject.subject}
Message: ${formObject.message}
                `.trim();
                
                Tawk_API.addEvent('Contact Form Submission', {
                    name: formObject.name,
                    email: formObject.email,
                    subject: formObject.subject,
                    message: formObject.message
                });
                
                // You can also trigger a chat with the message
                Tawk_API.maximize();
                setTimeout(() => {
                    if (Tawk_API.sendChatMessage) {
                        Tawk_API.sendChatMessage(message);
                    }
                }, 1000);
            }
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('Error sending message. Please try again or contact me directly.', 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(hideNotification);
    }
});

// Update scroll progress bar
window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Update scroll indicator if it exists
    const scrollIndicator = document.querySelector('.scroll-progress');
    if (scrollIndicator) {
        scrollIndicator.style.width = scrolled + '%';
    }
});

// Add scroll progress bar
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
});

// Enhanced 3D card interactions
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * 10;
            const rotateY = (mouseX / rect.width) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
});

// Magnetic effect for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const moveX = mouseX * 0.2;
            const moveY = mouseY * 0.2;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Ankit Mawle Portfolio Loaded Successfully!');
    
    // Load data from JSON
    loadData();
    
    // Add a subtle entrance animation to the entire page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});