/*
 * Vue Slider
 * @version 0.8.0 beta
 * @author Abhijeet Bajracharya
 * Copyright 2017
 * */

let vs = Vue.extend({
    template: `            
        <div class="vue-slider">                
            <div class="vs-container">                         
                <div class="vs-slide" v-for="slide in vslides" v-html="slide.outerHTML"></div>
            </div>             
             <div class="vs-controls" v-if="settings.nav || settings.page">
                <div class="vs-nav" v-if="settings.nav">
                    <div class="vs-prev" @click="navigation('left')">Prev</div>
                    <div class="vs-next" @click="navigation('right')">Next</div>
                </div>
                <div class="vs-dots" v-if="settings.page">
                    <div v-for="(slide , index) in vslides"  @click="gotoSlide(index)" v-bind:class="'vs-dot ' +  [index == active ? 'active' : '']"></div>
                </div>
             </div>
        </div>  
        `,
    props: ['vslides', 'voptions'],
    data: function () {
        return {
            settings: {
                transition: 'fade',
                start: 1,
                nav: true, // [ Boolean ] - Show Prev/Next Buttons
                page: true, // [ Boolean ] - Show Paginations
                autoplay: true, // [ Boolean ] - Enable Auto Play
                delay: 5000,// [ Integer ] - Auto Play Speed (milliseconds)
                transitionSpeed: 500, //[ Integer ] - Transition speed (milliseconds)
            }, // [ Object ] - User Options
            count: this.vslides.length, // [ Integer ] - No Of Items
            sliderWidth: 0, // [ Integer ] - Slider Width used if the transition option is 'slide'
            container: null, // [ HTMLDivElement ] - Main Outer Container
            slides: null, // [ NodeList ] - Array of all the slides
            active: 0, // [ Integer] - active slide index
            activeSlide: null, // [ HTMLDivElement ] - Active Slide Object
            sliding: false // [ Boolean ] - Check if slide is in transition
        }

    },
    mounted: function () {

        /********** SLIDER SETUP **********/
        document.body.className = "vue-slider-enabled";
        this.container = document.querySelector('.vs-container');
        this.slides = document.querySelectorAll('.vs-slide');
        this.container.style.transition = this.settings.transitionSpeed + 'ms';


        /*********** SLIDER OPTIONS **********/
        // Check the type of each of the user options
        // Merge user options with default settings
        for (let option in this.voptions) {
            if (this.voptions.hasOwnProperty(option)) {
                if (typeof this.settings[option] == typeof this.voptions[option]) {
                    this.settings[option] = this.voptions[option]
                }
            }
        }

        // Set Starting Slide
        this.settings.start <= 1 || this.settings.start > this.count ?
            this.active = 0 :
            this.active = this.settings.start - 1;

        // Add "active-slide" class to the starting slide
        this.activeSlide = this.slides[this.active];
        this.activeSlide.classList.add('active-slide');

        // Set Width to Slider Container if the transition options is 'slide'
        this.setContainerWidth();

    },
    created: function () {
        window.addEventListener('resize', this.resize)
    },
    methods: {
        // Loops through the given array and execute the callback
        // @param { Array } [array] - The Array to loop through
        // @param { Callback} [callback] - The function/callback to execute on each item of the array
        // @param { Scope } [scope] : optional - The scope of the loop
        each(array, callback, scope){
            for (let i = 0; i < array.length; i++) {
                callback.call(scope, i, array[i])
            }
        },
        // Check for transitionend event
        checkTransition(){
            let core = this;
            let transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (let t in transitions) {
                if (core.container.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        },
        setContainerWidth(){
            this.each(this.slides, function (i, e) {
                e.style.width = window.innerWidth + 'px';
                this.sliderWidth += e.offsetWidth;
            }, this);
            this.settings.transition == 'slide' ?
                this.container.style.width = this.sliderWidth + 'px' : '';
        },
        resize(){
            this.sliderWidth = 0;
            this.setContainerWidth();
        },
        // Sets active slide depending on direction.
        // @param { String } [ direction ]- The direction to move.
        navigation(direction){
            if (!this.sliding) {
                if (direction == 'left') {
                    if (this.active < 1) {
                        this.active = this.count - 1;
                    } else {
                        this.active -= 1;
                    }
                }
                if (direction == 'right') {
                    if (this.active == this.count - 1) {
                        this.active = 0;
                    } else {
                        this.active += 1;
                    }
                }
            }
            this.gotoSlide(this.active);
        },
        // Adds Class "active-slide" to the new active slide and removes the class from the previous active slide
        // @param { Integer/String } [target] - id of the slide to make active
        gotoSlide(target){
            // set the target to integer as the template @click directive passes string
            if (!this.sliding) {
                target = parseInt(target);
                this.activeSlide.classList.remove('active-slide');
                this.activeSlide = this.slides[target];
                this.slides[target].classList.add('active-slide');
                this.active = target;
                // If transition is 'slide' enable Slide effect
                if (this.settings.transition == 'slide') {
                    this.animateSlide(this.container);
                }
            }
        },
        animateSlide(element){
            if (!this.sliding) {
                this.sliding = true;
                element.style.transform = 'translate3D(' + (-this.activeSlide.offsetLeft) + 'px,0,0)'
            }
            let core = this,
                transitionEvent = this.checkTransition();
            // Wait for slide transition to end
            element.addEventListener(transitionEvent, function () {
                core.sliding = false;
            });

        }
    }
});

function vueslider(selector, options) {
    let slideContainer = document.querySelector(selector),
        vSlides = slideContainer.getElementsByTagName('vue-slider')[0].children;
    new Vue({
        el: selector,
        data: {
            slides: vSlides,
            options: options
        },
        components: {
            'vue-slider': vs
        }

    })
}


