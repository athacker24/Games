	<?php

	// DB Config
	$servername = "localhost";
	$username = "Anjali";
	$password = "hello2021";
	$dbname = "myDb";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}


	$userName = $password = '';


	if(isset($_POST['submit']))
	{
		
		$userName= $_POST['userName'];
		$password = $_POST['password'];
		
		

		if(empty($userName) || empty($password)){
			
			 echo 'Validation Error' ;

		} else {

			$userName = mysqli_real_escape_string($conn, $_POST['userName']);
			$password = mysqli_real_escape_string($conn, $_POST['password']);
		

			$sql = "SELECT id FROM spaceWar WHERE userName = '$userName' and password = '$password'";
	      	$result = mysqli_query($conn,$sql);
	     	$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	      	$active = $row['active'];
	      
	     	 $count = mysqli_num_rows($result);
	      
	      // If result matched $myusername and $mypassword, table row must be 1 row
			
	      if($count == 1) {

	      	header("Location: ./game.html");

		}

	       else {
	      	echo "Incorrect Username or password! Try logging in again ";
	         $error = "Your Login Name or Password is invalid";
	      }
	   }
	}


	mysqli_close($conn);

	?> 

			
