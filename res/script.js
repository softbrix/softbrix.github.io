setTimeout(closeDescription, 2000);
function closeDescription() {
    document.getElementById("description").classList.add('hidden');
}
function expandDescription() {
    document.getElementById("description").classList.remove('hidden');
}
function render(...args) {
    const PRICE = 54.8;
    const MAX_SIZE = 512;
    const MAX_BURGERS = 512;
    const resultEl = document.getElementById('burgers');
    let value = Number(document.getElementById("amount").value);
    if (isNaN(value) || value <= 0) {
        value = 0;
    }
    const res = Math.round((value * 100) / PRICE) / 100;
    document.getElementById("counter_label").innerText = res;
    if (res === 0) {
        resultEl.innerText = "";
        return;
    } 
        
    const lastRes = resultEl.childNodes.length;
    if (Math.ceil(res) < lastRes) {
        for (i = lastRes; i > Math.ceil(res) && i > 0; --i) {
            resultEl.removeChild(resultEl.childNodes[0]);
        }
    } else if (Math.ceil(res) > lastRes) {
        for (i = resultEl.childNodes.length; i < res && i < MAX_BURGERS; ++i) {
            const imgEl = document.createElement('img');
            imgEl.src = 'res/bm.png';
            imgEl.alt = "Burger!"
            imgEl.style.position = 'absolute';
            resultEl.appendChild(imgEl);
        }
    }

    let pct = (res % 1) === 0 ? 0 : 100 - (res % 1) * 100 // fraction of res 

    size = Math.sqrt(5 * resultEl.clientWidth * resultEl.clientHeight / res);
    size = Math.min(size, MAX_SIZE);
    // Distribute the first objects in the middle
    let xoffset = Math.max(20, 0.5*resultEl.clientWidth/res);
    let yoffset = Math.max(20, 0.5*resultEl.clientHeight/res);
    for (i = resultEl.childNodes.length - 1; i >= 0; --i) {
        let imgEl = resultEl.childNodes[i];
        imgEl.style.width = size * (0.5 + Math.random()) + 'px';
        imgEl.style.clipPath = 'initial';
        imgEl.style.left = xoffset + Math.random() * (resultEl.clientWidth - 2*xoffset) + 'px';
        imgEl.style.top =  yoffset + Math.random() * (resultEl.clientHeight - 2*yoffset) + 'px';
    }
    resultEl.childNodes[resultEl.childNodes.length - 1].style.clipPath = 'inset(0 ' + pct + '% 0 0)';
}
const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}
const throttle = (func, delay) => {
    let prev = 0;
    let throttleTimer;
    return (...args) => {
      clearTimeout(throttleTimer);
      const now = new Date().getTime();
      const delta = now - prev;
      if(delta > delay){
        prev = now;
        return func(...args); 
      } else {
        throttleTimer = setTimeout(() => { func(...args) }, delay - delta);
      }
    }
}
const throttledRender = throttle(render, 100);
function descriptionMouseDown() {
    const el = document.getElementById("description");
    function readHeight() {
        document.removeEventListener('mouseup', readHeight);
        let hz = el.style.height;
        console.log(hz);
        if (hz !== undefined && typeof hz === 'string' && hz.indexOf('px') > 0) {
        el.classList.remove('hidden');
        }
    }
    document.addEventListener('mouseup', readHeight);
}
function focusInput() {
    setTimeout(() => {
        document.getElementById('amount').focus();
    }, 100); 
}