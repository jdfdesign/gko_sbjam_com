!function(e,t){var a=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};a()&&e.error("jquery-ujs has already been loaded!");var n;e.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var a=e('meta[name="csrf-token"]').attr("content");a&&t.setRequestHeader("X-CSRF-Token",a)},fire:function(t,a,n){var i=e.Event(a);return t.trigger(i,n),i.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(a){var i,r,o,s,l,u,c,d;if(n.fire(a,"ajax:before")){if(s=a.data("cross-domain"),l=s===t?null:s,u=a.data("with-credentials")||null,c=a.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,a.is("form")){i=a.attr("method"),r=a.attr("action"),o=a.serializeArray();var p=a.data("ujs:submit-button");p&&(o.push(p),a.data("ujs:submit-button",null))}else a.is(n.inputChangeSelector)?(i=a.data("method"),r=a.data("url"),o=a.serialize(),a.data("params")&&(o=o+"&"+a.data("params"))):(i=a.data("method"),r=n.href(a),o=a.data("params")||null);d={type:i||"GET",data:o,dataType:c,beforeSend:function(e,i){return i.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+i.accepts.script),n.fire(a,"ajax:beforeSend",[e,i])},success:function(e,t,n){a.trigger("ajax:success",[e,t,n])},complete:function(e,t){a.trigger("ajax:complete",[e,t])},error:function(e,t,n){a.trigger("ajax:error",[e,t,n])},xhrFields:{withCredentials:u},crossDomain:l},r&&(d.url=r);var f=n.ajax(d);return a.trigger("ajax:send",f),f}return!1},handleMethod:function(a){var i=n.href(a),r=a.data("method"),o=a.attr("target"),s=e("meta[name=csrf-token]").attr("content"),l=e("meta[name=csrf-param]").attr("content"),u=e('<form method="post" action="'+i+'"></form>'),c='<input name="_method" value="'+r+'" type="hidden" />';l!==t&&s!==t&&(c+='<input name="'+l+'" value="'+s+'" type="hidden" />'),o&&u.attr("target",o),u.hide().append(c).appendTo("body"),u.submit()},disableFormElements:function(t){t.find(n.disableSelector).each(function(){var t=e(this),a=t.is("button")?"html":"val";t.data("ujs:enable-with",t[a]()),t[a](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(n.enableSelector).each(function(){var t=e(this),a=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[a](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,a=e.data("confirm"),i=!1;return a?(n.fire(e,"confirm")&&(i=n.confirm(a),t=n.fire(e,"confirm:complete",[i])),i&&t):!0},blankInputs:function(t,a,n){var i,r,o=e(),s=a||"input,textarea";return t.find(s).each(function(){i=e(this),r=i.is(":checkbox,:radio")?i.is(":checked"):i.val(),r==!!n&&(o=o.add(i))}),o.length?o:!1},nonBlankInputs:function(e,t){return n.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(a,n){var i=a.data("events"),r=!0;return i!==t&&i.submit!==t&&e.each(i.submit,function(e,t){return"function"==typeof t.handler?r=t.handler(n):void 0}),r},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return n.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},n.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,a){e.crossDomain||n.CSRFProtection(a)}),e(document).delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(e(this))}),e(document).delegate(n.linkClickSelector,"click.rails",function(a){var i=e(this),r=i.data("method"),o=i.data("params");return n.allowAction(i)?(i.is(n.linkDisableSelector)&&n.disableElement(i),i.data("remote")!==t?!a.metaKey&&!a.ctrlKey||r&&"GET"!==r||o?(n.handleRemote(i)===!1&&n.enableElement(i),!1):!0:i.data("method")?(n.handleMethod(i),!1):void 0):n.stopEverything(a)}),e(document).delegate(n.inputChangeSelector,"change.rails",function(t){var a=e(this);return n.allowAction(a)?(n.handleRemote(a),!1):n.stopEverything(t)}),e(document).delegate(n.formSubmitSelector,"submit.rails",function(a){var i=e(this),r=i.data("remote")!==t,o=n.blankInputs(i,n.requiredInputSelector),s=n.nonBlankInputs(i,n.fileInputSelector);return n.allowAction(i)?o&&i.attr("novalidate")==t&&n.fire(i,"ajax:aborted:required",[o])?n.stopEverything(a):r?s?(setTimeout(function(){n.disableFormElements(i)},13),n.fire(i,"ajax:aborted:file",[s])):!e.support.submitBubbles&&e().jquery<"1.7"&&n.callFormSubmitBindings(i,a)===!1?n.stopEverything(a):(n.handleRemote(i),!1):(setTimeout(function(){n.disableFormElements(i)},13),void 0):n.stopEverything(a)}),e(document).delegate(n.formInputClickSelector,"click.rails",function(t){var a=e(this);if(!n.allowAction(a))return n.stopEverything(t);var i=a.attr("name"),r=i?{name:i,value:a.val()}:null;a.closest("form").data("ujs:submit-button",r)}),e(document).delegate(n.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&n.disableFormElements(e(this))}),e(document).delegate(n.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&n.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),function(e){e.flexslider=function(t,a){var n=e(t),i=e.extend({},e.flexslider.defaults,a),r=i.namespace,o="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,s=o?"touchend":"click",l="vertical"===i.direction,u=i.reverse,c=i.itemWidth>0,d="fade"===i.animation,p=""!==i.asNavFor,f={};e.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=i.startAt,n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=i.selector.substr(0,i.selector.search(" ")),n.slides=e(i.selector,n),n.container=e(n.containerSelector,n),n.count=n.slides.length,n.syncExists=e(i.sync).length>0,"slide"===i.animation&&(i.animation="swing"),n.prop=l?"top":"marginLeft",n.args={},n.manualPause=!1,n.transitions=!i.video&&!d&&i.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),""!==i.controlsContainer&&(n.controlsContainer=e(i.controlsContainer).length>0&&e(i.controlsContainer)),""!==i.manualControls&&(n.manualControls=e(i.manualControls).length>0&&e(i.manualControls)),i.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),p&&f.asNav.setup(),n.setup("init"),i.controlNav&&f.controlNav.setup(),i.directionNav&&f.directionNav.setup(),i.keyboard&&(1===e(n.containerSelector).length||i.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,i.pauseOnAction)}}),i.mousewheel&&n.bind("mousewheel",function(e,t){e.preventDefault();var a=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(a,i.pauseOnAction)}),i.pausePlay&&f.pausePlay.setup(),i.slideshow&&(i.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.play()}),i.initDelay>0?setTimeout(n.play,i.initDelay):n.play()),o&&i.touch&&f.touch(),(!d||d&&i.smoothHeight)&&e(window).bind("resize focus",f.resize),setTimeout(function(){i.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(r+"active-slide").eq(n.currentItem).addClass(r+"active-slide"),n.slides.click(function(t){t.preventDefault();var a=e(this),r=a.index();e(i.asNavFor).data("flexslider").animating||a.hasClass("active")||(n.direction=n.currentItem<r?"next":"prev",n.flexAnimate(r,i.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var t,a="thumbnails"===i.controlNav?"control-thumbs":"control-paging",l=1;if(n.controlNavScaffold=e('<ol class="'+r+"control-nav "+r+a+'"></ol>'),n.pagingCount>1)for(var u=0;u<n.pagingCount;u++)t="thumbnails"===i.controlNav?'<img src="'+n.slides.eq(u).attr("data-thumb")+'"/>':"<a>"+l+"</a>",n.controlNavScaffold.append("<li>"+t+"</li>"),l++;n.controlsContainer?e(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",s,function(t){t.preventDefault();var a=e(this),o=n.controlNav.index(a);a.hasClass(r+"active")||(n.direction=o>n.currentSlide?"next":"prev",n.flexAnimate(o,i.pauseOnAction))}),o&&n.controlNavScaffold.delegate("a","click touchstart",function(e){e.preventDefault()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.live(s,function(t){t.preventDefault();var a=e(this),o=n.controlNav.index(a);a.hasClass(r+"active")||(n.direction=o>n.currentSlide?"next":"prev",n.flexAnimate(o,i.pauseOnAction))}),o&&n.controlNav.live("click touchstart",function(e){e.preventDefault()})},set:function(){var t="thumbnails"===i.controlNav?"img":"a";n.controlNav=e("."+r+"control-nav li "+t,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(r+"active").eq(n.animatingTo).addClass(r+"active")},update:function(t,a){n.pagingCount>1&&"add"===t?n.controlNavScaffold.append(e("<li><a>"+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(a).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(a,t):f.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+r+'direction-nav"><li><a class="'+r+'prev" href="#">'+i.prevText+'</a></li><li><a class="'+r+'next" href="#">'+i.nextText+"</a></li></ul>");n.controlsContainer?(e(n.controlsContainer).append(t),n.directionNav=e("."+r+"direction-nav li a",n.controlsContainer)):(n.append(t),n.directionNav=e("."+r+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(s,function(t){t.preventDefault();var a=e(this).hasClass(r+"next")?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(a,i.pauseOnAction)}),o&&n.directionNav.bind("click touchstart",function(e){e.preventDefault()})},update:function(){var e=r+"disabled";1===n.pagingCount?n.directionNav.addClass(e):i.animationLoop?n.directionNav.removeClass(e):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+r+"prev").addClass(e):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+r+"next").addClass(e):n.directionNav.removeClass(e)}},pausePlay:{setup:function(){var t=e('<div class="'+r+'pauseplay"><a></a></div>');n.controlsContainer?(n.controlsContainer.append(t),n.pausePlay=e("."+r+"pauseplay a",n.controlsContainer)):(n.append(t),n.pausePlay=e("."+r+"pauseplay a",n)),f.pausePlay.update(i.slideshow?r+"pause":r+"play"),n.pausePlay.bind(s,function(t){t.preventDefault(),e(this).hasClass(r+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())}),o&&n.pausePlay.bind("click touchstart",function(e){e.preventDefault()})},update:function(e){"play"===e?n.pausePlay.removeClass(r+"pause").addClass(r+"play").text(i.playText):n.pausePlay.removeClass(r+"play").addClass(r+"pause").text(i.pauseText)}},touch:function(){function e(e){n.animating?e.preventDefault():1===e.touches.length&&(n.pause(),f=l?n.h:n.w,h=Number(new Date),p=c&&u&&n.animatingTo===n.last?0:c&&u?n.limit-(n.itemW+i.itemMargin)*n.move*n.animatingTo:c&&n.currentSlide===n.last?n.limit:c?(n.itemW+i.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*f:(n.currentSlide+n.cloneOffset)*f,o=l?e.touches[0].pageY:e.touches[0].pageX,s=l?e.touches[0].pageX:e.touches[0].pageY,t.addEventListener("touchmove",a,!1),t.addEventListener("touchend",r,!1))}function a(e){m=l?o-e.touches[0].pageY:o-e.touches[0].pageX,v=l?Math.abs(m)<Math.abs(e.touches[0].pageX-s):Math.abs(m)<Math.abs(e.touches[0].pageY-s),(!v||Number(new Date)-h>500)&&(e.preventDefault(),!d&&n.transitions&&(i.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/f+2:1),n.setProps(p+m,"setTouch")))}function r(){if(n.animatingTo===n.currentSlide&&!v&&null!==m){var e=u?-m:m,l=e>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(l)&&(Number(new Date)-h<550&&Math.abs(e)>50||Math.abs(e)>f/2)?n.flexAnimate(l,i.pauseOnAction):n.flexAnimate(n.currentSlide,i.pauseOnAction,!0)}t.removeEventListener("touchmove",a,!1),t.removeEventListener("touchend",r,!1),o=null,s=null,m=null,p=null}var o,s,p,f,m,h,v=!1;t.addEventListener("touchstart",e,!1)},resize:function(){!n.animating&&n.is(":visible")&&(c||n.doMath(),d?f.smoothHeight():c?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):l?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(i.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!l||d){var t=d?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).height()},e):t.height(n.slides.eq(n.animatingTo).height())}},sync:function(t){var a=e(i.sync).data("flexslider"),r=n.animatingTo;switch(t){case"animate":a.flexAnimate(r,i.pauseOnAction,!1,!0);break;case"play":a.playing||a.asNav||a.play();break;case"pause":a.pause()}}},n.flexAnimate=function(t,a,o,s,m){if(p&&1===n.pagingCount&&(n.direction=n.currentItem<t?"next":"prev"),!n.animating&&(n.canAdvance(t,m)||o)&&n.is(":visible")){if(p&&s){var h=e(i.asNavFor).data("flexslider");if(n.atEnd=0===t||t===n.count-1,h.flexAnimate(t,!0,!1,!0,m),n.direction=n.currentItem<t?"next":"prev",h.direction=n.direction,Math.ceil((t+1)/n.visible)-1===n.currentSlide||0===t)return n.currentItem=t,n.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),!1;n.currentItem=t,n.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),t=Math.floor(t/n.visible)}if(n.animating=!0,n.animatingTo=t,i.before(n),a&&n.pause(),n.syncExists&&!m&&f.sync("animate"),i.controlNav&&f.controlNav.active(),c||n.slides.removeClass(r+"active-slide").eq(t).addClass(r+"active-slide"),n.atEnd=0===t||t===n.last,i.directionNav&&f.directionNav.update(),t===n.last&&(i.end(n),i.animationLoop||n.pause()),d)n.slides.eq(n.currentSlide).fadeOut(i.animationSpeed,i.easing),n.slides.eq(t).fadeIn(i.animationSpeed,i.easing,n.wrapup);else{var v,g,y,b=l?n.slides.filter(":first").height():n.computedW;c?(v=i.itemWidth>n.w?2*i.itemMargin:i.itemMargin,y=(n.itemW+v)*n.move*n.animatingTo,g=y>n.limit&&1!==n.visible?n.limit:y):g=0===n.currentSlide&&t===n.count-1&&i.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*b:0:n.currentSlide===n.last&&0===t&&i.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*b:u?(n.count-1-t+n.cloneOffset)*b:(t+n.cloneOffset)*b,n.setProps(g,"",i.animationSpeed),n.transitions?(i.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){n.wrapup(b)})):n.container.animate(n.args,i.animationSpeed,i.easing,function(){n.wrapup(b)})}i.smoothHeight&&f.smoothHeight(i.animationSpeed)}},n.wrapup=function(e){d||c||(0===n.currentSlide&&n.animatingTo===n.last&&i.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&i.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,i.after(n)},n.animateSlides=function(){n.animating||n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.playing=!1,i.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.animatedSlides=setInterval(n.animateSlides,i.slideshowSpeed),n.playing=!0,i.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.canAdvance=function(e,t){var a=p?n.pagingCount-1:n.last;return t?!0:p&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:p&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||p?i.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var r=function(){var a=e?e:(n.itemW+i.itemMargin)*n.move*n.animatingTo,r=function(){if(c)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+i.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*r+"px"}();n.transitions&&(r=l?"translate3d(0,"+r+",0)":"translate3d("+r+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a)),n.args[n.prop]=r,(n.transitions||void 0===a)&&n.container.css(n.args)},n.setup=function(t){if(d)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===t&&n.slides.eq(n.currentSlide).fadeIn(i.animationSpeed,i.easing),i.smoothHeight&&f.smoothHeight();else{var a,o;"init"===t&&(n.viewport=e('<div class="'+r+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(o=e.makeArray(n.slides).reverse(),n.slides=e(o),n.container.empty().append(n.slides))),i.animationLoop&&!c&&(n.cloneCount=2,n.cloneOffset=1,"init"!==t&&n.container.find(".clone").remove(),n.container.append(n.slides.first().clone().addClass("clone")).prepend(n.slides.last().clone().addClass("clone"))),n.newSlides=e(i.selector,n),a=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,l&&!c?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(a*n.h,"init")},"init"===t?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(a*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,"float":"left",display:"block"}),i.smoothHeight&&f.smoothHeight()},"init"===t?100:0))}c||n.slides.removeClass(r+"active-slide").eq(n.currentSlide).addClass(r+"active-slide")},n.doMath=function(){var e=n.slides.first(),t=i.itemMargin,a=i.minItems,r=i.maxItems;n.w=n.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),c?(n.itemT=i.itemWidth+t,n.minW=a?a*n.itemT:n.w,n.maxW=r?r*n.itemT:n.w,n.itemW=n.minW>n.w?(n.w-t*a)/a:n.maxW<n.w?(n.w-t*r)/r:i.itemWidth>n.w?n.w:i.itemWidth,n.visible=Math.floor(n.w/(n.itemW+t)),n.move=i.move>0&&i.move<n.visible?i.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:i.itemWidth>n.w?(n.itemW+2*t)*n.count-n.w-t:(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding},n.update=function(e,t){n.doMath(),c||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),i.controlNav&&!n.manualControls&&("add"===t&&!c||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!c||n.pagingCount<n.controlNav.length)&&(c&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),i.directionNav&&f.directionNav.update()},n.addSlide=function(t,a){var r=e(t);n.count+=1,n.last=n.count-1,l&&u?void 0!==a?n.slides.eq(n.count-a).after(r):n.container.prepend(r):void 0!==a?n.slides.eq(a).before(r):n.container.append(r),n.update(a,"add"),n.slides=e(i.selector+":not(.clone)",n),n.setup(),i.added(n)},n.removeSlide=function(t){var a=isNaN(t)?n.slides.index(e(t)):t;n.count-=1,n.last=n.count-1,isNaN(t)?e(t,n.slides).remove():l&&u?n.slides.eq(n.last).remove():n.slides.eq(t).remove(),n.doMath(),n.update(a,"remove"),n.slides=e(i.selector+":not(.clone)",n),n.setup(),i.removed(n)},f.init()},e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}},e.fn.flexslider=function(t){if(void 0===t&&(t={}),"object"==typeof t)return this.each(function(){var a=e(this),n=t.selector?t.selector:".slides > li",i=a.find(n);1===i.length?(i.fadeIn(400),t.start&&t.start(a)):void 0===a.data("flexslider")&&new e.flexslider(this,t)});var a=e(this).data("flexslider");switch(t){case"play":a.play();break;case"pause":a.pause();break;case"next":a.flexAnimate(a.getTarget("next"),!0);break;case"prev":case"previous":a.flexAnimate(a.getTarget("prev"),!0);break;default:"number"==typeof t&&a.flexAnimate(t,!0)}}}(jQuery),function(e,t,a){function n(e){var t={},n=/^jQuery\d+$/;return a.each(e.attributes,function(e,a){a.specified&&!n.test(a.name)&&(t[a.name]=a.value)}),t}function i(e,n){var i=this,r=a(i);if(i.value==r.attr("placeholder")&&r.hasClass("placeholder"))if(r.data("placeholder-password")){if(r=r.hide().next().show().attr("id",r.removeAttr("id").data("placeholder-id")),e===!0)return r[0].value=n;r.focus()}else i.value="",r.removeClass("placeholder"),i==t.activeElement&&i.select()}function r(){var e,t=this,r=a(t),o=this.id;if(""==t.value){if("password"==t.type){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(s){e=a("<input>").attr(a.extend(n(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":r,"placeholder-id":o}).bind("focus.placeholder",i),r.data({"placeholder-textinput":e,"placeholder-id":o}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",o).show()}r.addClass("placeholder"),r[0].value=r.attr("placeholder")}else r.removeClass("placeholder")}var o,s,l="placeholder"in t.createElement("input"),u="placeholder"in t.createElement("textarea"),c=a.fn,d=a.valHooks,p=a.propHooks;l&&u?(s=c.placeholder=function(){return this},s.input=s.textarea=!0):(s=c.placeholder=function(){var e=this;return e.filter((l?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":i,"blur.placeholder":r}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},s.input=l,s.textarea=u,o={get:function(e){var t=a(e),n=t.data("placeholder-password");return n?n[0].value:t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,n){var o=a(e),s=o.data("placeholder-password");return s?s[0].value=n:o.data("placeholder-enabled")?(""==n?(e.value=n,e!=t.activeElement&&r.call(e)):o.hasClass("placeholder")?i.call(e,!0,n)||(e.value=n):e.value=n,o):e.value=n}},l||(d.input=o,p.value=o),u||(d.textarea=o,p.value=o),a(function(){a(t).delegate("form","submit.placeholder",function(){var e=a(".placeholder",this).each(i);setTimeout(function(){e.each(r)},10)})}),a(e).bind("beforeunload.placeholder",function(){a(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,a,n,i){return jQuery.easing[jQuery.easing.def](e,t,a,n,i)},easeInQuad:function(e,t,a,n,i){return n*(t/=i)*t+a},easeOutQuad:function(e,t,a,n,i){return-n*(t/=i)*(t-2)+a},easeInOutQuad:function(e,t,a,n,i){return(t/=i/2)<1?n/2*t*t+a:-n/2*(--t*(t-2)-1)+a},easeInCubic:function(e,t,a,n,i){return n*(t/=i)*t*t+a},easeOutCubic:function(e,t,a,n,i){return n*((t=t/i-1)*t*t+1)+a},easeInOutCubic:function(e,t,a,n,i){return(t/=i/2)<1?n/2*t*t*t+a:n/2*((t-=2)*t*t+2)+a},easeInQuart:function(e,t,a,n,i){return n*(t/=i)*t*t*t+a},easeOutQuart:function(e,t,a,n,i){return-n*((t=t/i-1)*t*t*t-1)+a},easeInOutQuart:function(e,t,a,n,i){return(t/=i/2)<1?n/2*t*t*t*t+a:-n/2*((t-=2)*t*t*t-2)+a},easeInQuint:function(e,t,a,n,i){return n*(t/=i)*t*t*t*t+a},easeOutQuint:function(e,t,a,n,i){return n*((t=t/i-1)*t*t*t*t+1)+a},easeInOutQuint:function(e,t,a,n,i){return(t/=i/2)<1?n/2*t*t*t*t*t+a:n/2*((t-=2)*t*t*t*t+2)+a},easeInSine:function(e,t,a,n,i){return-n*Math.cos(t/i*(Math.PI/2))+n+a},easeOutSine:function(e,t,a,n,i){return n*Math.sin(t/i*(Math.PI/2))+a},easeInOutSine:function(e,t,a,n,i){return-n/2*(Math.cos(Math.PI*t/i)-1)+a},easeInExpo:function(e,t,a,n,i){return 0==t?a:n*Math.pow(2,10*(t/i-1))+a},easeOutExpo:function(e,t,a,n,i){return t==i?a+n:n*(-Math.pow(2,-10*t/i)+1)+a},easeInOutExpo:function(e,t,a,n,i){return 0==t?a:t==i?a+n:(t/=i/2)<1?n/2*Math.pow(2,10*(t-1))+a:n/2*(-Math.pow(2,-10*--t)+2)+a},easeInCirc:function(e,t,a,n,i){return-n*(Math.sqrt(1-(t/=i)*t)-1)+a},easeOutCirc:function(e,t,a,n,i){return n*Math.sqrt(1-(t=t/i-1)*t)+a},easeInOutCirc:function(e,t,a,n,i){return(t/=i/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+a:n/2*(Math.sqrt(1-(t-=2)*t)+1)+a},easeInElastic:function(e,t,a,n,i){var r=1.70158,o=0,s=n;if(0==t)return a;if(1==(t/=i))return a+n;if(o||(o=.3*i),s<Math.abs(n)){s=n;var r=o/4}else var r=o/(2*Math.PI)*Math.asin(n/s);return-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(t*i-r)*Math.PI/o))+a},easeOutElastic:function(e,t,a,n,i){var r=1.70158,o=0,s=n;if(0==t)return a;if(1==(t/=i))return a+n;if(o||(o=.3*i),s<Math.abs(n)){s=n;var r=o/4}else var r=o/(2*Math.PI)*Math.asin(n/s);return s*Math.pow(2,-10*t)*Math.sin(2*(t*i-r)*Math.PI/o)+n+a},easeInOutElastic:function(e,t,a,n,i){var r=1.70158,o=0,s=n;if(0==t)return a;if(2==(t/=i/2))return a+n;if(o||(o=.3*i*1.5),s<Math.abs(n)){s=n;var r=o/4}else var r=o/(2*Math.PI)*Math.asin(n/s);return 1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(t*i-r)*Math.PI/o)+a:s*Math.pow(2,-10*(t-=1))*Math.sin(2*(t*i-r)*Math.PI/o)*.5+n+a},easeInBack:function(e,t,a,n,i,r){return void 0==r&&(r=1.70158),n*(t/=i)*t*((r+1)*t-r)+a},easeOutBack:function(e,t,a,n,i,r){return void 0==r&&(r=1.70158),n*((t=t/i-1)*t*((r+1)*t+r)+1)+a},easeInOutBack:function(e,t,a,n,i,r){return void 0==r&&(r=1.70158),(t/=i/2)<1?n/2*t*t*(((r*=1.525)+1)*t-r)+a:n/2*((t-=2)*t*(((r*=1.525)+1)*t+r)+2)+a},easeInBounce:function(e,t,a,n,i){return n-jQuery.easing.easeOutBounce(e,i-t,0,n,i)+a},easeOutBounce:function(e,t,a,n,i){return(t/=i)<1/2.75?7.5625*n*t*t+a:2/2.75>t?n*(7.5625*(t-=1.5/2.75)*t+.75)+a:2.5/2.75>t?n*(7.5625*(t-=2.25/2.75)*t+.9375)+a:n*(7.5625*(t-=2.625/2.75)*t+.984375)+a},easeInOutBounce:function(e,t,a,n,i){return i/2>t?.5*jQuery.easing.easeInBounce(e,2*t,0,n,i)+a:.5*jQuery.easing.easeOutBounce(e,2*t-i,0,n,i)+.5*n+a}}),jQuery(document).ready(function(){jQuery("input").bind("input propertychange",function(){if(jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),"email"==jQuery(this).attr("id")){var e=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):e.test(jQuery(this).val())?(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow")):(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow"))}else""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("textarea").bind("input propertychange",function(){jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("#contact-form").on("ajax:beforeSend",function(){jQuery("span.error").fadeOut("slow"),jQuery("span.valid").fadeOut("slow"),jQuery("#thanks").hide(),jQuery("#error").hide(),jQuery("#timedout").hide(),jQuery("#state").hide();var e=!1,t=jQuery("#inquiry_name").val();""==t||" "==t?(jQuery("#inquiry_name").after("<span class='error'></span>"),jQuery("#inquiry_name").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_name").after("<span class='valid'></span>"),jQuery("#inquiry_name").parent().find(".valid").fadeIn("slow"));var a=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,n=jQuery("#inquiry_email").val();""==n||" "==n?(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0):a.test(n)?(jQuery("#inquiry_email").after("<span class='valid'></span>"),jQuery("#inquiry_email").parent().find(".valid").fadeIn("slow")):(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0);var i=jQuery("#inquiry_message").val();return""==i||" "==i?(jQuery("#inquiry_message").after("<span class='error'></span>"),jQuery("#inquiry_message").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_message").after("<span class='valid'></span>"),jQuery("#inquiry_message").parent().find(".valid").fadeIn("slow")),1==e?(jQuery("#error").fadeIn("slow"),setTimeout(function(){jQuery("#error").fadeOut("slow")},3e3),!1):void 0}).on("ajax:error",function(e,t,a,n){"timeout"==n?(jQuery("#timedout").fadeIn("slow"),setTimeout(function(){jQuery("#timedout").fadeOut("slow")},3e3)):(jQuery("#state").fadeIn("slow"),jQuery("#state").html("The following error occured: "+n),setTimeout(function(){jQuery("#state").fadeOut("slow")},3e3))}).on("ajax:success",function(){jQuery("span.valid").remove(),jQuery("#thanks").fadeIn("slow"),jQuery("input").val(""),jQuery("textarea").val(""),setTimeout(function(){jQuery("#thanks").fadeOut("slow")},3e3)})}),window.console||(console={log:function(){}});var map;jQuery(function(e){"use strict";var t=window.THEME||{};t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.placeholder=function(){e("input, textarea").placeholder()},t.uniformHeight=function(){var t,a,n=0;e(".thumbnails.uniform-height").find(".thumbnail").each(function(){t=e(this).wrapInner('<div class="wrapper" />').children(".wrapper"),a=t.outerHeight(),n=Math.max(n,a),t.children().unwrap()}).height(n)},t.carousel=function(){e("#carousel").flexslider({animation:"slide",controlNav:!1,animationLoop:!1,slideshow:!1,itemWidth:125,itemMargin:5,asNavFor:"#slider"}),e("#slider").flexslider({animation:"slide",controlNav:!1,animationLoop:!1,slideshow:!1,sync:"#carousel"})},e(document).ready(function(){t.fix(),t.placeholder(),t.carousel(),t.uniformHeight(),e(window).resize(function(){t.uniformHeight()})})});