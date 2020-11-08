import { generateSubCatalogList } from './generateSubCatalog.js';

export const activateCatalog = () => {
  const openCatalogBtn = document.querySelector('.btn-burger'),
      catalog = document.querySelector('.catalog'),
      closeCatalogBtn = document.querySelector('.btn-close'),
      catalogList =  document.querySelector('.catalog-list'),
      subCatalog = document.querySelector('.subcatalog'),
      closeSubCatalogBtn = document.querySelector('.btn-return');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.append(overlay);

  //FUNCTIONS

  const openCatalog = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
    document.addEventListener('keyup', escapeCatalog);
  }

  const closeCatalog = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    document.removeEventListener('keyup', escapeCatalog);
    closeSubCatalog();
  }

  const escapeCatalog = (e) => {
    if (e.code === 'Escape') { 
      closeCatalog();
    }
  }

  const openSubCatalog = (e) => {
    e.preventDefault();
    if (e.target.closest('li')) {
      generateSubCatalogList(subCatalog, e.target.textContent);
      closeSubCatalogBtn.addEventListener('click', closeSubCatalog);
      document.addEventListener('keyup', escapeSubCatalog);
      document.removeEventListener('keyup', escapeCatalog);
      subCatalog.classList.add('subopen');
    }
  }

  const closeSubCatalog = () => {
    subCatalog.classList.remove('subopen');
    closeSubCatalogBtn.removeEventListener('click', closeSubCatalog);
    document.removeEventListener('keyup', escapeSubCatalog);
    document.addEventListener('keyup', escapeCatalog);
  }

  const escapeSubCatalog = (e) => {
    if (e.code === 'Escape') { 
      closeSubCatalog();
    }
  }

  //EVENT LISTENERS
  openCatalogBtn.addEventListener('click', openCatalog);
  closeCatalogBtn.addEventListener('click', closeCatalog);
  overlay.addEventListener('click', closeCatalog);
  catalogList.addEventListener('click', openSubCatalog);
  console.log(document.location)
}
