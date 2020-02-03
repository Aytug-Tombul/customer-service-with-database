<?php
    include_once('conn.php');
    $searchFirstname=$_REQUEST['searchVal'];
    $sql = "SELECT id, firstname, lastname,email,tel,note FROM customer_tbl WHERE firstname='$searchFirstname'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    
        $customers[] = $row;
        
          
    }
    echo json_encode($customers); 
    } else {
    echo $searchFirstname;
    }
?>