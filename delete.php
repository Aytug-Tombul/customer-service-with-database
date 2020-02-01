<?php
    include_once('conn.php');
    $deletedCustomer=$_REQUEST['deleteID'];
    $sql = "DELETE  FROM customer_tbl WHERE id='$deletedCustomer'";
    $conn->query($sql);
    echo "User Has Been Deleted"
?>