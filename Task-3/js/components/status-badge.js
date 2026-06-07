Vue.component(

'status-badge',

{

props:{

qty:{
type:Number,
required:true
},

safety:{
type:Number,
required:true
}

},

template:'#tpl-badge'

}

);