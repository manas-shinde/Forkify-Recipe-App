import icons from '../../img/icons.svg';

export default class View {
  _data;
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
  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    this._cleanup();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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

    this._cleanup();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _cleanup() {
    this._parentElement.innerHTML = '';
  }
}
