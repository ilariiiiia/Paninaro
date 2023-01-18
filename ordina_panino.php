<?php
$nome = $_POST["nome"];
$classe = $_POST["classe"] . $_POST["sezione"];
$vuote = $_POST["Vuota"];
$odb = $_POST["Occhio_di_bue"];
$nutella = $_POST["Nutella"];
$cotto = $_POST["Cotto_e_fontina"];
$prosciutto = $_POST["Prosciutto_e_funghi"];
$ripiena = $_POST["Ripiena"];
$margherita = $_POST["Pizza_margherita"];
$salame = $_POST["Salame"];
$stracchino = $_POST["Stracchino_e_salsiccia"];
$estathe = $_POST["Estathe"];

function getOrders($filename){
	$f = fopen($filename, 'r');
	$orders = fread($f,filesize($filename));
	fclose($f);
	//deserialize JSON
	$orders = json_decode($orders, true);
	if($orders){
		return $orders;
	} else {
		return array();
	}
}

//write new data to file
$filename = "data/userData.json";
$newdata = [
	"nome" => $nome,
	"classe" => $classe,
	"vuota" => $vuote,
	"occhio di bue" => $odb,
	"nutella" => $nutella,
	"cotto e fontina" => $cotto,
	"prosciutto e funghi" => $prosciutto,
	"ripiena" => $ripiena,
	"margherita" => $margherita,
	"salame" => $salame,
	"stracchino e salsiccia" => $stracchino,
	"estathe" => $estathe
];

$orders = getOrders($filename);
$changed = False;
var_dump($orders);
foreach($orders[date("Y/m/d")] as $index=>$person){
	if($person["nome"] == $nome && $person["classe"] == $classe){
		$orders[date("Y/m/d")][$index] = $newdata;
		$changed = True;
	}
}
//append data
if($changed == False){
	$orders[date("Y/m/d")][] = $newdata;
}
//transform to JSON
$newjson = json_encode($orders);
//rewrite file
file_put_contents($filename, $newjson);
echo "<script>location.href = '/?s=1'</script>";
?>