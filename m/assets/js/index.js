function isScrollOver(el, offset){
    return el.getBoundingClientRect().top < offset;
}

// slide show plugin
let mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    pagination: '.swiper-pagination',
});

window.onload = function(){
    // banner text in
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
    // banner hands cheer
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
    // feature text fade in 
    document.querySelectorAll('#feature .feature').forEach((el, i) => {
        let offset = 400;

        if(isScrollOver(el, offset)){
            el.classList.add('show');
        }
    });

    // cheers text fade in
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
})

// another hand cheer
window.addEventListener('transitionend', (event) => {
    if(event.target.id == 'last_line'){
        document.querySelector('#cheers .another-hand').classList.add('cheer');
    }
});

// foam show up
window.addEventListener('animationend', (event) => {
    if(event.animationName == 'cheer'){
        document.querySelector('#cheers .foam').classList.add('show');
    }
})

window.addEventListener('resize', () => {
    if(window.innerHeight < window.innerWidth){
        document.body.classList.add('loading');
        document.querySelector('#rotate_block').style.display = 'block';
    }
    else{
        document.body.classList.remove('loading');
        document.querySelector('#rotate_block').removeAttribute('style');
    }
})

//force scroll to top on refresh page
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}