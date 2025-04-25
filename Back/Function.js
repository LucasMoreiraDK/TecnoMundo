const apiKey = '0455848f6d6f432bbb4206855151a08c'; // Substitua pela sua chave da NewsAPI
const container = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const toggleModeBtn = document.getElementById('toggle-mode');
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading';
loadingIndicator.textContent = 'Carregando...';
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results';
noResultsMessage.textContent = 'Nenhuma notícia encontrada.';

// Alternar modo escuro
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Buscar notícias
async function fetchNews(query = 'tecnologia') {
  try {
    showLoading();
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
    const data = await res.json();
    hideLoading();
    if (data.articles.length === 0) {
      showNoResults();
    } else {
      renderNews(data.articles);
    }
  } catch (error) {
    hideLoading();
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

function showLoading() {
  container.innerHTML = '';
  container.appendChild(loadingIndicator);
}

function hideLoading() {
  if (container.contains(loadingIndicator)) {
    container.removeChild(loadingIndicator);
  }
}

function showNoResults() {
  container.innerHTML = '';
  container.appendChild(noResultsMessage);
}

searchInput.addEventListener('input', e => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    fetchNews(query);
  }
});

fetchNews();