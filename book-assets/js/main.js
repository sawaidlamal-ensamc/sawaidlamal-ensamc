/*======================== Slide Swiper ================ **/

let swiperHome = new Swiper('.home_swiper', {
    loop: true,
    spaceBetween: 24, 
    grabCursor: true,
    slidesPerView: 2, 
    centeredSlides: 'auto',

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        1220: {
            spaceBetween: 24,
            slidesPerView: 2.5, 
        }
    }
});



/*======================== featured Swiper ================ **/
let swiperFeatured = new Swiper('.featured_swiper', {
    loop: true,
    spaceBetween: 16, 
    grabCursor: true,
    slidesPerView: 1.20, 
    centeredSlides: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
    breakpoints: {
        1150: {
            centeredSlides:false,
            slidesPerView: 4, 
        }
    }
});
window.swiperFeatured = swiperFeatured ;


/*======================== New Swiper ================ **/

let swiperNew = new Swiper('.new_swiper', {
    loop: true,
    spaceBetween: 16, 
    slidesPerView: 'auto', 

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    breakpoints: {
        1150: {
            slidesPerView: 3, 
        }
    }
});
window.swiperNew = swiperNew;


/*======================== Testimonials Swiper ================ **/
let swiperTestimonials = new Swiper('.testimonial_swiper', {
    loop: true,
    spaceBetween: 16, 
    grabCursor: true,
    slidesPerView: 1.2, 
    centeredSlides: 'auto',


    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
   
    
    breakpoints: {
        1150: {
            centeredSlides:false,
            slidesPerView: 3, 
        }
    }
});

window.swiperTestimonials = swiperTestimonials


/*======================== Scroll Bar ================ **/
const scrollUp =() =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)










/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
/*reveal*/
const sreveal = ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2500,
    delay:400,
})

sreveal.reveal(`.home_data, .featured_container, .new_container, .testimonial_container`)
sreveal.reveal(`.home_images`, {delay : 600})
sreveal.reveal(`.discount_data`, {origin:'left'})
sreveal.reveal(`.discount_images`, {origin:'right'})


/*=====================================================================================*/
/*        GET_NOW Function            
/*=====================================================================================*/

window.redirectToForm = (book) => {
  sessionStorage.setItem('selectedBook', JSON.stringify(book));
  window.location.href = `./Get_Now.html?book=${encodeURIComponent(book.title || '')}`;
    };
