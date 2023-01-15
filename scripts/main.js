function id(s){
	return document.getElementById(s);
}

function save(a){
	const n = id("name");
	var name = n.value;
	var classe = id("classe").value + id("sezione").value;
	if(a){
		name = localStorage.nome;
		classe = localStorage.classe;
	}
	if(name && classe){
		localStorage.nome = name;
		localStorage.classe = classe;
		n.style.borderColor = "black";
		id("smalltxt").style.display = "none";
		return true;
	} else {
		n.style.borderColor = "red";
		id("smalltxt").style.display = "block";
		return false;
	}
}

function saveClass(){
	var classe = id("classe").value + id("sezione").value;
	localStorage.classe = classe;
}

function ordina(){
	if(save(true)){
		const f = id("form");
		f.onsubmit = "";
		f.action = "/ordina_panino.php";
		id("name").value = localStorage["nome"];
		id("classe").value = localStorage["classe"].charAt(0);
		id("sezione").value = localStorage["classe"].charAt(1);
		f.submit();
	}
}

function updateLabels() {
	const nl = id("namelabel");
	const cl = id("classelabel");
	if(localStorage.nome && localStorage.classe){
		nl.innerHTML = localStorage.nome;
		cl.innerHTML = localStorage.classe;
		nl.style.display = "block";
		cl.style.display = "block";
		id("classe").style.display = "none";
		id("sezione").style.display = "none";
		id("name").style.display = "none";
		id("salva").style.display = "none";
	} else {
		nl.style.display = "none";
		cl.style.display = "none";
	}
	updateCart();
}

function updateLabelsClasse() {
	const cl = id("classelabel");
	if(localStorage.classe){
		cl.innerHTML = localStorage.classe;
		cl.style.display = "block";
		id("classe").style.display = "none";
		id("sezione").style.display = "none";
		id("salva").style.display = "none";
	} else {
		cl.style.display = "none";
	}
	updateClassCart();
}

function aggiungiItem(qty, nome, prezzo, border){

	if(border){
		id("orderstable").innerHTML += `
		 	<tr>
				<th align='left' class="bigborder">
	   				${qty}
				</th>
				<th align='left' class="bigborder">${nome}</th>
				<td align='right' class="bigborder">
					<tt>
						${prezzo}
					</tt>
				</td>
			</tr>`;
	} else {
		id("orderstable").innerHTML += `
		 	<tr>
				<th align='left'>
	   				${qty}
				</th>
				<th align='left'>${nome}</th>
				<td align='right'>
					<tt>
						${prezzo}
					</tt>
				</td>
			</tr>`}
}

function addStuff(f){
	id("orderstable").innerHTML = "";
	itemNames = ["Vuota", "Occhio di bue", "Nutella", "Cotto e fontina", "Prosciutto e funghi", "Ripiena", "Margherita", "Salame", "Stracchino e salsiccia", "Estathe"];
	itemNames = itemNames.map(function(t){return t.toLowerCase()});
	itemPrices = ["0.70", "1.00", "1.50", "1.70", "1.50", "2.00", "2.00", "1.50", "2.00", "1.00"];
	var file = JSON.parse(f);
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
	itemNames = ["Vuota", "Occhio di bue", "Nutella", "Cotto e fontina", "Prosciutto e funghi", "Ripiena", "Margherita", "Salame", "Stracchino e salsiccia", "Estathe"];
	itemNames = itemNames.map(function(t){return t.toLowerCase()});
	itemPrices = ["0.70", "1.00", "1.50", "1.70", "1.50", "2.00", "2.00", "1.50", "2.00", "1.00"];
	var file = JSON.parse(f);
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

//add orders to order table
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

function onload(){
	updateLabels()
	if(location.href.substr(34) != "/"){
		console.log("Here");
		//check s value in URL
		let a = location.href.substr(34);
		let s = a.charAt(a.indexOf("s") + 2);
		if(s == "1"){
		  id("success").style.display = "block";
		} else {
		  id("failed").style.display = "block";
		}
	}
	updateCart();
}