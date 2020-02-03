<?php
    include_once('conn.php');
    $sql = "SELECT id, firstname, lastname,email,tel,note FROM customer_tbl";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    
        $customers[] = $row;
        // Function to convert array into JSON 
        
          
    }
    echo json_encode($customers); 
    } else {
    echo "0 results";
    }

    ?>
