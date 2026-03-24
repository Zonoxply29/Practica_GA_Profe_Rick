function AccordionManager() {
    let id = '';
    const accordions = document.querySelectorAll('.accordion');

    this.start = () => {
        accordions.forEach(thisAccordion => {
            id = thisAccordion.getAttribute('id');
            const items = thisAccordion.querySelectorAll('.accordion_item');
        
            items.forEach(item => {    
                const itemHead = item.querySelector('.accordion_item-head');
                   
                itemHead.addEventListener('click', () => {
                    this.activateTab(thisAccordion, item);
                });

            });

            this.onStart();
        });
    };

    this.activateTab = (thisAccordion, thisItem, scrollIntoView = false) => {
        this.closeOtherItems(thisAccordion);
        this.openThisItem(thisAccordion, thisItem, scrollIntoView);
    };

    this.openThisItem = (thisAccordion, thisItem, scrollIntoView = false) => {
        const itemHead = thisItem.querySelector('.accordion_item-head');
        const itemBody = thisItem.querySelector('.accordion_item-body');
        const isActive = itemBody.getAttribute('aria-expanded') === 'true';

        itemHead.setAttribute('aria-selected', !isActive);
        itemBody.setAttribute('aria-expanded', !isActive);

        if (scrollIntoView) {
            thisAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    this.closeOtherItems = thisAccordion => {
        const itemHeads = thisAccordion.querySelectorAll('.accordion_item-head');
        const itemBodies = thisAccordion.querySelectorAll('.accordion_item-body');
    
        itemHeads.forEach(itemHead => itemHead.removeAttribute('aria-selected'));
        itemBodies.forEach(itemBody => itemBody.removeAttribute('aria-expanded'));
    };

    this.onStart = () => {
        const urlParams        = new URLSearchParams(window.location.search);
        const targetAccordion  = urlParams.get('tabset');
        const targetTab        = urlParams.get('tab');
        const scrollIntoView   = true;

        const thisAccordion = document.querySelector(`#${targetAccordion}`);
        const thisItem = document.querySelector(`#${targetTab}`);

        if (targetTab && targetAccordion === id) {
            this.activateTab(thisAccordion, thisItem, scrollIntoView);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const accordionManager = new AccordionManager();
    accordionManager.start();
});