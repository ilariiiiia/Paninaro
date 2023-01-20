<?php
echo "<script>localStorage.success = 0;</script>";

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
$nome = $_POST["nome"];
$classe = $_POST["classe"] . $_POST["sezione"];
$newdata = [
	"nome" => $nome,
	"classe" => $classe
];
$filedata = file_get_contents('./data/prezzi.json');
$details = json_decode($filedata);
foreach($details as $nome => $data) {
	foreach($data as $index => $dato) {
		if($index == "post"){
			$newdata[$nome] = $_POST[$dato];
		}
	}
}
$filename = "data/userData.json";
$orders = getOrders($filename);
$nome = $_POST["nome"];
$changed = False;
if($orders[date("Y/m/d")]){
	foreach($orders[date("Y/m/d")] as $index=>$person){
		print $person["nome"] . $nome . $person["classe"] . $classe;
		if($person["nome"] == $nome && $person["classe"] == $classe){
			$orders[date("Y/m/d")][$index] = $newdata;
			$changed = True;
		}
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
echo "<script>localStorage.success = 1;</script>";
echo "<script>location.href = './'</script>";
?>