import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class XiaoshiImageCard extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _currentIndex: { type: Number },
      _images: { type: Array },
      _interval: { type: Number },
      _timer: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
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
        background: rgba(0,0,0,0.3);
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

      @media (max-width: 768px) {
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
    this._interval = 5000; // 默认 5 秒轮播
    this._timer = null;
  }

  setConfig(config) {
    if (!config.url || !Array.isArray(config.url)) {
      throw new Error("url 必须是数组");
    }
    this.config = config;
    this._images = config.url;
    this._interval = (config.interval || 5) * 1000;

    this._preloadImages();
  }

  connectedCallback() {
    super.connectedCallback();
    this._startAutoPlay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  render() {
    return html`
      <div class="image-container">
        ${this._images.map((img, index) => html`
          <img src="${img}" class="${index === this._currentIndex ? 'active' : ''}">
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
    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(() => this._nextImage(), this._interval);
  }

  _nextImage() {
    if (!this._images || this._images.length === 0) return;
    this._currentIndex = (this._currentIndex + 1) % this._images.length;
    this.requestUpdate();
  }

  _manualRefresh() {
    this._nextImage();
    this._startAutoPlay(); // 点击刷新时重置轮播间隔
  }

  _preloadImages() {
    this._images.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("xiaoshi-image-card", XiaoshiImageCard);
