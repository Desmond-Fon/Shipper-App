window.addEventListener("load", function() {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
      e.preventDefault();

      let data = new FormData(form);
      let formDataEntries = Object.fromEntries(data.entries())

      let jsonData = JSON.stringify(formDataEntries)
      console.log(jsonData);

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
    trackingDetails.innerHTML = `
    <div class="site-wrap" style="overflow-x: hidden;">
    <form class="p-5 bg-white" style="margin: 0px 50px 0px 50px;">
    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Name</label>
        <input value=${res.data.return.name} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Email</label>
        <input value=${res.data.return.email} class="form-control" disabled />
      </div>
    </div>

    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Shopping Address</label>
        <input
        value=${res.data.return.shippingAddress} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Phone Number</label>
        <input value=${res.data.return.phoneNumber} class="form-control"
        disabled />
      </div>
    </div>

    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Content</label>
        <input value=${res.data.return.content} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Amount Paid</label>
        <input value=${res.data.return.amountPaid} class="form-control"
    disabled />
      </div>
    </div>
  </form>
  <h3 style='text-align: center; margin-bottom: 30px;'>The progress bar shows the location of your goods from pick up location to ${res.data.return.shippingAddress} </h3> 
  </div>

  <div>
  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
  </div>

 
   <div class="para">
   <h5 style="padding: 8px 8px 8px 8px">25%: Order picked up.</h5>
   <h5 style="padding: 8px 8px 8px 8px">50%: On transit to ${res.data.return.shippingAddress}.</h5>
   <h5 style="padding: 8px 8px 8px 8px">75%: Close to arrival.</h5>
   <h5 style="padding: 8px 0px 8px 8px">100%: Order arrived at ${res.data.return.shippingAddress}</>
  </div>
 </div>
    `
  })

}
 
getTrackingId.addEventListener('click', getdata)


// new Vue({
//   el: '#main-app',
//   data: {
//     trackingId: ""
//   },
//   methods: {},

// })

// const login = document.getElementById('login')

// const loginadmin = () => {
//   console.log(login);
//   axios.post('localhost:5000/api/admin/login')
//   .then ((res) => {
//     console.log(res.data.data);
//   })
//   .catch((err) => {
//     console.log("error>>",err)
//       throw err;
//   });
// } 
// login.addEventListener('click', loginadmin)