const apiUrl = 'http://localhost:3000';

// FRONT NÂO AVALIAR

// Sistema de tema escuro/claro 
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Verifica preferência do usuário
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Escuro';
        }
    });
});

// BACK END





