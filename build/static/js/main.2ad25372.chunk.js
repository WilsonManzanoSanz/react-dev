(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,t,a){e.exports=a(70)},52:function(e,t,a){},54:function(e,t,a){},56:function(e,t,a){},58:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},64:function(e,t,a){},66:function(e,t,a){},68:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(10),s=a(5),i=a(6),c=a(9),l=a(7),u=a(8),h=a(73),p=a(2),m=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("img",{src:this.props.url,className:"avatar"})}}]),t}(n.Component),d=a(71),g=void 0,b={mobile:window.matchMedia("(max-device-width: 900px)").matches,isMobile:function(){return this.mobile},setValue:function(e){return g.value=e},getValue:function(){return g.value}};window.addEventListener("resize",function(e){b.mobile=e.srcElement.matchMedia("(max-device-width: 900px)").matches});var f=a(20),v=a(24),O=a.n(v),E={apiKey:"AIzaSyDrRGe2Wr3FT-dRGCPFkbqNL3fg9xck020",authDomain:"react-dev-ead30.firebaseapp.com",databaseURL:"https://react-dev-ead30.firebaseio.com",projectId:"react-dev-ead30",storageBucket:"react-dev-ead30.appspot.com",messagingSenderId:"563866334755",hello:console.log("Hello")};O.a.initializeApp(E);var j=O.a,y=a(16),w={email:"",displayName:"",photoURL:"",uid:""},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":return Object(f.a)({},e,Object(f.a)({},e.user,t.user));case"SHOW_USER":return e;case"REMOVE_USER":return{email:"",displayName:"",photoURL:"",uid:""};default:return e}},k=Object(y.b)({user:N}),C=Object(y.c)(window.devToolsExtension?window.devToolsExtension():function(e){return e})(y.d)(k),S=function(e){return{type:"ADD_USER",user:e}},U="http://ayudalos.info:201",P={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, PUT, DELETE, GET, OPTIONS","Content-Type":"application/json"},I=new j.auth.GoogleAuthProvider,M=new j.auth.FacebookAuthProvider,R=new(function(){function e(){Object(s.a)(this,e),this.initializeUser(),this.user=null,this.initializeUser=this.initializeUser.bind(this),this.getUserFromServer=this.getUserFromServer.bind(this),this.registerUser=this.registerUser.bind(this),this.getCurrentUser=this.getCurrentUser.bind(this),this.fbSignIn=this.fbSignIn.bind(this),this.googleSignIn=this.googleSignIn.bind(this),this.uploadImage=this.uploadImage.bind(this),this.saveUser=this.saveUser.bind(this),console.log("Initialize AuthService..."),this.request=null,this.loading=!1}return Object(i.a)(e,[{key:"initializeUser",value:function(){var e=this;j.auth().onAuthStateChanged(function(t){t&&(localStorage.getItem("user_".concat(t.uid))?(e.user=JSON.parse(localStorage.getItem("user_".concat(t.uid))),console.log("User is logged",e.user),C.dispatch(S(e.user))):e.loading||(e.loading=!0,e.getUserFromServer(t).then(function(t){t.success?e.saveUser(t.data):Promise.reject(t.message),e.loading=!1}).catch(function(t){console.error(t),e.loading=!1})))},function(e){return console.error(e)})}},{key:"googleSignIn",value:function(){var e=this;return new Promise(function(t,a){j.auth().signInWithPopup(I).then(function(a){var n={displayName:a.user.displayName,email:a.user.email,photoURL:a.user.photoURL,uid:a.user.uid};e.registerUser(n).then(function(e){return console.log(e)}).catch(function(e){return console.error(e)}),t(a)}).catch(function(e){console.log(e),a(e)})})}},{key:"fbSignIn",value:function(){var e=this;return new Promise(function(t,a){j.auth().signInWithPopup(M).then(function(a){var n={displayName:a.user.displayName,email:a.user.email,photoURL:a.user.photoURL,uid:a.user.uid};e.registerUser(n).then(function(e){return console.log(e)}).catch(function(e){return console.error(e)}),t(a)}).catch(function(e){console.log(e),a(e)})})}},{key:"getUserFromServer",value:function(e){return fetch("".concat(U,"/api/users/").concat(e.uid),{mode:"cors",headers:P}).then(function(e){return e.json()})}},{key:"registerUser",value:function(e){var t=Object(f.a)({},e,{uid:j.auth().currentUser.uid});return fetch("".concat(U,"/api/users/"),{method:"POST",headers:P,body:JSON.stringify(t)}).then(function(e){return e.json()}).catch(function(e){return console.error(e)})}},{key:"saveUser",value:function(e){console.log("User is logged",e),this.user=e,localStorage.setItem("user_".concat(e.uid),JSON.stringify(this.user)),C.dispatch(S(this.user))}},{key:"getCurrentUser",value:function(){var e=this;return new Promise(function(t,a){j.auth().onAuthStateChanged(function(a){e.user?t(e.user):a?e.getUserFromServer(j.auth().currentUser).then(function(e){t(e)}).catch(function(e){return console.error(e)}):t(null)})})}},{key:"uploadImage",value:function(e,t){return new Promise(function(a,n){j.storage().ref().child("photo/".concat(e)).put(t).then(function(e){e.ref.getDownloadURL().then(function(e){return a(e)}).catch(function(e){return n(e)})})})}},{key:"signOut",value:function(){var e=this;return j.auth().signOut().then(function(){localStorage.getItem("user_".concat(e.user.uid))}).catch(function(e){console.error(e)})}}]),e}()),T=a(13),D=a(74),L=[{route:"/about",name:"About"},{route:"/posts",name:"Posts"}],A=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={isMobile:b.isMobile(),open:!1,user:null,showMenu:!1},a.toggleDrawer=a.toggleDrawer.bind(Object(p.a)(Object(p.a)(a))),a.toggleNav=a.toggleNav.bind(Object(p.a)(Object(p.a)(a))),a.onChangePath=a.onChangePath.bind(Object(p.a)(Object(p.a)(a))),a.closeMenu=a.closeMenu.bind(Object(p.a)(Object(p.a)(a))),a.signOut=a.signOut.bind(Object(p.a)(Object(p.a)(a))),a.goTo=a.goTo.bind(Object(p.a)(Object(p.a)(a))),a.elemContent="",a.elemNav="",a.showMenu=a.showMenu.bind(Object(p.a)(Object(p.a)(a))),R.getCurrentUser().then(function(e){return a.setState({user:e})}).catch(function(e){return console.error(e)}),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"goTo",value:function(e){this.props.history.push(e),this.onChangePath()}},{key:"signOut",value:function(){var e=this;R.signOut().then(function(t){e.props.removeUser(),e.props.history.push("/")}).catch(function(e){return console.error(e)})}},{key:"closeMenu",value:function(){var e=this;this.setState({showMenu:!1},function(){document.removeEventListener("click",e.closeMenu)})}},{key:"showMenu",value:function(e){var t=this;e.preventDefault(),this.setState({showMenu:!0},function(){document.addEventListener("click",t.closeMenu)})}},{key:"toggleDrawer",value:function(){this.toggleNav(),this.setState(function(e){return{open:!e.open}})}},{key:"toggleNav",value:function(){this.state.open?(this.elemContent.style.width="0%",this.elemNav.style.width="0%"):(this.elemContent.style.width="100%",this.elemNav.style.width="40%")}},{key:"onChangePath",value:function(){this.state.open&&this.toggleDrawer()}},{key:"componentDidMount",value:function(){var e=this;this.elemContent=document.getElementById("side-overlay"),this.elemNav=document.getElementById("side-nav"),this.elemContent.addEventListener("click",function(t){"side-overlay"===t.srcElement.id&&e.toggleDrawer()}),window.addEventListener("resize",function(t){var a=b.isMobile();e.setState({isMobile:a})})}},{key:"render",value:function(){var e=this,t=L.map(function(t){return o.a.createElement("li",{key:t.route,id:"nav-".concat(t.name.toLowerCase),onClick:e.onChangePath},o.a.createElement(d.a,{to:t.route},t.name))});return o.a.createElement("div",null,o.a.createElement("div",{className:"navbar"},o.a.createElement("ul",{className:"ul"},this.state.isMobile&&o.a.createElement("i",{className:"material-icons white",onClick:this.toggleDrawer},"menu"),o.a.createElement("li",{id:"nav-home",onClick:this.onChangePath},o.a.createElement(d.a,{to:"/"},"Home")),!this.state.isMobile&&t,o.a.createElement("li",{className:"spacer"}),!this.props.user.email&&o.a.createElement("li",{id:"nav-login",onClick:this.onChangePath},o.a.createElement(d.a,{to:"/login"},"Login")),this.props.user.email&&o.a.createElement("li",{id:"nav-login",onClick:this.showMenu},this.state.showMenu?o.a.createElement("div",{className:"card menu"},o.a.createElement("p",{className:"pointer",onClick:function(){e.goTo("/profile")}}," Profile "),o.a.createElement("p",{className:"pointer",onClick:this.signOut}," Salir ")):null,o.a.createElement("a",null,"Profile")))),o.a.createElement("div",{className:"side-overlay",id:"side-overlay"},o.a.createElement("div",{className:"nav-list",id:"side-nav"},this.state.isMobile&&this.state.open&&t)))}}]),t}(n.Component),x=Object(D.a)(Object(T.b)(function(e){return{user:e.user}},function(e){return{removeUser:function(t){return e({type:"REMOVE_USER"})}}})(A)),_=(a(52),function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("header",null,o.a.createElement(x,null))}}]),t}(n.Component)),W=a(72),F=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:""},"About")}}]),t}(n.Component),G=a(15),z=(a(54),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).goToProps=a.goToProps.bind(Object(p.a)(Object(p.a)(a))),a.closeWindow=a.closeWindow.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"goToProps",value:function(){var e=this.props.place.photos?this.props.place.photos[0].getUrl():this.props.place.icon;this.props.history.push({pathname:"/place/".concat(this.props.place.id),state:{place:{id:this.props.place.id,name:this.props.place.name,opening_hours:this.props.place.opening_hours,rating:this.props.place.rating,vicinity:this.props.place.vicinity,photo:e}}})}},{key:"closeWindow",value:function(e){e.stopPropagation(),this.props.closeItself()}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:this.props.id,className:this.props.className,onClick:this.goToProps},this.props.delete&&o.a.createElement("div",{className:"top-right",onClick:function(t){return e.closeWindow(t)}}," x "),o.a.createElement("div",{className:"flex-header pointer"},this.props.place.photos?o.a.createElement(m,{url:this.props.place.photos[0].getUrl()}):o.a.createElement(m,{url:this.props.place.icon}),o.a.createElement("div",{className:"card-header-user"},o.a.createElement("p",{className:"nospace"},this.props.place.name),o.a.createElement("p",{className:"nospace subtittle"},this.props.place.vicinity))))}}]),t}(n.Component));z.defaultProps={className:"card",delete:!1,closeItself:function(){return 0}};var q,B=Object(D.a)(z),J=(a(56),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).goToProps=a.goToProps.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){if(this.props.expandCard){console.log(this.props.place.position),console.log(document.getElementById("map-detail")),q=new window.google.maps.Map(document.getElementById("map-detail"),{center:this.props.place.position,zoom:15});new window.google.maps.Marker({map:q,position:this.props.place.position})}}},{key:"goToProps",value:function(){var e=this.props.place.photos?this.props.place.photos[0].getUrl():this.props.place.icon;window.scrollTo(0,0),this.props.history.push({pathname:"/place/".concat(this.props.place.id),state:{place:{id:this.props.place.id,name:this.props.place.name,opening_hours:this.props.place.opening_hours,rating:this.props.place.rating,vicinity:this.props.place.vicinity,photo:e,position:this.props.place.position}}})}},{key:"render",value:function(){return o.a.createElement("div",{id:this.props.id,className:this.props.className,onClick:this.goToProps},this.props.expandCard?o.a.createElement("h1",{className:"nospace"},this.props.place.name):o.a.createElement("h2",{className:"nospace"},this.props.place.name),o.a.createElement("h4",{className:"nospace gray"},this.props.place.vicinity),this.props.place.photos?o.a.createElement("img",{className:"image-card",src:this.props.place.photos[0].getUrl()}):o.a.createElement("img",{className:"image-card",src:this.props.place.photo}),o.a.createElement("hr",null),o.a.createElement("h3",{className:"margin10"},"Services"),this.props.expandCard&&o.a.createElement("div",null,o.a.createElement("img",{className:"half-image",src:"https://www.elheraldo.co/sites/default/files/styles/width_860/public/articulo/2015/05/04/chuzo_desgranado_natalli_8.jpg?itok=IJvku1cn",alt:"photico"}),o.a.createElement("img",{className:"half-image",src:"https://www.mycolombianrecipes.com/wp-content/uploads/2014/02/mazorca-desgranada-colombiana.jpg",alt:"photico"}),o.a.createElement("div",{className:"flex-header padding10"},o.a.createElement("span",{className:"nospace"},"Una salchipapaso "),o.a.createElement("span",{className:"gray sub-span"}," 30K"),o.a.createElement("span",{className:"spacer"}),o.a.createElement("button",{className:"raised"},"PEDIR")),o.a.createElement("div",{className:"flex-header padding10"},o.a.createElement("span",{className:"nospace"},"Una hamburguesaria "),o.a.createElement("span",{className:"gray sub-span"}," 10K"),o.a.createElement("span",{className:"spacer"}),o.a.createElement("button",{className:"raised"},"PEDIR"))),o.a.createElement("div",{className:"flex-header padding10"},o.a.createElement("span",{className:"nospace"},"Un perrario "),o.a.createElement("span",{className:"gray sub-span"}," 50K"),o.a.createElement("span",{className:"spacer"}),o.a.createElement("button",{className:"raised"},"PEDIR")),o.a.createElement("div",{className:"flex-header padding10"},o.a.createElement("span",{className:"nospace"},"Un pataconario "),o.a.createElement("span",{className:"gray sub-span"}," 20K"),o.a.createElement("span",{className:"spacer"}),o.a.createElement("button",{className:"raised"},"PEDIR")),this.props.expandCard&&o.a.createElement("div",null,o.a.createElement("button",{className:"center-button schedule-button",type:"button"},"SCHEDULE"),o.a.createElement("h3",null,"Hours"),o.a.createElement("p",null,"Monday 7am - 5pm "),o.a.createElement("p",null,"Tuesday 7am - 5pm "),o.a.createElement("p",null,"Wednesday 7am - 5pm "),o.a.createElement("p",null,"Thursday 7am - 5pm "),o.a.createElement("p",null,"Friday 7am - 5pm "),o.a.createElement("p",null,"Saturday 7am - 5pm "),o.a.createElement("p",null,"Sunday 7am - 5pm "),o.a.createElement("div",{className:"google-maps",id:"google-maps"},o.a.createElement("h2",null,"Location"),o.a.createElement("div",{id:"map-detail"}))))}}]),t}(n.Component));J.defaultProps={className:"card",delete:!1,closeItself:function(){return 0},expandCard:!1};var K,H=Object(D.a)(J),V=(n.Component,function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={value:""},a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){e.target.classList.add("touched"),this.setState({value:e.target.value}),this.props.onChange(this.props.name,e.target.value)}},{key:"render",value:function(){return o.a.createElement("input",{id:this.props.id,value:this.state.value,type:this.props.type,onChange:this.handleChange,minLength:this.props.minlength,maxLength:this.props.maxlength,required:this.props.required,className:"input input-width",placeholder:this.props.placeholder})}}]),t}(n.Component)),$=(a(58),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={position:{lat:10.974288,lng:-74.802741},results:[],place:null},a.askForGPS=a.askForGPS.bind(Object(p.a)(Object(p.a)(a))),a.addPlaces=a.addPlaces.bind(Object(p.a)(Object(p.a)(a))),a.createMarker=a.createMarker.bind(Object(p.a)(Object(p.a)(a))),a.showDetails=a.showDetails.bind(Object(p.a)(Object(p.a)(a))),a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.hideDetials=a.hideDetials.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){K=new window.google.maps.Map(document.getElementById("map"),{center:this.state.position,zoom:15}),new window.google.maps.places.PlacesService(K).nearbySearch({location:this.state.position,radius:"1500",type:["restaurant"]},this.addPlaces)}},{key:"addPlaces",value:function(e,t){if(this.setState(function(){return{results:e}}),t===window.google.maps.places.PlacesServiceStatus.OK)for(var a=0;a<e.length;a++)this.createMarker(e[a])}},{key:"createMarker",value:function(e){var t=this,a=(e.geometry.location,new window.google.maps.Marker({map:K,position:e.geometry.location}));window.google.maps.event.addListener(a,"click",function(a){t.showDetails(e,a)})}},{key:"askForGPS",value:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){return e.setState({position:{lat:t.coords.latitude,lng:t.coords.longitude}})}):console.error("Geolocation is not supported by this browser.")}},{key:"handleChange",value:function(e,t){this.setState(Object(G.a)({},e,t))}},{key:"showDetails",value:function(e,t){this.setState({place:e})}},{key:"hideDetials",value:function(){this.setState({place:null})}},{key:"render",value:function(){var e=this.state.results.map(function(e){return e.position={lat:e.geometry.location.lat(),lng:e.geometry.location.lng()},o.a.createElement(H,{key:e.name,place:e})});return console.log(this.state.results),o.a.createElement("div",{className:"google-maps",id:"google-maps"},this.state.place&&o.a.createElement(B,{id:"map-marker",place:this.state.place,delete:!0,closeItself:this.hideDetials}),o.a.createElement("div",{id:"map"}),o.a.createElement("div",{className:"padding20"},e))}}]),t}(n.Component)),Q=(a(60),function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(c.a)(this,Object(l.a)(t).call(this,e)),console.log(a.props),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"center-card"},o.a.createElement(H,{key:this.props.location.state.place.name,place:this.props.location.state.place,expandCard:!0}))}}]),t}(n.Component)),X=function(e){var t=e.tittle,a=void 0===t?"NetTeachers":t,n=e.icon,r=void 0===n?"https://firebasestorage.googleapis.com/v0/b/react-dev-ead30.appspot.com/o/icon.svg?alt=media&token=b2b12134-61f4-4890-a35c-de5578ceba14":n;return o.a.createElement("div",null,o.a.createElement("h2",{className:"card-header"},a),o.a.createElement("img",{src:r,className:"card-header-icon",alt:"iconlogo",id:"main-icon"}))},Y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={email:"",password:"",error:!1},a.attemptLogin=a.attemptLogin.bind(Object(p.a)(Object(p.a)(a))),a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.fbSignIn=a.fbSignIn.bind(Object(p.a)(Object(p.a)(a))),a.googleSignIn=a.googleSignIn.bind(Object(p.a)(Object(p.a)(a))),a.goTo=a.goTo.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"attemptLogin",value:function(e){var t=this;console.log(this.state.form),e.preventDefault(),j.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(function(e){t.props.addUser(e),t.setState={form:{}},t.props.history.push("/profile")}).catch(function(e){console.error(e),t.setState({errorMessage:e.message})})}},{key:"googleSignIn",value:function(){var e=this;R.googleSignIn().then(function(t){e.props.addUser(t.user),e.setState={form:{}},e.props.history.push("/profile")}).catch(function(t){e.setState({errorMessage:t.message}),console.error(t)})}},{key:"fbSignIn",value:function(){var e=this;R.fbSignIn().then(function(t){e.props.addUser(t.user),e.setState={form:{}},e.props.history.push("/profile")}).catch(function(t){e.setState({errorMessage:t.message}),console.error(t)})}},{key:"goTo",value:function(e){this.props.history.push(e)}},{key:"handleChange",value:function(e,t){this.setState(Object(G.a)({},e,t))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"center-card"},o.a.createElement("div",{className:"card"},o.a.createElement(X,null),o.a.createElement("form",{onSubmit:this.attemptLogin,id:"form-id"},o.a.createElement(V,{id:"login-email",name:"email",placeholder:"Ingresa tu email",className:"input-width",type:"email",minlength:"6",required:!0,onChange:this.handleChange}),o.a.createElement(V,{id:"login-password",name:"password",placeholder:"Ingresa tu password",className:"input-width",type:"password",required:!0,minlength:"6",onChange:this.handleChange}),o.a.createElement("h4",{className:"center-text"},"Ingresa con "),this.state.errorMessage&&o.a.createElement("h4",{className:"center-text red"},this.state.errorMessage," "),o.a.createElement("div",{className:"center-flex",id:"login-options"},o.a.createElement("img",{onClick:this.googleSignIn,src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",className:"icon pointer"}),o.a.createElement("img",{onClick:this.fbSignIn,src:"https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg",className:"icon pointer"})),o.a.createElement("button",{className:"center-button margin-top",type:"submit"},"INGRESAR"),o.a.createElement("button",{className:"center-button margin-top raised",type:"button",onClick:function(){return e.goTo("/register")}},"REGISTRAR"),o.a.createElement("button",{className:"center-button margin-top raised",type:"button",onClick:function(){return e.goTo("/forgot-password")}},"RECORDAR CONSTRASE\xd1A"))))}}]),t}(n.Component),Z=Object(T.b)(null,function(e){return{addUser:function(t){return e(S(t))}}})(Y),ee=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={form:{email:"",password:"",displayName:""},error:!1},a.form={},a.photo=null,a.savePhotoInCache=a.savePhotoInCache.bind(Object(p.a)(Object(p.a)(a))),a.addPhoto=a.addPhoto.bind(Object(p.a)(Object(p.a)(a))),a.attemptRegister=a.attemptRegister.bind(Object(p.a)(Object(p.a)(a))),a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"attemptRegister",value:function(e){var t=this;e.preventDefault();this.state.displayName,this.photo;j.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(e){var a={email:e.user.uid,uid:e.user.uid,displayName:t.state.displayName,photoURL:""};t.photo?R.uploadImage(e.user.uid,t.photo).then(function(e){a.photoURL=e,t.registerUser(a)}).catch(function(e){return console.error(e)}):t.props.history.push("/")}).catch(function(e){console.error(e),t.setState({errorMessage:e.message})})}},{key:"registerUser",value:function(e){var t=this;R.registerUser(e).then(function(e){e.success&&(R.saveUser(e.data),t.props.history.push("/"))}).catch(function(e){return console.log(e)})}},{key:"handleChange",value:function(e,t){this.setState(Object(G.a)({},e,t))}},{key:"savePhotoInCache",value:function(e){this.photo=e}},{key:"addPhoto",value:function(){var e=this,t=document.getElementById("add-photo");t.click(),t.addEventListener("change",function(t){return e.savePhotoInCache(t.target.files[0])})}},{key:"render",value:function(){return o.a.createElement("div",{className:"center-card"},o.a.createElement("div",{className:"card"},o.a.createElement(X,null),o.a.createElement("form",{onSubmit:this.attemptRegister,id:"form-id"},o.a.createElement(V,{id:"register-name",name:"displayName",placeholder:"Ingresa tu nombre",className:"input-width",type:"nombre",minlength:"6",required:!0,onChange:this.handleChange}),o.a.createElement(V,{id:"register-email",name:"email",placeholder:"Ingresa tu email",className:"input-width",type:"email",minlength:"6",required:!0,onChange:this.handleChange}),o.a.createElement(V,{id:"register-password",name:"password",placeholder:"Ingresa tu password",className:"input-width",type:"password",required:!0,minlength:"6",onChange:this.handleChange}),this.state.errorMessage&&o.a.createElement("h4",{className:"center-text red"},this.state.errorMessage," "),o.a.createElement("input",{className:"nodisplay",id:"add-photo",type:"file"}),o.a.createElement("button",{className:"center-button margin-top raised",type:"button",onClick:this.addPhoto},"AGREGAR FOTO"),o.a.createElement("button",{className:"center-button margin-top",type:"submit"},"REGISTRAR"))))}}]),t}(n.Component),te=(a(62),function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"card-header-user"},o.a.createElement("p",{className:"nospace"},this.props.user.displayName),o.a.createElement("p",{className:"nospace subtittle"},this.props.user.email))}}]),t}(n.Component)),ae=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"center-card"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"flex-header"},o.a.createElement(m,{url:this.props.user.photoURL}),o.a.createElement(te,{user:this.props.user}))))}}]),t}(n.Component),ne=Object(T.b)(function(e){return{todos:e.user}})(ae),oe=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={user:{displayName:""}},R.getCurrentUser().then(function(e){e&&a.setState({user:e})}).catch(function(e){return console.error(e)}),a.signOut=a.signOut.bind(Object(p.a)(Object(p.a)(a))),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"signOut",value:function(){var e=this;R.signOut().then(function(t){return e.setState({user:{}})}).catch(function(e){return console.error(e)})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(ne,{user:this.props.user}))}}]),t}(n.Component),re=Object(T.b)(function(e){return{user:e.user}})(oe),se=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h2",null,"ForgotPassword"))}}]),t}(n.Component),ie=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"main-container",id:"main-container",ref:"main-container"},o.a.createElement(W.a,{exact:!0,path:"/",component:$}),o.a.createElement(W.a,{path:"/about",component:F}),o.a.createElement(W.a,{path:"/place/:place",component:Q}),o.a.createElement(W.a,{path:"/login",component:Z}),o.a.createElement(W.a,{path:"/register",component:ee}),o.a.createElement(W.a,{path:"/profile",component:re}),o.a.createElement(W.a,{path:"/forgot-password",component:se}))}}]),t}(n.Component),ce=function(e){function t(e){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).call(this,e))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(h.a,null,o.a.createElement("div",null,o.a.createElement(_,null),o.a.createElement(ie,null)))}}]),t}(n.Component),le=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ue(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(64),a(66),a(68);Object(r.render)(o.a.createElement(function(){return o.a.createElement(T.a,{store:C},o.a.createElement(ce,null))},null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");le?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ue(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):ue(t,e)})}}()}},[[32,2,1]]]);
//# sourceMappingURL=main.2ad25372.chunk.js.map