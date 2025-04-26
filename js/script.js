document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    loadGitHubProjects();
    setTimeout(initAnimations, 500);
});

async function loadGitHubProjects() {
    try {
        const username = 'ArtexOS';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        const projectsContainer = document.querySelector('.projects-grid');
        
        if (repos.message && repos.message.includes("API rate limit exceeded")) {
            projectsContainer.innerHTML = '<p>Превышен лимит запросов к GitHub API. Пожалуйста, попробуйте позже.</p>';
            return;
        }
        
        if (!repos.length) {
            projectsContainer.innerHTML = '<p>Проекты не найдены</p>';
            return;
        }
        
        projectsContainer.innerHTML = '';
        
        repos.forEach(repo => {
            if (!repo.fork) {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card fade-in';
                
                projectCard.innerHTML = `   
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'Описание отсутствует'}</p>
                        <div class="project-meta">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-small" data-lang="project_link">Посмотреть</a>
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
            }
        });
        
        initAnimations();
        
    } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
        const projectsContainer = document.querySelector('.projects-grid');
        projectsContainer.innerHTML = '<p>Не удалось загрузить проекты. Пожалуйста, попробуйте позже.</p>';
    }
}


function initAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

setTimeout(initAnimations, 500);