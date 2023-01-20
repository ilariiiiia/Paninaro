<!DOCTYPE html>
<html>
<head>
	<title>Ordini della classe - Paninaro</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/x-icon" href="https://irp.cdn-website.com/d1cc6f6a/site_favicon_16_1667987083149.ico"/>
	<link rel="stylesheet" href="./style/style-classe.css"/>
	<script type="text/javascript" src="./scripts/main-classe.js"></script>
	<script type="text/javascript" src="./scripts/filemanager.js"></script>
</head>
<body onload="updateLabelsClasse()">
	<style>
	</style>
	<form onsubmit="return false;">
		<fieldset>
			<legend>Dati anagrafici</legend>
			<label>Classe:</label>
			<label id="classelabel" class="madetxt">test</label>
			<div class="fullw">
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
			</div>
			<div class="fullw">
				<button id="salva" onclick="saveClass();location.reload()">Salva</button>
				<button onclick="localStorage.clear();location.href='./ordini_classe.php'">Cambia classe</button>
			</div>
		</fieldset>
		<fieldset>
		<legend>Panini</legend>
		<table style="width:100%" id="orderstable">
			<tr>
				<th align='left' class="bigborder">
					<p>Qt.</p>
				</th>
				<th align='left' class="bigborder">Nome</th>
				<td align='right' class="bigborder">
					<tt>
						Tot.(€)
					</tt>
			</tr>
		</table>
		<a href="./">Torna agli ordini individuali</a>
	</form>
</body>
</html>