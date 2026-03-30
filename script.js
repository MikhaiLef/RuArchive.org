// ============================================
// CLASS DEFINITION
// ============================================
class Repository {
    constructor(file, title, description, materialFile, materialLabel) {
        this.file = file;
        this.title = title;
        this.description = description;
        this.material = materialFile;
        this.materialLabel = materialLabel;
    }
}

// ============================================
// CREATE ALL REPOSITORIES (14 items)
// ============================================
const repo1 = new Repository(
    "rep1.html",
    "test",
    "hello :D welcome to RuArchive by MZ!",
    "hello.zip",
    "hello :D"
);

const repo2 = new Repository(
    "rep2.html",
    "code of the site: CPU Gallery",
    "Source code of the site: CPU Gallery",
    "Code.zip",
    "Mikhail"
);

const repo3 = new Repository(
    "rep3.html",
    "Microsoft Windows XP icons",
    "by Mikhail",
    "XP_icons.zip",
    "XP_icons.zip"
);

const repo4 = new Repository(
    "rep4.html",
    "applications and tools for Windows phone",
    "by Mikhail",
    "applications_and_tools_for_Windows_phone.zip",
    "applications_and..."
);

const repo5 = new Repository(
    "rep5.html",
    "MS-DOS 6.22",
    "by Mikhail",
    "MS-DOS 6.iso",
    "MS-DOS 6.iso"
);

const repo6 = new Repository(
    "rep6.html",
    "Presentation: Family Traditions",
    "by school",
    "to_school.pptx",
    "to_school.pptx"
);

const repo7 = new Repository(
    "rep7.html",
    "KolibriOS Lite Version",
    "by Mikhail",
    "kolibri.iso",
    "kolibri.iso"
);

const repo8 = new Repository(
    "rep8.html",
    "MiCode 2.0!",
    "by Mikhail and EnterCont",
    "MiCode_Archive.zip",
    "MiCode_Archive.zip"
);

const repo9 = new Repository(
    "rep9.html",
    "MiCode 2.1!",
    "by Mikhail and EnterCont",
    "MiCode_2.1_Archive.zip",
    "MiCode_2.1_Archive.zip"
);

const repo10 = new Repository(
    "rep10.html",
    "MiCode 2 documentation",
    "by Mikhail and EnterCont",
    "MiCode documentation.txt",
    "MiCode documentation.txt"
);

const repo11 = new Repository(
    "rep11.html",
    "Super Mega TinyXP",
    "by Mikhail",
    "TinyXPv2.zip",
    "TinyXPv2.zip"
);

const repo12 = new Repository(
    "rep12.html",
    "very cute cat",
    "name hidden",
    "Cat.MP4",
    "Cat.MP4"
);

const repo13 = new Repository(
    "rep13.html",
    "Limbo Emulator",
    "by Archive",
    "ALL_LIMBO_VERSION.zip",
    "ALL_LIMBO_VERSION.zip"
);

const repo14 = new Repository(
    "rep14.html",
    "файл брейнротов",
    "by CrimeTech :D",
    "shootbrainrot1.rbxl",
    "shootbrainrot1.rbxl"
);

const repo15 = new Repository(
    "rep15.html",
    "MiDOS",
    "by Mikhail",
    "MiDOS.img",
    "run.bat"
);

const repo16 = new Repository(
    "rep16.html",
    "MiOS",
    "by Mikhail",
    "MiOS_2.iso"
);

// ============================================
// ALL REPOSITORIES ARRAY
// ============================================
const repositories = [repo1, repo2, repo3, repo4, repo5, repo6, repo7, repo8, repo9, repo10, repo11, repo12, repo13, repo14, repo15, repo16];

// ============================================
// CATEGORY DETECTION BASED ON FILE EXTENSION
// ============================================
function getCategoryByMaterial(materialFile) {
    if (!materialFile) return "soft";
    const ext = materialFile.split('.').pop().toLowerCase();
    
    // Soft: archives, installers, images, executables
    const softExts = ['zip', 'rar', '7z', 'iso', 'exe', 'msi', 'bin', 'vhd', 'apk', 'deb', 'pkg', 'dmg', 'img', 'tar', 'gz', 'rbxl'];
    if (softExts.includes(ext)) return "soft";
    
    // Video: video files
    const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'mpeg', 'mpg', 'm4v'];
    if (videoExts.includes(ext)) return "video";
    
    // Books: documents, presentations, ebooks, text files
    const bookExts = ['pdf', 'epub', 'mobi', 'cbr', 'cbz', 'docx', 'doc', 'pptx', 'ppt', 'txt', 'rtf', 'odt'];
    if (bookExts.includes(ext)) return "books";
    
    // Jar: java archives and related
    const jarExts = ['jar', 'jad', 'java', 'class'];
    if (jarExts.includes(ext)) return "jar";

        // Jar: java archives and related
    const audExts = ['mp3', 'Ogg'];
    if (audExts.includes(ext)) return "audio";

            // Jar: java archives and related
    const imgExts = ['jpg', 'png', 'bmp', 'jpeg'];
    if (audExts.includes(ext)) return "images";
    
    return "soft";
}

// ============================================
// ADD CATEGORY PROPERTY TO EACH REPOSITORY
// ============================================
repositories.forEach(repo => {
    repo.category = getCategoryByMaterial(repo.material);
});

// ============================================
// DOM ELEMENTS
// ============================================
const container = document.getElementById('repositoriesContainer');
const searchInput = document.getElementById('searchBox');
let activeCategory = 'all';
let categorySelected = false;

// ============================================
// RENDER FUNCTION with FILTERS (search + category)
// ============================================
function renderRepos(searchText = '', category = 'all') {
    const term = searchText.toLowerCase().trim();
    
    // Filter by search term
    let filtered = repositories;
    if (term !== '') {
        filtered = repositories.filter(repo => 
            repo.title.toLowerCase().includes(term) || 
            repo.description.toLowerCase().includes(term)
        );
    }
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(repo => repo.category === category);
    }
    
    // Empty state
    if (filtered.length === 0) {
        let message = '? NO REPOSITORIES FOUND';
        if (term && category !== 'all') message = `? NO ${category.toUpperCase()} REPOSITORIES MATCH ${searchText}`;
        else if (term) message = `? NO REPOSITORIES MATCH ${searchText}`;
        else if (category !== 'all') message = `? NO REPOSITORIES IN ${category.toUpperCase()} CATEGORY`;
        
        container.innerHTML = `<div class="no-repos">${message}</div>`;
        return;
    }
    
    // Generate HTML
    let html = '';
    filtered.forEach(repo => {
        const categoryDisplay = repo.category.toUpperCase();
        html += `
            <div class="repo-card">
                <div class="repo-name">
                    <a href="${repo.file}">${repo.title}</a>
                    <span class="repo-category">${categoryDisplay}</span>
                </div>
                <div class="repo-description">
                    ${repo.description}
                </div>
                <div class="material-block">
                    <div class="material-link">
                        <a href="${repo.material}" target="_blank">${repo.materialLabel}</a>
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
// MAIN FILTER FUNCTION (search + category)
// ============================================
window.applyFiltersAndRender = function() {
    renderRepos(searchInput.value, activeCategory);
};

// ============================================
// CATEGORY BUTTON HANDLERS
// ============================================
function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.cat-btn');
    const allButton = document.querySelector('.all-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const catValue = this.getAttribute('data-cat');
            
            // If clicking on a category button (not All)
            if (catValue !== 'all') {
                categorySelected = true;
                // Show the All button
                if (allButton) {
                    allButton.style.display = 'inline-block';
                }
                
                // Remove active class from all buttons
                buttons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set active category
                activeCategory = catValue;
                // Re-render with current search and new category
                renderRepos(searchInput.value, activeCategory);
            }
        });
    });
    
    // Handle All button separately
    if (allButton) {
        allButton.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Remove active class from All button
            this.classList.remove('active');
            
            // Reset to show all repositories
            activeCategory = 'all';
            categorySelected = false;
            
            // Hide the All button again
            this.style.display = 'none';
            
            // Re-render with all repositories
            renderRepos(searchInput.value, activeCategory);
        });
    }
}

// ============================================
// SEARCH ON INPUT
// ============================================
searchInput.addEventListener('input', function() {
    renderRepos(searchInput.value, activeCategory);
});

// ============================================
// INITIAL RENDER & SETUP
// ============================================
renderRepos('', 'all');
setupCategoryButtons();

// Make filterRepos available globally for backward compatibility
window.filterRepos = function() {
    renderRepos(searchInput.value, activeCategory);
};
