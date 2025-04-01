// Adiciona animação de entrada para os cards
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
    observer.observe(card);
});

// Adiciona efeito de hover com brilho e sombra
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Adiciona animação suave ao rolar a página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adiciona efeito de scroll suave para as seções
const sections = document.querySelectorAll('.anime-section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    sectionObserver.observe(section);
});

// Funcionalidade de pesquisa
const searchInput = document.getElementById('searchInput');
const animeSections = document.querySelectorAll('.anime-section');

function filterSections() {
    const searchTerm = searchInput.value.toLowerCase();

    animeSections.forEach(section => {
        const title = section.querySelector('.anime-title').textContent.toLowerCase();
        const characters = Array.from(section.querySelectorAll('.card-info h3')).map(h3 => h3.textContent.toLowerCase());
        
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            characters.some(char => char.includes(searchTerm));

        if (matchesSearch) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// Adiciona evento de pesquisa em tempo real
searchInput.addEventListener('input', filterSections);

// Função para ordenar as seções por ano
function sortSectionsByYear() {
    const gallery = document.querySelector('.gallery');
    const sections = Array.from(document.querySelectorAll('.anime-section'));
    
    sections.sort((a, b) => {
        const yearA = parseInt(a.dataset.year);
        const yearB = parseInt(b.dataset.year);
        return yearB - yearA;
    });
    
    sections.forEach(section => gallery.appendChild(section));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    sortSectionsByYear();
}); 