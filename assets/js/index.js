/*$("#add_user").submit(function (event) {
  alert("User data has been submitted");
}); */
$("#update_user").submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data);
  urlString = "http://localhost:3000/api/users/" + data.id;
  var request = {
    url: urlString,
    method: "PUT",
    data: data,
  };
  $.ajax(request).done(function (response) {
    alert("Request sent was successfull ${data.id}");
  });
});
/*Saving an array of objects of data into a single object
Taking the name of each object and setting it to its corrresponding value inside object
*/

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data_id");
    var urlString = "http://localhost:3000/api/users/" + id;
    var request = {
      url: urlString,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this User?")) {
      $.ajax(request).done(function (response) {
        alert("Delete request sent was successfull");
        location.reload();
      });
    }
  });
}
