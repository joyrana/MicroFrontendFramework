export class BasicApp extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = 'Welcome to Micro Frontend Framework !!';
    // here the element has been inserted into the DOM
  }
  attributeChangedCallback(attr: any, oldVal: any, newVal: any) {
    if (attr === 'size') {
      console.log('Old Value ' + oldVal);
      console.log('New Value ' + newVal);
    }
  }
}
customElements.define('basic-app', BasicApp);