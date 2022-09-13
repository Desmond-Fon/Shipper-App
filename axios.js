window.addEventListener("load", function() {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
      e.preventDefault();

      let data = new FormData(form);
      let formDataEntries = Object.fromEntries(data.entries())

      let jsonData = JSON.stringify(formDataEntries)
      console.log(jsonData);

      // axios.post('https://shipping-appb.onrender.com/api/users/', {
      //   data: formDataEntries
      // })
      axios.post("https://shipping-appb.onrender.com/api/users/", {
        data: formDataEntries
      })
      .then((res) => {
        console.log(res)
         return res.data;
      })
      .then(() => {
        window.location.href = "success.html"
      })
      .catch((err) => {
        console.log("error>>",err)
          throw err;
      });
      // axios({
      //     method: "post",
      //     url: "https://shipping-appb.onrender.com/api/users/",
      //     data: jsonData,
      // })
  });
});

const getTrackingId = document.getElementById('button-addon2')
const trackingIDNode = document.getElementById('trackingid')
const trackingDetails = document.getElementById('trackingDetails')

const getdata = () => {
  // console.log(trackingID.value);
  let trackingId = trackingIDNode.value


  axios.get(`https://shipping-appb.onrender.com/api/users/${trackingId}`)
  .then((res) => {
    console.log(res.data.return);
    trackingDetails.innerHTML = `<form style=" display: flex; flex-direction: column; justify-content: center; align-items: center;"><input value=${res.data.return.name} disabled /><br><input value=${res.data.return.email} disabled /><br><input value=${res.data.return.shippingAddress} disabled /><br><input value=${res.data.return.phoneNumber} disabled /><br><input value=${res.data.return.content} disabled /><br><input value=${res.data.return.amountPaid} disabled /><br></form>`
  })

}
 
getTrackingId.addEventListener('click', getdata)