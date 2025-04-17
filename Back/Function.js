const apiKey = '0455848f6d6f432bbb4206855151a08c'; // Substitua pela sua chave da NewsAPI
const container = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const toggleModeBtn = document.getElementById('toggle-mode');

// Alternar modo escuro
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Buscar notícias
async function fetchNews(query = 'tecnologia') {
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
    const data = await res.json();
    renderNews(data.articles);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }
}

function renderNews(articles) {
  container.innerHTML = '';
  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `
      <img src="${article.urlToImage || ''}" alt="Imagem da notícia" />
      <h2>${article.title}</h2>
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Leia mais</a>
    `;
    container.appendChild(div);
  });
}

searchInput.addEventListener('input', e => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    fetchNews(query);
  }
});

fetchNews();