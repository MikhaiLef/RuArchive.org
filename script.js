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

// Репозиторий 3
const repo3 = new Repository(
    "rep3.html",
    "Microsoft Windows XP icons",
    "by Mikhail",
    "XP_icons.zip",
    "XP_icons.zip"
);

// Репозиторий 4
const repo4 = new Repository(
    "rep4.html",
    "applications and tools for Windows phone",
    "by Mikhail",
    "applications_and_tools_for_Windows_phone.zip",
    "applications_and..."
);

// Репозиторий 5
const repo5 = new Repository(
    "rep5.html",
    "MS-DOS 6.22",
    "by Mikhail",
    "MS-DOS 6.iso",
    "MS-DOS 6.iso"
);

// Репозиторий 6
const repo6 = new Repository(
    "rep6.html",
    "Presentation: Family Traditions",
    "by school",
    "to_school.pptx",
    "to_school.pptx"
);

// Репозиторий 7
const repo7 = new Repository(
    "rep7.html",
    "KolibriOS Lite Version",
    "by Mikhail",
    "kolibri.iso",
    "kolibri.iso"
);

// Репозиторий 8
const repo8 = new Repository(
    "rep8.html",
    "MiCode 2.0!",
    "by Mikhail and EnterCont",
    "MiCode_Archive.zip",
    "MiCode_Archive.zip"
);

// Репозиторий 9
const repo9 = new Repository(
    "rep9.html",
    "MiCode 2.1!",
    "by Mikhail and EnterCont",
    "MiCode_2.1_Archive.zip",
    "MiCode_2.1_Archive.zip"
);

// Репозиторий 10
const repo10 = new Repository(
    "rep10.html",
    "MiCode 2 documentation",
    "by Mikhail and EnterCont",
    "MiCode documentation.txt",
    "MiCode documentation.txt"
);

// Репозиторий 11
const repo11 = new Repository(
    "rep11.html",
    "Super Mega TinyXP",
    "by Mikhail",
    "TinyXPv2.zip",
    "TinyXPv2.zip"
);

// Репозиторий 12
const repo12 = new Repository(
    "rep12.html",
    "very cute cat",
    "name hidden",
    "Cat.MP4",
    "Cat.MP4"
);

// Репозиторий 13
const repo13 = new Repository(
    "rep13.html",
    "Limbo Emulator",
    "by Archive",
    "ALL_LIMBO_VERSION.zip",
    "ALL_LIMBO_VERSION.zip"
);



// ============================================
// МАССИВ ВСЕХ РЕПОЗИТОРИЕВ
// ============================================
const repositories = [repo1, repo2, repo3, repo4, repo5, repo6, repo7, repo8, repo9, repo10, repo11, repo12, repo13];

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
