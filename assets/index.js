function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Add animation classes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fadeIn 1s ease-out;
            }
            .animate-fade-in-delay {
                animation: fadeIn 1s ease-out 0.3s both;
            }
        `;
        document.head.appendChild(style);