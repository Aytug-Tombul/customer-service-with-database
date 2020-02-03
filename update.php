<?php
include_once('conn.php');

$image = $_POST['image'];
$id = $_POST['input_id'];
$firstname = $_POST['inputFirstname'];
$lastname = $_POST['inputLastname'];
$email = $_POST['inputEmail'];
$tel = $_POST['inputTel'];
$note = $_POST['inputNote'];
$target = "images/" . basename($image);

if (move_uploaded_file($_POST['image'], $target)) {
    $msg = "Image uploaded successfully";
} else {
    $msg = "Failed to upload image";
}

$sql = "UPDATE customer_tbl 
    SET
    firstname = '" .  $firstname . "' ,
    lastname = '" .  $lastname . "' , 
    email = '" .  $email . "' , 
    tel = '" .  $tel . "' , 
    note = '" .  $note . "' , 
    photo = '" .  $image . "'    
    WHERE
    id = '" .  $id . "' ;";

if ($conn->query($sql) === TRUE) {
    echo "Customer updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


?>