 // Intialize Firebase


var messageRef=firebase.database().ref('civil');
//event listener for form submit
var usernames=[];
var uname=sessionStorage.getItem("storageName");
document.getElementById("username").value=uname;
document.getElementById('cea').addEventListener('submit',submitForm);
const scriptURL = 'https://script.google.com/macros/s/AKfycbyTvJ06EzEIyOG9EEOHGFPPT2ZQP8n-peT4bQddF9lSv27hCkx7/exec'
  const form = document.forms['cea-form']
var total_fee=0;
fetchData(uname);
function submitForm(e){
    e.preventDefault();
    var username=document.getElementById("username").value;
    var la=document.getElementById("cbx1").checked;
    var la_fee=0;
    var float=document.getElementById("cbx2").checked;
    var float_fee=150;
    var ep=document.getElementById("cbx3").checked;
    var ep_fee=150;
    var crack=document.getElementById("cbx4").checked;
    var crack_fee=150;
    var pop=document.getElementById("cbx5").checked;
    var pop_fee=150;
    total_fee+=return_true(la,la_fee)+return_true(float,float_fee)+return_true(ep,ep_fee)+return_true(crack,crack_fee)+return_true(pop,pop_fee);
    console.log(total_fee +" much need to be paid");
    writeUserData(username,la,float,ep,crack,pop,total_fee);
}

function writeUserData(username,la,float,ep,crack,pop,total_fee) {
 fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
 
      firebase.database().ref('civil').child(username+"").set({
          username: username,
          LA_TECQUILA: la,
          FLOATCRETE:float,
          EPSIDA:ep,
          CRACK_THE_STRUCTURE:crack,
          POPTICLES:pop,
          paid: 0,
          totalFee:total_fee
      });
      if(total_fee==0){
            window.alert("Registered Successfully");   
      }
      else{
            window.alert("Registered Successfully\nYou have to pay total of Rs. "+total_fee);
      }
      window.location.href='../../../index.html';
}
function return_true(flag,value)
{
            if(flag) return value;
            else return 0;
}

function fetchData(username){
      var leadsRef = firebase.database().ref('civil/'+username);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.LA_TECQUILA;
                  document.getElementById("cbx2").checked=child.FLOATCRETE;
                  document.getElementById("cbx3").checked=child.EPSIDA;
                  document.getElementById("cbx4").checked=child.CRACK_THE_STRUCTURE;
                  document.getElementById("cbx5").checked=child.POPTICLES;
                }
        });
}
