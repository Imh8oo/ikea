import GetData from '../utils/getData.js';

//generateSubCatalog is called in index.js
export const generateSubCatalog = () => {
  const subCatalogNode = document.createElement('div');
  subCatalogNode.classList.add('subcatalog');
  subCatalogNode.innerHTML = `
    <button type="button" class="btn btn-return catalog-btn" aria-expanded="true" title="Закрыть меню" aria-label="Закрыть меню">
      <svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70613 11.2927L3.99902 11.9997L4.70606 12.7069L11.999 20.0008L13.4133 18.5867L7.82744 13.0001H19.9999V11.0001H7.82729L13.4144 5.41328L12.0002 3.99902L4.70613 11.2927Z"></path>
      </svg>
    </button>
    <div class="subcatalog-wrapper"></div>
  `;
  document.body.append(subCatalogNode);
};

//updateSubCatalogList is called in activateCatalog.js => openSubCatalog
export const updateSubCatalogList = (subCatalogInnerWrapper, category) => {
  const getData = new GetData();
  subCatalogInnerWrapper.innerHTML = '';

  getData.getAllSubcategories( category, subcategories => {
    let subcategoriesList = '';
    subcategories.forEach( subcategory => {
      subcategoriesList += `
        <li class="subcatalog-list__item">
          <a href="goods.html?subcat=${subcategory}">${subcategory}</a>
        </li>
      `;
    });

    const subcategoriesHTML = `
      <h3 class="subcatalog-header"><a href="goods.html?cat=${category}">${category}</a></h3>
      <ul class="subcatalog-list">
        ${subcategoriesList}
      </ul>
    `;
  
    subCatalogInnerWrapper.insertAdjacentHTML('beforeend', subcategoriesHTML);
  });
};
