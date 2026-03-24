function SlidingLogos() {
    const root = document.querySelector('.sliding-logos');
    const elementsDisplayed = getComputedStyle(root).getPropertyValue("--sliding-logos-elements-displayed");
    const content = document.querySelector("ul.sliding-logos-content");

    this.start = () => {
        root.style.setProperty("--sliding-logos-elements", content.children.length);

        for(let i = 0; i < elementsDisplayed; i++) {
            content.appendChild(content.children[i].cloneNode(true));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slidingLogos = new SlidingLogos();
    slidingLogos.start();
});