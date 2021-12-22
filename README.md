


Phase 1
-------
Upload image
Run API on image CloudmersiveBarcodeapiClient
https://cloudmersive.medium.com/how-to-scan-a-barcode-image-and-extract-the-data-in-node-js-5d58c0d50431
Free (800 scans / month)


Phase 2
---------
Upload image
Rotate crop image portion with bar code
Run javascriptBarcodeReader


Phase 3
-------
Upload image
Image manipulation to locate barcode
Run javascript BarcodeReader

Phase 4
-------
Process video stream into bar code


Processing images
https://www.pyimagesearch.com/2014/11/24/detecting-barcodes-images-python-opencv/
JS
https://serratus.github.io/quaggaJS/

Private DB
- https://nutripedia.pt/
Open DB
- https://pt.openfoodfacts.org/
- Open Product Data http://product.okfn.org/
- https://gtinsearch.org/
- http://product-open-data.com/
- openfoodfacts.org


-----------------   
Download nightly https://es-pt.openfoodfacts.org/data
``` sql
    CREATE DATABASE nutrition;
    USE DATABASE nutrition;
    
    DROP TABLE Product;
    CREATE TABLE IF NOT EXISTS `nutrition`.`Product` ( 
        `code` VARCHAR(100) NOT NULL , 
        `name` TEXT(1000) NOT NULL , 
        `brands` VARCHAR(254) NOT NULL , 
        `categorias` TEXT(1000) NOT NULL , 
        `categoria_principal` text(1000) NOT NULL , 
        `product_preview` VARCHAR(254) NOT NULL , 
        `ingredients_preivew` VARCHAR(254) NOT NULL , 
        `nutrition_preview` VARCHAR(254) NOT NULL , 
        PRIMARY KEY (`code`)
    ) 
    ENGINE = InnoDB;
    LOAD DATA LOCAL INFILE"/home/brunocosta/Transferências/product_tabel.tsv" REPLACE INTO TABLE nutrition.Product FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\n";
```
``` bash
    wget https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv
    awk -F "\t" '{print $1"\t"$8"\t"$15"\t"$19"\t"$69"\t"$71"\t"$73"\t"$75}' en.openfoodfacts.org.products.csv > product_tabel.tsv
      
```

porFIR

```SQL
CREATE TABLE IF NOT EXISTS `porFIR` (
  `codigo` int NOT NULL,
  `nome` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_1` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nível_2` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nivel_3` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kcal_Energia` float DEFAULT NULL,
  `kJ_Energia` float DEFAULT NULL,
  `kJ_Lípidos` float DEFAULT NULL,
  `g_Ácidos_gordos_saturados` float DEFAULT NULL,
  `g_Ácidos_gordos_monoinsaturados` float DEFAULT NULL,
  `g_Ácidos_gordos_polinsaturados` float DEFAULT NULL,
  `g_Ácido_linoleico` float DEFAULT NULL,
  `g_Ácidos_gordos_trans` float DEFAULT NULL,
  `g_Hidratos_de_carbono` float DEFAULT NULL,
  `g_Açúcares` float DEFAULT NULL,
  `g_Oligossacáridos` float DEFAULT NULL,
  `g_Amido` float DEFAULT NULL,
  `g_Fibra` float DEFAULT NULL,
  `g_Proteínas` float DEFAULT NULL,
  `g_Sal` float DEFAULT NULL,
  `g_Álcool` float DEFAULT NULL,
  `g_Água` float DEFAULT NULL,
  `g_Ácidos_orgânicos` float DEFAULT NULL,
  `g_Colesterol` float DEFAULT NULL,
  `mg_Vitamina_A` float DEFAULT NULL,
  `µg_Caroteno` float DEFAULT NULL,
  `µg_Vitamina_D` float DEFAULT NULL,
  `µg_alfa-tocoferol` float DEFAULT NULL,
  `mg_Tiamina` float DEFAULT NULL,
  `mg_Riboflavina` float DEFAULT NULL,
  `mg_Niacina` float DEFAULT NULL,
  `mg_Equivalentes_de_niacina` float DEFAULT NULL,
  `mg_Triptofano-60` float DEFAULT NULL,
  `mg_Vitamina_B6` float DEFAULT NULL,
  `mg_Vitamina_B12` float DEFAULT NULL,
  `µg_Vitamina_C` float DEFAULT NULL,
  `mg_Folatos` float DEFAULT NULL,
  `µg_Cinza` float DEFAULT NULL,
  `g_Sódio` float DEFAULT NULL,
  `mg_Potássio` float DEFAULT NULL,
  `mg_Cálcio` float DEFAULT NULL,
  `mg_Fósforo` float DEFAULT NULL,
  `mg_Magnésio` float DEFAULT NULL,
  `mg_Ferro` float DEFAULT NULL,
  `mg_Zinco` float DEFAULT NULL,
  PRIMARY KEY(`codigo`)
)
LOAD DATA LOCAL INFILE"/home/brunocosta/Transferências/porFIR/insa_tca.tsv" REPLACE INTO TABLE nutrition.porFIR FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\n";

```


External Source lookup

Break into words ---> Is word --> Translate (translate.libre) --> wordnet { Select type that is allowed to continue } 