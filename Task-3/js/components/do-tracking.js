Vue.component(

'do-tracking',

{

template:'#tpl-tracking',

props:{

data:{
type:Array,
required:true
}

},

data(){

return{

keyword:'',

detailIndex:null,

statusBaru:'',

selectedPaket:'',

form:{

nim:'',

nama:'',

ekspedisi:'',

tanggalKirim:
new Date()
.toISOString()
.substr(0,10)

},

paket:
[],

pengirimanList:
[]

};

},

async created(){

const json =
await ApiService.loadData();

this.paket =
json.paket;

this.pengirimanList =
json.pengirimanList;

},

computed:{

nomorDOBaru(){

const tahun =
new Date()
.getFullYear();

const nomor =
this.data.length + 1;

return `DO${tahun}-${String(
nomor
).padStart(4,'0')}`;

},

filteredTracking(){

if(
!this.keyword
){

return this.data;

}

return this.data.filter(
item=>

item.kode
.toLowerCase()
.includes(
this.keyword
.toLowerCase()
)

||

item.nim
.includes(
this.keyword
)

);

}

},

watch:{

selectedPaket(newValue){

if(newValue){

console.log(
'Paket berubah:',
newValue.nama
);

}

},

keyword(newValue){

console.log(
'Keyword pencarian:',
newValue
);

},

statusBaru(newValue){

console.log(
'Status baru:',
newValue
);

}

},

methods:{

formatRupiah(value){

return ApiService
.formatRupiah(value);

},

searchData(){

console.log(
'Cari:',
this.keyword
);

},

resetSearch(){

this.keyword='';

},

toggleDetail(index){

if(
this.detailIndex===index
){

this.detailIndex=null;

}
else{

this.detailIndex=index;

}

},

tambahDO(){

if(

!this.form.nim ||

!this.form.nama ||

!this.form.ekspedisi ||

!this.selectedPaket

){

alert(
'Lengkapi data'
);

return;

}

this.data.push({

kode:
this.nomorDOBaru,

nim:
this.form.nim,

nama:
this.form.nama,

status:
'Diproses',

ekspedisi:
this.form.ekspedisi,

tanggalKirim:
this.form.tanggalKirim,

paket:
this.selectedPaket.kode,

total:
this.selectedPaket.harga,

perjalanan:[
{

waktu:
new Date()
.toLocaleString(),

keterangan:
'DO berhasil dibuat'

}
]

});

this.form={

nim:'',

nama:'',

ekspedisi:'',

tanggalKirim:
new Date()
.toISOString()
.substr(0,10)

};

this.selectedPaket='';

},

tambahPerjalanan(item){

if(
!this.statusBaru
){

return;

}

item.perjalanan.push({

waktu:
new Date()
.toLocaleString(),

keterangan:
this.statusBaru

});

this.statusBaru='';

}

}

}

);