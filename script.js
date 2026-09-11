// Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Fade in animation on scroll
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

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Chat functionality
        let chatOpen = false;

        function toggleChat() {
            chatOpen = !chatOpen;
            const window = document.getElementById('chatWindow');
            const toggle = document.getElementById('chatToggle');

            if (chatOpen) {
                window.classList.add('open');
                toggle.classList.remove('pulse');
                toggle.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                document.getElementById('chatInput').focus();
            } else {
                window.classList.remove('open');
                toggle.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
            }
        }

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        }

        function sendQuickReply(text) {
            addMessage(text, 'user');
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage(getBotResponse(text), 'bot');
            }, 800 + Math.random() * 600);
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            input.value = '';
            showTyping();

            setTimeout(() => {
                removeTyping();
                addMessage(getBotResponse(text), 'bot');
            }, 1000 + Math.random() * 800);
        }

        function addMessage(text, sender) {
            const container = document.getElementById('chatMessages');
            const msg = document.createElement('div');
            msg.className = `chat-message ${sender}`;
            msg.textContent = text;
            container.appendChild(msg);
            container.scrollTop = container.scrollHeight;
        }

        function showTyping() {
            const container = document.getElementById('chatMessages');
            const typing = document.createElement('div');
            typing.className = 'typing-indicator';
            typing.id = 'typingIndicator';
            typing.innerHTML = '<span></span><span></span><span></span>';
            container.appendChild(typing);
            container.scrollTop = container.scrollHeight;
        }

        function removeTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        }

        function getBotResponse(input) {
            const text = input.toLowerCase();

            const responses = {
                services: [
                    "We offer a comprehensive range of landscape architecture services including: site analysis & master planning, garden & estate design, urban green spaces, ecological restoration, sustainable landscape design, planting plans, hardscape design, water features, and landscape lighting design. Every project begins with an on-site consultation.",
                    "Our core services span from initial concept design through construction documentation and project oversight. We specialize in sustainable landscapes, native plant gardens, urban parks, corporate campuses, and luxury residential estates. Would you like details on any specific service?"
                ],
                start: [
                    "Starting a project with us is simple! First, reach out via email or phone to schedule an initial consultation. We'll visit your site, discuss your vision, budget, and timeline. Within two weeks, we present a concept proposal. From there, we move into detailed design, permitting, and construction phases. Every step is collaborative.",
                    "Great question! Our process has four phases: (1) Discovery — site visit and vision alignment, (2) Concept Design — preliminary sketches and mood boards, (3) Design Development — detailed plans and material selections, and (4) Construction — we oversee implementation to ensure every detail matches the vision. Shall I explain any phase in more detail?"
                ],
                pricing: [
                    "Our pricing depends on project scope, complexity, and site conditions. Residential gardens typically start at $15,000 for design fees, while larger commercial or public projects are quoted individually. We offer transparent, phased billing so you know exactly what you're paying for at each stage. Would you like to discuss your specific project?",
                    "We believe in fair, transparent pricing. Design fees are typically calculated as a percentage of construction costs (8-15%) or as a fixed fee for smaller projects. During our initial consultation, we provide a detailed proposal with clear deliverables and milestones. No hidden costs — ever."
                ],
                location: [
                    "Our main studio is located at 142 Greenway Boulevard in Portland's Design District, Oregon. We work on projects across the United States and internationally. For projects outside Portland, we conduct initial consultations virtually and schedule site visits as needed. Where is your project located?",
                    "We're based in Portland, Oregon, but our portfolio spans from the Pacific Northwest to Dubai and Singapore. Distance is never a barrier — we use advanced 3D visualization and drone surveys for remote sites. Our team regularly travels for site visits and client meetings."
                ],
                portfolio: [
                    "Our portfolio includes over 200 completed projects ranging from intimate residential gardens to 100+ acre public parks. Notable works include the Urban Botanical Garden, a coastal retreat estate, a vertical forest tower in Singapore, and a desert oasis resort in Dubai. You can explore featured projects in the 'Home' section above!",
                    "We've been fortunate to work on diverse projects — urban waterfront revitalizations, corporate wellness gardens, heritage restorations, and cutting-edge sustainable developments. Each project reflects our commitment to ecology, beauty, and human experience. Check out our featured landscapes above!"
                ],
                process: [
                    "Our design process is deeply collaborative. We begin with ecological site analysis, studying soil, microclimate, hydrology, and existing vegetation. Then we develop concepts that respond to both the land's character and your lifestyle needs. We use hand sketches, 3D renderings, and VR walkthroughs so you can experience the design before breaking ground.",
                    "Every Verdant project follows our 'Listen-Observe-Design' philosophy. We spend time understanding how you want to live in the space, then observe how nature already functions there. Only then do we design — creating landscapes that feel like they've always belonged."
                ],
                sustainable: [
                    "Sustainability is at the core of everything we do. We prioritize native and adaptive plant species, permeable surfaces, rainwater harvesting, and habitat creation. Our designs reduce water usage by up to 70% compared to conventional landscapes while supporting local biodiversity. We also calculate carbon footprints for every project.",
                    "We practice regenerative landscape design — going beyond 'sustainable' to actively improve ecological health. This includes soil regeneration, pollinator corridors, carbon-sequestering plant palettes, and closed-loop water systems. Ask about our Net-Positive Landscape certification program!"
                ],
                team: [
                    "Verdant Studio was founded by Elena Marsh, a landscape architect with 20+ years of experience. Our team of 18 includes certified horticulturists, ecological designers, irrigation specialists, and a dedicated visualization studio. Together we bring diverse expertise to every project.",
                    "Our team is our greatest asset. Led by principal Elena Marsh, we have landscape architects, botanists, LEED-accredited professionals, and fine artists. Many team members hold advanced degrees in ecology, urban planning, or environmental science. We're passionate plantspeople first, designers second."
                ],
                contact: [
                    "You can reach us at hello@verdantstudio.com or call +1 (503) 555-0147. Our studio at 142 Greenway Boulevard is open Monday through Friday, 9 AM to 6 PM PST. We also offer virtual consultations for out-of-area clients. Would you like me to help you prepare for an initial consultation?",
                    "The best way to reach us is via email at hello@verdantstudio.com. For urgent inquiries, call +1 (503) 555-0147. You can also connect with us on Instagram, LinkedIn, and Pinterest where we share behind-the-scenes looks at our design process."
                ],
                default: [
                    "That's an interesting question! I'd recommend speaking directly with our team for the most detailed answer. You can reach us at hello@verdantstudio.com or +1 (503) 555-0147. Is there anything else I can help clarify in the meantime?",
                    "I'm still learning, but our team would love to discuss this with you personally. Feel free to email hello@verdantstudio.com or call our studio. In the meantime, try asking about our services, process, portfolio, or sustainability approach!",
                    "Great question! For detailed inquiries like this, our principal architects are the best resource. Contact us at hello@verdantstudio.com and we'll schedule a consultation. Is there a general topic I can help with right now?"
                ]
            };

            let matchedCategory = 'default';

            if (text.includes('service') || text.includes('offer') || text.includes('do you do') || text.includes('what can')) matchedCategory = 'services';
            else if (text.includes('start') || text.includes('begin') || text.includes('how to') || text.includes('process') || text.includes('get started')) matchedCategory = 'start';
            else if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('fee') || text.includes('how much') || text.includes('budget')) matchedCategory = 'pricing';
            else if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('located') || text.includes('office')) matchedCategory = 'location';
            else if (text.includes('portfolio') || text.includes('project') || text.includes('work') || text.includes('example') || text.includes('past')) matchedCategory = 'portfolio';
            else if (text.includes('design process') || text.includes('how do you design') || text.includes('method') || text.includes('approach')) matchedCategory = 'process';
            else if (text.includes('sustainable') || text.includes('eco') || text.includes('green') || text.includes('environment') || text.includes('native') || text.includes('organic')) matchedCategory = 'sustainable';
            else if (text.includes('team') || text.includes('who') || text.includes('people') || text.includes('architect') || text.includes('designer') || text.includes('founder')) matchedCategory = 'team';
            else if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('reach') || text.includes('call')) matchedCategory = 'contact';
            else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) return "Hello there! Welcome to Verdant Studio. I'm here to answer questions about our landscape architecture services. What can I help you with today?";
            else if (text.includes('thank')) return "You're very welcome! Feel free to ask if you have any other questions. We're excited about the possibility of working with you!";
            else if (text.includes('bye') || text.includes('goodbye')) return "Take care! If you think of any other questions, I'll be right here. Have a wonderful day!";

            const categoryResponses = responses[matchedCategory];
            return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        }