function td(){
	return new Date().toJSON().slice(0, 10).replace("-", "/").replace("-", "/")
}

function itemNamesList(){
	return ["Vuota", "Occhio di bue", "Nutella", "Cotto e fontina", "Prosciutto e funghi", "Ripiena", "Margherita", "Salame", "Stracchino e salsiccia", "Estathe"];
}

function itemPriceList(){
	return ["0.70", "1.00", "1.50", "1.70", "1.50", "2.00", "2.00", "1.50", "2.00", "1.00"];
}

async function updateCart(){
	fetch("./data/userData.json")
	  .then( r => r.text() )
	  .then( t => addStuff(t))
}

async function updateClassCart(){
	fetch("./data/userData.json")
		.then( r => r.text())
		.then( t => addStuffClasse(t))
}

function addStuff(f){
	id("orderstable").innerHTML = "";
	itemNames = itemNamesList()
	itemNames = itemNames.map(function(t){return t.toLowerCase()});
	itemPrices = itemPriceList();
	var file = JSON.parse(f)[td()];
	for(var i = 0; i < file.length; i++){
		var person = file[i];
		if(person.nome == localStorage.nome && person.classe == localStorage.classe){
			var res = 0;
			for (const property in person) {
				if(property == "nome" || property == "classe"){
					continue
				}
				if(person[property] != 0){
					qty = person[property];
					nome = property;
					prezzo = itemPrices[itemNames.indexOf(property)];
					res += prezzo * qty;
					aggiungiItem(qty, nome, prezzo);
				}
			}
			if(res != 0){
				aggiungiItem("Totale", "", res);
			}
		}
	}
}

function addStuffClasse(f){
	itemNames = itemNamesList()
	itemNames = itemNames.map(function(t){return t.toLowerCase()});
	itemPrices = itemPriceList();
	var file = JSON.parse(f)[td()];
	var res = 0;
	for(var i = 0; i < file.length; i++){
		var person = file[i];
		if(person.classe == localStorage.classe){
			var resp = 0;
			var firstload = true;
			for (const property in person) {
				if(property == "nome" || property == "classe"){
					continue
				}
				if(person[property] != 0){
					qty = person[property];
					nome = property;
					prezzo = itemPrices[itemNames.indexOf(property)];
					res += prezzo * qty;
					resp += prezzo * qty;
					if(firstload){
						aggiungiItem("Nome", person.nome, "");
						firstload = false;
					}
					aggiungiItem(qty, nome, prezzo);
				}
			}
			aggiungiItem("Tot. parz.", "", resp, 1);
		}
	}
	if(res != 0){
		aggiungiItem("Totale", "", res.toFixed(2));
	}
}