Vue.component(

'order-form',

{

template:'#tpl-order',

props:{

paket:{
type:Array,
required:true
},

ekspedisi:{
type:Array,
required:true
}

},

data(){

return{

selectedPaket:'',

selectedEkspedisi:'',

form:{

nim:'',
nama:''

}

};

},

computed:{

totalHarga(){

if(!this.selectedPaket){

return 0;

}

return this.selectedPaket.harga;

}

},

watch:{

selectedPaket(){

console.log(
'Paket berubah'
);

},

selectedEkspedisi(){

console.log(
'Ekspedisi berubah'
);

}

},

methods:{

formatRupiah(value){

return ApiService
.formatRupiah(value);

},

submitOrder(){

if(

!this.form.nim ||

!this.form.nama ||

!this.selectedPaket ||

!this.selectedEkspedisi

){

alert(
'Lengkapi data'
);

return;

}

const tahun =
new Date()
.getFullYear();

const nomor =
Date.now()
.toString()
.slice(-4);

const newDO = {

kode:
`DO${tahun}-${nomor}`,

nim:
this.form.nim,

nama:
this.form.nama,

status:
'Diproses',

ekspedisi:
this.selectedEkspedisi.nama,

tanggalKirim:
new Date()
.toISOString()
.substr(0,10),

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
'Pesanan berhasil dibuat'

}
]

};

this.$emit(
'created',
newDO
);

alert(
'Delivery Order berhasil dibuat'
);

this.form={

nim:'',
nama:''

};

this.selectedPaket='';
this.selectedEkspedisi='';

}

}

}

);