let body;
let bgColorsBody;
let menu;
let menuItems;
let menuBorder;
let activeItem;


function clickItem(item, index,) {
    menu.style.removeProperty("--timeOut");
    if (parseInt(index)===4){
        menuBorder.style.transitionDuration="3000ms";
    }else{
        menuBorder.style.transitionDuration="300ms";
    }
    
    
    if (activeItem === item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    switch (index) {
    case 0:
        window.location.href="/";
        break;
    case 1:
        window.location.href="/posts";
        break;
    case 2:
        window.location.href="/profile";
        break;
    case 3:
        window.location.href="/settings";
        break;
    case 4:
        sessionStorage.removeItem('token');
        window.location.href="/access";
        break;
    }
    
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

export default function initheader (index_header) {
    let idx_hdr = parseInt(index_header);
    body = document.body;
    bgColorsBody = ["#ffb457", "#65ddb7", "#9999fb", "#ffe797", "#1d1d27"];
    body.style.backgroundColor = bgColorsBody[idx_hdr];
    menu = body.querySelector(".menu");
    menuItems = menu.querySelectorAll(".menu__item");
    menuBorder = menu.querySelector(".menu__border");

    menuBorder.style.transitionDuration="0ms";
    menuItems[idx_hdr].classList.add("active");
    body.style.backgroundColor = bgColorsBody[idx_hdr];
    activeItem = menuItems[idx_hdr];
    offsetMenuBorder(activeItem, menuBorder);



    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => clickItem(item, index));
    });

    window.addEventListener("resize", () => {
        offsetMenuBorder(activeItem, menuBorder);
        menu.style.setProperty("--timeOut", "none");
    });
    
    
} 