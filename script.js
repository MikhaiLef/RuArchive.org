// ============================================
// РЕПОЗИТОРИИ КАК КЛАССЫ
// ============================================

class Repository {
    constructor(file, title, description, materialFile, materialLabel) {
        this.file = file;              // ссылка на HTML файл репозитория
        this.title = title;            // название репозитория
        this.description = description; // описание
        this.material = materialFile;   // файл для скачивания (лежит в корне)
        this.materialLabel = materialLabel; // текст ссылки
    }
}


// ============================================
// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ
// ============================================

// Репозиторий 1
const repo1 = new Repository(
    "rep1.html",
    "test",
    "hello :D welcome to RuArchive by MZ!",
    "hello.zip",
    "hello :D"
);

// Репозиторий 2
const repo2 = new Repository(
    "rep2.html",
    "code of the site: CPU Gallery",
    "Source code of the site: CPU Gallery",
    "Code.zip",
    "Mikhail"
);


// ============================================
// МАССИВ ВСЕХ РЕПОЗИТОРИЕВ
// ============================================
const repositories = [repo1, repo2];

// ============================================
// DOM ЭЛЕМЕНТЫ
// ============================================
const container = document.getElementById('repositoriesContainer');
const searchInput = document.getElementById('searchBox');

// ============================================
// ФУНКЦИЯ ОТРИСОВКИ
// ============================================
function renderRepos(filterText = '') {
    const term = filterText.toLowerCase().trim();
    
    // Фильтрация
    let filtered = repositories;
    if (term !== '') {
        filtered = repositories.filter(repo => 
            repo.title.toLowerCase().includes(term) || 
            repo.description.toLowerCase().includes(term)
        );
    }

    // Если ничего не найдено
    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-repos">? NO REPOSITORIES MATCH «${filterText}»</div>`;
        return;
    }

    // Генерация HTML
    let html = '';
    filtered.forEach(repo => {
        html += `
            <div class="repo-card">
                <div class="repo-name">
                    <a href="${repo.file}">${repo.title}</a>
                </div>
                <div class="repo-description">
                    ${repo.description}
                </div>
                <div class="material-block">
                    <div class="material-link">
                        ?? <a href="${repo.material}" target="_blank">${repo.materialLabel}</a>
                    </div>
                    <div class="material-path">
                        location: /${repo.material}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// ФУНКЦИЯ ПОИСКА (ГЛОБАЛЬНАЯ)
// ============================================
window.filterRepos = function() {
    renderRepos(searchInput.value);
};

// ============================================
// ПОИСК ПРИ ВВОДЕ
// ============================================
searchInput.addEventListener('input', function() {
    renderRepos(searchInput.value);
});

// ============================================
// ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА
// ============================================
renderRepos();