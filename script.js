document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setInitialTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    setInitialTheme();
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    const projectsBtn = document.getElementById('projects-btn');
    if (projectsBtn) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    const skillBars = document.querySelectorAll('.skill');
    skillBars.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const bar = skill.querySelector('.bar');
        bar.style.width = `${percent}%`;
    });
    
    async function loadGitHubProjects() {
        const username = 'ArtexOS';
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-container';
        loadingElement.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Загрузка проектов...</p>
        `;
        
        projectsGrid.innerHTML = '';
        projectsGrid.appendChild(loadingElement);
        
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
            const repos = await response.json();
            const filteredRepos = repos.filter(repo => !repo.fork && !repo.archived && repo.name !== username);
            
            projectsGrid.innerHTML = '';
            
            if (filteredRepos.length === 0) {
                projectsGrid.innerHTML = `
                    <div class="no-projects">
                        <i class="fas fa-folder-open"></i>
                        <p>Нет публичных проектов</p>
                        <a href="https://github.com/${username}" target="_blank" class="cta-btn">
                            Посмотреть на GitHub
                        </a>
                    </div>
                `;
                return;
            }
            
            filteredRepos.slice(0, 6).forEach(repo => {
                const updatedAt = new Date(repo.updated_at);
                const formattedDate = updatedAt.toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                const language = repo.language || 'Не указан';
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p class="project-description">${repo.description || 'Описание отсутствует'}</p>
                    <div class="project-meta">
                        <span title="Язык программирования"><i class="fas fa-code"></i> ${language}</span>
                        <span title="Звёзды"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span title="Форки"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span title="Последнее обновление"><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> Посмотреть на GitHub
                    </a>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
            
            if (filteredRepos.length > 6) {
                const moreButton = document.createElement('a');
                moreButton.href = `https://github.com/${username}?tab=repositories`;
                moreButton.target = '_blank';
                moreButton.className = 'cta-btn all-projects';
                moreButton.textContent = 'Все проекты на GitHub';
                projectsGrid.parentElement.appendChild(moreButton);
            }
            
        } catch (error) {
            console.error('Ошибка загрузки проектов:', error);
            projectsGrid.innerHTML = `
                <div class="error-loading">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Не удалось загрузить проекты</p>
                    <a href="https://github.com/${username}" target="_blank" class="cta-btn">
                        Посмотреть на GitHub
                    </a>
                </div>
            `;
        }
    }
    
    loadGitHubProjects();
});
