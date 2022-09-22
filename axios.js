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


// const progressSet = document.getElementById('progress')
// console.log(progressSet);
// const progress = () => {
//   let trackingId = trackingIDNode.value
//   console.log("tracking id is", trackingId );
//   axios.get(`https://shipping-appb.onrender.com/api/users/progress/${trackingId}`)
//   .then((res) => {
//     console.log( "users are", res.data)
//     progressSet.innerHTML=`<div class="progress-bar" role="progressbar" aria-label="Example with label" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>`
//   })
//   .catch((error) => {
//     console.log("error", error)
//   });
// }


const getTrackingId = document.getElementById('button-addon2')
const trackingIDNode = document.getElementById('trackingid')
const trackingDetails = document.getElementById('trackingDetails')



const getdata = () => {
  // console.log(trackingID.value);
  let trackingId = trackingIDNode.value

  let one = `https://shipping-appb.onrender.com/api/users/${trackingId}`
  let two = `https://shipping-appb.onrender.com/api/users/progress/${trackingId}`

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);


  axios.all([requestOne, requestTwo])
  .then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    console.log(responseOne);
    console.log(responseTwo);
    trackingDetails.innerHTML =`
    <div class="site-wrap" style="overflow-x: hidden;">
    <form class="p-5 bg-white" style="margin: 0px 50px 0px 50px;">
    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Name</label>
        <input value=${responseOne.data.return.name} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Email</label>
        <input value=${responseOne.data.return.email} class="form-control" disabled />
      </div>
    </div>

    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Shopping Address</label>
        <input
        value=${responseOne.data.return.shippingAddress} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Phone Number</label>
        <input value=${responseOne.data.return.phoneNumber} class="form-control"
        disabled />
      </div>
    </div>

    <div class="row form-group">
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="text-black" >Content</label>
        <input value=${responseOne.data.return.content} class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label class="text-black" >Amount Paid</label>
        <input value=${responseOne.data.return.amountPaid} class="form-control"
    disabled />
      </div>
    </div>
  </form>
  <h3 style='text-align: center; margin-bottom: 30px;'>The progress bar shows the location of your goods from pick up location to ${responseOne.data.return.shippingAddress} </h3> 
  </div>

  
  <div id="progress" style="border: 1px solid black" >
    <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width: ${responseTwo.data.data.progress}%;" aria-valuenow=${responseTwo.data.data.progress} aria-valuemin="0" aria-valuemax="100">${responseTwo.data.data.progress}%
    </div>
  </div>

 
   <div class="para">
   <h5 style="padding: 8px 8px 8px 8px">25%: Order picked up.</h5>
   <h5 style="padding: 8px 8px 8px 8px">50%: On transit to ${responseOne.data.return.shippingAddress}.</h5>
   <h5 style="padding: 8px 8px 8px 8px">75%: Close to arrival.</h5>
   <h5 style="padding: 8px 0px 8px 8px">100%: Order arrived at ${responseOne.data.return.shippingAddress}</>
  </div>
 </div>
    `
  }))

}
 
getTrackingId.addEventListener('click', getdata)


