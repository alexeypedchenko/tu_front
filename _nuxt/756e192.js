(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{100:function(t,e,n){"use strict";var r=n(82);n(252),n(316),n(317);r.a.apps.length?r.a.app():r.a.initializeApp({apiKey:"AIzaSyDBNwlNCBUi3f2ZykKYkuS8h_uXvUKU68E",authDomain:"t-ukraine.firebaseapp.com",projectId:"t-ukraine",storageBucket:"t-ukraine.appspot.com",messagingSenderId:"1049075273273",appId:"1:1049075273273:web:1066884ccca3d1fc24c7e8",measurementId:"G-G5ZK52HGYL"}),e.a=r.a},137:function(t,e,n){"use strict";var r=n(3);n(15);function o(){return(o=Object(r.a)(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,t.prev=1,t.next=4,n.dispatch("markers/getCollection");case 4:return t.next=6,n.dispatch("places/getCollection");case 6:return t.next=8,n.dispatch("routes/getCollection");case 8:console.warn("data loaded"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),console.log("err:",t.t0);case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}e.a=function(t){return o.apply(this,arguments)}},138:function(t,e,n){"use strict";n(48);n(4).a.mixin({computed:{},methods:{},filters:{cutText:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return t.length<e?t:t.slice(0,e)+"..."}}})},139:function(t,e,n){"use strict";n(22),n(27);var r=n(4),o={};Object.keys(o).forEach((function(t){r.a.component(t,o[t])}))},140:function(t,e,n){"use strict";var r=n(3),o=(n(15),n(59)),c=n(58);function l(){return(l=Object(r.a)(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,t.next=3,Object(c.b)().then((function(t){t&&Object(o.a)(n,t)}));case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e.a=function(t){return l.apply(this,arguments)}},177:function(t,e,n){var content=n(247);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("1ab1d713",content,!0,{sourceMap:!1})},178:function(t,e,n){var content=n(249);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("77538413",content,!0,{sourceMap:!1})},179:function(t,e,n){var content=n(251);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("1d2af8f3",content,!0,{sourceMap:!1})},180:function(t,e,n){var content=n(255);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("87e40a8e",content,!0,{sourceMap:!1})},181:function(t,e,n){var content=n(257);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("c3e36216",content,!0,{sourceMap:!1})},182:function(t,e,n){var content=n(259);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("09058289",content,!0,{sourceMap:!1})},183:function(t,e,n){var content=n(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("00fb5bbd",content,!0,{sourceMap:!1})},201:function(t,e,n){"use strict";var r={components:{AppHeader:n(202).default},middleware:"auth"},o=n(8),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-wrapper"},[t.$store.state.smallHeaer?t._e():n("app-header"),t._v(" "),n("main",{staticClass:"main"},[n("Nuxt")],1),t._v(" "),n("profile-auth-modal")],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{ProfileAuthModal:n(313).default})},202:function(t,e,n){"use strict";n.r(e);var r={name:"Header"},o=(n(246),n(8)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("header-logo",{staticClass:"header__logo"}),t._v(" "),n("header-navbar",{staticClass:"header__nav"}),t._v(" "),n("div",{staticClass:"header__profile"},[n("profile-enter")],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{HeaderLogo:n(309).default,HeaderNavbar:n(310).default,ProfileEnter:n(311).default})},203:function(t,e,n){"use strict";var r=n(8),component=Object(r.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Nuxt")],1)}),[],!1,null,null,null);e.a=component.exports},206:function(t,e,n){"use strict";n.r(e);var r={name:"Modal",props:{opened:{type:Boolean,default:!1},size:{type:String,default:""}},mounted:function(){window.addEventListener("keyup",this.closeOnEscape)},methods:{close:function(){this.$emit("close")},closeOnEscape:function(t){var e=t.key,code=t.code;"Escape"!==e&&"Escape"!==code||this.close()}},destroyed:function(){window.removeEventListener("keyup",this.closeOnEscape)}},o=(n(260),n(8)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal",class:{"modal--opened":t.opened,"modal--full-screen":"fs"===t.size}},[n("div",{staticClass:"modal__bg",on:{click:t.close}}),t._v(" "),n("div",{staticClass:"modal__window"},[n("button",{staticClass:"modal__close",on:{click:t.close}},[t._v("\n      x\n    ")]),t._v(" "),n("div",{staticClass:"modal__content"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},208:function(t,e,n){n(209),t.exports=n(210)},226:function(t,e,n){"use strict";n.r(e),e.default=function(t){var e=t.store;t.redirect,e.state.auth.user}},244:function(t,e,n){var content=n(245);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("3133b3f4",content,!0,{sourceMap:!1})},245:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,'.container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}*,:after,:before{box-sizing:border-box}body{min-width:320px;overflow-x:hidden;-ms-scroll-chaining:none;overscroll-behavior:none}body,h1,h2,h3,h4,h5,h6,ol,p,ul{margin:0}ol,ul{padding:0;list-style-type:none}a{text-decoration:none}input,textarea{padding:0;outline:none}input::-moz-placeholder,textarea::-moz-placeholder{color:currentColor;-moz-transition:opacity .3s;transition:opacity .3s}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:currentColor;-ms-transition:opacity .3s;transition:opacity .3s}input::placeholder,textarea::placeholder{color:currentColor;transition:opacity .3s}input:active::-moz-placeholder,input:focus::-moz-placeholder,textarea:active::-moz-placeholder,textarea:focus::-moz-placeholder{opacity:0}input:active:-ms-input-placeholder,input:focus:-ms-input-placeholder,textarea:active:-ms-input-placeholder,textarea:focus:-ms-input-placeholder{opacity:0}input:active::placeholder,input:focus::placeholder,textarea:active::placeholder,textarea:focus::placeholder{opacity:0}textarea::-webkit-scrollbar{display:none}button{background:none;background:#fff;outline:none;cursor:pointer;padding:5px 10px;white-space:nowrap}button:active{outline:1px dotted currentColor}button:hover{background:#ccc}*,* :after,* :before,body{font-family:"Montserrat",sans-serif}body{font-size:16px;line-height:1.4;color:#000}body.no-scroll{overflow:hidden}a{color:#000}input,textarea{font-family:"Montserrat",sans-serif}input::-moz-placeholder,textarea::-moz-placeholder{font-family:"Montserrat",sans-serif;color:#d4d4d5}input:-ms-input-placeholder,textarea:-ms-input-placeholder{font-family:"Montserrat",sans-serif;color:#d4d4d5}input::placeholder,textarea::placeholder{font-family:"Montserrat",sans-serif;color:#d4d4d5}button{font-family:"Montserrat",sans-serif}.page-enter-active,.page-leave-active{transition:opacity .25s}.page-enter,.page-leave-to{opacity:0}.fade-enter-active,.fade-leave-active{transition:opacity .25s}.fade-enter,.fade-leave-to{opacity:0}.map-window-img{width:200px;height:100px;margin-bottom:10px}.map-window-img img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.map-window-title{font-size:20px;margin-bottom:10px}.map-window-description{font-size:16px}.btn{display:inline-block;padding:10px 20px;border:1px solid #90ee90;background:#90ee90;font-size:12px;text-transform:uppercase;border-radius:20px;transition:.3s;color:#000}.btn[disabled]{pointer-events:none;opacity:.4}.btn:hover{background:#64e764}.btn--sm{padding:5px 10px;font-size:10px}.btn--load{opacity:.8;pointer-events:none}.tag{border:1px solid #90ee90;background:#90ee90;border-radius:20px;padding:2px 7px;font-size:12px;color:#000;white-space:nowrap}.action{color:#90ee90}.action:hover{color:#64e764}',""]),t.exports=r},246:function(t,e,n){"use strict";n(177)},247:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.header{margin-bottom:20px;top:0;left:0;width:100%;display:flex;align-items:center;padding:20px;box-shadow:0 0 32px rgba(0,0,0,.1)}.header .container{display:flex;justify-content:space-between}.header__logo{margin-right:60px}.header__nav{margin-right:auto}.header__profile{display:flex;align-items:center}",""]),t.exports=r},248:function(t,e,n){"use strict";n(178)},249:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.logo{width:80px;height:40px;background:#87cefa;display:flex;justify-content:center;align-items:center}.logo:hover{font-style:italic}",""]),t.exports=r},250:function(t,e,n){"use strict";n(179)},251:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.navbar__list{display:flex}.navbar__item:not(:last-child){margin-right:20px}.navbar__link{color:#20b2aa;border-bottom:1px solid transparent}.navbar__link.nuxt-link-exact-active,.navbar__link:hover{border-bottom-color:#20b2aa}",""]),t.exports=r},254:function(t,e,n){"use strict";n(180)},255:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.auth-modal-type{margin-top:20px;display:flex;justify-content:center;align-items:center}.auth-modal-type div{margin:0 5px;cursor:pointer;text-decoration:underline}.auth-modal-type div:hover{text-decoration:none}",""]),t.exports=r},256:function(t,e,n){"use strict";n(181)},257:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.sign-up{width:400px;margin:0 auto}.sign-up form{display:flex;flex-direction:column}.sign-up form>:not(:last-child){margin-bottom:20px}.sign-up form input{padding:5px 10px}.sign-up__head{text-align:center;margin-bottom:20px}",""]),t.exports=r},258:function(t,e,n){"use strict";n(182)},259:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.sign-up{width:400px;margin:0 auto}.sign-up form{display:flex;flex-direction:column}.sign-up form>:not(:last-child){margin-bottom:20px}.sign-up form input{padding:5px 10px}.sign-up__head{text-align:center;margin-bottom:20px}",""]),t.exports=r},260:function(t,e,n){"use strict";n(183)},261:function(t,e,n){var r=n(42)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap);"]),r.push([t.i,".container{width:1200px;padding:0 40px;max-width:100%;margin:0 auto}.modal{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;transition:.3s}.modal--opened{opacity:1;pointer-events:all}.modal__bg{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:rgba(0,0,0,.3)}.modal__window{position:relative;max-height:calc(100% - 100px);overflow:auto;padding:40px 20px;width:500px;max-width:100%;background:#fff;border-radius:2px;z-index:2}.modal__close{position:absolute;top:10px;right:10px;width:20px;height:20px;line-height:20px;display:flex;justify-content:center;align-items:center;padding:0;border:1px solid #000;z-index:1}.modal--full-screen .modal__window{width:calc(100% - 40px);height:calc(100% - 40px);max-height:100%;padding:40px}",""]),t.exports=r},262:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{lang:{filters:{name:"Название места",town:"Город",region:"Регион",tags:"Теги",type:"Тип места"}},editedUserRoute:"",settingUserRoute:!1}},o={setEditedUserRoute:function(t,e){t.editedUserRoute=e},toggleSettingUserRoute:function(t){t.settingUserRoute=!t.settingUserRoute},mutate:function(t,e){t[e.prop]=e.value}}},263:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o})),n.d(e,"actions",(function(){return c}));var r=function(){return{modalShow:!1,modalType:"",user:null,profile:null}},o={SIGN_OUT:function(t){t.user=null},SIGN_IN:function(t,e){var n=e.uid,r=e.email,o=e.displayName,c=e.emailVerified,l=e.photoURL,d=e.phoneNumber;t.user={uid:n,email:r,displayName:o,emailVerified:c,photoURL:l,phoneNumber:d}},mutate:function(t,e){t[e.prop]=e.data}},c={fireAuthAction:function(t,e){var n=t.commit;e?n("SIGN_IN",e):n("SIGN_OUT")},setUserData:function(t,e){(0,t.commit)("mutate",{prop:"profile",data:e})},showModal:function(t,e){var n=t.commit,r={prop:"modalType",data:e};n("mutate",{prop:"modalShow",data:!0}),n("mutate",r)},hideModal:function(t){(0,t.commit)("mutate",{prop:"modalShow",data:!1})}}},264:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"getters",(function(){return o})),n.d(e,"mutations",(function(){return c}));var r=function(){return{init:!1,activeInfoWindow:null,triggerInfoWindow:!1,hoveredMarker:null,hoveredMarkerIndex:null}},o={isMapInit:function(t){return t.init}},c={openInfoWindow:function(t,e){t.activeInfoWindow=e,t.triggerInfoWindow=!t.triggerInfoWindow},showHoveredMarker:function(t,data){t.hoveredMarker=data},setHoveredMarkerIndex:function(t,e){t.hoveredMarkerIndex=e},mapInit:function(t){t.init=!0},mapDestroy:function(t){t.init=!1}}},265:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return l})),n.d(e,"getters",(function(){return d})),n.d(e,"mutations",(function(){return f})),n.d(e,"actions",(function(){return m}));var r=n(3),o=(n(15),n(22),n(27),n(38),n(13),n(71)),c=n(44),l=function(){return{dataLoaded:!1,loading:!1,list:[],filters:{name:"",tags:"",region:""}}},d={filtredMarkers:function(t){return Object(o.b)(t)},getFilters:function(t){return t.filters},getFilterList:function(t){return Object(o.a)(t)}},f={mutate:function(t,e){t[e.property]=e.value},loadingStart:function(t){t.loading=!0},loadingEnd:function(t){t.loading=!1},clearFilters:function(t){Object.keys(t.filters).forEach((function(e){t.filters[e]=""}))},setFilterValue:function(t,e){var n=e.name,r=e.value;t.filters[n]=r}},m={getCollection:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.commit)("loadingStart"),e.next=4,Object(c.b)("markers").then((function(data){n("mutate",{property:"list",value:data}),n("mutate",{property:"dataLoaded",value:!0})})).catch((function(t){return console.log("err:",t)})).finally((function(){return n("loadingEnd")}));case 4:case"end":return e.stop()}}),e)})))()}}},289:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return l})),n.d(e,"getters",(function(){return d})),n.d(e,"mutations",(function(){return f})),n.d(e,"actions",(function(){return m}));var r=n(3),o=n(20),c=(n(15),n(37),n(126),n(141),n(62),n(65),n(13),n(44)),l=function(){return{dataLoaded:!1,loading:!1,list:[]}},d={filtredPlaces:function(t,e,n){var r=t.list,c=n.filters;return r.filter((function(t){for(var e=!0,n=0,r=Object.entries(c);n<r.length;n++){var l=Object(o.a)(r[n],2),d=l[0],f=l[1];if(f){var m=t[d];if("name"===d&&(f=f.toLowerCase().trim(),m=m.toLowerCase().trim()),f&&!m.includes(f)){e=!1;break}}}return e}))}},f={loadingStart:function(t){t.loading=!0},loadingEnd:function(t){t.loading=!1},mutate:function(t,e){t[e.property]=e.value},setNewPlace:function(t,e){t.list.push(e)}},m={getCollection:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.commit)("loadingStart"),e.next=4,Object(c.b)("places").then((function(data){n("mutate",{property:"list",value:data}),n("mutate",{property:"dataLoaded",value:!0})})).catch((function(t){return console.log("err:",t)})).finally((function(){return n("loadingEnd")}));case 4:case"end":return e.stop()}}),e)})))()}}},290:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return l})),n.d(e,"getters",(function(){return d})),n.d(e,"mutations",(function(){return f})),n.d(e,"actions",(function(){return m}));var r=n(3),o=(n(15),n(22),n(27),n(38),n(13),n(71)),c=n(44),l=function(){return{dataLoaded:!1,loading:!1,list:[],filters:{name:"",tags:"",region:""}}},d={filtredRoutes:function(t){return Object(o.b)(t)},getFilters:function(t){return t.filters},getFilterList:function(t){return Object(o.a)(t)}},f={mutate:function(t,e){t[e.property]=e.value},loadingStart:function(t){t.loading=!0},loadingEnd:function(t){t.loading=!1},clearFilters:function(t){Object.keys(t.filters).forEach((function(e){t.filters[e]=""}))},setFilterValue:function(t,e){var n=e.name,r=e.value;t.filters[n]=r}},m={getCollection:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.commit)("loadingStart"),e.next=4,Object(c.b)("routes").then((function(data){n("mutate",{property:"list",value:data}),n("mutate",{property:"dataLoaded",value:!0})})).catch((function(t){return console.log("err:",t)})).finally((function(){return n("loadingEnd")}));case 4:case"end":return e.stop()}}),e)})))()}}},309:function(t,e,n){"use strict";n.r(e);var r={name:"Logo"},o=(n(248),n(8)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("nuxt-link",{staticClass:"logo",attrs:{to:"/"}},[t._v("\n  Logo\n")])}),[],!1,null,null,null);e.default=component.exports},310:function(t,e,n){"use strict";n.r(e);var r={name:"Navbar",data:function(){return{links:[{id:0,name:"Главная",ref:"/"},{id:1,name:"Места",ref:"/places"},{id:2,name:"Маршруты",ref:"/routes"}]}}},o=(n(250),n(8)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar"},[n("ul",{staticClass:"navbar__list"},t._l(t.links,(function(link){return n("li",{key:link.id,staticClass:"navbar__item"},[n("nuxt-link",{staticClass:"navbar__link",attrs:{to:link.ref}},[t._v("\n        "+t._s(link.name)+"\n      ")])],1)})),0)])}),[],!1,null,null,null);e.default=component.exports},311:function(t,e,n){"use strict";n.r(e);n(27),n(33),n(37),n(60),n(22),n(61);var r=n(25),o=n(47);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={name:"Enter",computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)("auth",["user","profile"])),methods:{signUp:function(){this.$store.dispatch("auth/showModal","sign-up")},signIn:function(){this.$store.dispatch("auth/showModal","sign-in")}}},d=n(8),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"enter"},[t.user?[t._v("\n    hello\n    "),n("nuxt-link",{staticClass:"action",attrs:{to:"/profile"}},[t._v("\n      "+t._s(t.user.displayName||t.user.email)+"\n    ")]),t._v(" "),n("profile-logout")]:[n("button",{on:{click:t.signUp}},[t._v("\n      sign up\n    ")]),t._v(" "),n("button",{on:{click:t.signIn}},[t._v("\n      sign in\n    ")])]],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProfileLogout:n(312).default})},312:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(15),n(58)),c=n(59),l={name:"Logout",methods:{logout:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.signOut().then((function(){Object(c.a)(t.$store,null)})).catch((function(t){return console.log("logout error:",t)}));case 2:case"end":return e.stop()}}),e)})))()}}},d=n(8),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{on:{click:t.logout}},[t._v("\n  logout\n")])}),[],!1,null,null,null);e.default=component.exports},313:function(t,e,n){"use strict";n.r(e);n(27),n(33),n(37),n(60),n(22),n(61);var r=n(25),o=n(47);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={name:"AuthModal",computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)("auth",["modalShow","modalType"])),data:function(){return{modalTypes:["sign-up","sign-in"]}},methods:{hideModal:function(){this.$store.dispatch("auth/hideModal")}}},d=(n(254),n(8)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"auth-modal"},[n("modal",{attrs:{opened:t.modalShow},on:{close:t.hideModal}},["sign-up"===t.modalType?n("profile-sign-up",{on:{success:t.hideModal}}):t._e(),t._v(" "),"sign-in"===t.modalType?n("profile-sign-in",{on:{success:t.hideModal}}):t._e(),t._v(" "),n("div",{staticClass:"auth-modal-type"},[t._v("\n      or\n      "),t._l(t.modalTypes.filter((function(e){return e!==t.modalType})),(function(e){return n("div",{key:e,on:{click:function(n){return t.$store.dispatch("auth/showModal",e)}}},[t._v("\n        "+t._s(e)+"\n      ")])}))],2)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ProfileSignUp:n(314).default,ProfileSignIn:n(315).default,Modal:n(206).default})},314:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(15),n(59)),c=n(58),l=n(44),d={name:"SignUp",data:function(){return{email:"",password:"",error:""}},methods:{submit:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("this.email:",t.email),console.log("this.password:",t.password),e.next=4,Object(c.c)(t.email,t.password).then(function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.setUserData(n.uid);case 2:Object(o.a)(t.$store,n),t.$emit("success");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log("err:",e),t.error=e.message}));case 4:case"end":return e.stop()}}),e)})))()},clearData:function(){this.email="",this.password="",this.error=""},setUserData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={favoritePlaces:[],favoriteRoutes:[],createdRoutes:[],role:"user",credentials:{userPanel:!0,adminPanel:!1}},e.next=3,l.a.collection("users").doc(t).set(n).then((function(){return console.log("user data create successfuly")})).catch((function(t){return console.log("err:",t)}));case 3:case"end":return e.stop()}}),e)})))()}}},f=(n(256),n(8)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-up"},[t._m(0),t._v(" "),n("form",{attrs:{autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),t.error?n("p",[t._v("\n      "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),n("button",{staticClass:"btn"},[t._v("\n      Sign Up\n    ")])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-up__head"},[n("h2",[t._v("\n      Sign Up\n    ")]),t._v(" "),n("span",[t._v("\n      зарегистрироваться\n    ")])])}],!1,null,null,null);e.default=component.exports},315:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(15),n(59)),c=n(58),l={name:"SignIn",data:function(){return{email:"",password:"",error:""}},methods:{submit:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.e)(t.email,t.password).then((function(e){e&&(Object(o.a)(t.$store,e),t.$emit("success"))})).catch((function(e){console.log("err:",e),t.error=e.message}));case 2:case"end":return e.stop()}}),e)})))()},clearData:function(){this.email="",this.password="",this.error=""}}},d=(n(258),n(8)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-up"},[t._m(0),t._v(" "),n("form",{attrs:{autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),t.error?n("p",[t._v("\n      "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),n("button",{staticClass:"btn"},[t._v("\n      Sign In\n    ")])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-up__head"},[n("h2",[t._v("\n      Sign In\n    ")]),t._v(" "),n("span",[t._v("\n      войти\n    ")])])}],!1,null,null,null);e.default=component.exports},44:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"d",(function(){return d}));n(197);var r=n(3),o=(n(15),n(13),n(22),n(100).a.firestore()),c=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){o.collection(e).get().then((function(e){0===e.size&&t([]);var n=[];e.forEach((function(e){if(!e.exists)return[];var r=e.data();r.hasOwnProperty("public")&&!r.public||(r._id=e.id,n.push(r),t(n))}))})).catch((function(t){return n(t)}))})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e,n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.collection(e).doc(n).get();case 2:return r=t.sent,t.abrupt("return",r.exists?r.data():null);case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e,n,r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,c){o.collection(e).doc(n).update(r).then((function(){return t()})).catch((function(t){return c(t)}))})));case 1:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()},58:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"e",(function(){return d})),n.d(e,"f",(function(){return f})),n.d(e,"d",(function(){return m}));var r=n(3),o=(n(15),n(13),n(100).a.auth()),c=function(){return new Promise((function(t){o.onAuthStateChanged((function(e){t(e||null)}))}))},l=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){o.createUserWithEmailAndPassword(e,n).then((function(e){var n=e.user;t(n)})).catch((function(t){r(t)}))})));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),d=function(t,e){return new Promise((function(n,r){o.signInWithEmailAndPassword(t,e).then((function(t){n(t.user)})).catch((function(t){r(t)}))}))},f=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.currentUser.updateProfile(e).then((function(t){console.log("userData:",t),console.log("User Update successful")})).catch((function(t){console.log("User Update error")}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.currentUser.sendEmailVerification().then((function(){console.log("Email Verification sent")})).catch((function(t){console.log("Email Verification error")}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},59:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(3),o=(n(15),n(44)),c=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(e,n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.dispatch("auth/fireAuthAction",n),!n){t.next=7;break}return t.next=4,Object(o.c)("users",n.uid);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0=null;case 8:r=t.t0,e.dispatch("auth/setUserData",r);case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},71:function(t,e,n){"use strict";n.d(e,"b",(function(){return l})),n.d(e,"a",(function(){return d}));var r=n(31),o=n(20),c=(n(37),n(126),n(62),n(65),n(141),n(27),n(13),n(267),n(29),n(271),n(273),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(283),n(284),n(285),n(286),n(287),n(288),n(36),n(22),n(50),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=new Set;return t.forEach((function(t){n?t[e].forEach((function(t){r.add(t)})):r.add(t[e])})),Array.from(r)}),l=function(t,e,n){var c=t.list,l=t.filters;return c.filter((function(t){for(var e=!0,n=0,c=Object.entries(l);n<c.length;n++){var d=Object(o.a)(c[n],2),f=d[0],m=d[1];if(m){var h=t[f];("name"!==f&&"string"==typeof h&&h!==m||"name"!==f&&"object"===Object(r.a)(h)&&!h.includes(m))&&(e=!1),"name"===f&&(m=m.toLowerCase().trim(),(h=h.toLowerCase().trim()).includes(m)||(e=!1))}}return e}))},d=function(t){for(var e=t.list,n={},o=0,l=Object.keys(t.filters);o<l.length;o++){var d=l[o];if("name"!==d)switch(Object(r.a)(e[0][d])){case"string":n[d]=c(e,d);break;case"object":n[d]=c(e,d,true)}}return n}}},[[208,39,6,40]]]);