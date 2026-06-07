const ApiService = {

async loadData(){

const response =
await fetch('data/dataBahanAjar.json');

return await response.json();

},

formatRupiah(value){

return new Intl.NumberFormat(
'id-ID',
{
style:'currency',
currency:'IDR'
}
).format(value);

},

formatTanggal(dateString){

const date =
new Date(dateString);

return date.toLocaleDateString(
'id-ID',
{
day:'numeric',
month:'long',
year:'numeric'
}
);

}

};