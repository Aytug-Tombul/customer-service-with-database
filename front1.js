var addDiv = `<form action="/register.php" method="post" role="form" enctype="multipart/form-data">
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="firstnameLabel">First Name</label>
        <input type="text" class="form-control" name="inputFirstname" placeholder="First Name">
    </div>
    <div class="form-group col-md-6">
        <label for="lastnameLabel">Last Name</label>
        <input type="text" class="form-control" name="inputLastname" placeholder="Last Name">
    </div>
</div>
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="emaiLlabel">Email</label>
        <input type="text" class="form-control" name="inputEmail" placeholder="example@example.com">
    </div>
    <div class="form-group col-md-6">
        <label for="phoneLabel">Phone</label>
        <input type="text" class="form-control" name="inputTel"
            placeholder="+55 555 555555">
    </div>
</div>
<div class="form-group">
    <label for="noteLabel">Note</label>
    <input type="text" class="form-control" name="inputNote">
  </div>
</div>
<div class="form-group">
    <label for="PhotoLabel">Profile Photo</label>
    <input type="file" class="form-control" name="image">
    <br>
  </div>
</div>
<button type="submit" class="btn btn-primary" style="margin: 10px"; name="upload">Register customer</button>
</form>`;

var table = `<table class="table">
<thead>
  <tr>
    <th scope="col">Customer Photo</th>
    <th scope="col">id</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">email</th>
    <th scope="col">phone</th>
    <th scope="col">note</th>
  </tr>
</thead>
<tbody id="customers">
</tbody>
</table>`;

var searchDiv = `<div class="col-md-6" id="searchArea" class="row" style="margin: 30px;" >
    <div class="input-group">
    <input type="text" class="form-control" placeholder="FirstName" aria-label="Firstname" aria-describedby="basic-addon2" id="inputSearch">
<div class="input-group-append">
  <button class="btn btn-outline-secondary bg-dark text-light" id = "searchBtn"type="button">Button</button>
</div>
</div>
</div>`;

var deleteDiv = `<div class="col-md-6" id="deleteArea" class="row" style="margin: 30px;" >
    <div class="input-group">
    <input type="text" class="form-control" placeholder="Input ID" aria-label="ID" aria-describedby="basic-addon2" id="inputDelete">
<div class="input-group-append">
  <button class="btn btn-outline-secondary bg-dark text-light" id = "deleteBtn"type="button">Button</button>
</div>
</div>
</div>`;
var modalCreate = ` <!-- The Modal -->
<div class="modal" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal body -->
            <div class="modal-body" style="text-align: center;">
                
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

        </div>
    </div>
</div>`;

function modalSend(_src) {
  $(".modal-body").empty();
  var imgCreate = '<img style="width: 300px;" src="' + _src + '">';
  $(".modal-body").append(imgCreate);
}

function listCustomers() {
  $(".workArea").append(table);
  $("#profilePhoto").remove();
  $.get("list.php", function(data, status) {
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      var imageSrc = "images/" + data[i].photo;
      var tableElement =
        "<tr id=" +
        data[i].id +
        ">" +
        "<td>" +
        '<img src="' +
        imageSrc +
        '" data-toggle="modal" data-target="#myModal" onclick="modalSend(this.src)" style="width: 50px;">' +
        "</td>" +
        "<td>" +
        data[i].id +
        "</td>" +
        "<td>" +
        data[i].firstname +
        "</td>" +
        "<td>" +
        data[i].lastname +
        "</td>" +
        "<td>" +
        data[i].email +
        "</td>" +
        "<td>" +
        data[i].tel +
        "</td>" +
        "<td>" +
        data[i].note +
        "</td>" +
        "</tr>";
      $("#customers").append(tableElement);
    }
  });
  $("body").append(modalCreate);
}

$(document).on("click", "#add", function() {
  $(".workArea").empty();
  $(".workArea").append(addDiv);
  $(".table").remove();
  listCustomers();
});

$(document).on("click", "#sub", function() {
  alert("Customer has been Created...");
});

$(document).on("click", "#search", function() {
  $(".workArea").empty();
  $(".workArea").append(searchDiv);
  listCustomers();
});

$(document).on("click", "#searchBtn", function() {
  var searchVal = $("#inputSearch").val();
  $("#customers").empty();
  $.post("search.php", { searchVal: searchVal }, function(data, status) {
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      var tableElement =
        "<tr>" +
        '<td id="CustomerID">' +
        data[i].id +
        "</td>" +
        "<td>" +
        data[i].firstname +
        "</td>" +
        "<td>" +
        data[i].lastname +
        "</td>" +
        "<td>" +
        data[i].email +
        "</td>" +
        "<td>" +
        data[i].tel +
        "</td>" +
        "<td>" +
        data[i].note +
        "</td>" +
        "</tr>";
      $("#customers").append(tableElement);
    }
  });
});

$(document).on("click", "#delete", function() {
  $(".workArea").empty();
  $(".workArea").append(deleteDiv);
  listCustomers();
});

$(document).on("click", "#deleteBtn", function() {
  var deleteVal = $("#inputDelete").val();
  $("#customers").empty();
  $.post("delete.php", { deleteID: deleteVal }, function() {
    window.alert("User Has Been Deleted.");
  });
});
