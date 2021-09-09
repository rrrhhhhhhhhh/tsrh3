
function initTooltip() {
    const tooltips = Array.from(document.querySelectorAll('[data-tooltip-container]'));
    let mouseIn = true;

    tooltips.map(tooltip => {
        tooltip.addEventListener('mouseenter', handleMouseEnter);
    })

    function handleMouseEnter() {
        mouseIn = true;
        const tooltipbox = createTooltipBox(this);

        handleMouseMove.tooltipbox = tooltipbox;
        this.addEventListener('mousemove', handleMouseMove);

        handleMouseLeave.tooltipbox = tooltipbox;
        handleMouseLeave.element = this;
        this.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleMouseLeave = {
        handleEvent() {
            mouseIn = false;
            this.tooltipbox.remove();
            this.element.removeEventListener('mousemove', handleMouseMove);
            this.element.removeEventListener('mouseleave', handleMouseLeave);
        }
    }

    const handleMouseMove = {
        handleEvent(e) {
            if(!mouseIn){
                return;
            }
            this.tooltipbox.style.top = e.clientY + 25 + 'px';
            this.tooltipbox.style.left = e.clientX + 13 +'px';
        }
    }

    function createTooltipBox(el) {
        let tooltip = document.createElement('div');
        tooltip.innerText = el.getAttribute('data-tooltip-label');
        tooltip.classList.add('tooltip');

        document.body.appendChild(tooltip);

        return tooltip;
    }
}

initTooltip();
