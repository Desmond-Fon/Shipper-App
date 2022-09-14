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
    <div class="site-wrap">
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
  </div>
    <div id="loadProgress" style="margin-bottom: 40px; margin-top: 40px;">
      <div class="contain" >
          <div class="progress" style="background-color: white;" >
            <p><input id="field_terms"  type="checkbox" class="checkbox-round checkbox_class1" required name="terms"  value="example1" autocomplete="off"  onclick="return false;">
              <label for="field_terms">----------1----------</label></p>
          
              <p><input id="field_terms"  type="checkbox" class="checkbox-round checkbox_class2" required name="terms"  value="example1" autocomplete="off"  onclick="return false;">
                <label for="field_terms">----------2----------</label></p>
          
                <p><input id="field_terms"  type="checkbox" class="checkbox-round checkbox_class3" required name="terms"  value="example1" autocomplete="off"  onclick="return false;">
                  <label for="field_terms">----------3----------</label></p>
      
                  <p><input id="field_terms"  type="checkbox" class="checkbox-round checkbox_class4" required name="terms"  value="example1" autocomplete="off"  onclick="return false;">
                    <label for="field_terms"></label></p>
                </div>
       </div>
         <div class="para">
         <p style="padding: 8px 8px 8px 8px">1. Order picked up </p>
         <p style="padding: 8px 8px 8px 8px">2. On transit to ${res.data.return.shippingAddress} </p>
         <p style="padding: 8px 8px 8px 8px">3. Close to arrival</p>
         <p style="padding: 8px 0px 8px 8px">4. Order arrived at ${res.data.return.shippingAddress} </p>
        </div>
     </div>
     <script type='text/javascript'>
      $(function(){
          var test = localStorage.checkbox_class1 === 'true'? true: false;
          $('.checkbox_class1').prop('checked', test || false);
      });
      $('.checkbox_class1').on('change', function() {
          localStorage.checkbox_class1 = $(this).is(':checked');
          console.log($(this).is(':checked'));
      });
  
      $(function(){
          var test = localStorage.checkbox_class2 === 'true'? true: false;
          $('.checkbox_class2').prop('checked', test || false);
      });
      $('.checkbox_class2').on('change', function() {
          localStorage.checkbox_class2 = $(this).is(':checked');
          console.log($(this).is(':checked'));
      });
  
      $(function(){
          var test = localStorage.checkbox_class3 === 'true'? true: false;
          $('.checkbox_class3').prop('checked', test || false);
      });
      $('.checkbox_class3').on('change', function() {
          localStorage.checkbox_class3 = $(this).is(':checked');
          console.log($(this).is(':checked'));
      });
  
      $(function(){
          var test = localStorage.checkbox_class4 === 'true'? true: false;
          $('.checkbox_class4').prop('checked', test || false);
      });
      $('.checkbox_class4').on('change', function() {
          localStorage.checkbox_class4 = $(this).is(':checked');
          console.log($(this).is(':checked'));
      });
        </script>`
  })

}
 
getTrackingId.addEventListener('click', getdata)



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