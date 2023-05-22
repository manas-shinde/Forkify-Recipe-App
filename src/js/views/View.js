import icons from '../../img/icons.svg';

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Manas Shinde
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newELs = Array.from(newDom.querySelectorAll('*'));
    const currEls = Array.from(this._parentElement.querySelectorAll('*'));

    newELs.forEach((el, i) => {
      const curEl = currEls[i];

      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = el.textContent;
      }

      if (!el.isEqualNode(curEl)) {
        Array.from(el.attributes).forEach(att =>
          curEl.setAttribute(att.name, att.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
      `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMsg = this._errorMessage) {
    const markup = `
      <div class="error">
          <div>
              <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
              </svg>
          </div>
          <p>${errorMsg}</p>
      </div> `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
