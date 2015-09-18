/**
 * Created by jasonh on 9/17/15.
 */

window.onscroll = (function() {
    // init the count to 0
    var count = 0;
    var scrollShow = function () {
        console.log('time to showq');
        var itemsToShow = ['game','rankings','info'];
        for (i = 0; i < itemsToShow.length; i++) {
            document.getElementsByClassName(itemsToShow[i])[0].style.display = 'block';
        }
    };
    var collapseAfter = function () {
        document.getElementsByClassName('footer')[0].style.height = '111px';
    };
    return function(e) {
        //count
        count++;
        console.log(count);
        if (count === 10) {
            // do something if count > 50
            console.log("gt50");
            scrollShow();
            collapseAfter();
            window.onscroll = null;
        }
    };
})();


var contentHeight = document.getElementsByClassName('container')[0].clientHeight;
var windowHeight = window.innerHeight;
console.log(contentHeight,windowHeight);

if ( contentHeight < windowHeight ) {
    var diffHeight = windowHeight - contentHeight;
    console.log(diffHeight);
    var addHeight = 111 + diffHeight + 50;
    console.log('addHeight',addHeight);
    document.getElementsByClassName('footer')[0].style.height = addHeight + 'px';
}