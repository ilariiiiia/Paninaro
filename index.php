<!DOCTYPEhtml>
<html>
  <head>
    <title>Paninaro</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/x-icon" href="https://irp.cdn-website.com/d1cc6f6a/site_favicon_16_1667987083149.ico"/>
	<link rel="stylesheet" href="./style/style-index.css"/>
	<script type="text/javascript" src="./scripts/main-index.js"></script>
	<script type="text/javascript" src="./scripts/filemanager.js"></script>
  </head>	
  <body onload="onload()">
	  <div id="success" class="fullw hidden" style="background-color:green; font-size: 15px">
		  <p>Panini ordinati con successo!</p>
	  </div>
	  <div id="failed" class="fullw hidden" style="background-color:red; font-size: 15px">
		  <p>Errore nella prenotazione, riprovare</p>
	  </div>
	  <form onsubmit="return false;" action="/ordina_panino.php" id="form" method="post">
		<fieldset id="dati_anagrafici">
		<legend>Dati anagrafici</legend>
			<label id="nlabel">Nome e cognome:</label>
			<label id="smalltxt">Per favore inserire un nome!</label>
		  	<div class="fullw">
				<input id="name" name="nome"/>
				<label id="namelabel" class="madetxt">test</label>
		  	</div>
			<label>Classe:</label>
			<label id="classelabel" class="madetxt">test</label>
			<select id="classe" name="classe">
			  <option value="1">1a</option>
			  <option value="2">2a</option>
			  <option value="3">3a</option>
			  <option value="4">4a</option>
			  <option value="5">5a</option>
			</select>
			<select id="sezione" name="sezione">
			  <option value="A">A</option>
			  <option value="B">B</option>
			  <option value="C">C</option>
			  <option value="D">D</option>
			  <option value="E">E</option>
			  <option value="F">F</option>
			  <option value="G">G</option>
			  <option value="H">H</option>
			  <option value="AS">AS</option>
			  <option value="BS">BS</option>
			</select>
			<div class="fullw">
				<button id="salva" onclick="save();updateLabels()">Salva</button>
			</div>
			<div class="fullw">
			<button onclick="localStorage.clear();location.href='./'">Elimina dati anagrafici</button>
		</div>
		</fieldset>
		<fieldset>
		<legend>I tuoi ordini:</legend>
		<p class="smallfont">
			Tip: per annullare l'ordine premere "ordina" senza prendere niente
		</p>
		<table class="fullw" id="orderstable">
		</table>
		</fieldset>
	  	<fieldset id="paninifield" style="margin-top: 15px">
		<legend>Panini:</legend>
		<table class="fullw">

		<tr>
			<th align='left' class="bigborder">
				<p>Qt.</p>
			</th>
			<th align='left' class="bigborder">Nome</th>
			<td align='right' class="bigborder">
				<tt>
					Prezzo(€)
				</tt>
		</tr>
			
			<?php

function newItem($itemName, $itemPrice, $itemPost){
	echo "
		<tr>
			<th align='left'>
				<select name='{$itemPost}'>
					<option value='0'>0</option>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
				</select>
			</th>
			<th align='left'>{$itemName}</th>
			<td align='right'>
				<tt>
					{$itemPrice}
				</tt>
			</td>
		</tr>
";
}
$filedata = file_get_contents('./data/prezzi.json');
$details = json_decode($filedata);
$itemNames = [];
$itemPrices = [];
$itemPost = [];
foreach($details as $nome => $data) {
	foreach($data as $index => $dato) {
		if($index != "post"){
			$itemNames[] = $nome;
			$itemPrices[] = $dato;
		} else {
			$itemPost[] = $dato;
		}
	}
}

for($i = 0; $i<count($itemNames); $i+=1){
	newItem($itemNames[$i], $itemPrices[$i], $itemPost[$i]);
}
	?>
		</table>
		<div class="fullw">
			<button onclick="ordina()">Ordina</button>
		</div>
		</fieldset>
		<div class="fullwidth margin16 padding16">
		  	<p>Se vuoi vedere gli ordini della tua classe, clicca <a href="./ordini_classe.php">qui</a></p>
			<p style="font-size: 15px;">Ordinando, accetti che <a href="./privacy_policy.php">la tua privacy</a> è inesistente.</p>
		</div>
	  </form>
  </body>
</html>