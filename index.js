const DISPLAY_MODE = {
    PC: 'PC',
    RWD: 'RWD',
}

const DisplayModeHandlers = {
    displayModeLSKey: 'ibus-tc-display-mode',
    defaultDisplayMode: DISPLAY_MODE.RWD,
  
    pcViewportContent: 'width=1440, initial-scale=1, minimum-scale=0.5',
    rwdViewportContent: 'width=device-width, initial-scale=1',

    buttonContentPC: '切換為RWD版',
    buttonContentRWD: '切換為PC版',
  
    getViewportMetaEl: () => document.querySelector('meta[name="viewport"]'),
  
    setPcViewport() {
      const metaEl = this.getViewportMetaEl();
      metaEl && metaEl.setAttribute('content', this.pcViewportContent);
    },
    setRwdViewport() {
      const metaEl = this.getViewportMetaEl();
      metaEl && metaEl.setAttribute('content', this.rwdViewportContent);
    },
  
    getDisplayMode() {
      return localStorage.getItem(this.displayModeLSKey) || 
        this.defaultDisplayMode;
    },
  
    setDisplayMode(mode) {
      localStorage.setItem(this.displayModeLSKey, mode);
    },
  
    setAndReload(mode) {
      this.setDisplayMode(mode);
      window.location.reload();
    },
  
    detectDisplayModeAndSetViewport() {
      const displayMode = this.getDisplayMode();
      if(displayMode === 'PC') {
        this.setPcViewport();
      } else {
        this.setRwdViewport();
      }
    },
};

function updateElements(displayMode='') {
    const displayModeToggleButton = document.getElementById('displayModeToggleButton');
    const title = document.getElementById('title');
    const body = document.getElementsByTagName('body')[0];
    const widthDisplay = document.getElementById('widthDisplay');

    widthDisplay.innerText += body ? body.clientWidth : 0;
    title.innerText = `${displayMode} 模式`

    displayModeToggleButton.innerText = 
        displayMode === DISPLAY_MODE.RWD ? DisplayModeHandlers.buttonContentRWD : DisplayModeHandlers.buttonContentPC;
}

window.onload = () => {
    const displayMode = DisplayModeHandlers.getDisplayMode();

    DisplayModeHandlers.detectDisplayModeAndSetViewport();
    updateElements(displayMode)

    displayModeToggleButton.addEventListener('click', () => {
        const newDisplayMode = displayMode === DISPLAY_MODE.RWD ? 
            DISPLAY_MODE.PC : DISPLAY_MODE.RWD;
        DisplayModeHandlers.setAndReload(newDisplayMode);
    })
}
