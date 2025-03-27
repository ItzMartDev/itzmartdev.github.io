document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('change', function() {
        document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const codeBlock = this.parentElement.querySelector('code');
            const text = codeBlock.textContent;

            try {
                await navigator.clipboard.writeText(text);
                
                // Visual feedback
                this.classList.add('copied');
                const originalTooltip = this.getAttribute('data-tooltip');
                this.setAttribute('data-tooltip', 'Copied!');
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.setAttribute('data-tooltip', originalTooltip);
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        });
    });

    // Initialize animations
    document.querySelectorAll('.animate-slide-in').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}); 