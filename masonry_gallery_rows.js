// Masonry photo gallery
// Scales and aligns photos' thumbnails (original ratio) in rows to fill container.
// Responsive, light and simple to use.
// One control: max rows' height.
// JavaScript ES6, CSS3 FlexBox are used, no additional dependencies.

// (c) Vasyl Dzhala 2018, https://github.com/vasyldzhala

(()=> {

    const maxRowH = 300; //px, max rows' height, you can change it
    const containerSelector = '.masonry-gallery-rows';  // CSS selector of images' container
    const itemSelector = '.masonry-gallery-rows img'; // CSS selector of images
    const timeGap = 500; // time delay after window resize to rebuild gallery

    window.addEventListener('load', (event)  => {

        let containers = document.querySelectorAll(containerSelector);

        for (let cont of containers) {

            let items = cont.querySelectorAll(itemSelector);
            let contStyle = window.getComputedStyle(cont, null);
            let contPadding = parseFloat(contStyle.getPropertyValue('padding-left')) + parseFloat(contStyle.getPropertyValue('padding-right'));
            let itemStyle = window.getComputedStyle(items[0], null);
            let itemPadding = parseFloat(itemStyle.getPropertyValue('padding-left'));
            itemPadding += parseFloat(itemStyle.getPropertyValue('padding-right'));
            itemPadding += parseFloat(itemStyle.getPropertyValue('margin-left'));
            itemPadding += parseFloat(itemStyle.getPropertyValue('margin-right'));
            itemPadding += parseFloat(itemStyle.getPropertyValue('border-width')) * 2;
            let itemK = [];
            for (let i = 0; i < items.length; i++) {
                itemK[i] = items[i].naturalWidth / items[i].naturalHeight;
            }
            let isUnderConstruction = false;

            let buildGallery = () => {
                isUnderConstruction = true;
                let contW = cont.clientWidth - contPadding;
                let startItemInd = 0;
                let itemNum, summK, ind, rowH;

                do {
                    itemNum = 0;
                    summK = 0;
                    ind = startItemInd;
                    do {
                        itemNum++;
                        summK += itemK[ind];
                        rowH = ( contW - itemPadding * itemNum ) / summK;
                        ind++;
                    } while (rowH > maxRowH && ind < items.length);

                    if (rowH > maxRowH * 1.5) rowH = maxRowH;

                    for (let i = startItemInd; i < ind; i++) {
                        items[i].style.height = `${rowH}px`;
                    }
                    startItemInd = ind;
                } while (ind < items.length);
                isUnderConstruction = false;
                let emerge = setTimeout(() => {
                    cont.style.opacity = '1';
                }, timeGap);
            };

            let rebuild = setTimeout(buildGallery, timeGap);

            window.addEventListener('resize', () => {
                if (!isUnderConstruction) {
                    cont.style.opacity = '0';
                    rebuild = setTimeout(buildGallery, timeGap);
                }
            });

        }
    })

})();

