var id = -1;


const get_joke = () => {

    let req = new XMLHttpRequest();
    req.open("GET", `http://localhost:3000/data`, true);
    req.send();
    req.onload = () => {
        let json = JSON.parse(req.response);

        if (json.setup != undefined) {
            id++;

            document.getElementById("setup").innerHTML += json.setup + `<br/> <h3 id="delivery${id}">` + json.delivery + "</h3><hr/>";
            // document.getElementById("delivery").innerHTML += json.delivery + "<br/>";
            $("#setup").fadeIn();
            $(`#delivery${id}`).hide();

            $("#setup").mouseover(function() {
                $(`#delivery${id}`).show(3000);
            });

            // $("#setup").mouseout(function() {
            //     $(`#delivery${id}`).hide();
            // });
        } else {
            document.getElementById("setup").innerHTML += json.joke + "<br/>" + "<hr/>";
            // document.getElementById("delivery").innerHTML += json.category + "<br/>";
        }


    }

}

// if(document.getElementById("setup").innerText==""){
//     document.getElementById("setup").innerText = "Loading";
// }

// $("button").mouseover(function() {
//     $("button").click();
// });