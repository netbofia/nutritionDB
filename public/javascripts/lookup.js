function lookupDB(code){
    document.location=`/db/code/${code}`
}
function lookupGoogle(code){
    
}
$('document').ready(function(){

})

Vue.component('v-select', VueSelect.VueSelect)
window.app = new Vue({                                                  //Anonymous can't get back to it if necessary!!!!
    el:"#app",
    data:{
        code:"",
        productName:"",
        products:[],
        options:[{name:"Searching"}]
    },
    computed:{
        action(){
            return `/db/code/${this.code}`
        }
    },
    methods:{
        fetchProduct(search,loading){
            if(search.length){
                loading(true)
                searchProductName(search,loading, this)
            }
        },
        openProductPage(value){
            if(value.code){
                document.location=`/db/code/${value.code}`                
            }

        }
    }
})

function searchProductName(searchStr,loading,vm){
    $.get(
        `/db/name?searchStr=${searchStr}`,
        data=>{
            loading(false)
            vm.options=data
        }
    )
}