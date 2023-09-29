class SetDetailsHeight {
    constructor(detailElement) {
        this.detailElement = detailElement;
    }

    #setDetailsExpandedCollapsedHeight = (detail, open = false) => {
        detail.open = open;
        const rect = detail.getBoundingClientRect();
        detail.dataset.width = rect.width;
        detail.style.setProperty(open ? `--expanded` : `--collapsed`, `${rect.height}px`);
    }

    addResizeObserver = () => {
        const resizeObserver = new ResizeObserver(([entry]) => {
            const detail = entry.target;
            const width = parseInt(detail.dataset.width, 10);
            if (width !== entry.contentRect.width) {
                detail.removeAttribute('style');
                this.#setDetailsExpandedCollapsedHeight(detail);
                this.#setDetailsExpandedCollapsedHeight(detail, true);
                detail.open = false;
            }
        });

        resizeObserver.observe(this.detailElement);
    }
}

document.querySelectorAll('details').forEach(detailElement => {
    const setDetailsHeight = new SetDetailsHeight(detailElement);
    setDetailsHeight.addResizeObserver();
});
