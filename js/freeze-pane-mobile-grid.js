; (function ($) {

    $.fn.freezePaneMobileGrid = function () {
        return this.each(function () {

            var gridContentWrapper = $(this).find('.mobile-grid-content'),
                gridContent = $(this).find('.mobile-grid-content > *'),
                gridHeaders = $(this).find('.mobile-grid-top-right > *'),
                gridLabels = $(this).find('.mobile-grid-left-labels > *');

            var isMobile = Craydent.os.ANDROID || Craydent.os.IOS;

            var gridStartPos = { top: 0, left: 0 };

            Hammer(gridContentWrapper[0])
                .on('dragstart', function (e) {
                    var curPos = gridContent.position();
                    gridStartPos.top = curPos.top;
                    gridStartPos.left = curPos.left;
                }).on('drag', function (e) {

                    e.preventDefault();

                    var maxLeftScroll = -(gridContent.outerWidth() - gridContentWrapper.outerWidth());
                    var maxTopScroll = -(gridContent.outerHeight() - gridContentWrapper.outerHeight());

                    var left = e.gesture.deltaX + gridStartPos.left;
                    left = left > 0 ? 0 : left;
                    left = left < maxLeftScroll ? maxLeftScroll : left;

                    var top = e.gesture.deltaY + gridStartPos.top;
                    top = top > 0 ? 0 : top;
                    top = top < maxTopScroll ? maxTopScroll : top;

                    gridContent.css({
                        webkitTransform: 'translate3d(' + left + 'px,' + top + 'px,0)',
                        left: left + "px",
                        top: top + "px"
                    });

                    var curPos = gridContent.position();

                    gridHeaders.css({
                        left: curPos.left + "px"
                    });

                    gridLabels.css({
                        top: curPos.top + "px"
                    });
                });

            if (!isMobile) {
                //Respond to native scroll in desktop
                gridContentWrapper.on('scroll', function (e) {
                    var left = -($(this).scrollLeft()),
                        top = -($(this).scrollTop());

                    gridHeaders.css('left', left + "px");
                    gridLabels.css('top', top + "px");
                });
            }


        });
    };

})(jQuery);