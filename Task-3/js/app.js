async function loadTemplate(file){

    const response = await fetch(`templates/${file}`);
    const html = await response.text();

    document.body.insertAdjacentHTML(
        'beforeend',
        html
    );
}

async function loadTemplates(){

    await loadTemplate('status-badge.html');
    await loadTemplate('app-modal.html');
    await loadTemplate('stock-table.html');
    await loadTemplate('do-tracking.html');
    await loadTemplate('order-form.html');
}

(async()=>{

    await loadTemplates();

    new Vue({

        el:'#app',

        data:{

            tab:'stok',

            state:{

                upbjjList:[],
                kategoriList:[],
                pengirimanList:[],
                paket:[],
                stok:[],
                tracking:[]
            }

        },

        async created(){

            const data =
            await ApiService.loadData();

            if(data.tracking){

                data.tracking =
                data.tracking.map(item=>{

                    const nomorDO =
                    Object.keys(item)[0];

                    const detail =
                    item[nomorDO];

                    return{

                        kode:nomorDO,

                        nim:detail.nim,

                        nama:detail.nama,

                        status:detail.status,

                        ekspedisi:
                        detail.ekspedisi,

                        tanggalKirim:
                        detail.tanggalKirim,

                        paket:
                        detail.paket,

                        total:
                        detail.total,

                        perjalanan:
                        detail.perjalanan

                    };

                });

            }

            this.state = data;

        },

        methods:{

            handleNewDO(newDO){

                this.state.tracking.push(
                    newDO
                );

                this.tab='tracking';

            },

            showConfirm(
                message,
                callback
            ){

                this.$refs.modal.open(
                    message,
                    callback
                );

            }

        }

    });

})();