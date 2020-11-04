const openCatalogBtn = document.querySelector('.btn-burger'),
      catalog = document.querySelector('.catalog'),
      overlay = document.querySelector('.overlay'),
      closeCatalogBtn = document.querySelector('.btn-close');  

const openCatalog = () => {
  catalog.classList.add('open');
  overlay.classList.add('active');
}

const closeCatalog = ({ target }) => {
  catalog.classList.remove('open');
  overlay.classList.remove('active');
}

openCatalogBtn.addEventListener('click', openCatalog);
closeCatalogBtn.addEventListener('click', closeCatalog);
overlay.addEventListener('click', closeCatalog);
