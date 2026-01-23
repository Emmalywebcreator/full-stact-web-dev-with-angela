const container = document.getElementById("quotes");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

const PER_PAGE = 5;
let currentPage = 1;
let quotes = [];

function render () {
    container.innerHTML = "";

    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const pageQuotes = quotes.slice(start, end);

    pageQuotes.forEach (q => {
        container.innerHTML += `
        <div class="website-quote">
            <img src="${q.image}" alt="${q.title}">
            <h1>${q.title}</h1>
            <p>"${q.text}" - ${q.author}</p>
        </div>
        `;
    });
const totalPages = Math.ceil(quotes.length / PER_PAGE);
pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

prevBtn.disabled = currentPage === 1;
nextBtn.disabled = currentPage === totalPages;

}

fetch("./quotes.json")
    .then(res => res.json())
    .then(data => {
        quotes = data;
        render();
    })
    .catch(err => console.error("Failed to load quotes", err));

prevBtn.onclick = () => {
    currentPage --;
    render();
}

nextBtn.onclick = () => {
    currentPage++;
    render();
}