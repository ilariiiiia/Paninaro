function td(){ //ToDay
	return new Date().toJSON().slice(0, 10).replace("-", "/").replace("-", "/")
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
	fetch('./data/prezzi.json')
	.then(res => res.json())
	.then((out) => {
		let panini = out;
		id("orderstable").innerHTML = "";
		itemNames = Object.keys(panini);
		let itemPrices = [];
		for (const panino of Object.keys(panini)) {
		    itemPrices.push(panini[panino]["prezzo"]);
		}
		var file = JSON.parse(f)[td()];
		if(!file){
			return;
		}
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
	}).catch(err => console.error(err));
}

function addStuffClasse(f){
	fetch('./data/prezzi.json')
	.then(res => res.json())
	.then((out) => {
		var res = 0;
		let panini = out;
		id("orderstable").innerHTML = "";
		itemNames = Object.keys(panini);
		let itemPrices = [];
		for (const panino of Object.keys(panini)) {
		    itemPrices.push(panini[panino]["prezzo"]);
		}
		var file = JSON.parse(f)[td()];
		if(!file){
			return;
		}
		for(var i = 0; i < file.length; i++){
			var person = file[i];
			if(person.classe == localStorage.classe){
				console.log(person);
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
	}).catch(err => console.error(err));
}