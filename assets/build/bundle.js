(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// let Waypoint = require('waypoints/lib/noframework.waypoints');
require('./index.js');

},{"./index.js":2}],2:[function(require,module,exports){
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
        console.log(foam);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHNcXGpzXFxhcHAuanMiLCJhc3NldHNcXGpzXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLFlBQVI7Ozs7O0FDQUEsU0FBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdCLFVBQXhCLEVBQW9DLFVBQXBDLEVBQStDO0FBQzNDLFdBQU8sR0FBRyxxQkFBSCxHQUEyQixHQUEzQixJQUFrQyxVQUFsQyxJQUFnRCxHQUFHLHFCQUFILEdBQTJCLEdBQTNCLEdBQWlDLFVBQXhGO0FBQ0g7QUFDRCxTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUIsVUFBekIsRUFBb0M7QUFDaEMsV0FBTyxHQUFHLHFCQUFILEdBQTJCLEdBQTNCLElBQWtDLFVBQXpDO0FBQ0g7QUFDRCxTQUFTLGdCQUFULENBQTBCLEVBQTFCLEVBQThCLEdBQTlCLEVBQW1DLE1BQW5DLEVBQTBDO0FBQ3RDLFdBQU8sQ0FBQyxNQUFNLEdBQUcscUJBQUgsR0FBMkIsR0FBbEMsS0FBMEMsTUFBTSxNQUFoRCxDQUFQO0FBQ0g7QUFDRCxTQUFTLGVBQVQsQ0FBeUIsRUFBekIsRUFBNEI7QUFDeEIsUUFBSSxZQUFZLENBQWhCO0FBQ0EsT0FBRTtBQUNBLFlBQUksQ0FBQyxNQUFNLEdBQUcsU0FBVCxDQUFMLEVBQXlCO0FBQ3JCLHlCQUFhLEdBQUcsU0FBaEI7QUFDSDtBQUNGLEtBSkQsUUFJUSxLQUFLLEdBQUcsWUFKaEI7O0FBTUEsV0FBTyxTQUFQO0FBQ0g7O0FBR0QsT0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFDLENBQUQsRUFBTztBQUNyQztBQUNBO0FBQ0ksWUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFYOztBQUVBLFlBQUksYUFBYSxDQUFqQjtBQUNBLFlBQUksYUFBYSxDQUFDLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENB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S0FBRCxFQUFXO0FBQzNELG9CQUFHLE1BQU0sYUFBTixJQUF1QixNQUExQixFQUFpQztBQUM3QixpQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLE9BQTlCO0FBQ0g7QUFDSixhQUpEO0FBS0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFTLGdCQUFULENBQTBCLGlCQUExQixFQUE2QyxPQUE3QyxDQUFxRCxVQUFDLEVBQUQsRUFBUTtBQUN6RCxZQUFJLGFBQWEsR0FBakI7QUFDQSxZQUFJLGFBQWEsR0FBakI7O0FBRUEsWUFBRyxXQUFXLEVBQVgsRUFBZSxVQUFmLEVBQTJCLFVBQTNCLENBQUgsRUFBMEM7QUFDdEMsZUFBRyxLQUFILENBQVMsT0FBVCxHQUFtQixpQkFBaUIsRUFBakIsRUFBcUIsVUFBckIsRUFBaUMsVUFBakMsQ0FBbkI7QUFDSCxTQUZELE1BRU0sSUFBRyxZQUFZLEVBQVosRUFBZ0IsVUFBaEIsQ0FBSCxFQUErQjtBQUNqQyxlQUFHLEtBQUgsQ0FBUyxPQUFULEdBQW1CLENBQW5CO0FBQ0gsU0FGSyxNQUVEO0FBQ0QsZUFBRyxlQUFILENBQW1CLE9BQW5CO0FBQ0g7QUFDSixLQVhEO0FBY0gsQ0E1TEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gbGV0IFdheXBvaW50ID0gcmVxdWlyZSgnd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMnKTtcclxucmVxdWlyZSgnLi9pbmRleC5qcycpOyIsIlxyXG5mdW5jdGlvbiBpc0luUmVnaW9uKGVsLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKXtcclxuICAgIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPD0gdXBwZXJCb3VuZCAmJiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiBsb3dlckJvdW5kO1xyXG59XHJcbmZ1bmN0aW9uIGlzRW5kUmVnaW9uKGVsLCBsb3dlckJvdW5kKXtcclxuICAgIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPD0gbG93ZXJCb3VuZDtcclxufVxyXG5mdW5jdGlvbiBnZXRPZmZzZXRQZXJjZW50KGVsLCB0b3AsIGJvdHRvbSl7XHJcbiAgICByZXR1cm4gKHRvcCAtIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkgLyAodG9wIC0gYm90dG9tKTtcclxufVxyXG5mdW5jdGlvbiBnZXRPZmZzZXRUb3BBYnMoZWwpe1xyXG4gICAgbGV0IG9mZnNldFRvcCA9IDA7XHJcbiAgICBkb3tcclxuICAgICAgaWYgKCFpc05hTihlbC5vZmZzZXRUb3ApKXtcclxuICAgICAgICAgIG9mZnNldFRvcCArPSBlbC5vZmZzZXRUb3A7XHJcbiAgICAgIH1cclxuICAgIH13aGlsZSggZWwgPSBlbC5vZmZzZXRQYXJlbnQgKTtcclxuXHJcbiAgICByZXR1cm4gb2Zmc2V0VG9wO1xyXG59XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChlKSA9PiB7XHJcbiAgICAvLyBiZWVyIGZpeGVkXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJlZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmVlcicpO1xyXG5cclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IDA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS10d28nKSkgKyAxMDA7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZG9jdW1lbnQuYm9keSwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLShkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHVwcGVyQm91bmQpO1xyXG4gICAgICAgICAgICBiZWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oZG9jdW1lbnQuYm9keSwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBiZWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7LShsb3dlckJvdW5kIC0gdXBwZXJCb3VuZCl9cHgpYDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYmVlci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGJhbm5lciB0ZXh0IG1lcmdlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJhbm5lcl90ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jhbm5lciAudGV4dC1jb250YWluZXInKTtcclxuICAgICAgICBsZXQgbGVmdCA9IGJhbm5lcl90ZXh0LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LS1sZWZ0Jyk7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gYmFubmVyX3RleHQucXVlcnlTZWxlY3RvcignLnRleHQtLXJpZ2h0Jyk7XHJcblxyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gMTUwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gMDtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gOTU7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oYmFubmVyX3RleHQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgbGVmdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldCpnZXRPZmZzZXRQZXJjZW50KGJhbm5lcl90ZXh0LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKX1weClgO1xyXG4gICAgICAgICAgICByaWdodC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvZmZzZXQqZ2V0T2Zmc2V0UGVyY2VudChiYW5uZXJfdGV4dCwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCl9cHgpYDtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihiYW5uZXJfdGV4dCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBsZWZ0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICAgICAgICAgIHJpZ2h0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZWZ0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmlnaHQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmZWF0dXJlIHRpdGxlIGZhZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgZmVhdHVyZV90aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmZWF0dXJlIC50aXRsZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gNTAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gMTAwO1xyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZmVhdHVyZV90aXRsZSwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBmZWF0dXJlX3RpdGxlLnN0eWxlLm9wYWNpdHkgPSBnZXRPZmZzZXRQZXJjZW50KGZlYXR1cmVfdGl0bGUsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGZlYXR1cmVfdGl0bGUsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgZmVhdHVyZV90aXRsZS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmVhdHVyZV90aXRsZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZlYXR1cmUgYmVlciBzaGFkb3dcclxuICAgIHtcclxuICAgICAgICBsZXQgYmVlcl9zaGFkb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVhdHVyZSAuYmVlci1zaGFkb3cnKVxyXG5cclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlYXR1cmUnKSkgKyA4MDA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMnKSk7XHJcbiAgICAgICAgbGV0IGNzc1RyYW5zbGF0ZVggPSAxMDtcclxuXHJcbiAgICAgICAgaWYoaXNJblJlZ2lvbihkb2N1bWVudC5ib2R5LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtKGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdXBwZXJCb3VuZCk7XHJcbiAgICAgICAgICAgIGJlZXJfc2hhZG93LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjc3NUcmFuc2xhdGVYfXB4LCAke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgLy8gYmVlcl9zaGFkb3cuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2Nzc1RyYW5zbGF0ZVh9cHgsICR7b2Zmc2V0fXB4KWA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJlZXJfc2hhZG93LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmVhdHVyZSBvZmZzZXRzXHJcbiAgICBsZXQgZmVhdHVyZVVwcGVyQm91bmQgPSA2MDA7XHJcbiAgICBsZXQgZmVhdHVyZUxvd2VyQm91bmQgPSA1MDA7XHJcbiAgICBsZXQgZmVhdHVyZU9mZnNldCA9IDEwMDtcclxuICAgIGxldCBmZWF0dXJlRWxlbWVudHMgPSBbJy5mZWF0dXJlLS1vbmUgLmZlYXR1cmVfX3RpdGxlJywgJy5mZWF0dXJlLS1vbmUgLmZlYXR1cmVfX3RleHQnLFxyXG4gICAgICAgICcuZmVhdHVyZS0tdHdvIC5mZWF0dXJlX190aXRsZScsICcuZmVhdHVyZS0tdHdvIC5mZWF0dXJlX190ZXh0JyxcclxuICAgICAgICAnLmZlYXR1cmUtLXRocmVlIC5mZWF0dXJlX190aXRsZScsICcuZmVhdHVyZS0tdGhyZWUgLmZlYXR1cmVfX3RleHQnXTtcclxuICAgIGZlYXR1cmVFbGVtZW50cy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ZlYXR1cmUgJHtlbH1gKTtcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSBmZWF0dXJlVXBwZXJCb3VuZCArIGkqNTA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSBmZWF0dXJlTG93ZXJCb3VuZCArIGkqNTA7XHJcbiAgICAgICAgLy8gc2Vjb25kIGZlYXR1cmUgb2Zmc2V0IGFub3RoZXIgZGlyZWN0aW9uXHJcbiAgICAgICAgbGV0IG9mZnNldCA9IChpPT0yfHxpPT0zKSA/IC1mZWF0dXJlT2Zmc2V0IDogZmVhdHVyZU9mZnNldDtcclxuICAgICAgICBcclxuICAgICAgICBpZihpc0luUmVnaW9uKGVsZW1lbnQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldCooMS1nZXRPZmZzZXRQZXJjZW50KGVsZW1lbnQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKX1weClgO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBnZXRPZmZzZXRQZXJjZW50KGVsZW1lbnQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpOyBcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihlbGVtZW50LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMHB4KWA7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcblxyXG4gICAgLy8gZW1wdHkgaGFuZCBtb3ZpbmdcclxuICAgIGxldCBoYW5kQ3NzVHJhbnNsYXRlWCA9IC01MjU7XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhhbmRfd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmhhbmQtd3JhcHBlcicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5ibG9jay0tb25lJykpICsgNDAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5ibG9jay0tb25lJykpICsgMTgwO1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSAxNTA7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZG9jdW1lbnQuYm9keSwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBoYW5kX3dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtoYW5kQ3NzVHJhbnNsYXRlWCArIG9mZnNldCpnZXRPZmZzZXRQZXJjZW50KGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oZG9jdW1lbnQuYm9keSwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICAvLyBoYW5kX3dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLTM3NXB4KWA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAge1xyXG4gICAgICAgIGxldCBoYW5kX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5oYW5kLXdyYXBwZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLW9uZScpKSArIDE4MDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLXR3bycpKSArIDEwMDtcclxuICAgICAgICBsZXQgb2Zmc2V0VG9wQWJzID0gLWdldE9mZnNldFRvcEFicyhoYW5kX3dyYXBwZXIpO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgaGFuZF93cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5lbXB0eS1oYW5kLS1zaGFkb3cnKS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IC0oZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB1cHBlckJvdW5kKTtcclxuICAgICAgICAgICAgaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoLTM3NXB4LCAke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoLTM3NXB4LCAkey0obG93ZXJCb3VuZCAtIHVwcGVyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuZW1wdHktaGFuZC0tc2hhZG93Jykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFub3RoZXIgaGFuZCBjaGVlcnNcclxuICAgIHtcclxuICAgICAgICBsZXQgYW5vdGhlcl9oYW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NoZWVycyAuYW5vdGhlci1oYW5kYCk7XHJcbiAgICAgICAgbGV0IGZvYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5mb2FtJyk7ICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvYW0pICAgIFxyXG5cclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLXR3bycpKSArIDEwMDtcclxuICAgICAgICBcclxuICAgICAgICBpZihpc0VuZFJlZ2lvbihkb2N1bWVudC5ib2R5LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGFub3RoZXJfaGFuZC5jbGFzc0xpc3QucmVtb3ZlKCdiYWNrJyk7XHJcbiAgICAgICAgICAgIGFub3RoZXJfaGFuZC5jbGFzc0xpc3QuYWRkKCdjaGVlcicpO1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmFuaW1hdGlvbk5hbWUgPT0gJ2NoZWVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9hbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuY2xhc3NMaXN0LmFkZCgnYmFjaycpO1xyXG4gICAgICAgICAgICBmb2FtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5hbmltYXRpb25OYW1lID09ICdiYWNrJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmNsYXNzTGlzdC5yZW1vdmUoJ2NoZWVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb2FtIGFwcGVhclxyXG4gICAgLy8gZnVuY3Rpb24gc2hvd0ZvYW0oKXtcclxuICAgIC8vICAgICBsZXQgZm9hbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmZvYW0nKTtcclxuXHJcblxyXG4gICAgLy8gfVxyXG4gICAgLy8gZnVuY3Rpb24gaGlkZUZvYW0oKXtcclxuICAgIC8vICAgICBsZXQgZm9hbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmZvYW0nKTtcclxuICAgIC8vICAgICBmb2FtLlxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNoZWVycyB0ZXh0IGZhZGVcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjaGVlcnMgLnRleHQgcCcpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSA0MDA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAzMDA7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZWwsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IGdldE9mZnNldFBlcmNlbnQoZWwsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGVsLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBcclxufSk7XHJcblxyXG4iXX0=
