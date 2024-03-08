# Product Manager

## Szükséges szoftverek

Az alkalmazás fejlesztéséhez és teszteléséhez szükséged lesz a következő szoftverekre:

- [Visual Studio Code](https://code.visualstudio.com/))
- [Visual Studio 2022 Community]([https://code.visualstudio.com/](https://visualstudio.microsoft.com/vs/)))
- [XAMPP](https://www.apachefriends.org/download.html)

# <p align = "center">Felhasznált technológiák:</p>

- .ASP Net Core (C#)
- MariaDB szerver (Adatbázis)
- Angular

## Fejlesztői dokumentáció - Web

## Fejlesztői Nézet

Menjünk be a ProductManager/webapi/web könyvtárba a következő konzol paranccsal:

```bash
cd ProductManager/webapi/web
```

Amint beléptünk telepítenünk kell a függüségeket amit mi esetünkben az npm paranccsal teszünk meg.

```bash
npm install
```

A webes szerverének elinditása:

```bash
ng serve -o
```

Ha nem globálisan van telepítve az Angular akkor a következő paranccsal lehet elindítani:
```bash
npx ng serve -o
```

## Felépítés

## Könyvtárszerkezet

![image](https://github.com/Zsomi/PM_WebAPI/assets/31018282/99356a88-92a5-41c4-8061-e005bc5d31e0)


A webes felület egy egyszerű Termék Kezelő Rendszer Angular keretrendszerrel összeállítva.

Vizuális Komponensek:
* app.component - Fő konténer
* product.component - Termék konténer

A következő nem vizuális komponensek lettek beépítve:

* api.service - A termékek kezelése a REST API felületen

### ApiService Osztály

Az Angularban elérhető HttpClient osztály segítségével elvégzi a termékek törlését, hozzáadását, szerkesztését.

### Api Environment

Itt tudod szerkeszteni a back api urljét. Innen éri el a backend api urljét.

### ApiService Osztály

A termékek kezelését végzi a REST API szerveren.

#### addProduct Metódus

Egyetlen bemenő paramétere tartalmazza, a felvenni kívánt termék adatait. Egy Observer objektummal tér vissza, amiből kiolvasható a szerver válasza.

#### updateProduct Metódus

Egyetlen bemenő paramétere tartalmazza, a felvenni kívánt termék adatait. Egy Observer objektummal tér vissza, amiből kiolvasható a szerver válasza.

#### deleteProduct Metódus

Egyetlen bemenő paramétere tartalmazza, a törölni kívánt terméket. Egy Observer objektummal tér vissza, amiből kiolvasható a szerver válasza.

#### getProducts Metódus

Nincs bemenő paramétere. Lekéri az össze termék adatait, majd visszatér egy Observer objektummal, ami szolgáltatja az összes termék adatait.

### AppComponent Komponens
Az alkalmazás fő komponense. Alul jelennek meg a hivatkozott komponensek.

### Productlist Komponens

products objektum
Ebból a tömbből bontja ki a termék adatait

productForm objektum
A termék felvétel felület űrlapjának leképezése, FormGroup és FormBuilder osztályok használatával.

editForm objektum
A termék szerkesztés felület űrlapjának leképezése, FormGroup és FormBuilder osztályok használatával.

#### addProduct() metódus
A metódusnak nincs bemenőparamétere. A .html fájlban megjelenített űrlapból olvassa az új komponens nevét, majd eltárolja az api szolgáltatás használatával.

#### editProduct() metódus
Megjeleníti a szerkesztő űrlapot.

#### updateProduct() metódus
Frissíti a megadott terméket. A metódusnak nincs bemenőparamétere. Az adatbázist az api szolgáltatáson keresztül telepíti. A frissítés után újragenerálja a táblázatot.

#### clearField() metódus
Törli az új termék felvételének űrlap mezőit amiután el lett mentve. A metódusnak nincs bemenőparamétere. Az adatbázist az api szolgáltatáson keresztül telepíti. A frissítés után újragenerálja a táblázatot.

#### deleteProduct() metódus
A metódusnak egy bemenőparamétere van. Törli a kiválasztott terméket a táblázatból és a termékek oldalról.

### Testek

Testet a következő konzol paranccsal indítható.

```bash
ng test
```

## Fejlesztői dokumentáció - Webapi

## Fejlesztői Nézet

Menjünk be a ProductManager/webapi/web könyvtárba a következő konzol paranccsal:

```bash
cd ProductManager/webapi/webapi
```

Amint beléptünk telepítenünk kell a függőségeket amit mi esetünkben az npm paranccsal teszünk meg.

```bash
dotnet restore
```

A webes szerverének elindítása:

```bash
dotnet run
```

# <p align = "center">RestAPI végpontok:</p>

  | HTTP metódus | Végpont                | Leírás                         | Azonosítás |
  |-------------|-------------------------|--------------------------------|------------|
  | GET         | /GetProduct             | Termékek kiírása               | Nem        |
  | GET         | /GetProduct/{id}    | Termékek kiírása ID alapján        | Nem        |
  | PATCH       | /UpdateProduct/{id}     | Termék frissítése              | Nem        |
  | DELETE      | /DeleteProduct/{id}     | Termék törlése                 | Nem        |
  

### GetProduct
Ez a metódus egy HTTP GET kérésekre válaszol és visszaadja az adatbázisban tárolt Product objektumok listáját.

### GetProduct/{id}
Ez a metódus egy HTTP GET kérésekre válaszol és visszaadja az adatbázisban tárolt Product objektumot az adott azonosító alapján.

### AddProduct
Ez a metódus egy HTTP POST kérésekre válaszol, hozzáad egy új Product objektumot az adatbázishoz, majd elmenti az 
változtatásokat, visszaadva az újonnan hozzáadott objektumot.

### UpdateProduct/{id}
Ez a metódus egy HTTP PATCH kérésre válaszol és frissíti az adott azonosítójú Product objektumot az adatbázisban, majd visszaadja azt.

### DeleteProduct/{id}
Ez a metódus egy HTTP DELETE kérést kezel és a megadott id alapján törli a Product objektumot az adatbázisból, majd visszaadja a törlés sikerességét.


### Testek

Testet a következő konzol paranccsal indítható.

```bash
dotnet test
```
