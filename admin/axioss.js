window.addEventListener("load", function() {
  const form = document.getElementById("loginAdminUser");

  form.addEventListener("submit", function (e) {
      e.preventDefault();
      

      let data = new FormData(form);
      let formDataEntries = Object.fromEntries(data.entries())
      
      let jsonData = JSON.stringify(formDataEntries)
      console.log(jsonData);

      axios.post("https://shipping-appb.onrender.com/api/admin/login", formDataEntries)
      .then((res) => {
        console.log(res)
         window.localStorage.setItem(res, formDataEntries)
          return res.data
      })
       .then(() => {
         window.location.href = "track2.html"
       })
      .catch((error) => {
        console.log("error", error)
      });
  });
});