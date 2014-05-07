(function () {
    var gridContentWrapper = $('.mobile-grid .mobile-grid-content'),
        gridContent = $('.mobile-grid .mobile-grid-content > *'),
        gridHeaders = $('.mobile-grid .mobile-grid-top-right > *'),
        gridLabels = $('.mobile-grid .mobile-grid-left-labels > *');

    var maxScroll = -(gridContent.outerWidth() - gridContentWrapper.outerWidth());

    if (Craydent.os.ANDROID || Craydent.os.IOS) {

        gridContentWrapper.hammer()
            .on('dragstart', function (e) {
                var left = parseInt(gridContent.css("left").replace("px", ""));
                left = isNaN(left) ? 0 : left;
                gridPos = { x: left };
            }).on('drag', function (e) {

                var left = e.gesture.deltaX + gridPos.x;
                left = left > 0 ? 0 : left;
                left = left < maxScroll ? maxScroll : left;

                gridContent.css('webkitTransform', 'translate3d(' + left + 'px,0,0)');
                gridHeaders.css('webkitTransform', 'translate3d(' + left + 'px,0,0)');
            });
    }

    //Respond to native scroll in desktop
    gridContentWrapper.on('scroll', function (e) {
        var left = -($(this).scrollLeft()),
            top = -($(this).scrollTop());

        gridHeaders.css('left', left + "px");
        gridLabels.css('top', top + "px");
    });

})();