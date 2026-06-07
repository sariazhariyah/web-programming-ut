Vue.component(

'app-modal',

{

template:'#tpl-modal',

data(){

return{

visible:false,

message:'',

callback:null

};

},

methods:{

open(message,callback){

this.message = message;

this.callback = callback;

this.visible = true;

},

close(){

this.visible = false;

},

confirmAction(){

if(this.callback){

this.callback();

}

this.close();

}

}

}

);