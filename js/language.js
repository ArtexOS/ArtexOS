document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;
    
    const translations = {
        'ru': {
            'logo': 'Artex',
            'nav_about': 'Обо мне',
            'nav_skills': 'Навыки',
            'nav_projects': 'Проекты',
            'nav_contact': 'Контакты',
            'hero_title': 'Привет, я ',
            'hero_subtitle': 'Разработчик ПО и создатель будущей ОС',
            'hero_contact': 'Связаться',
            'hero_github': 'GitHub',
            'about_title': 'Обо мне',
            'about_text1': 'Я Artex, увлеченный разработчик программного обеспечения с опытом работы в различных языках программирования и технологиях.',
            'about_text2': 'Моя основная специализация включает Java, C++, Rust, Kotlin, Python, Node.js и TypeScript. Я постоянно изучаю новые технологии и совершенствую свои навыки.',
            'about_text3': 'Одна из моих амбициозных целей - разработка собственной операционной системы, которая сочетает в себе производительность, безопасность и удобство использования.',
            'skills_title': 'Навыки',
            'skill_os': 'Разработка ОС',
            'projects_title': 'Проекты',
            'project_link': 'Посмотреть',
            'contact_title': 'Контакты',
            'contact_subtitle': 'Давайте работать вместе!',
            'contact_text': 'Если у вас есть вопросы или предложения о сотрудничестве, не стесняйтесь связаться со мной.',
            'form_name': 'Имя',
            'form_email': 'Email',
            'form_message': 'Сообщение',
            'form_submit': 'Отправить',
            'footer_text': 'Разработчик ПО и создатель будущей ОС',
            'footer_rights': 'Все права защищены.'
        },
        'en': {
            'logo': 'Artex',
            'nav_about': 'About',
            'nav_skills': 'Skills',
            'nav_projects': 'Projects',
            'nav_contact': 'Contact',
            'hero_title': 'Hi, I\'m ',
            'hero_subtitle': 'Software Developer and Future OS Creator',
            'hero_contact': 'Contact Me',
            'hero_github': 'GitHub',
            'about_title': 'About Me',
            'about_text1': 'I\'m Artex, a passionate software developer with experience in various programming languages and technologies.',
            'about_text2': 'My main expertise includes Java, C++, Rust, Kotlin, Python, Node.js and TypeScript. I\'m constantly learning new technologies and improving my skills.',
            'about_text3': 'One of my ambitious goals is to develop my own operating system that combines performance, security and usability.',
            'skills_title': 'Skills',
            'skill_os': 'OS Development',
            'projects_title': 'Projects',
            'project_link': 'View',
            'contact_title': 'Contact',
            'contact_subtitle': 'Let\'s work together!',
            'contact_text': 'If you have any questions or collaboration proposals, feel free to contact me.',
            'form_name': 'Name',
            'form_email': 'Email',
            'form_message': 'Message',
            'form_submit': 'Submit',
            'footer_text': 'Software Developer and Future OS Creator',
            'footer_rights': 'All rights reserved.'
        }
    };
    
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    if (key === 'hero_title') {
                        element.innerHTML = translations[lang][key] + '<span>Artex</span>';
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            }
        });
    }
});