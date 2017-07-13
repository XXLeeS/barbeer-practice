
// function isInRegion(el, upperBound, lowerBound){
//     return el.getBoundingClientRect().top <= upperBound && el.getBoundingClientRect().top > lowerBound;
// }
// function isEndRegion(el, lowerBound){
//     return el.getBoundingClientRect().top <= lowerBound;
// }
function isScrollOver(el, offset){
    return el.getBoundingClientRect().top < offset;
}

function getOffsetPercent(el, top, bottom){
    return (top - el.getBoundingClientRect().top) / (top - bottom);
}
function getOffsetTopAbs(el){
    let offsetTop = 0;
    do{
      if (!isNaN(el.offsetTop)){
          offsetTop += el.offsetTop;
      }
    }while( el = el.offsetParent );

    return offsetTop;
}

let mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    pagination: '.swiper-pagination',
});

window.onload = function(){
    document.querySelectorAll('#banner .text').forEach((el, i) => {
        if(i == 0){
            el.classList.add('show');
        }
        else{
            setTimeout(() => {
                el.classList.add('show');
            }, i*200)
        }
    });
    window.addEventListener('transitionend', (event) => {
        if(event.target.classList.contains('text--four')){
            document.querySelector('#banner').classList.add('scroll')
        }
        if(event.target.id == 'banner'){
            document.querySelectorAll('#banner .hand').forEach((el) => {
                el.classList.add('cheer'); 
                document.body.classList.remove('loading');
            })           
        }
    })
}

window.addEventListener('scroll', () => {
    document.querySelectorAll('#feature .feature').forEach((el, i) => {
        let offset = 400;

        if(isScrollOver(el, offset)){
            el.classList.add('show');
        }
    });

    document.querySelectorAll('#cheers .text').forEach((el, i) => {
        let offset = 400;

        if(isScrollOver(el, offset)){
            el.querySelectorAll('p').forEach((line, i) => {
                setTimeout(() => {
                    line.classList.add('show');
                }, i*200);
            })
        }
    });

    window.addEventListener('transitionend', (event) => {
        if(event.target.classList.contains('text--four')){
            document.querySelector('#banner').classList.add('scroll')
        }
        if(event.target.id == 'banner'){
            document.querySelectorAll('#banner .hand').forEach((el) => {
                el.classList.add('cheer'); 
                document.body.classList.remove('loading');
            })           
        }
    })

    window.addEventListener('transitionend', (event) => {
        console.log(event.target.id)
        if(event.target.id == 'last_line'){
            document.querySelector('#cheers .another-hand').classList.add('cheer');
        }
    });

    window.addEventListener('animationend', (event) => {
        console.log(event)
        if(event.animationName == 'cheer'){
            document.querySelector('#cheers .foam').classList.add('show');
        }
    })

})


// window.addEventListener('scroll', (e) => {
//     // beer fixed
//     {
//         let beer = document.querySelector('#beer');

//         let upperBound = 0;
//         let lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;

//         if(isInRegion(document.body, upperBound, lowerBound)){
//             let offset = -(document.body.getBoundingClientRect().top - upperBound);
//             beer.style.transform = `translateY(${offset}px)`;
//         }else if(isEndRegion(document.body, lowerBound)){
//             beer.style.transform = `translateY(${-(lowerBound - upperBound)}px)`;
//         }else{
//             beer.removeAttribute('style');
//         }
//     }

//     // banner text merge
//     {
//         let banner_text = document.querySelector('#banner .text-container');
//         let left = banner_text.querySelector('.text--left');
//         let right = banner_text.querySelector('.text--right');

//         let upperBound = 150;
//         let lowerBound = 0;
//         let offset = 95;

//         if(isInRegion(banner_text, upperBound, lowerBound)){
//             left.style.transform = `translateX(${offset*getOffsetPercent(banner_text, upperBound, lowerBound)}px)`;
//             right.style.transform = `translateX(-${offset*getOffsetPercent(banner_text, upperBound, lowerBound)}px)`;
//         }else if(isEndRegion(banner_text, lowerBound)){
//             left.style.transform = `translateX(${offset}px)`;
//             right.style.transform = `translateX(-${offset}px)`;
//         }else{
//             left.removeAttribute('style');            
//             right.removeAttribute('style');            
//         }
//     }

//     // feature title fade
//     {
//         let feature_title = document.querySelector('#feature .title');
        
//         let upperBound = 500;
//         let lowerBound = 100;
//         if(isInRegion(feature_title, upperBound, lowerBound)){
//             feature_title.style.opacity = getOffsetPercent(feature_title, upperBound, lowerBound);
//         }else if(isEndRegion(feature_title, lowerBound)){
//             feature_title.style.opacity = 1;
//         }else{
//             feature_title.removeAttribute('style');            
//         }
//     }

//     // feature beer shadow
//     {
//         let beer_shadow = document.querySelector('#feature .beer-shadow')

//         let upperBound = -getOffsetTopAbs(document.querySelector('#feature')) + 800;
//         let lowerBound = -getOffsetTopAbs(document.querySelector('#cheers'));
//         let cssTranslateX = 10;

//         if(isInRegion(document.body, upperBound, lowerBound)){
//             let offset = -(document.body.getBoundingClientRect().top - upperBound);
//             beer_shadow.style.transform = `translate(${cssTranslateX}px, ${offset}px)`;
//         }else if(isEndRegion(document.body, lowerBound)){
//             // beer_shadow.style.transform = `translate(${cssTranslateX}px, ${offset}px)`;
//         }else{
//             beer_shadow.removeAttribute('style');
//         }
//     }

//     // feature offsets
//     let featureUpperBound = 600;
//     let featureLowerBound = 500;
//     let featureOffset = 100;
//     let featureElements = ['.feature--one .feature__title', '.feature--one .feature__text',
//         '.feature--two .feature__title', '.feature--two .feature__text',
//         '.feature--three .feature__title', '.feature--three .feature__text'];
//     featureElements.forEach((el, i) => {
//         let element = document.querySelector(`#feature ${el}`);

//         let upperBound = featureUpperBound + i*50;
//         let lowerBound = featureLowerBound + i*50;
//         // second feature offset another direction
//         let offset = (i==2||i==3) ? -featureOffset : featureOffset;
        
//         if(isInRegion(element, upperBound, lowerBound)){
//             element.style.transform = `translateX(${offset*(1-getOffsetPercent(element, upperBound, lowerBound))}px)`;
//             element.style.opacity = getOffsetPercent(element, upperBound, lowerBound); 
//         }else if(isEndRegion(element, lowerBound)){
//             element.style.transform = `translateX(0px)`;
//             element.style.opacity = 1;
//         }else{
//             element.removeAttribute('style');
//         }
//     });
    

//     // empty hand moving
//     let handCssTranslateX = -525;
//     {
//         let hand_wrapper = document.querySelector('#cheers .hand-wrapper');
        
//         let upperBound = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 400;
//         let lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
//         let offset = 150;

//         if(isInRegion(document.body, upperBound, lowerBound)){
//             hand_wrapper.style.transform = `translateX(${handCssTranslateX + offset*getOffsetPercent(document.body, upperBound, lowerBound)}px)`;
//         }else if(isEndRegion(document.body, lowerBound)){
//             // hand_wrapper.style.transform = `translateX(-375px)`;
//         }else{
//             hand_wrapper.removeAttribute('style');            
//         }
//     }
//     {
//         let hand_wrapper = document.querySelector('#cheers .hand-wrapper');
        
//         let upperBound = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
//         let lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;
//         let offsetTopAbs = -getOffsetTopAbs(hand_wrapper);

//         if(isInRegion(document.body, upperBound, lowerBound)){
//             hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 1;
//             let offset = -(document.body.getBoundingClientRect().top - upperBound);
//             hand_wrapper.style.transform = `translate(-375px, ${offset}px)`;
//         }else if(isEndRegion(document.body, lowerBound)){
//             hand_wrapper.style.transform = `translate(-375px, ${-(lowerBound - upperBound)}px)`;
//         }else{
//             hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 0;
//         }
//     }

//     // another hand cheers
//     {
//         let another_hand = document.querySelector(`#cheers .another-hand`);
//         let foam = document.querySelector('#cheers .foam');    

//         let lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;
        
//         if(isEndRegion(document.body, lowerBound)){
//             another_hand.classList.remove('back');
//             another_hand.classList.add('cheer');
//             another_hand.addEventListener("webkitAnimationEnd", (event) => {
//                 if(event.animationName == 'cheer'){
//                     foam.classList.add('show');
//                 }
//             });
//         }else{
//             another_hand.classList.add('back');
//             foam.classList.remove('show');
//             another_hand.addEventListener("webkitAnimationEnd", (event) => {
//                 if(event.animationName == 'back'){
//                     another_hand.classList.remove('cheer');
//                 }
//             });
//         }
//     }

//     // foam appear
//     // function showFoam(){
//     //     let foam = document.querySelector('#cheers .foam');


//     // }
//     // function hideFoam(){
//     //     let foam = document.querySelector('#cheers .foam');
//     //     foam.
//     // }

//     // cheers text fade
//     document.querySelectorAll('#cheers .text p').forEach((el) => {
//         let upperBound = 400;
//         let lowerBound = 300;

//         if(isInRegion(el, upperBound, lowerBound)){
//             el.style.opacity = getOffsetPercent(el, upperBound, lowerBound);
//         }else if(isEndRegion(el, lowerBound)){
//             el.style.opacity = 1;
//         }else{
//             el.removeAttribute('style');
//         }
//     })

    
// });

