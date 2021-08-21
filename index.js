var username = document.getElementById("username");
        var submit = document.getElementById("submit");
        var outputData = document.getElementById("outputData");
        var nameAndPic = document.getElementById("nameAndPic");
        var nameOnly = document.getElementById("nameOnly");
        var displayPic = document.getElementById("displayPic");
        var FollowerFollowingList = document.getElementById("FollowerFollowingList");
        var RepoListAsHeading = document.getElementById("RepoListAsHeading");
        var msg = document.getElementById("msg");
        

        var Name = document.getElementById("Name");
        var userNameOfUser = document.getElementById("userNameOfUser");
        var FollowerCount = document.getElementById("FollowerCount");
        var FollowingCount = document.getElementById("FollowingCount");
        var RepoCount = document.getElementById("RepoCount");
        var userBio = document.getElementById("bio");
        var data = [];

        submit.addEventListener("click", function(event){
            submit.disabled="true";
            msg.style.display="inline";
            //User Story:5
            event.preventDefault();

            //User Story:6
            if(username.value === ""){
                username.style.border="2px solid red";
                username.setAttribute("placeholder", "**Username is MUST");
            } else {
                

            var usernameData = username.value;

            //Request1 for personal information.
            var requestForUserPersonalInfo = new XMLHttpRequest();
            requestForUserPersonalInfo.open("GET", `https://api.github.com/users/${usernameData}`);
            requestForUserPersonalInfo.send();

            //callback1: 
            requestForUserPersonalInfo.addEventListener("readystatechange", function(event){
                if(this.readyState === 4 && this.status == 200){ 
                    
                var userData = JSON.parse(event.target.responseText);
                console.log(userData);

                    if(userData!== ""){
                                Name.innerHTML = userData.name;
                                
                                //setting username below, putting profile link in it, and making it open in 
                                // new tab by target property.
                                userNameOfUser.innerHTML = `(@${userData.login})`;
                                userNameOfUser.setAttribute('href',userData.html_url);
                                userNameOfUser.setAttribute("target","_blank");

                                FollowerCount.innerHTML = userData.followers;
                                FollowingCount.innerText = userData.following;  
                                RepoCount.innerHTML = userData.public_repos;
                                userBio.innerHTML = userData.bio;

                                FollowerFollowingList.style.display="block";


                                //For displaying image in "displayPic" div.
                                var img = document.createElement("img");
                                img.classList.add("userAvtar");
                                img.src = userData.avatar_url;
                                displayPic.appendChild(img);
                                displayPic.style.display="block";

                                //To make image clickable and redirect user to profile.
                                //NOTE: There are 2 html_url, one in "owner" of data and one outside. ouside's one is
                                // used below to accessing the particular repositories. And "owner's" html_url is used
                                // here on image to redirect user to it's profile on github on click on image.
                                img.addEventListener("click", function(){
                                    window.open(userData.html_url);
                                });

                                var request = new XMLHttpRequest();
                                request.open("GET", `https://api.github.com/users/${usernameData}/repos`);
                                request.send();

                                request.addEventListener("readystatechange", function(event){
                                    if(this.readyState === 4 && this.status == 200){

                                                            
                                    //User Story:7
                                    var  apidata = JSON.parse(event.target.responseText);
                                    data = apidata;

                                    if(data!== ""){
                                        console.log(data);


                                    // for displaying repos.
                                    RepoListAsHeading.style.display="block";
                                    data.forEach(function(element,index){

                                    var div = document.createElement("div"); 
                                    div.classList.add("divRepo")
                                    div.style.cursor="pointer";

                                    div.innerHTML = element.name
                                    outputData.appendChild(div);

                                    //for making div clickable and redirecting user to url.
                                    div.addEventListener("click", function(){
                                    // window.location = element.html_url; opens window in same tab. 
                                    // window.open opens in new tab.
                                    window.open(element.html_url); 
                                    });
                                }); // end of forEach.
                                } 

                                    } if(this.readyState === 4 && this.status == 404) 
                                    {   
                                        RepoListAsHeading.style.display="block";
                                        RepoListAsHeading.innerHTML="No Profile Found!";
                                    }  // end of 2nd req.
                
                        });
                        }    

                    } if(this.readyState === 4 && this.status == 404)
                     {    RepoListAsHeading.style.display="block";
                          RepoListAsHeading.innerHTML="No Profile Found!"; 
                     } // end of 1st req.
                });
                }      
            });