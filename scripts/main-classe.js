function id(s){
	return document.getElementById(s);
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

function saveClass(){
	var classe = id("classe").value + id("sezione").value;
	localStorage.classe = classe;
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