import { updateSubCatalogList } from './generateSubCatalog.js';

//activateCatalog is called in generateCatalog.js
export const activateCatalog = () => {
  const openCatalogBtn = document.querySelector('.btn-burger'),
      catalog = document.querySelector('.catalog'),
      closeCatalogBtn = document.querySelector('.btn-close'),
      catalogList =  document.querySelector('.catalog-list'),
      subCatalog = document.querySelector('.subcatalog'),
      subcatalogWrap = subCatalog.querySelector('.subcatalog-wrapper'),
      closeSubCatalogBtn = document.querySelector('.btn-return');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.append(overlay);

  //FUNCTIONS

  const openCatalog = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  }

  const closeCatalog = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
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
      updateSubCatalogList(subcatalogWrap, e.target.textContent);
      subCatalog.classList.add('subopen');
    }
  }

  const closeSubCatalog = () => {
    subCatalog.classList.remove('subopen');
    document.removeEventListener('keyup', escapeSubCatalog);
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
  document.addEventListener('keyup', escapeCatalog);
  catalogList.addEventListener('click', openSubCatalog);
  closeSubCatalogBtn.addEventListener('click', closeSubCatalog);
  document.addEventListener('keyup', escapeCatalog);
  console.log(document.location);
}
