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


const details = document.getElementById('tableData')
console.log(details);


const delet = (_id, e) =>{
  console.log(e)
  console.log(_id)
  axios.delete(`https://shipping-appb.onrender.com/api/admin/delete/${_id}`)
  .then(
    ()=>window.location.reload()
  )
  .catch((error) =>{
    console.log("this is an error", error);
  })
}

// let elements = document.getElementsByClassName("progress");
// console.log("element is", elements.length);
// for (let i = 0; i < elements.length; i++)
// elements[i].addEventListener("change", (e) =>{
//   e.preventDefault()

// } )

const progress = (event) =>{
  const values = event.target.value
  const number = parseInt(values)
  const trackingId = event.target.id
  console.log("values is", values)
  console.log(trackingId)
  axios.put(`https://shipping-appb.onrender.com/api/admin/progress/${trackingId}`,{progress: number})
  .then((res) =>{
    console.log(res.data);
    return res.data
  })
}



const getAllUsers = () => {
  axios.get("https://shipping-appb.onrender.com/api/admin/getUsers")
  .then((res) => {
    console.log( "users are", res.data)
    res.data.map((user,i)=>{
      details.insertAdjacentHTML('beforebegin', `
      <tr>
        <td>${i+1}</td>
        <td>${user.email}</td>
        <td>${user.trackingId}</td>
        <td>${user.shippingAddress}</td>
        <td>
            <label for="drop-down">Progress:</label>
            <select name="drop-down" id=${user.trackingId} onChange={progress(event)}>
              <option value="0">Progress</option>
              <option value="25">Order picked up</option>
              <option value="50">Order on transit</option>
              <option value="75">Close to arrival</option>
              <option value="100">Order arrived</option>
            </select>
        </td>
        <td><button class="btn btn-primary text-white" onClick={delet()}>Delete</button></td>
      </tr>`)
    })
  })
  .catch((error) => {
    console.log("error", error)
  });
}

getAllUsers()