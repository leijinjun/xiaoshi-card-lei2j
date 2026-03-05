import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class XiaoshiImageCard extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _currentIndex: { type: Number },
      _images: { type: Array },
      _loadedImages: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        position: relative;
      }

      .image-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;

        opacity: 0;
        transition: opacity 1.2s ease;
      }

      img.active {
        opacity: 1;
      }

      .controls-container {
        position: absolute;
        bottom: 16px;
        right: 16px;
        z-index: 20;
      }

      .control-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(0,0,0,0.2);
        backdrop-filter: blur(6px);

        cursor: pointer;
        transition: transform 0.2s;
      }

      .control-btn:hover {
        transform: scale(1.1);
      }

      ha-icon {
        color: white;
      }

      /* 手机适配 */
      @media (max-width: 768px) {

        :host {
          height: 100vh;
        }

        .controls-container {
          bottom: 12px;
          right: 12px;
        }

        .control-btn {
          width: 28px;
          height: 28px;
        }

      }
    `;
  }

  constructor() {
    super();
    this._currentIndex = 0;
    this._images = [];
    this._loadedImages = {};
    this._timer = null;
  }

  setConfig(config) {

    if (!config.url || !Array.isArray(config.url)) {
      throw new Error("url 必须是数组");
    }

    this.config = config;
    this._images = config.url;
    this._interval = (config.interval || 60) * 1000;

    this._preloadImages();
  }

  connectedCallback() {
    super.connectedCallback();

    this._startAutoPlay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  render() {

    return html`
      <div class="image-container">

        ${this._images.map((img, index) => html`
          <img
            src="${img}"
            class="${index === this._currentIndex ? "active" : ""}"
          >
        `)}

      </div>

      <div class="controls-container">
        <div class="control-btn" @click=${this._manualRefresh}>
          <ha-icon icon="mdi:refresh"></ha-icon>
        </div>
      </div>
    `;
  }

  _startAutoPlay() {

    if (this._timer) {
      clearInterval(this._timer);
    }

    this._timer = setInterval(() => {

      this._nextImage();

    }, this._interval);
  }

  _nextImage() {

    this._currentIndex =
      (this._currentIndex + 1) % this._images.length;

    this.requestUpdate();
  }

  _manualRefresh(e) {

    const btn = e.currentTarget;

    btn.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
      ],
      {
        duration: 800,
        iterations: 1
      }
    );

    this._nextImage();
  }

  _preloadImages() {

    this._images.forEach(url => {

      const img = new Image();

      img.src = url;

      img.onload = () => {
        this._loadedImages[url] = true;
      };

    });
  }

  getCardSize() {
    return 1;
  }

}

customElements.define(
  "xiaoshi-image-card",
  XiaoshiImageCard
);
