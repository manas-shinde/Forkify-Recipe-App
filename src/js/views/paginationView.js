import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    let currPage = this._data.currentPage;

    // For first page
    if (currPage === 1 && numberOfPages > 1)
      return this._generateMarkupPagination('right', currPage);

    // for last page
    if (currPage === numberOfPages)
      return this._generateMarkupPagination('left', currPage);

    // for in-between pages
    if (currPage < numberOfPages)
      return (
        this._generateMarkupPagination('left', currPage) +
        this._generateMarkupPagination('right', currPage)
      );

    // if there are no pages
    return '';
  }

  _generateMarkupPagination(navigatior, currPage) {
    return `
    <button data-goto="${
      navigatior === 'right' ? currPage + 1 : currPage - 1
    }" class="btn--inline pagination__btn--${
      navigatior === 'right' ? 'next' : 'prev'
    }">
      <span>Page ${navigatior === 'right' ? currPage + 1 : currPage - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${navigatior}"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
