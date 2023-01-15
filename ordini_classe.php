<!DOCTYPE html>
<html>
<head>
	<title>Ordini della classe - Paninaro</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/x-icon" href="https://irp.cdn-website.com/d1cc6f6a/site_favicon_16_1667987083149.ico"/>
	<script type="text/javascript" src="./scripts/main.js"></script>
</head>
<body onload="updateLabelsClasse()">
	<style>
		html {
			background-color: #F1F1F1;
			color: black;
			font-size: 35px;
			text-align: center;
		}

		legend {
			font-size: 25px;
			text-align: left;
			color: green;
		}

		body {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			height: 100vh;
		}
		
		input {
			align-items: center;
			justify-content: center;
			width: 80%;
			margin: 10px;
			padding: 15px 15px;
			border-radius: 15px;
			border-width: 2px;
			border-color: darkgray;
			background-color: #E8E8E8;
			font-size: 20px;
			text-align: center;
		}

		form {
			background-color: #F1F1F1;
			width: 90%;
			height: 90%;
			margin: auto;
		}

		label {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			color: green;
		}
		
		select {
			border-color: gray;
			margin-bottom: 10px;
			margin-top: 10px;
		}

		button {
			border-color: gray;
			border-radius: 10px;
		}

		th {
			font-size: 25px;
		}

		th, td {
		  border-bottom: 1px solid #ddd;
		}

		tt {
			font-size: 15px;
		}

		.fullw {
			width: 100%;
		}

		.bigborder {
			border-bottom: 2px solid #000;
		}

		.margin16 {
			margin: 16px;
		}

		.padding16 {
			padding: 16px;
		}

		#smalltxt {
			font-size: 15px;
			color: red;
			display: none;
		}

		.madetxt {
			color: blue;
			display: none;
		}

		.hidden {
			display: none;
		}
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
	</form>
</body>
</html>