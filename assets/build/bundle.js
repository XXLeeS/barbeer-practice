(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./index.js');
require('./ga.js');

},{"./ga.js":2,"./index.js":3}],2:[function(require,module,exports){
'use strict';

var globalTimer = void 0;
var isCounting = false;
function countThenSend(pageName) {
    if (!isCounting) {
        isCounting = true;
        globalTimer = setTimeout(function () {
            sendPageView(pageName);
        }, 800);
    }
}
function stopCount() {
    clearTimeout(globalTimer);
    isCounting = false;
}

function sendPageView(pageName) {
    ga('send', {
        hitType: 'pageview',
        page: pageName
    });
}

function isInBlock(el) {
    return el.getBoundingClientRect().top <= 200 && el.getBoundingClientRect().top > -(el.offsetHeight - 200);
}

var data = [{
    dom: document.getElementById('banner'),
    pageName: 'Bar Beer子網01-主視覺'
}, {
    dom: document.getElementById('feature'),
    pageName: 'Bar Beer子網02-商品特色'
}, {
    dom: document.querySelector('#cheers .block--one'),
    pageName: 'Bar Beer子網03-一個人'
}, {
    dom: document.querySelector('#cheers .block--two'),
    pageName: 'Bar Beer子網04-一群人'
}, {
    dom: document.getElementById('campaign'),
    pageName: 'Bar Beer子網-近期活動'
}, {
    dom: document.getElementById('lineup'),
    pageName: 'Bar Beer子網-系列商品'
}, {
    dom: document.getElementById('tvcm'),
    pageName: 'Bar Beer子網-電視廣告'
}];

var currentBlock = 0;
countThenSend('Bar Beer子網01-主視覺');
window.addEventListener('scroll', function () {
    data.forEach(function (el, i) {
        if (isInBlock(el.dom)) {
            if (i != currentBlock) {
                stopCount();
                currentBlock = i;
            }
            countThenSend(el.pageName);
        }
    });
});

document.querySelector('#banner .share').onclick = function () {
    ga('send', {
        hitType: 'event',
        eventCategory: '分享Bar Beer子網',
        eventAction: '點選',
        eventLabel: 'Bar Beer子網'
    });
};

document.querySelector('#campaign .button').onclick = function (event) {
    event.preventDefault();

    var link = this.href;
    ga('send', {
        hitType: 'event',
        eventCategory: '前往近期活動-[Show Girl 服裝設計比賽]',
        eventAction: '點選',
        eventLabel: 'Bar Beer子網',
        hitCallback: function hitCallback() {
            window.location = link;
        }
    });
};

document.querySelectorAll('#tvcm .cm').forEach(function (el) {
    var videoName = el.querySelector('.cm__name').innerHTML;

    el.onclick = function (event) {
        ga('send', {
            hitType: 'event',
            eventCategory: '\u89C0\u770BTVC-[' + videoName + ']',
            eventAction: '播放',
            eventLabel: 'Bar Beer子網'
        });
    };
});

document.querySelectorAll('#social .link-btn').forEach(function (el) {
    var socialName = el.querySelector('img').getAttribute('alt');

    el.onclick = function (event) {
        ga('send', {
            hitType: 'event',
            eventCategory: '\u524D\u5F80\u793E\u7FA4-[' + socialName + ']',
            eventAction: '點選',
            eventLabel: 'Bar Beer子網'
        });
    };
});

},{}],3:[function(require,module,exports){
'use strict';

function isInRegion(el, upperBound, lowerBound) {
    return el.getBoundingClientRect().top <= upperBound && el.getBoundingClientRect().top > lowerBound;
}
function isEndRegion(el, lowerBound) {
    return el.getBoundingClientRect().top <= lowerBound;
}
function getOffsetPercent(el, top, bottom) {
    return (top - el.getBoundingClientRect().top) / (top - bottom);
}
function getOffsetTopAbs(el) {
    var offsetTop = 0;
    do {
        if (!isNaN(el.offsetTop)) {
            offsetTop += el.offsetTop;
        }
    } while (el = el.offsetParent);

    return offsetTop;
}

window.addEventListener('scroll', function (e) {
    // beer fixed
    {
        var beer = document.querySelector('#beer');

        var upperBound = 0;
        var lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;

        if (isInRegion(document.body, upperBound, lowerBound)) {
            var offset = -(document.body.getBoundingClientRect().top - upperBound);
            beer.style.transform = 'translateY(' + offset + 'px)';
        } else if (isEndRegion(document.body, lowerBound)) {
            beer.style.transform = 'translateY(' + -(lowerBound - upperBound) + 'px)';
        } else {
            beer.removeAttribute('style');
        }
    }

    // banner text merge
    {
        var banner_text = document.querySelector('#banner .text-container');
        var left = banner_text.querySelector('.text--left');
        var right = banner_text.querySelector('.text--right');

        var _upperBound = 150;
        var _lowerBound = 0;
        var _offset = 95;

        if (isInRegion(banner_text, _upperBound, _lowerBound)) {
            left.style.transform = 'translateX(' + _offset * getOffsetPercent(banner_text, _upperBound, _lowerBound) + 'px)';
            right.style.transform = 'translateX(-' + _offset * getOffsetPercent(banner_text, _upperBound, _lowerBound) + 'px)';
        } else if (isEndRegion(banner_text, _lowerBound)) {
            left.style.transform = 'translateX(' + _offset + 'px)';
            right.style.transform = 'translateX(-' + _offset + 'px)';
        } else {
            left.removeAttribute('style');
            right.removeAttribute('style');
        }
    }

    // feature title fade
    {
        var feature_title = document.querySelector('#feature .title');

        var _upperBound2 = 500;
        var _lowerBound2 = 100;
        if (isInRegion(feature_title, _upperBound2, _lowerBound2)) {
            feature_title.style.opacity = getOffsetPercent(feature_title, _upperBound2, _lowerBound2);
        } else if (isEndRegion(feature_title, _lowerBound2)) {
            feature_title.style.opacity = 1;
        } else {
            feature_title.removeAttribute('style');
        }
    }

    // feature beer shadow
    {
        var beer_shadow = document.querySelector('#feature .beer-shadow');

        var _upperBound3 = -getOffsetTopAbs(document.querySelector('#feature')) + 800;
        var _lowerBound3 = -getOffsetTopAbs(document.querySelector('#cheers'));
        var cssTranslateX = 10;

        if (isInRegion(document.body, _upperBound3, _lowerBound3)) {
            var _offset2 = -(document.body.getBoundingClientRect().top - _upperBound3);
            beer_shadow.style.transform = 'translate(' + cssTranslateX + 'px, ' + _offset2 + 'px)';
        } else if (isEndRegion(document.body, _lowerBound3)) {
            // beer_shadow.style.transform = `translate(${cssTranslateX}px, ${offset}px)`;
        } else {
            beer_shadow.removeAttribute('style');
        }
    }

    // feature offsets
    var featureUpperBound = 600;
    var featureLowerBound = 500;
    var featureOffset = 100;
    var featureElements = ['.feature--one .feature__title', '.feature--one .feature__text', '.feature--two .feature__title', '.feature--two .feature__text', '.feature--three .feature__title', '.feature--three .feature__text'];
    featureElements.forEach(function (el, i) {
        var element = document.querySelector('#feature ' + el);

        var upperBound = featureUpperBound + i * 50;
        var lowerBound = featureLowerBound + i * 50;
        // second feature offset another direction
        var offset = i == 2 || i == 3 ? -featureOffset : featureOffset;

        if (isInRegion(element, upperBound, lowerBound)) {
            element.style.transform = 'translateX(' + offset * (1 - getOffsetPercent(element, upperBound, lowerBound)) + 'px)';
            element.style.opacity = getOffsetPercent(element, upperBound, lowerBound);
        } else if (isEndRegion(element, lowerBound)) {
            element.style.transform = 'translateX(0px)';
            element.style.opacity = 1;
        } else {
            element.removeAttribute('style');
        }
    });

    // empty hand moving
    var handCssTranslateX = -525;
    {
        var hand_wrapper = document.querySelector('#cheers .hand-wrapper');

        var _upperBound4 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 400;
        var _lowerBound4 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
        var _offset3 = 150;

        if (isInRegion(document.body, _upperBound4, _lowerBound4)) {
            hand_wrapper.style.transform = 'translateX(' + (handCssTranslateX + _offset3 * getOffsetPercent(document.body, _upperBound4, _lowerBound4)) + 'px)';
        } else if (isEndRegion(document.body, _lowerBound4)) {
            // hand_wrapper.style.transform = `translateX(-375px)`;
        } else {
            hand_wrapper.removeAttribute('style');
        }
    }
    {
        var _hand_wrapper = document.querySelector('#cheers .hand-wrapper');

        var _upperBound5 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
        var _lowerBound5 = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;
        var offsetTopAbs = -getOffsetTopAbs(_hand_wrapper);

        if (isInRegion(document.body, _upperBound5, _lowerBound5)) {
            _hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 1;
            var _offset4 = -(document.body.getBoundingClientRect().top - _upperBound5);
            _hand_wrapper.style.transform = 'translate(-375px, ' + _offset4 + 'px)';
        } else if (isEndRegion(document.body, _lowerBound5)) {
            _hand_wrapper.style.transform = 'translate(-375px, ' + -(_lowerBound5 - _upperBound5) + 'px)';
        } else {
            _hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 0;
        }
    }

    // another hand cheers
    {
        var another_hand = document.querySelector('#cheers .another-hand');
        var foam = document.querySelector('#cheers .foam');

        var _lowerBound6 = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;

        if (isEndRegion(document.body, _lowerBound6)) {
            another_hand.classList.remove('back');
            another_hand.classList.add('cheer');
            another_hand.addEventListener("webkitAnimationEnd", function (event) {
                if (event.animationName == 'cheer') {
                    foam.classList.add('show');
                }
            });
        } else {
            another_hand.classList.add('back');
            foam.classList.remove('show');
            another_hand.addEventListener("webkitAnimationEnd", function (event) {
                if (event.animationName == 'back') {
                    another_hand.classList.remove('cheer');
                }
            });
        }
    }

    // foam appear
    // function showFoam(){
    //     let foam = document.querySelector('#cheers .foam');


    // }
    // function hideFoam(){
    //     let foam = document.querySelector('#cheers .foam');
    //     foam.
    // }

    // cheers text fade
    document.querySelectorAll('#cheers .text p').forEach(function (el) {
        var upperBound = 400;
        var lowerBound = 300;

        if (isInRegion(el, upperBound, lowerBound)) {
            el.style.opacity = getOffsetPercent(el, upperBound, lowerBound);
        } else if (isEndRegion(el, lowerBound)) {
            el.style.opacity = 1;
        } else {
            el.removeAttribute('style');
        }
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHNcXGpzXFxhcHAuanMiLCJhc3NldHNcXGpzXFxnYS5qcyIsImFzc2V0c1xcanNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxRQUFRLFlBQVI7QUFDQSxRQUFRLFNBQVI7Ozs7O0FDREEsSUFBSSxvQkFBSjtBQUNBLElBQUksYUFBYSxLQUFqQjtBQUNBLFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFnQztBQUM1QixRQUFHLENBQUMsVUFBSixFQUFlO0FBQ1gscUJBQWEsSUFBYjtBQUNBLHNCQUFjLFdBQVcsWUFBTTtBQUFFLHlCQUFhLFFBQWI7QUFBd0IsU0FBM0MsRUFBNkMsR0FBN0MsQ0FBZDtBQUNIO0FBQ0o7QUFDRCxTQUFTLFNBQVQsR0FBb0I7QUFDaEIsaUJBQWEsV0FBYjtBQUNBLGlCQUFhLEtBQWI7QUFDSDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsUUFBdEIsRUFBK0I7QUFDM0IsT0FBRyxNQUFILEVBQVc7QUFDUCxpQkFBUyxVQURGO0FBRVAsY0FBTTtBQUZDLEtBQVg7QUFJSDs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsRUFBbkIsRUFBc0I7QUFDbEIsV0FBTyxHQUFHLHFCQUFILEdBQTJCLEdBQTNCLElBQWtDLEdBQWxDLElBQXlDLEdBQUcscUJBQUgsR0FBMkIsR0FBM0IsR0FBaUMsRUFBRSxHQUFHLFlBQUgsR0FBZ0IsR0FBbEIsQ0FBakY7QUFDSDs7QUFFRCxJQUFJLE9BQU8sQ0FDUDtBQUNJLFNBQUssU0FBUyxjQUFULENBQXdCLFFBQXhCLENBRFQ7QUFFSSxjQUFVO0FBRmQsQ0FETyxFQUtQO0FBQ0ksU0FBSyxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FEVDtBQUVJLGNBQVU7QUFGZCxDQUxPLEVBU1A7QUFDSSxTQUFLLFNBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FEVDtBQUVJLGNBQVU7QUFGZCxDQVRPLEVBYVA7QUFD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Q0QsZUFBRyxlQUFILENBQW1CLE9BQW5CO0FBQ0g7QUFDSixLQVhEO0FBY0gsQ0EzTEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9pbmRleC5qcycpO1xyXG5yZXF1aXJlKCcuL2dhLmpzJyk7IiwibGV0IGdsb2JhbFRpbWVyO1xyXG5sZXQgaXNDb3VudGluZyA9IGZhbHNlO1xyXG5mdW5jdGlvbiBjb3VudFRoZW5TZW5kKHBhZ2VOYW1lKXtcclxuICAgIGlmKCFpc0NvdW50aW5nKXtcclxuICAgICAgICBpc0NvdW50aW5nID0gdHJ1ZTtcclxuICAgICAgICBnbG9iYWxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4geyBzZW5kUGFnZVZpZXcocGFnZU5hbWUpIH0sIDgwMCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3RvcENvdW50KCl7XHJcbiAgICBjbGVhclRpbWVvdXQoZ2xvYmFsVGltZXIpO1xyXG4gICAgaXNDb3VudGluZyA9IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kUGFnZVZpZXcocGFnZU5hbWUpe1xyXG4gICAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgICAgaGl0VHlwZTogJ3BhZ2V2aWV3JyxcclxuICAgICAgICBwYWdlOiBwYWdlTmFtZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5CbG9jayhlbCl7XHJcbiAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IDIwMCAmJiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiAtKGVsLm9mZnNldEhlaWdodC0yMDApO1xyXG59XHJcblxyXG5sZXQgZGF0YSA9IFtcclxuICAgIHtcclxuICAgICAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKSxcclxuICAgICAgICBwYWdlTmFtZTogJ0JhciBCZWVy5a2Q57ayMDEt5Li76KaW6Ka6JyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVhdHVyZScpLFxyXG4gICAgICAgIHBhZ2VOYW1lOiAnQmFyIEJlZXLlrZDntrIwMi3llYblk4HnibnoibInLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkb206IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS1vbmUnKSxcclxuICAgICAgICBwYWdlTmFtZTogJ0JhciBCZWVy5a2Q57ayMDMt5LiA5YCL5Lq6JyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZG9tOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5ibG9jay0tdHdvJyksXHJcbiAgICAgICAgcGFnZU5hbWU6ICdCYXIgQmVlcuWtkOe2sjA0LeS4gOe+pOS6uicsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbXBhaWduJyksXHJcbiAgICAgICAgcGFnZU5hbWU6ICdCYXIgQmVlcuWtkOe2si3ov5HmnJ/mtLvli5UnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5ldXAnKSxcclxuICAgICAgICBwYWdlTmFtZTogJ0JhciBCZWVy5a2Q57ayLeezu+WIl+WVhuWTgScsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R2Y20nKSxcclxuICAgICAgICBwYWdlTmFtZTogJ0JhciBCZWVy5a2Q57ayLembu+imluW7o+WRiicsXHJcbiAgICB9LFxyXG5dXHJcblxyXG5sZXQgY3VycmVudEJsb2NrID0gMDtcclxuY291bnRUaGVuU2VuZCgnQmFyIEJlZXLlrZDntrIwMS3kuLvoppbopronKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICBkYXRhLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgaWYoaXNJbkJsb2NrKGVsLmRvbSkpe1xyXG4gICAgICAgICAgICBpZihpICE9IGN1cnJlbnRCbG9jayl7XHJcbiAgICAgICAgICAgICAgICBzdG9wQ291bnQoKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRUaGVuU2VuZChlbC5wYWdlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSlcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYW5uZXIgLnNoYXJlJykub25jbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICBoaXRUeXBlOiAnZXZlbnQnLFxyXG4gICAgICAgIGV2ZW50Q2F0ZWdvcnk6ICfliIbkuqtCYXIgQmVlcuWtkOe2sicsXHJcbiAgICAgICAgZXZlbnRBY3Rpb246ICfpu57pgbgnLFxyXG4gICAgICAgIGV2ZW50TGFiZWw6ICdCYXIgQmVlcuWtkOe2sidcclxuICAgIH0pXHJcbn1cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW1wYWlnbiAuYnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgbGV0IGxpbmsgPSB0aGlzLmhyZWY7XHJcbiAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICBoaXRUeXBlOiAnZXZlbnQnLFxyXG4gICAgICAgIGV2ZW50Q2F0ZWdvcnk6ICfliY3lvoDov5HmnJ/mtLvli5UtW1Nob3cgR2lybCDmnI3oo53oqK3oqIjmr5Tos71dJyxcclxuICAgICAgICBldmVudEFjdGlvbjogJ+m7numBuCcsXHJcbiAgICAgICAgZXZlbnRMYWJlbDogJ0JhciBCZWVy5a2Q57ayJyxcclxuICAgICAgICBoaXRDYWxsYmFjazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbGluaztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3R2Y20gLmNtJykuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGxldCB2aWRlb05hbWUgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY21fX25hbWUnKS5pbm5lckhUTUw7XHJcblxyXG4gICAgZWwub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICAgICAgaGl0VHlwZTogJ2V2ZW50JyxcclxuICAgICAgICAgICAgZXZlbnRDYXRlZ29yeTogYOingOeci1RWQy1bJHt2aWRlb05hbWV9XWAsXHJcbiAgICAgICAgICAgIGV2ZW50QWN0aW9uOiAn5pKt5pS+JyxcclxuICAgICAgICAgICAgZXZlbnRMYWJlbDogJ0JhciBCZWVy5a2Q57ayJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSlcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzb2NpYWwgLmxpbmstYnRuJykuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGxldCBzb2NpYWxOYW1lID0gZWwucXVlcnlTZWxlY3RvcignaW1nJykuZ2V0QXR0cmlidXRlKCdhbHQnKTtcclxuXHJcbiAgICBlbC5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgICBoaXRUeXBlOiAnZXZlbnQnLFxyXG4gICAgICAgICAgICBldmVudENhdGVnb3J5OiBg5YmN5b6A56S+576kLVske3NvY2lhbE5hbWV9XWAsXHJcbiAgICAgICAgICAgIGV2ZW50QWN0aW9uOiAn6bue6YG4JyxcclxuICAgICAgICAgICAgZXZlbnRMYWJlbDogJ0JhciBCZWVy5a2Q57ayJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSkiLCJcclxuZnVuY3Rpb24gaXNJblJlZ2lvbihlbCwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCl7XHJcbiAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IHVwcGVyQm91bmQgJiYgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gbG93ZXJCb3VuZDtcclxufVxyXG5mdW5jdGlvbiBpc0VuZFJlZ2lvbihlbCwgbG93ZXJCb3VuZCl7XHJcbiAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IGxvd2VyQm91bmQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0UGVyY2VudChlbCwgdG9wLCBib3R0b20pe1xyXG4gICAgcmV0dXJuICh0b3AgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIC8gKHRvcCAtIGJvdHRvbSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0VG9wQWJzKGVsKXtcclxuICAgIGxldCBvZmZzZXRUb3AgPSAwO1xyXG4gICAgZG97XHJcbiAgICAgIGlmICghaXNOYU4oZWwub2Zmc2V0VG9wKSl7XHJcbiAgICAgICAgICBvZmZzZXRUb3AgKz0gZWwub2Zmc2V0VG9wO1xyXG4gICAgICB9XHJcbiAgICB9d2hpbGUoIGVsID0gZWwub2Zmc2V0UGFyZW50ICk7XHJcblxyXG4gICAgcmV0dXJuIG9mZnNldFRvcDtcclxufVxyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4ge1xyXG4gICAgLy8gYmVlciBmaXhlZFxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JlZXInKTtcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5ibG9jay0tdHdvJykpICsgMTAwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IC0oZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB1cHBlckJvdW5kKTtcclxuICAgICAgICAgICAgYmVlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgYmVlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgkey0obG93ZXJCb3VuZCAtIHVwcGVyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJlZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBiYW5uZXIgdGV4dCBtZXJnZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiYW5uZXJfdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYW5uZXIgLnRleHQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgbGV0IGxlZnQgPSBiYW5uZXJfdGV4dC5xdWVyeVNlbGVjdG9yKCcudGV4dC0tbGVmdCcpO1xyXG4gICAgICAgIGxldCByaWdodCA9IGJhbm5lcl90ZXh0LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LS1yaWdodCcpO1xyXG5cclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IDE1MDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDk1O1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGJhbm5lcl90ZXh0LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGxlZnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQqZ2V0T2Zmc2V0UGVyY2VudChiYW5uZXJfdGV4dCwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCl9cHgpYDtcclxuICAgICAgICAgICAgcmlnaHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7b2Zmc2V0KmdldE9mZnNldFBlcmNlbnQoYmFubmVyX3RleHQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oYmFubmVyX3RleHQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgbGVmdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgICAgICAgICByaWdodC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGVmdC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJpZ2h0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmVhdHVyZSB0aXRsZSBmYWRlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZlYXR1cmVfdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVhdHVyZSAudGl0bGUnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IDUwMDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IDEwMDtcclxuICAgICAgICBpZihpc0luUmVnaW9uKGZlYXR1cmVfdGl0bGUsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgZmVhdHVyZV90aXRsZS5zdHlsZS5vcGFjaXR5ID0gZ2V0T2Zmc2V0UGVyY2VudChmZWF0dXJlX3RpdGxlLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihmZWF0dXJlX3RpdGxlLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGZlYXR1cmVfdGl0bGUuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZlYXR1cmVfdGl0bGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmZWF0dXJlIGJlZXIgc2hhZG93XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJlZXJfc2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlYXR1cmUgLmJlZXItc2hhZG93JylcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmZWF0dXJlJykpICsgODAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzJykpO1xyXG4gICAgICAgIGxldCBjc3NUcmFuc2xhdGVYID0gMTA7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZG9jdW1lbnQuYm9keSwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLShkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHVwcGVyQm91bmQpO1xyXG4gICAgICAgICAgICBiZWVyX3NoYWRvdy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7Y3NzVHJhbnNsYXRlWH1weCwgJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihkb2N1bWVudC5ib2R5LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIC8vIGJlZXJfc2hhZG93LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjc3NUcmFuc2xhdGVYfXB4LCAke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBiZWVyX3NoYWRvdy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZlYXR1cmUgb2Zmc2V0c1xyXG4gICAgbGV0IGZlYXR1cmVVcHBlckJvdW5kID0gNjAwO1xyXG4gICAgbGV0IGZlYXR1cmVMb3dlckJvdW5kID0gNTAwO1xyXG4gICAgbGV0IGZlYXR1cmVPZmZzZXQgPSAxMDA7XHJcbiAgICBsZXQgZmVhdHVyZUVsZW1lbnRzID0gWycuZmVhdHVyZS0tb25lIC5mZWF0dXJlX190aXRsZScsICcuZmVhdHVyZS0tb25lIC5mZWF0dXJlX190ZXh0JyxcclxuICAgICAgICAnLmZlYXR1cmUtLXR3byAuZmVhdHVyZV9fdGl0bGUnLCAnLmZlYXR1cmUtLXR3byAuZmVhdHVyZV9fdGV4dCcsXHJcbiAgICAgICAgJy5mZWF0dXJlLS10aHJlZSAuZmVhdHVyZV9fdGl0bGUnLCAnLmZlYXR1cmUtLXRocmVlIC5mZWF0dXJlX190ZXh0J107XHJcbiAgICBmZWF0dXJlRWxlbWVudHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmZWF0dXJlICR7ZWx9YCk7XHJcblxyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gZmVhdHVyZVVwcGVyQm91bmQgKyBpKjUwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gZmVhdHVyZUxvd2VyQm91bmQgKyBpKjUwO1xyXG4gICAgICAgIC8vIHNlY29uZCBmZWF0dXJlIG9mZnNldCBhbm90aGVyIGRpcmVjdGlvblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSAoaT09Mnx8aT09MykgPyAtZmVhdHVyZU9mZnNldCA6IGZlYXR1cmVPZmZzZXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaXNJblJlZ2lvbihlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQqKDEtZ2V0T2Zmc2V0UGVyY2VudChlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl9cHgpYDtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gZ2V0T2Zmc2V0UGVyY2VudChlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTsgXHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oZWxlbWVudCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDBweClgO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG5cclxuICAgIC8vIGVtcHR5IGhhbmQgbW92aW5nXHJcbiAgICBsZXQgaGFuZENzc1RyYW5zbGF0ZVggPSAtNTI1O1xyXG4gICAge1xyXG4gICAgICAgIGxldCBoYW5kX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5oYW5kLXdyYXBwZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLW9uZScpKSArIDQwMDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLW9uZScpKSArIDE4MDtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMTUwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7aGFuZENzc1RyYW5zbGF0ZVggKyBvZmZzZXQqZ2V0T2Zmc2V0UGVyY2VudChkb2N1bWVudC5ib2R5LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKX1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgLy8gaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0zNzVweClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBoYW5kX3dyYXBwZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHtcclxuICAgICAgICBsZXQgaGFuZF93cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuaGFuZC13cmFwcGVyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS1vbmUnKSkgKyAxODA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS10d28nKSkgKyAxMDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFRvcEFicyA9IC1nZXRPZmZzZXRUb3BBYnMoaGFuZF93cmFwcGVyKTtcclxuXHJcbiAgICAgICAgaWYoaXNJblJlZ2lvbihkb2N1bWVudC5ib2R5LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuZW1wdHktaGFuZC0tc2hhZG93Jykuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtKGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdXBwZXJCb3VuZCk7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0zNzVweCwgJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihkb2N1bWVudC5ib2R5LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0zNzVweCwgJHstKGxvd2VyQm91bmQgLSB1cHBlckJvdW5kKX1weClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBoYW5kX3dyYXBwZXIucXVlcnlTZWxlY3RvcignLmVtcHR5LWhhbmQtLXNoYWRvdycpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhbm90aGVyIGhhbmQgY2hlZXJzXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFub3RoZXJfaGFuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjaGVlcnMgLmFub3RoZXItaGFuZGApO1xyXG4gICAgICAgIGxldCBmb2FtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuZm9hbScpOyAgICBcclxuXHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS10d28nKSkgKyAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaXNFbmRSZWdpb24oZG9jdW1lbnQuYm9keSwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuY2xhc3NMaXN0LnJlbW92ZSgnYmFjaycpO1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuY2xhc3NMaXN0LmFkZCgnY2hlZXInKTtcclxuICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5hbmltYXRpb25OYW1lID09ICdjaGVlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvYW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmNsYXNzTGlzdC5hZGQoJ2JhY2snKTtcclxuICAgICAgICAgICAgZm9hbS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGFub3RoZXJfaGFuZC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQuYW5pbWF0aW9uTmFtZSA9PSAnYmFjaycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFub3RoZXJfaGFuZC5jbGFzc0xpc3QucmVtb3ZlKCdjaGVlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9hbSBhcHBlYXJcclxuICAgIC8vIGZ1bmN0aW9uIHNob3dGb2FtKCl7XHJcbiAgICAvLyAgICAgbGV0IGZvYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5mb2FtJyk7XHJcblxyXG5cclxuICAgIC8vIH1cclxuICAgIC8vIGZ1bmN0aW9uIGhpZGVGb2FtKCl7XHJcbiAgICAvLyAgICAgbGV0IGZvYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5mb2FtJyk7XHJcbiAgICAvLyAgICAgZm9hbS5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjaGVlcnMgdGV4dCBmYWRlXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY2hlZXJzIC50ZXh0IHAnKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gNDAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gMzAwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGVsLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSBnZXRPZmZzZXRQZXJjZW50KGVsLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihlbCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgXHJcbn0pO1xyXG5cclxuIl19
