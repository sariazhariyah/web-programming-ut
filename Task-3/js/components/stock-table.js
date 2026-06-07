Vue.component(

'ba-stock-table',

{

template:'#tpl-stock',

props:{

items:{
type:Array,
required:true
},

upbjjList:{
type:Array,
required:true
},

kategoriList:{
type:Array,
required:true
}

},

data(){

return{

filterUpbjj:'',
filterKategori:'',
sortBy:'',
warningOnly:false,

tooltipIndex:null,

editIndex:null,

errorMessage:'',

form:{
kode:'',
judul:'',
kategori:'',
upbjj:'',
lokasiRak:'',
harga:0,
qty:0,
safety:0,
catatanHTML:''
}

};

},

computed:{

filteredStock(){

let data = [...this.items];

if(this.filterUpbjj){

data = data.filter(
x =>
x.upbjj === this.filterUpbjj
);

}

if(this.filterKategori){

data = data.filter(
x =>
x.kategori === this.filterKategori
);

}

if(this.warningOnly){

data = data.filter(
x =>
x.qty < x.safety ||
x.qty === 0
);

}

if(this.sortBy==='judul'){

data.sort(
(a,b)=>
a.judul.localeCompare(
b.judul
)
);

}

if(this.sortBy==='qty'){

data.sort(
(a,b)=>
a.qty-b.qty
);

}

if(this.sortBy==='harga'){

data.sort(
(a,b)=>
a.harga-b.harga
);

}

return data;

}

},

watch:{

filterUpbjj(){

this.filterKategori='';

},

warningOnly(newValue){

console.log(
'Warning filter:',
newValue
);

}

},

methods:{

formatRupiah(value){

return ApiService
.formatRupiah(value);

},

showTooltip(index){

this.tooltipIndex=index;

},

hideTooltip(){

this.tooltipIndex=null;

},

resetFilter(){

this.filterUpbjj='';
this.filterKategori='';
this.sortBy='';
this.warningOnly=false;

},

validateForm(){

if(
!this.form.kode ||
!this.form.judul ||
!this.form.kategori ||
!this.form.upbjj
){

this.errorMessage =
'Semua field wajib diisi';

return false;

}

this.errorMessage='';

return true;

},

saveData(){

if(!this.validateForm())
return;

if(this.editIndex===null){

this.items.push({

...this.form

});

}
else{

Vue.set(
this.items,
this.editIndex,
{
...this.form
}
);

}

this.resetForm();

},

editData(index,item){

this.editIndex=index;

this.form={
...item
};

},

cancelEdit(){

this.resetForm();

},

resetForm(){

this.editIndex=null;

this.form={

kode:'',
judul:'',
kategori:'',
upbjj:'',
lokasiRak:'',
harga:0,
qty:0,
safety:0,
catatanHTML:''

};

},

deleteData(index){

this.$root.showConfirm(

'Yakin menghapus data ini?',

()=>{

this.items.splice(
index,
1
);

}

);

}

}

}

);