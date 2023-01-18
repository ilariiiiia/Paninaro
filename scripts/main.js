function id(s){
	return document.getElementById(s);
}

function save(getFromLocal){
	const n = id("name");
	var name = n.value;
	var classe = id("classe").value + id("sezione").value;
	if(getFromLocal){
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

function onload(){
	updateLabels()
	const DOMAINLENGTH = 34
	if(location.href.substr(DOMAINLENGTH) != "/"){
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