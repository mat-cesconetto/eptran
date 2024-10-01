<?php

$conn = mysqli_connect("localhost","root","root","eptran_ds2");

if (!$conn) {
    die("Connection failed" . mysqli_connect_error());
} else {
    echo "ok<br><br>";
}