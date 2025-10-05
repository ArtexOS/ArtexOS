window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbarScroll');
    if (window.scrollY > 50) {
        navbar.classList.add('navbarScrolled');
    } else {
        navbar.classList.remove('navbarScrolled');
    }
});

async function loadGitHubProjects() {
    const projectsContainer = document.getElementById('github-projects');
    
    try {
        const response = await fetch('https://api.github.com/users/ArtexOS/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить проекты');
        }
        
        projectsContainer.innerHTML = '';
        
        repos.slice(0, 6).forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'col-lg-4 col-md-6 mb-4';
            
            projectCard.innerHTML = `
                <div class="card h-100 project-card shadow">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text flex-grow-1">${repo.description || 'Описание отсутствует'}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted"><i class="bi bi-star"></i> ${repo.stargazers_count}</small>
                                <small class="text-muted"><i class="bi bi-diagram-2"></i> ${repo.forks_count}</small>
                                <small class="text-muted">${repo.language || 'N/A'}</small>
                            </div>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-sm w-100">Посмотреть код</a>
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
        projectsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning" role="alert">
                    Не удалось загрузить проекты с GitHub. <a href="https://github.com/ArtexOS" target="_blank">Посмотрите напрямую</a>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadGitHubProjects();
});