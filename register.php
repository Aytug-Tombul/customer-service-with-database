<?php

use PHPMailer\PHPMailer\PHPMailer;

include_once('conn.php');
require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";


if (isset($_POST['upload'])) {
    $image = $_FILES['image']['name'];
    $firstname = $_POST['inputFirstname'];
    $lastname = $_POST['inputLastname'];
    $email = $_POST['inputEmail'];
    $tel = $_POST['inputTel'];
    $note = $_POST['inputNote'];
    $target = "images/" . basename($image);

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        $msg = "Image uploaded successfully";
    } else {
        $msg = "Failed to upload image";
    }
}
$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = "smtp.gmail.com";
$mail->SMTPAuth = true;
$mail->Username = "exampleCustomerServ@gmail.com";
$mail->Password = "";
$mail->Port = 465;
$mail->SMTPSecure = "ssl";
$subject="Thanks For Registration";
$body="Thanks for registration I hope you can do this :)";



$mail->isHTML(true);
$mail->setFrom($email,$firstname);
$mail->addAddress("aytugtombul@gmail.com");
$mail->Subject=$subject;
$mail->Body=$body;


if ($mail->send()){
    echo "Email is Sent";
}
else{
    echo $mail->ErrorInfo;
}

$sql = "INSERT INTO customer_tbl VALUES (NULL,'$firstname', '$lastname', '$email','$tel','$note','$image')";
if ($conn->query($sql) === TRUE) {
    echo "Customer created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}



$conn->close();
exit;

?>
