if(location.pathname.split("/").indexOf("scraper")>-1){
    let target="auchan.pt"
    $('button').click(e=>{
        let url=$('input').val()
        if(url.search(target)>-1) {
            $.ajax({
                url: "",
                method: "POST",
                data: {url},
                success(data, jqXHR, textStatus) {
                    if (data.code) {
                        if (data.code.length == 0) displayToast("Erro", "Producto não foi encontrado!")
                        window.scraper._data.code = data.code
                        window.scraper._data.name = data.name
                        window.scraper._data.brand = data.brand
                        window.scraper._data.categorias = data.categorias
                        window.scraper._data.categoria_principal = data.categoria_principal
                        window.scraper._data.product_preview = data.product_preview
                        window.scraper._data.ingredients = data.ingredients
                        window.scraper._data.nutritional_info = data.nutritional_info
                        window.scraper._data.description = data.description
                        window.scraper._data.nutrients=extractNutrients(data.nutritional_info)
                        loadRelatedExternalSources(data.name,window.scraper)
                    } else {
                        displayToast("Erro", "O endereço que introduziste tem algum problema! Não te esqueças que deve começar por 'http'!")
                    }


                },
                error(error, jqXHR, textStatus) {
                    console.log(error)
                }
            })

        }else{
            displayToast("Unvalid url","Esse endereço não é do auchan!")
        }
    })

    //Vue.component('v-select', VueSelect.VueSelect)
    window.scraper = new Vue({  //TODO #app is running on another script
        el:"#scraper",
        data:{
            code:"",
            name:"",
            brand:"",
            categorias:"",
            categoria_principal:"",
            product_preview:"",
            description:"",
            ingredients:"",
            nutritional_info:"",
            nutrients:{},
            externalSources:[]
        },
        computed:{
            product(){
                return this.code.length>0
            },
        },
        methods:{
            editCell(evt) {
                if ("currentTarget" in evt) {
                    if(evt.currentTarget.childElementCount==0){
                        let currentTarget = evt.currentTarget
                        let content = evt.currentTarget.textContent
                        evt.currentTarget.textContent = ""
                        let input = document.createElement("input")
                        input.value = content
                        input.className = "form-control "
                        currentTarget.append(input)
                    }
                }
            },
            saveProduct(evt){
                let row=evt.currentTarget.closest('tr')
                let data={}
                for( let td of row.children ){
                    data[td.getAttribute('id')]=td.getAttribute('value')
                }
                $.ajax({
                    url:"/db/product",
                    method:"POST",
                    data,
                    success(data,jqXHR,textStatus){
                        if(data.errors) displayToast("Error"+data.name,data.errors[0].message)
                        console.log("Done!")
                    },
                    error(err,jqXHR,textStatus){
                        console.log(err)
                    }
                })
            },
            associateNutritionalInfo(evt){
                let row=evt.currentTarget.closest('tr')
                let data={}
                for( let td of row.children ){
                    data[td.getAttribute('id')]=td.getAttribute('value')
                }
                data['desc']=evt.data.description
                data['desc']=evt.data.ingredients
                data['desc']=evt.data.nutritional_info
                $.ajax({
                    url:"/db/associate/nutrientData",
                    method:"POST",
                    data,
                    success(data,jqXHR,textStatus){
                        if(data.errors) displayToast("Error"+data.name,data.errors[0].message)
                        console.log("Done!")
                    },
                    error(jqXHR,textStatus,err){
                        console.log(err)
                    }
                })
            }
        }
    })
    async function loadRelatedExternalSources(name,vm){
        let promises=[]
        name.split(' ').forEach(token=>{
            if(token.length>2) promises.push(loadNameFragment(token))
        })
        let result={}
        try{
            let temp=await Promise.all(promises)
            name.split(' ').forEach((token,index)=>{
                if(temp[index].length>0) result[token]=temp[index]
            })
        }catch(e){
            console.log(e)
        }
        vm._data.externalSources=result
    }
    function loadNameFragment(token){
        return $.ajax({
            url:"/db/porFIR/name?searchStr="+token,
            method:"GET",
            success(data,jqXHR,textStatus){
                console.log(data)
                //return data
            },
            error(jqXHR,textStatus,error){
                console.log(error)
            }
        })
    }
    function calcNutriscore(nutrients){
        const nutriScoreResult = nutriScore.nutriScore.calculateClass(
            {
                energy: parseFloat(nutrients.energy.kJ.replace("kJ","")),
                fibers: nutrients.fibre.value.amount,
                fruit_percentage: 60,  //TODO unknown
                proteins: nutrients.protein.value.amount,
                saturated_fats: nutrients.fat.saturated.value.amount,
                sodium: (nutrients.sodium.value.amount/1000),
                sugar: nutrients.sugar.value.amount
            },
            "solid"
        );

        console.log(nutriScoreResult);
    }
    function extractNutrients(ingredients){
        let r={}
        try{
            r.energy={}
            r.energy.text=ingredients.match(/Energia:.*kcal/i)[0]
            r.energy.kcal=r.energy.text.match(/\d*[ \.]*\d+\s*kcal/i)[0]
            r.energy.value={}
            r.energy.value.amount=r.energy.kcal.replace("kcal","").trim()
            r.energy.value.unit="kcal"
            r.energy.kJ=r.energy.text.match(/\d*\.*\d+\s*kj/i)[0]

        }catch (e) {

        }
        try{
            r.protein={}
            r.protein.text=ingredients.match(/Proteínas:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.protein.value={}
            r.protein.value.text=r.protein.text.match(/\d*\.*\d+\s*g/)[0]
            r.protein.value.amount=r.protein.value.text.replace("g","").trim()
            r.protein.value.unit="g"
        }catch (e) {

        }
        try{
            r.fat={}
            r.fat.text=ingredients.match(/Lípidos:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.fat.value={}
            r.fat.value.text=r.fat.text.match(/\d*\.*\d+\s*g/)[0]
            r.fat.value.amount=r.fat.value.text.replace("g","").trim()
            r.fat.value.unit="g"
            r.fat.saturated={value:{text:"",amount:"",unit:"g"}}
            r.fat.saturated.text=ingredients.match(/saturados:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.fat.saturated.value.text=r.fat.saturated.text.match(/\d*\.*\d+\s*g/)[0]
            r.fat.saturated.value.amount=r.fat.saturated.value.text.replace("g","").trim()

        }catch (e) {

        }
        try{
            r.sugar={}
            r.sugar.text=ingredients.match(/hidratos de carbono:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.sugar.value={}
            r.sugar.value.text=r.sugar.text.match(/\d*\.*\d+\s*g/)[0]
            r.sugar.value.amount=r.sugar.value.text.replace("g","").trim()
            r.sugar.value.unit="g"
            r.sugar.sugar={value:{text:"",amount:"",unit:"g"}}
            r.sugar.sugar.text=ingredients.match(/dos quais açúcares:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.sugar.sugar.value.text=r.sugar.sugar.text.match(/\d*\.*\d+\s*g/)[0]
            r.sugar.sugar.value.amount=r.sugar.sugar.value.text.replace("g","").trim()

        }catch (e) {

        }
        try{
            r.salt={}
            r.salt.text=ingredients.match(/sal:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.salt.value={}
            r.salt.value.text=r.salt.text.match(/\d*\.*\d+\s*g/)[0]
            r.salt.value.amount=r.salt.value.text.replace("g","").trim()
            r.salt.value.unit="g"
            //TODO dos quais
        }catch (e) {

        }
        try{
            r.fibre={}
            r.fibre.text=ingredients.match(/fibras:\s*\d*[ \.]*\d+\s*g/i)[0]
            r.fibre.value={}
            r.fibre.value.text=r.fibre.text.match(/\d*\.*\d+\s*g/)[0]
            r.fibre.value.amount=r.fibre.value.text.replace("g","").trim()
            r.fibre.value.unit="g"
            //TODO dos quais
        }catch (e) {

        }
        try{
            r.others=ingredients.match(/[\s*[a-zA-Zçáúí\u00C0-\u017F]*]*:\s*\d*[ \.]*\d+\s*[g|ug|mg|kcal|kJ]/ig)//TODO remove unwanted    
        }catch(e){}
        
        return r
    }
}
